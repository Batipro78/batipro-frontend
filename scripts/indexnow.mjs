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

// IndexNow rejette TOUT le lot (422) si une seule URL n'appartient pas au host
// declare : on ecarte les intruses au lieu de perdre la soumission entiere.
const argUrls = process.argv.slice(2).filter((a) => a.startsWith('http'));
const foreign = argUrls.filter((u) => {
  try {
    return new URL(u).host !== HOST;
  } catch {
    return true;
  }
});
if (foreign.length) {
  console.log(`Ignore ${foreign.length} URL(s) hors de ${HOST} : ${foreign.join(', ')}`);
}

await assertKeyIsLive();
const urls = argUrls.length ? argUrls.filter((u) => !foreign.includes(u)) : await urlsFromSitemap();
if (!urls.length) throw new Error(`Aucune URL valide a soumettre pour ${HOST}.`);
console.log(`${urls.length} URL(s) a soumettre pour ${HOST}`);

let accepted = 0;
for (let i = 0; i < urls.length; i += CHUNK) {
  const batch = urls.slice(i, i + CHUNK);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: batch }),
  });

  // IndexNow renvoie 200 ou 202 quand la soumission est acceptee.
  const ok = res.ok || res.status === 202;
  console.log(`Lot ${Math.floor(i / CHUNK) + 1} (${batch.length} URLs) : HTTP ${res.status} ${res.statusText}`);
  if (ok) {
    accepted += batch.length;
  } else {
    const body = await res.text().catch(() => '');
    if (body) console.log(`  Reponse : ${body.slice(0, 300)}`);
  }
}

console.log(`Termine. Accepte : ${accepted} / ${urls.length}`);
if (accepted === 0) process.exit(1);
