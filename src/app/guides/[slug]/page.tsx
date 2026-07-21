import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GuideShell from '@/components/guides/GuideShell';
import GuideBody from '@/components/guides/GuideBody';
import { guides, getGuide, getRelated } from '@/content/guides';
import { readingMinutes, tableOfContents } from '@/lib/guides';

const BASE = 'https://www.mondevisminute.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const url = `${BASE}/guides/${guide.slug}`;
  return {
    // `absolute` court-circuite le template `%s | MonDevisMinute` du layout,
    // qui ajoutait 17 caractères et poussait tous les titles au-delà de 60.
    title: { absolute: guide.metaTitle },
    description: guide.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      // Next remplace l'objet openGraph du layout : locale et siteName doivent
      // être redéclarés ici, sinon ils disparaissent de la page.
      locale: 'fr_FR',
      siteName: 'MonDevisMinute',
      title: guide.metaTitle,
      description: guide.metaDescription,
      publishedTime: guide.updated,
      modifiedTime: guide.updated,
    },
    twitter: {
      card: 'summary',
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const url = `${BASE}/guides/${guide.slug}`;
  const toc = tableOfContents(guide);
  const related = getRelated(guide);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: guide.h1,
        description: guide.metaDescription,
        inLanguage: 'fr-FR',
        datePublished: guide.updated,
        dateModified: guide.updated,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: { '@type': 'Organization', name: 'MonDevisMinute', url: BASE },
        publisher: { '@type': 'Organization', name: 'MonDevisMinute', url: BASE },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guides` },
          { '@type': 'ListItem', position: 3, name: guide.title, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: guide.faq.map((item) => ({
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
          <Link href="/guides" className="transition hover:text-foreground">
            Guides
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{guide.title}</span>
        </nav>

        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-violet-600">
          {guide.category}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          {guide.h1}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{guide.excerpt}</p>
        <p className="mt-5 text-sm text-muted-foreground">
          Mis à jour le {formatDate(guide.updated)} · {readingMinutes(guide)} min de lecture
        </p>

        {toc.length > 0 && (
          <nav
            aria-label="Sommaire"
            className="mt-10 rounded-xl border border-border bg-muted/30 p-5"
          >
            <p className="font-display text-sm font-bold text-foreground">Au sommaire</p>
            <ol className="mt-3 space-y-2 text-sm">
              {toc.map((item, i) => (
                <li key={item.id} className="flex gap-3">
                  <span className="text-muted-foreground/60">{i + 1}.</span>
                  <a
                    href={`#${item.id}`}
                    className="text-muted-foreground transition hover:text-violet-700"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <article>
          <GuideBody blocks={guide.blocks} />
        </article>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Questions fréquentes
          </h2>
          <dl className="mt-6 space-y-6">
            {guide.faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-border p-5">
                <dt className="font-display font-bold text-foreground">{item.q}</dt>
                <dd className="mt-2 leading-8 text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              À lire aussi
            </h2>
            <ul className="mt-6 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/guides/${item.slug}`}
                    className="group flex flex-col rounded-xl border border-border p-4 transition hover:border-violet-300 hover:shadow-sm"
                  >
                    <span className="font-display font-bold text-foreground transition group-hover:text-violet-700">
                      {item.title}
                    </span>
                    <span className="mt-1 text-sm leading-7 text-muted-foreground">
                      {item.excerpt}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-16 rounded-xl border border-border bg-muted/30 p-5 text-sm leading-7 text-muted-foreground">
          Ce guide a une vocation d&apos;information générale et ne constitue pas un conseil
          juridique ou fiscal personnalisé. Les règles évoluent et chaque situation comporte ses
          particularités : pour un cas précis, rapprochez-vous de votre comptable, de votre
          organisation professionnelle ou de l&apos;administration concernée.
        </p>
      </main>
    </GuideShell>
  );
}
