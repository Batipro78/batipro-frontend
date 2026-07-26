/**
 * Pousse toutes les URLs du sitemap a IndexNow (Bing, Yandex, Seznam, Naver).
 * Bing verifie la propriete du site en allant lire KEY_LOCATION : ce fichier
 * doit donc etre en ligne AVANT le premier appel.
 *
 *   node scripts/indexnow.mjs            # pousse tout le sitemap
 *   node scripts/indexnow.mjs <url> ...  # pousse seulement les URLs donnees
 */

const HOST = 'www.mondevisminute.com';
const SITEMAP = `https://${HOST}/sitemap.xml`;
const KEY = 'c464f38b9ae4ca5a4cc7ca2aad5556c0';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const CHUNK = 10000; // limite IndexNow par requete

// Les URLs d'un sitemap sont echappees en XML : sans decodage, une URL a
// parametres serait soumise avec un "&amp;" litteral et donc rejetee.
function decodeXml(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

async function urlsFromSitemap() {
  const res = await fetch(SITEMAP);
  if (!res.ok) throw new Error(`sitemap ${SITEMAP} -> HTTP ${res.status}`);
  const xml = await res.text();

  // Un <sitemapindex> contient des <loc> qui pointent vers d'autres sitemaps,
  // pas vers des pages : les soumettre tels quels polluerait l'index de Bing.
  if (/<sitemapindex/i.test(xml)) {
    throw new Error(
      `${SITEMAP} est un index de sitemaps, pas une liste de pages.\n` +
        `Adapte le script pour parcourir chaque sous-sitemap avant de soumettre.`
    );
  }

  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decodeXml(m[1].trim()));
}

/** IndexNow rejette TOUT le lot (422) si une seule URL n'est pas sur le host. */
function surLeHost(u) {
  try {
    return new URL(u).host === HOST;
  } catch {
    return false;
  }
}

// Sans le fichier de cle en ligne, IndexNow repond 403 : autant le dire tout de suite.
async function assertKeyIsLive() {
  const res = await fetch(KEY_LOCATION);
  const body = res.ok ? (await res.text()).trim() : '';
  if (!res.ok || body !== KEY) {
    throw new Error(
      `Le fichier de cle n'est pas en ligne (HTTP ${res.status}, contenu "${body.slice(0, 40)}").\n` +
        `Attendu : ${KEY_LOCATION} doit renvoyer exactement ${KEY}.\n` +
        `Deploie d'abord public/${KEY}.txt, puis relance.`
    );
  }
}

// On distingue « aucun argument » (= pousser tout le sitemap) de « des arguments
// tous invalides » : sans ca, une faute de frappe ou un chemin relatif ferait
// silencieusement resoumettre les 72 URLs au lieu de celle demandee.
const args = process.argv.slice(2);
const argUrls = args.filter(surLeHost);
if (args.length && !argUrls.length) {
  throw new Error(`Aucun argument valide. Attendu des URLs absolues sur ${HOST}.\nRecu : ${args.join(' ')}`);
}
const ignorees = args.filter((a) => !surLeHost(a));
if (ignorees.length) console.log(`Ignore ${ignorees.length} argument(s) hors de ${HOST} : ${ignorees.join(', ')}`);

await assertKeyIsLive();

// Le filtre s'applique AUSSI aux URLs du sitemap : c'est le chemin par defaut,
// et une seule URL etrangere qui s'y glisserait ferait sauter la soumission.
const urls = (argUrls.length ? argUrls : await urlsFromSitemap()).filter(surLeHost);
if (!urls.length) throw new Error(`Aucune URL valide a soumettre pour ${HOST}.`);
console.log(`${urls.length} URL(s) a soumettre pour ${HOST}`);

let accepted = 0;
let echecs = 0;
for (let i = 0; i < urls.length; i += CHUNK) {
  const batch = urls.slice(i, i + CHUNK);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: batch }),
  });

  // 200 = soumis et cle validee. 202 = pris en compte, validation de cle encore
  // en attente (a ne pas confondre avec un succes complet). 403 = cle refusee.
  const lot = `Lot ${Math.floor(i / CHUNK) + 1} (${batch.length} URLs)`;
  if (res.ok) {
    accepted += batch.length;
    const nuance = res.status === 202 ? ' — validation de cle en attente' : ' — cle validee';
    console.log(`${lot} : HTTP ${res.status} ${res.statusText}${nuance}`);
  } else {
    echecs += batch.length;
    console.log(`${lot} : HTTP ${res.status} ${res.statusText}`);
    const body = await res.text().catch(() => '');
    if (body) console.log(`  Reponse : ${body.slice(0, 300)}`);
  }
}

console.log(`Termine. Accepte : ${accepted} / ${urls.length}`);
// Sortir en erreur des qu'UN lot echoue, sinon un echec partiel passe
// inapercu en CI (l'ancienne condition ne testait que le cas « tout a rate »).
if (echecs > 0) process.exit(1);
