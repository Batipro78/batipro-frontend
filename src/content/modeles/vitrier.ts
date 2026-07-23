import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'vitrier',
  labelLower: 'vitrier',
  deMetier: 'de vitrier',

  titreDevis: 'Modèle de devis vitrerie',
  metaTitleDevis: 'Modèle de devis vitrier gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis vitrier gratuit au format Word : lignes d'exemple chiffrées (double vitrage, miroir, parcloses), mentions obligatoires. Prêt à remplir.",
  h1Devis: 'Modèle de devis vitrerie gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir pour les vitriers : tableau de chiffrage avec des lignes types (remplacement de vitrage, miroir sur mesure, parcloses), mentions obligatoires en place, totaux HT/TVA/TTC. Téléchargez et adaptez.",
  introDevis: [
    "La vitrerie partage avec la serrurerie le monde du dépannage urgent — une vitre cassée n'attend pas — et ses règles strictes : devis détaillé remis avant l'intervention chez le particulier, sans seuil de montant, informations tarifaires communiquées à l'avance. Le vitrier qui arrive avec un devis carré, mode de calcul au mètre carré transparent, rassure immédiatement un client souvent en situation de stress (effraction, casse, courant d'air).",
    "Ce modèle chiffre les prestations courantes — remplacement de double vitrage sur menuiserie existante, vitrage simple, miroir sur mesure, réfection de parcloses — avec unité, quantité et prix. Le déplacement est une ligne visible. Remplacez les exemples par votre intervention ; les mentions qui doivent figurer sur tout devis sont déjà en place.",
  ],
  specTitreDevis: 'Ce qu’un devis de vitrerie doit détailler',
  specDevis: [
    "Désignez le vitrage par sa composition exacte : simple 4 mm, double 4/16/4, feuilleté 33.2, phonique ou contrôle solaire. La composition fait le prix au mètre carré et les performances — le client doit lire ce qu'il achète, surtout si son assurance rembourse le sinistre : l'assureur remplacera « à l'identique », la facture doit donc prouver ce qui était posé. Précisez aussi le mode de pose : sous parcloses (à réutiliser ou à remplacer) ou sous mastic, dépose comprise.",
    "Pour une casse suite à effraction ou accident, pensez au réflexe assurance du client : votre devis détaillé sert de pièce pour sa déclaration de sinistre — dimensions, composition, prix. Un vitrage sur mesure se commande : indiquez le délai d'approvisionnement et, si nécessaire, la mise en sécurité provisoire (panneau, film) sur sa propre ligne. C'est un vrai service, il se chiffre.",
  ],

  titreFacture: 'Modèle de facture vitrerie',
  metaTitleFacture: 'Modèle de facture vitrier gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture vitrier au format Word : mentions obligatoires, numérotation, TVA, conditions de règlement. Gratuit, prêt à personnaliser.",
  h1Facture: 'Modèle de facture vitrerie gratuit (Word)',
  excerptFacture:
    "Une facture de vitrier conforme, prête à remplir : numérotation continue, détail de l'intervention, TVA, conditions de règlement. Téléchargez le modèle Word et adaptez-le.",
  introFacture: [
    "La facture de vitrerie finit souvent chez un assureur : après une casse ou une effraction, le client la transmet pour remboursement. Elle doit donc décrire précisément le vitrage posé — composition, dimensions — et correspondre au devis accepté. Une facture vague retarde l'indemnisation du client, et c'est vous qu'il rappellera pour la refaire.",
    "Ce modèle intègre les mentions attendues : numéro unique en séquence continue, dates d'émission et de fin de prestation, détail HT ligne par ligne, TVA, conditions de règlement, pénalités de retard et indemnité de 40 € pour les clients professionnels — les vitriers travaillent souvent pour des commerces et des syndics, où ces mentions sont obligatoires.",
  ],

  lignes: lignes.vitrier.lignes,

  faqDevis: [
    {
      q: 'Un devis est-il obligatoire pour remplacer une vitre cassée ?',
      a: "Oui, chez un particulier : la miroiterie et la vitrerie font partie des prestations de dépannage couvertes par l'obligation de devis détaillé préalable, sans seuil de montant. Le client signe avant l'intervention — même en urgence, la mise en sécurité provisoire mise à part.",
    },
    {
      q: 'Comment chiffrer un vitrage : à la pièce ou au mètre carré ?',
      a: "Les deux se pratiquent ; l'important est la transparence du calcul. Au mètre carré, indiquez la surface facturée et le prix unitaire par composition de vitrage ; à la pièce, les dimensions. Le devis doit permettre au client — et à son assureur — de refaire le calcul.",
    },
    {
      q: 'Le client attend un remboursement de son assurance : qu’est-ce que ça change ?',
      a: "Rien à vos obligations, mais beaucoup à la précision utile : composition exacte du vitrage, dimensions, dépose et mise en sécurité détaillées. Votre devis servira de pièce à sa déclaration de sinistre — un document précis accélère son indemnisation et votre paiement.",
    },
  ],
  faqFacture: [
    {
      q: 'Que doit contenir ma facture pour l’assurance du client ?',
      a: "La composition et les dimensions du vitrage remplacé, la prestation de pose, l'éventuelle mise en sécurité provisoire, et les dates. L'assureur rembourse « à l'identique » : votre facture est la preuve de ce qui était posé et de ce qui a été refait.",
    },
    {
      q: 'Puis-je facturer la mise en sécurité provisoire séparément ?',
      a: "Oui, si elle figurait au devis : c'est une prestation à part entière (déplacement, panneau ou film, dépose ultérieure). Si le vitrage définitif est posé plus tard, deux interventions peuvent donner deux factures — chacune rattachée au même devis accepté.",
    },
    {
      q: 'Quand émettre la facture ?',
      a: "Dès la fin de la pose du vitrage définitif. Si une mise en sécurité provisoire a précédé, elle peut être facturée immédiatement après sa réalisation. Dans les deux cas : facturer vite, avec les libellés du devis.",
    },
  ],
  guides: [
    'devis-depannage-urgence-regles',
    'mentions-obligatoires-devis-batiment',
    'mentions-obligatoires-facture-artisan',
    'taux-tva-travaux-renovation',
  ],
};
