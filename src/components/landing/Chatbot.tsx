'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Sparkles, ArrowRight } from 'lucide-react';

type CTA = { label: string; href: string };
type Msg = { role: 'bot' | 'user'; text: string; cta?: CTA };

type KBEntry = {
  id: string;
  keywords: string[];
  answer: string;
  cta?: CTA;
};

const CTA_TRIAL: CTA = { label: "Démarrer l'essai gratuit 14 jours", href: '/signup' };
const CTA_VOICE: CTA = { label: 'Voir la démo vocale', href: '/#voix' };
const CTA_CONTACT: CTA = { label: 'Nous écrire', href: '/contact' };

const KB: KBEntry[] = [
  {
    id: 'prix',
    keywords: ['prix', 'tarif', 'tarifs', 'coute', 'coût', 'cout', 'combien', 'cher', 'mensuel', 'annuel', 'abonnement', 'mois', 'euro', '€', '29', '290'],
    answer:
      'MonDevisMinute coûte 29 € HT par mois, ou 290 € HT par an (soit 24,17 €/mois, 2 mois offerts). Toutes les fonctionnalités sont incluses, pas de plan caché.',
    cta: CTA_TRIAL,
  },
  {
    id: 'essai',
    keywords: ['gratuit', 'essai', 'tester', 'test', 'demo', 'démo', 'gratuite', 'free', 'trial', '14 jours', 'voir comment'],
    answer:
      '14 jours d\'essai gratuit, sans carte bancaire. Vous accédez à toutes les fonctionnalités. Annulable en 1 clic, sans engagement.',
    cta: CTA_TRIAL,
  },
  {
    id: 'paiement',
    keywords: ['carte', 'bancaire', 'cb', 'paiement', 'payer', 'prelevement', 'prélèvement', 'sepa', 'iban'],
    answer:
      'Aucune carte bancaire demandée pendant l\'essai de 14 jours. Vous renseignez votre mode de paiement uniquement si vous décidez de continuer après l\'essai. Paiement sécurisé via Stripe.',
    cta: CTA_TRIAL,
  },
  {
    id: 'resiliation',
    keywords: ['annul', 'résili', 'resili', 'arrêter', 'arreter', 'stopper', 'stop', 'engagement', 'preavis', 'préavis', 'desabonner', 'désabonner'],
    answer:
      'L\'annulation se fait en 1 clic depuis votre espace client. Aucun préavis, aucune relance, aucun justificatif demandé.',
    cta: CTA_TRIAL,
  },
  {
    id: 'rgpd',
    keywords: ['rgpd', 'donnees', 'donnée', 'données', 'confidentialite', 'confidentialité', 'securite', 'sécurité', 'stockage', 'serveur', 'heberge', 'hébergé', 'france', 'europe'],
    answer:
      'Toutes les données sont hébergées en France et en Europe, chiffrées au repos et en transit. Conformité RGPD complète. Vos données ne sont jamais partagées avec des tiers à des fins commerciales.',
  },
  {
    id: 'vocal',
    keywords: ['voix', 'vocal', 'vocale', 'dictee', 'dictée', 'parler', 'parle', 'micro', 'dicter', 'oral', 'parole', 'whisper'],
    answer:
      'La dictée vocale utilise OpenAI Whisper + GPT-4. Vous parlez naturellement, l\'IA reconnaît le vocabulaire métier et structure votre devis automatiquement (lignes, quantités, prix).',
    cta: CTA_VOICE,
  },
  {
    id: 'metiers',
    keywords: ['metier', 'métier', 'metiers', 'métiers', 'corps', 'specialite', 'spécialité', 'electricien', 'électricien', 'plombier', 'chauffagiste', 'macon', 'maçon', 'peintre', 'plaquiste', 'carreleur', 'couvreur', 'menuisier', 'charpentier', 'serrurier', 'vitrier', 'paysagiste'],
    answer:
      '14 métiers du BTP couverts : électricien, plombier-chauffagiste, maçon, peintre, plaquiste, carreleur, couvreur, menuisier, charpentier, solier, serrurier, vitrier, terrassier, paysagiste.',
    cta: CTA_TRIAL,
  },
  {
    id: 'catalogue',
    keywords: ['article', 'articles', 'bibliotheque', 'bibliothèque', 'catalogue', '524', 'produits', 'fournitures', 'materiel', 'matériel'],
    answer:
      '524 articles BTP pré-tarifés dans la bibliothèque, organisés par métier. Vous pouvez utiliser nos prix moyens du marché ou les remplacer par les vôtres. Ajout d\'articles personnalisés illimité.',
  },
  {
    id: 'signature',
    keywords: ['signature', 'signer', 'eidas', 'electronique', 'électronique', 'distance', 'tablette', 'docusign', 'yousign'],
    answer:
      'Signature électronique mobile avec valeur juridique eIDAS. Vos clients signent depuis leur téléphone, sur le chantier ou à distance. Horodatage certifié inclus.',
  },
  {
    id: 'compta',
    keywords: ['compta', 'comptable', 'export', 'csv', 'pdf', 'expert', 'comptabilite', 'comptabilité', 'ebp', 'sage', 'cegid', 'ciel', 'quadratus'],
    answer:
      'Exports PDF et CSV en 1 clic, sur la période de votre choix. Compatibles avec les principaux logiciels comptables (EBP, Sage, Cegid, Ciel). Vous transmettez à votre comptable comme vous le faites habituellement.',
  },
  {
    id: 'hors-ligne',
    keywords: ['hors-ligne', 'hors ligne', 'offline', 'connexion', 'internet', '4g', 'wifi', 'reseau', 'réseau', 'pas de reseau'],
    answer:
      'La dictée vocale nécessite une connexion (4G suffit). En cas de coupure ponctuelle, la synchronisation reprend automatiquement quand le réseau revient. Aucune perte de données.',
  },
  {
    id: 'clients',
    keywords: ['fiche', 'fiches client', 'historique client', 'crm', 'base clients'],
    answer:
      'Gestion des clients et chantiers illimitée. Fiches clients complètes avec historique des devis et factures. Pas de limite sur le nombre de clients.',
  },
  {
    id: 'support',
    keywords: ['support', 'aide', 'contact', 'contacter', 'email', 'mail', 'humain', 'parler a quelqu\'un', 'parler à quelqu\'un', 'conseiller'],
    answer:
      'Support par email sous 24h ouvrées. Pour toute question complexe, écrivez-nous à mondevisminute@zohomail.eu ou via notre page contact.',
    cta: CTA_CONTACT,
  },
  {
    id: 'mobile',
    keywords: ['mobile', 'telephone', 'téléphone', 'iphone', 'android', 'app', 'application', 'smartphone', 'samsung', 'ios'],
    answer:
      'MonDevisMinute fonctionne sur tous les navigateurs mobiles (Safari, Chrome). Optimisé pour iPhone et Android. Une application Android est en cours de validation sur le Play Store.',
  },
  {
    id: 'maj',
    keywords: ['mise a jour', 'mise à jour', 'update', 'nouveaute', 'nouveauté', 'evolution', 'évolution', 'nouvelle fonctionnalite'],
    answer:
      'Toutes les mises à jour sont incluses, à vie. Vous bénéficiez automatiquement des nouvelles fonctionnalités, sans surcoût.',
  },
  {
    id: 'equipe',
    keywords: ['equipe', 'équipe', 'collaborateur', 'collaborateurs', 'multi-utilisateur', 'multi utilisateur', 'partage', 'salarie', 'salarié', 'employe', 'employé', 'compagnon', 'apprenti', 'plusieurs personnes'],
    answer:
      'Le compte est mono-utilisateur dans la formule standard. Les comptes multi-utilisateurs pour équipes sont en préparation. Contactez-nous si vous avez besoin de plusieurs accès, on adapte une solution.',
    cta: CTA_CONTACT,
  },
  {
    id: 'os',
    keywords: ['mac', 'pc', 'windows', 'linux', 'compatibilite', 'compatibilité', 'systeme', 'système', 'navigateur', 'chrome', 'safari', 'firefox', 'edge'],
    answer:
      'MonDevisMinute marche sur n\'importe quel ordinateur (Mac, PC Windows, Linux) et n\'importe quel smartphone. Aucune installation nécessaire — tout passe par votre navigateur (Chrome, Safari, Firefox, Edge).',
  },
  {
    id: 'formation',
    keywords: ['formation', 'apprendre', 'tutoriel', 'tuto', 'prise en main', 'comment utiliser', 'difficile', 'facile', 'simple', 'debutant', 'débutant'],
    answer:
      'MonDevisMinute est conçu pour être pris en main en 5 minutes. Tutoriels vidéo dans la page d\'aide et démo guidée à la 1ère connexion. Aucune formation payante nécessaire.',
    cta: CTA_TRIAL,
  },
  {
    id: 'tva',
    keywords: ['tva', 'taux', 'auto-entrepreneur', 'auto entrepreneur', 'micro entreprise', 'micro-entreprise', 'franchise', 'reverse charge', 'autoliquidation'],
    answer:
      'TVA gérée automatiquement (20 %, 10 %, 5,5 %, 0 %). Compatible auto-entrepreneur (franchise en base de TVA). Mention légale TVA non applicable ajoutée auto sur vos devis et factures si concerné.',
  },
  {
    id: 'numerotation',
    keywords: ['numerotation', 'numérotation', 'numero', 'numéro', 'chrono', 'chronologie', 'sequence', 'séquence', 'compteur', 'continuité'],
    answer:
      'Numérotation chronologique automatique de vos devis et factures, conforme à la législation. Numéros uniques et non modifiables une fois émis (obligation légale).',
  },
  {
    id: 'import',
    keywords: ['import', 'importer', 'importation', 'excel', 'csv', 'migration', 'transferer', 'transférer', 'reprendre', 'mes anciens clients', 'mes anciens devis'],
    answer:
      'Import de vos clients via fichier Excel ou CSV (modèle fourni). Pour migrer depuis un autre logiciel (Tolteck, Vertuoza, EBP, etc.), on vous aide gratuitement à transférer vos données. Contactez-nous.',
    cta: CTA_CONTACT,
  },
  {
    id: 'logo',
    keywords: ['logo', 'personnalisation', 'personnaliser', 'charte', 'couleur', 'image', 'design', 'mes couleurs', 'mon logo', 'apparence'],
    answer:
      'Votre logo, vos coordonnées et votre mention légale apparaissent automatiquement sur tous vos devis et factures PDF. Personnalisation depuis votre profil en 2 minutes.',
  },
  {
    id: 'acompte',
    keywords: ['acompte', 'avance', 'arrhes', 'acomptes', 'demande d\'acompte'],
    answer:
      'Création de devis avec demande d\'acompte (30 %, 50 %, montant libre). Génération auto de la facture d\'acompte, puis de la facture de solde une fois le chantier terminé.',
  },
  {
    id: 'avoir',
    keywords: ['avoir', 'avoirs', 'annuler facture', 'rectifier facture', 'rectification', 'facture rectificative', 'erreur facture'],
    answer:
      'Génération de factures d\'avoir (rectification) en 1 clic à partir d\'une facture existante. Conforme aux obligations légales (référence à la facture d\'origine, motif obligatoire).',
  },
  {
    id: 'facture-electro',
    keywords: ['facturation electronique', 'facturation électronique', '2026', 'chorus', 'dematerialise', 'dématérialisé', 'pdp', 'ppf', 'reforme'],
    answer:
      'MonDevisMinute prépare votre passage à la facturation électronique 2026-2027 (réforme française). Vous serez prêt sans surcoût quand l\'obligation entrera en vigueur. Détails sur notre page dédiée.',
    cta: { label: 'En savoir plus', href: '/facture-electronique' },
  },
  {
    id: 'paiement-client',
    keywords: ['paiement client', 'encaisser', 'encaissement', 'lien paiement', 'stripe', 'payer en ligne', 'mes clients paient', 'cb client'],
    answer:
      'Le paiement client en ligne (lien Stripe sur facture) est en préparation. Pour l\'instant, vos clients paient par virement, chèque ou espèces. Mention IBAN automatique sur les factures.',
  },
  {
    id: 'securite',
    keywords: ['mot de passe', '2fa', 'double authentification', 'piratage', 'piraté', 'piratage', 'hacké', 'hacké'],
    answer:
      'Connexion sécurisée par mot de passe (8 caractères minimum). Chiffrement de tous les échanges. Double authentification (2FA) en préparation pour les comptes premium.',
  },
  {
    id: 'sauvegarde',
    keywords: ['sauvegarde', 'backup', 'recuperation', 'récupération', 'perte de donnees', 'perdu', 'restaurer', 'effacer par erreur'],
    answer:
      'Sauvegarde automatique quotidienne sur serveurs sécurisés. Si vous supprimez un devis ou une facture par erreur, on peut le restaurer dans les 30 jours suivants. Contactez-nous.',
    cta: CTA_CONTACT,
  },
  {
    id: 'limite',
    keywords: ['limite', 'quota', 'nombre maximum', 'illimite', 'illimité', 'maximum', 'plafond', 'cap'],
    answer:
      'Aucune limite : nombre illimité de devis, factures, clients, articles. Vous payez 29 €/mois quoi que vous fassiez, que vous fassiez 5 devis ou 5 000.',
  },
  {
    id: 'concurrents',
    keywords: ['concurrent', 'difference', 'différence', 'comparer', 'comparaison', 'tolteck', 'vertuoza', 'mediabat', 'codial', 'henrri', 'sage batigest', 'mieux que'],
    answer:
      'Notre différence principale : la dictée vocale par IA (unique en France) et le prix tout-inclus 29 €/mois sans engagement. La plupart des concurrents facturent par utilisateur ou demandent un engagement annuel.',
    cta: CTA_TRIAL,
  },
  {
    id: 'avis',
    keywords: ['avis', 'temoignage', 'témoignage', 'temoignages', 'témoignages', 'trustpilot', 'google avis', 'note', 'reputation', 'réputation'],
    answer:
      'MonDevisMinute est en lancement, les premiers retours utilisateurs sont disponibles sur la page d\'accueil (section témoignages). Plateforme d\'avis Trustpilot en cours d\'ouverture.',
  },
];

const SUGGESTIONS = [
  'Combien ça coûte ?',
  'Comment marche l\'essai gratuit ?',
  'Mes données sont sécurisées ?',
  'Je peux annuler quand ?',
];

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function findEntry(question: string): KBEntry | null {
  const q = normalize(question);
  if (!q) return null;
  let best: { score: number; entry: KBEntry } | null = null;
  for (const entry of KB) {
    let score = 0;
    for (const kw of entry.keywords) {
      const k = normalize(kw);
      if (!k) continue;
      if (q.includes(k)) {
        score += k.length;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, entry };
    }
  }
  return best ? best.entry : null;
}

type DataLayerWindow = Window & { dataLayer?: Array<Record<string, unknown>> };

function trackChat(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  try {
    const w = window as DataLayerWindow;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, ...params });
  } catch {
    /* silent — analytics never breaks UX */
  }
}

const FALLBACK_ANSWER =
  'Je ne suis pas sûr de pouvoir répondre à celle-là. Pour une réponse précise, écrivez-nous via la page contact — on répond sous 24h ouvrées.';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'bot',
      text:
        'Bonjour ! Je peux répondre aux questions courantes sur MonDevisMinute (tarif, essai, fonctionnalités, données, comparaison…). Choisissez une suggestion ou posez votre question.',
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  function toggleOpen() {
    setOpen((o) => {
      const next = !o;
      if (next) trackChat('chatbot_open');
      else trackChat('chatbot_close');
      return next;
    });
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: 'user', text: trimmed }]);
    setInput('');
    const entry = findEntry(trimmed);
    trackChat('chatbot_question', {
      question: trimmed.slice(0, 120),
      matched: !!entry,
      category: entry?.id ?? 'unmatched',
    });
    setTimeout(() => {
      if (entry) {
        setMessages((m) => [...m, { role: 'bot', text: entry.answer, cta: entry.cta }]);
      } else {
        setMessages((m) => [
          ...m,
          { role: 'bot', text: FALLBACK_ANSWER, cta: CTA_CONTACT },
        ]);
      }
    }, 350);
  }

  function onCtaClick(category: string, href: string) {
    trackChat('chatbot_cta_click', { category, href });
  }

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        className="fixed z-50 right-5 bottom-5 lg:bottom-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/40 flex items-center justify-center hover:scale-105 transition-transform"
        style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed z-50 right-4 bottom-24 lg:right-6 lg:bottom-24 w-[calc(100vw-2rem)] sm:w-96 max-w-[24rem] rounded-3xl bg-white border border-slate-200/60 shadow-2xl shadow-slate-900/10 flex flex-col overflow-hidden"
          style={{ maxHeight: 'min(70vh, 600px)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-primary to-secondary px-5 py-4 text-white">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-sm">Assistant MonDevisMinute</p>
                <p className="text-xs text-white/80">Réponses rapides aux questions courantes</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50/30">
            {messages.map((m, i) => (
              <div key={i} className="space-y-2">
                <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white border border-slate-200/60 text-slate-700 shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
                {m.role === 'bot' && m.cta ? (
                  <div className="flex justify-start">
                    <a
                      href={m.cta.href}
                      onClick={() => onCtaClick(`msg_${i}`, m.cta!.href)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium px-3.5 py-2 shadow-sm hover:opacity-90 transition"
                    >
                      {m.cta.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ) : null}
              </div>
            ))}

            {/* Suggestions (only when only the initial bot message is shown) */}
            {messages.length === 1 && (
              <div className="pt-2 space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Suggestions</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="text-xs rounded-full border border-primary/20 bg-accent text-primary px-3 py-1.5 hover:bg-accent/70 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-slate-200/60 p-3 flex items-center gap-2 bg-white"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tapez votre question…"
              className="flex-1 rounded-full bg-slate-100 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Envoyer"
              className="h-10 w-10 flex-shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
