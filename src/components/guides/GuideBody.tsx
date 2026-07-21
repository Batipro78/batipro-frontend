import Link from 'next/link';
import { slugifyHeading, type GuideBlock } from '@/lib/guides';

/**
 * Rend un texte de guide en interprétant la syntaxe de lien `[libellé](/chemin)`.
 *
 * C'est volontairement le seul balisage autorisé dans le contenu : il sert au
 * maillage interne, qui compte pour le référencement, sans ouvrir la porte à du
 * HTML arbitraire dans les fichiers de contenu.
 */
function renderText(text: string): React.ReactNode {
  const pattern = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    nodes.push(
      <Link
        key={`${match.index}-${match[2]}`}
        href={match[2]}
        className="font-medium text-violet-700 underline underline-offset-2 transition hover:text-violet-900"
      >
        {match[1]}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex === 0) return text;
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/**
 * Rendu des blocs d'un guide. Composant serveur : aucun état, aucun effet.
 * Les H2 portent une ancre dérivée de leur texte, utilisée par le sommaire.
 */
export default function GuideBody({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="mt-10 space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={i}
                id={slugifyHeading(block.text)}
                className="scroll-mt-24 pt-6 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                {block.text}
              </h2>
            );

          case 'h3':
            return (
              <h3 key={i} className="pt-2 font-display text-lg font-bold text-foreground sm:text-xl">
                {block.text}
              </h3>
            );

          case 'p':
            return (
              <p key={i} className="text-[1.0625rem] leading-8 text-muted-foreground">
                {renderText(block.text)}
              </p>
            );

          case 'list':
            return (
              <ul key={i} className="space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[1.0625rem] leading-8 text-muted-foreground">
                    <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                    <span>{renderText(item)}</span>
                  </li>
                ))}
              </ul>
            );

          case 'steps':
            return (
              <ol key={i} className="space-y-4">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-4 text-[1.0625rem] leading-8 text-muted-foreground">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-200">
                      {j + 1}
                    </span>
                    <span>{renderText(item)}</span>
                  </li>
                ))}
              </ol>
            );

          case 'note':
            return (
              <aside
                key={i}
                className="rounded-xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/30"
              >
                <p className="font-display text-sm font-bold text-violet-900 dark:text-violet-200">
                  {block.title}
                </p>
                <p className="mt-2 text-[1.0625rem] leading-8 text-violet-950/80 dark:text-violet-100/80">
                  {renderText(block.text)}
                </p>
              </aside>
            );

          case 'table':
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      {block.head.map((cell, j) => (
                        <th key={j} className="px-4 py-3 font-display font-bold text-foreground">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-t border-border align-top">
                        {row.map((cell, k) => (
                          <td key={k} className="px-4 py-3 leading-7 text-muted-foreground">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
