import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GuideShell from '@/components/guides/GuideShell';
import { allModeleSlugs, getModelePage, modeles } from '@/content/modeles';
import { docxFileName, formatEuros, totalHT } from '@/lib/modeles';
import { getGuide } from '@/content/guides';
import { METIER_LABEL, METIER_ICON, metierBadgeClass } from '@/lib/metiers';

const BASE = 'https://www.mondevisminute.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return allModeleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getModelePage(slug);
  if (!page) return {};
  const { type, modele } = page;

  const url = `${BASE}/modeles/${slug}`;
  const title = type === 'devis' ? modele.metaTitleDevis : modele.metaTitleFacture;
  const description =
    type === 'devis' ? modele.metaDescriptionDevis : modele.metaDescriptionFacture;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      locale: 'fr_FR',
      siteName: 'MonDevisMinute',
      title,
      description,
    },
    twitter: { card: 'summary', title, description },
  };
}

export default async function ModelePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getModelePage(slug);
  if (!page) notFound();

  const { type, modele } = page;
  const url = `${BASE}/modeles/${slug}`;
  const estDevis = type === 'devis';
  const IconeMetier = METIER_ICON[modele.metier];

  const titre = estDevis ? modele.titreDevis : modele.titreFacture;
  const h1 = estDevis ? modele.h1Devis : modele.h1Facture;
  const excerpt = estDevis ? modele.excerptDevis : modele.excerptFacture;
  const intro = estDevis ? modele.introDevis : modele.introFacture;
  const faq = estDevis ? modele.faqDevis : modele.faqFacture;
  const fichier = `/modeles/${docxFileName(type, modele)}`;
  const autreSlug = `${estDevis ? 'facture' : 'devis'}-${modele.metier}`;
  const autreTitre = estDevis ? modele.titreFacture : modele.titreDevis;
  const guidesLies = modele.guides
    .map((s) => getGuide(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: h1,
        description: estDevis ? modele.metaDescriptionDevis : modele.metaDescriptionFacture,
        inLanguage: 'fr-FR',
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: { '@type': 'Organization', name: 'MonDevisMinute', url: BASE },
        publisher: { '@type': 'Organization', name: 'MonDevisMinute', url: BASE },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Modèles', item: `${BASE}/modeles` },
          { '@type': 'ListItem', position: 3, name: titre, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <GuideShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="transition hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <Link href="/modeles" className="transition hover:text-foreground">
            Modèles
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{titre}</span>
        </nav>

        {/* Bandeau coloré : dégradé violet→bleu + icône du métier en tuile pleine */}
        <header className="mt-8 rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-sky-50 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 text-white shadow-md">
              <IconeMetier className="h-6 w-6" />
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${metierBadgeClass(modele.metier)}`}
            >
              {METIER_LABEL[modele.metier]}
            </span>
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              100 % gratuit
            </span>
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {h1}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{excerpt}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={fichier}
              download
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700"
            >
              Télécharger le modèle Word (gratuit)
            </a>
            <span className="text-sm text-muted-foreground">
              Format .docx — s&apos;ouvre avec Word, LibreOffice ou Google&nbsp;Docs
            </span>
          </div>
        </header>

        <article className="mt-12">
          {intro.map((p) => (
            <p key={p.slice(0, 40)} className="mt-5 leading-8 text-muted-foreground">
              {p}
            </p>
          ))}

          <h2 className="mt-12 border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            Un exemple de chiffrage inclus dans le modèle
          </h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            Le tableau du modèle contient ces lignes d&apos;exemple — des prestations types du
            métier, avec unité, quantité et prix unitaire HT. Les prix sont indicatifs :
            remplacez-les par les vôtres.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-violet-200">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-violet-200 bg-gradient-to-r from-violet-600 to-indigo-600 text-left">
                  <th className="px-4 py-3 font-semibold text-white">Désignation</th>
                  <th className="px-4 py-3 font-semibold text-white">Unité</th>
                  <th className="px-4 py-3 text-right font-semibold text-white">Qté</th>
                  <th className="px-4 py-3 text-right font-semibold text-white">PU HT</th>
                  <th className="px-4 py-3 text-right font-semibold text-white">Total HT</th>
                </tr>
              </thead>
              <tbody>
                {modele.lignes.map((l) => (
                  <tr key={l.designation} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 text-muted-foreground">{l.designation}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.unite}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {l.quantite.toLocaleString('fr-FR')}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {formatEuros(l.prixUnitaire)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">
                      {formatEuros(l.quantite * l.prixUnitaire)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-violet-50">
                  <td colSpan={4} className="px-4 py-3 text-right font-semibold text-violet-900">
                    Total HT de l&apos;exemple
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-violet-900">
                    {formatEuros(totalHT(modele.lignes))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Taux de TVA indicatifs dans le modèle ({modele.lignes[0].tva}&nbsp;% sur ces
            exemples) : le taux dépend de la nature des travaux et du logement.{' '}
            <Link
              href="/guides/taux-tva-travaux-renovation"
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              Vérifiez le taux applicable à votre chantier
            </Link>
            .
          </p>

          {estDevis && (
            <>
              <h2 className="mt-12 border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
                {modele.specTitreDevis}
              </h2>
              {modele.specDevis.map((p) => (
                <p key={p.slice(0, 40)} className="mt-5 leading-8 text-muted-foreground">
                  {p}
                </p>
              ))}
            </>
          )}

          <h2 className="mt-12 border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            Les mentions déjà en place dans le modèle
          </h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            {estDevis
              ? "Le modèle prévoit les blocs qui doivent figurer sur un devis de travaux : identité complète de l'entreprise (SIRET, forme juridique), identité du client et adresse du chantier, date et durée de validité, décompte détaillé ligne par ligne, totaux HT / TVA / TTC, conditions de règlement, mention d'assurance professionnelle avec les coordonnées de l'assureur et la couverture géographique, et le bloc d'acceptation « bon pour accord » à faire signer."
              : "Le modèle prévoit les blocs qui doivent figurer sur une facture : numéro unique en séquence continue, date d'émission et date de fin de prestation, identité complète des deux parties, détail HT ligne par ligne, TVA par taux, conditions de règlement avec pénalités de retard, indemnité forfaitaire de 40 € pour les clients professionnels, mention d'escompte, et la mention d'assurance professionnelle obligatoire pour les entreprises artisanales."}{' '}
            Chaque mention est expliquée dans notre guide{' '}
            <Link
              href={
                estDevis
                  ? '/guides/mentions-obligatoires-devis-batiment'
                  : '/guides/mentions-obligatoires-facture-artisan'
              }
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              {estDevis
                ? 'mentions obligatoires du devis bâtiment'
                : 'mentions obligatoires de la facture'}
            </Link>
            .
          </p>
          <p className="mt-4 leading-8 text-muted-foreground">
            Pensez à adapter le modèle à votre situation : mention « TVA non applicable,
            article 293 B du CGI » si vous êtes en franchise de TVA, régime particulier du
            devis signé au domicile du client, règles propres au dépannage. Nos guides couvrent
            ces cas un par un.
          </p>

          <div className="mt-12 rounded-2xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-700 p-6 text-white shadow-xl shadow-violet-200 sm:p-8">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Le même document, rempli en 30 secondes à la voix
            </h2>
            <p className="mt-3 leading-7 text-violet-100">
              Un modèle Word, c&apos;est bien pour démarrer. Mais chaque document reste à
              remplir à la main : lignes, prix, TVA, totaux, numérotation. MonDevisMinute
              génère le même document en le dictant depuis le chantier — mentions légales à
              jour, TVA calculée, devis transformé en facture en un clic. Essai gratuit 14
              jours, sans carte bancaire.
            </p>
            <Link
              href="/signup"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 font-semibold text-violet-700 shadow-md transition hover:bg-violet-50"
            >
              Essayer gratuitement
            </Link>
          </div>
        </article>

        <section className="mt-16">
          <h2 className="border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            Questions fréquentes
          </h2>
          <dl className="mt-6 space-y-6">
            {faq.map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-border border-l-4 border-l-sky-400 bg-sky-50/40 p-5"
              >
                <dt className="font-display font-bold text-sky-950">{item.q}</dt>
                <dd className="mt-2 leading-8 text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16">
          <h2 className="border-l-4 border-violet-500 pl-4 font-display text-2xl font-bold tracking-tight text-foreground">
            À voir aussi
          </h2>
          <ul className="mt-6 space-y-3">
            <li>
              <Link
                href={`/modeles/${autreSlug}`}
                className="group flex flex-col rounded-xl border border-border p-4 transition hover:border-violet-300 hover:shadow-sm"
              >
                <span className="font-display font-bold text-foreground transition group-hover:text-violet-700">
                  {autreTitre}
                </span>
                <span className="mt-1 text-sm leading-7 text-muted-foreground">
                  {estDevis
                    ? 'Le modèle de facture assorti, pour la suite du chantier.'
                    : 'Le modèle de devis assorti, pour chiffrer avant le chantier.'}
                </span>
              </Link>
            </li>
            {guidesLies.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="group flex flex-col rounded-xl border border-border p-4 transition hover:border-violet-300 hover:shadow-sm"
                >
                  <span className="font-display font-bold text-foreground transition group-hover:text-violet-700">
                    {g.title}
                  </span>
                  <span className="mt-1 text-sm leading-7 text-muted-foreground">{g.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-lg font-bold tracking-tight text-foreground">
            {estDevis ? 'Modèles de devis des autres métiers' : 'Modèles de facture des autres métiers'}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {modeles
              .filter((m) => m.metier !== modele.metier)
              .map((m) => (
                <Link
                  key={m.metier}
                  href={`/modeles/${type}-${m.metier}`}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition hover:shadow-sm ${metierBadgeClass(m.metier)}`}
                >
                  {METIER_LABEL[m.metier]}
                </Link>
              ))}
          </div>
        </section>

        <p className="mt-16 rounded-xl border border-border bg-muted/30 p-5 text-sm leading-7 text-muted-foreground">
          Ce modèle et cette page ont une vocation d&apos;information générale et ne
          constituent pas un conseil juridique ou fiscal personnalisé. Les prix indiqués sont
          des exemples à adapter à votre marché. Pour un cas précis, rapprochez-vous de votre
          comptable ou de votre organisation professionnelle.
        </p>
      </main>
    </GuideShell>
  );
}
