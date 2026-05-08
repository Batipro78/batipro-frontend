'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

type Msg = { role: 'bot' | 'user'; text: string };

const KB: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['prix', 'tarif', 'coute', 'coût', 'cout', 'combien', 'cher', 'mensuel', 'annuel'],
    answer:
      'BatiPro coûte 29 € HT par mois, ou 290 € HT par an (soit 24,17 €/mois, 2 mois offerts). Toutes les fonctionnalités sont incluses, pas de plan caché.',
  },
  {
    keywords: ['gratuit', 'essai', 'tester', 'test', 'demo', 'démo'],
    answer:
      '14 jours d\'essai gratuit, sans carte bancaire. Vous accédez à toutes les fonctionnalités. Annulable en 1 clic, sans engagement.',
  },
  {
    keywords: ['carte', 'bancaire', 'cb', 'paiement', 'payer'],
    answer:
      'Aucune carte bancaire demandée pendant l\'essai de 14 jours. Vous renseignez votre mode de paiement uniquement si vous décidez de continuer après l\'essai.',
  },
  {
    keywords: ['annul', 'résili', 'resili', 'arrêter', 'arreter', 'stopper', 'stop'],
    answer:
      'L\'annulation se fait en 1 clic depuis votre espace client. Aucun préavis, aucune relance, aucun justificatif demandé.',
  },
  {
    keywords: ['rgpd', 'données', 'donnees', 'confidentialité', 'confidentialite', 'sécurité', 'securite', 'stockage', 'serveur', 'hébergé', 'heberge'],
    answer:
      'Toutes les données sont hébergées en France, chiffrées au repos et en transit. Conformité RGPD complète. Vos données ne sont jamais partagées avec des tiers à des fins commerciales.',
  },
  {
    keywords: ['voix', 'vocal', 'vocale', 'dictée', 'dictee', 'parler', 'parle', 'micro'],
    answer:
      'La dictée vocale utilise OpenAI Whisper + GPT-4. Vous parlez naturellement, l\'IA reconnaît le vocabulaire métier et structure votre devis automatiquement (lignes, quantités, prix).',
  },
  {
    keywords: ['métier', 'metier', 'corps', 'spécialité', 'specialite', 'electricien', 'plombier', 'macon', 'maçon', 'peintre'],
    answer:
      '14 métiers du BTP couverts : électricien, plombier-chauffagiste, maçon, peintre, plaquiste, carreleur, couvreur, menuisier, charpentier, solier, serrurier, vitrier, terrassier, paysagiste.',
  },
  {
    keywords: ['article', 'bibliothèque', 'bibliotheque', 'tarif', 'prix article', '524'],
    answer:
      '524 articles BTP pré-tarifés dans la bibliothèque, organisés par métier. Vous pouvez utiliser nos prix moyens du marché ou les remplacer par les vôtres.',
  },
  {
    keywords: ['signature', 'signer', 'eidas', 'electronique', 'électronique'],
    answer:
      'Signature électronique mobile avec valeur juridique eIDAS. Vos clients signent depuis leur téléphone, sur le chantier ou à distance. Horodatage certifié inclus.',
  },
  {
    keywords: ['compta', 'comptable', 'export', 'csv', 'pdf'],
    answer:
      'Exports PDF et CSV en 1 clic, sur la période de votre choix. Vous transmettez à votre comptable ou expert-comptable comme vous le faites habituellement.',
  },
  {
    keywords: ['hors-ligne', 'hors ligne', 'offline', 'connexion', 'internet', '4g', 'wifi'],
    answer:
      'La dictée vocale nécessite une connexion (4G suffit). En cas de coupure ponctuelle, la synchronisation reprend automatiquement quand le réseau revient. Aucune perte de données.',
  },
  {
    keywords: ['client', 'gestion', 'fiche'],
    answer:
      'Gestion des clients et chantiers illimitée. Fiches clients complètes avec historique des devis et factures. Pas de limite sur le nombre de clients.',
  },
  {
    keywords: ['support', 'aide', 'contact', 'email', 'mail'],
    answer:
      'Support par email sous 24h ouvrées. Pour toute question complexe que je ne peux pas traiter ici, écrivez-nous à contact@batipro.fr',
  },
  {
    keywords: ['mobile', 'téléphone', 'telephone', 'iphone', 'android', 'app'],
    answer:
      'BatiPro est accessible depuis votre navigateur mobile (Safari, Chrome). Optimisé pour iPhone et Android. Pas besoin d\'installer d\'application.',
  },
  {
    keywords: ['mise à jour', 'mise a jour', 'update', 'nouveauté', 'nouveaute'],
    answer:
      'Toutes les mises à jour sont incluses, à vie. Vous bénéficiez automatiquement des nouvelles fonctionnalités, sans surcoût.',
  },
];

const SUGGESTIONS = [
  'Combien ça coûte ?',
  'Comment marche l\'essai gratuit ?',
  'Mes données sont sécurisées ?',
  'Je peux annuler quand ?',
];

function findAnswer(question: string): string {
  const q = question.toLowerCase();
  let best: { score: number; answer: string } | null = null;
  for (const entry of KB) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw.toLowerCase())) score += kw.length;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: entry.answer };
    }
  }
  if (best) return best.answer;
  return 'Je ne suis sûr de pouvoir répondre à celle-là. Pour une réponse précise, écrivez-nous à contact@batipro.fr — on vous répond sous 24h ouvrées.';
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'bot',
      text: 'Bonjour ! Je peux répondre aux questions simples sur BatiPro (tarif, essai, données, annulation…). Choisissez une suggestion ou posez votre question.',
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: 'user', text: trimmed }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: findAnswer(trimmed) }]);
    }, 350);
  }

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        className="fixed z-50 right-5 bottom-5 lg:bottom-6 h-14 w-14 rounded-full bg-gradient-to-b from-violet-600 to-violet-700 text-white shadow-xl shadow-violet-500/40 flex items-center justify-center hover:scale-105 transition-transform"
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
          <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-4 text-white">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-sm">Assistant BatiPro</p>
                <p className="text-xs text-white/80">Réponses rapides aux questions courantes</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50/30">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-gradient-to-b from-violet-600 to-violet-700 text-white'
                      : 'bg-white border border-slate-200/60 text-slate-700 shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
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
                      className="text-xs rounded-full border border-violet-200 bg-violet-50 text-violet-700 px-3 py-1.5 hover:bg-violet-100 transition-colors"
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
              className="flex-1 rounded-full bg-slate-100 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Envoyer"
              className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-b from-violet-600 to-violet-700 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
