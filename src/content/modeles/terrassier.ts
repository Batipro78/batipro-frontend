import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'terrassier',
  labelLower: 'terrassier',
  deMetier: 'de terrassier',

  titreDevis: 'Modèle de devis terrassement',
  metaTitleDevis: 'Modèle de devis terrassement gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis terrassier gratuit au format Word : lignes d'exemple chiffrées (terrassement, tranchées, évacuation), mentions obligatoires. Prêt à remplir.",
  h1Devis: 'Modèle de devis terrassement gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir pour les terrassiers : tableau de chiffrage avec des lignes types (terrassement, évacuation, tranchées, compactage), mentions obligatoires en place, totaux HT/TVA/TTC. Téléchargez et adaptez à votre chantier.",
  introDevis: [
    "Le terrassement est le métier où l'inconnu est littéralement sous les pieds : nature du sol, rocher affleurant, venue d'eau, réseau non signalé. Un devis de terrassier qui ne cadre pas ces aléas par écrit expose aux pires discussions de chantier — celles où la mini-pelle est à l'arrêt pendant qu'on négocie. Le devis qui protège annonce les hypothèses (terrain meuble, absence de rocher) et le sort des découvertes.",
    "Ce modèle chiffre les postes courants — terrassement en pleine masse, évacuation des terres, tranchées pour réseaux, fond de forme compacté, amenée et repli de l'engin — avec unité, quantité et prix. Remplacez les exemples par votre chantier ; les mentions qui doivent figurer sur tout devis de travaux sont déjà en place.",
  ],
  specTitreDevis: 'Ce qu’un devis de terrassement doit détailler',
  specDevis: [
    "Chiffrez au volume ou au linéaire avec vos hypothèses écrites : « terrassement en pleine masse, terrain meuble, hors rocher et hors venue d'eau — X €/m³ ». Si le sol révèle du rocher ou une nappe, le devis complémentaire se négocie sur une base claire au lieu d'un rapport de force. Précisez la destination des terres : réutilisation sur site, régalage ou évacuation en décharge — le poste évacuation est lourd et doit être visible, avec son volume estimé.",
    "Deux réflexes propres au métier. Les réseaux : rappelez sur le devis que les travaux sont conditionnés aux déclarations préalables sur les réseaux enterrés (DT-DICT) et que tout réseau non signalé découvert arrête le chantier — c'est une protection pour tout le monde. L'accès : l'amenée d'un engin suppose un accès praticable ; si le portail fait 90 cm, mieux vaut l'avoir écrit avant. Notez enfin que le terrassement lié à une construction neuve relève de la TVA à 20 % — d'où les exemples du modèle.",
  ],

  titreFacture: 'Modèle de facture terrassement',
  metaTitleFacture: 'Modèle de facture terrassier gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture terrassier au format Word : mentions obligatoires, numérotation, TVA, conditions de règlement. Gratuit, prêt à personnaliser.",
  h1Facture: 'Modèle de facture terrassement gratuit (Word)',
  excerptFacture:
    "Une facture de terrassier conforme, prête à remplir : numérotation continue, détail des postes, TVA, conditions de règlement. Téléchargez le modèle Word et adaptez-le.",
  introFacture: [
    "En terrassement, la facture solde souvent des quantités réelles différentes des quantités estimées : le devis annonçait 45 m³, le chantier en a sorti 52. La facturation ne pose aucun problème si le devis avait prévu le prix unitaire et le principe du métré contradictoire — les quantités constatées ensemble, puis facturées au prix convenu. C'est cette mécanique que le modèle met en avant.",
    "Les mentions attendues sont en place : numéro unique en séquence continue, dates, détail HT par poste avec quantités réelles, TVA, conditions de règlement, pénalités de retard et indemnité de 40 € pour les clients professionnels — fréquents dans ce métier, entre constructeurs et entreprises générales.",
  ],

  lignes: lignes.terrassier.lignes,

  faqDevis: [
    {
      q: 'Quel taux de TVA sur un devis de terrassement ?',
      a: "20 % dans la plupart des cas : le terrassement est le plus souvent lié à une construction neuve ou à un aménagement. Des travaux indissociables d'une rénovation d'un logement de plus de 2 ans peuvent relever de 10 %. Les exemples du modèle sont à 20 % — vérifiez votre cas avec notre guide TVA.",
    },
    {
      q: 'Comment gérer le risque « rocher » ou « venue d’eau » dans le devis ?',
      a: "Par des hypothèses écrites : le prix vaut pour un terrain meuble, hors rocher et hors nappe. En cas de découverte, arrêt et devis complémentaire sur une base convenue d'avance (prix du m³ rocheux, pompage). L'aléa annoncé se négocie sereinement ; l'aléa passé sous silence se dispute.",
    },
    {
      q: 'Qui fait les démarches DT-DICT avant de creuser ?',
      a: "La déclaration de travaux à proximité des réseaux incombe à l'exécutant des travaux — vous — et la déclaration de projet au maître d'ouvrage. Rappelez sur le devis que le démarrage est conditionné aux réponses des exploitants de réseaux : c'est une contrainte réglementaire, pas une lenteur de votre fait.",
    },
  ],
  faqFacture: [
    {
      q: 'Les quantités réelles dépassent le devis : comment facturer ?',
      a: "Au prix unitaire convenu, sur la base de quantités constatées contradictoirement (bons de décharge pour l'évacuation, métré signé). Si le devis avait prévu « facturation au réel au prix unitaire indiqué », le dépassement raisonnable se facture sans avenant ; un changement de nature du travail (rocher) exige lui un devis complémentaire.",
    },
    {
      q: 'Comment justifier le poste évacuation sur la facture ?',
      a: "Par les bons de décharge ou tickets de pesée joints à la facture : volume ou tonnage, dates, site agréé. C'est la pièce qui rend le poste incontestable — et que demandera un client professionnel.",
    },
    {
      q: 'Quels délais de paiement avec un constructeur ou une entreprise générale ?',
      a: "Les délais entre professionnels sont plafonnés par la loi ; vos factures doivent porter le taux des pénalités de retard et l'indemnité de 40 €, qui courent sans rappel préalable. Notre guide « se faire payer » détaille les recours si le compte n'y est pas.",
    },
  ],
  guides: [
    'mentions-obligatoires-devis-batiment',
    'taux-tva-travaux-renovation',
    'chiffrer-un-devis-btp',
    'se-faire-payer-artisan-impayes',
  ],
};
