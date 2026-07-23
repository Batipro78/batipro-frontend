import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'peintre',
  labelLower: 'peintre',
  deMetier: 'de peintre',

  titreDevis: 'Modèle de devis peinture',
  metaTitleDevis: 'Modèle de devis peinture gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis peintre gratuit au format Word : lignes d'exemple chiffrées (préparation, murs, plafonds), mentions obligatoires, TVA. Prêt à remplir.",
  h1Devis: 'Modèle de devis peinture gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir pour les peintres : tableau de chiffrage avec des lignes types (préparation des supports, impression, finitions), mentions obligatoires en place, totaux HT/TVA/TTC. Téléchargez et adaptez à votre chantier.",
  introDevis: [
    "En peinture, tout se joue sur la préparation — et c'est précisément ce que les devis vagues passent sous silence. Deux devis « peinture du séjour » peuvent aller du simple au double selon qu'ils comprennent ou non le rebouchage, le ponçage, la sous-couche et deux couches de finition. Si votre devis ne détaille pas ces étapes, le client comparera votre prix à celui d'un concurrent qui en fait moins, et c'est vous qui paraîtrez cher.",
    "Ce modèle sépare les étapes en lignes distinctes — préparation des supports, impression, finition murs, plafonds, boiseries, protection du chantier — chacune avec unité, quantité et prix. Remplacez les exemples par votre chantier ; les mentions qui doivent figurer sur tout devis de travaux sont déjà en place.",
  ],
  specTitreDevis: 'Ce qu’un devis de peinture doit détailler',
  specDevis: [
    "Décrivez l'état de finition visé et le système complet : nombre de couches, type de peinture (acrylique, glycéro, velours, mat), traitement des fissures. « 2 couches velours après impression des fonds » n'a pas le même prix que « 1 couche de rafraîchissement » — et le client doit pouvoir le lire. Mentionnez aussi la protection du chantier (bâches, adhésifs, remise en place) : c'est un vrai travail, il mérite sa ligne.",
    "Attention au piège classique du métier : l'état réel des supports. Un mur qui révèle des fissures structurelles ou un ancien papier peint récalcitrant change l'économie du chantier. Protégez-vous par une réserve écrite (« sous réserve de l'état des supports après lessivage/décollage ») et, si un travail supplémentaire apparaît, faites-le valider par un devis complémentaire signé avant de continuer. Ce réflexe évite la plupart des contestations de fin de chantier.",
  ],

  titreFacture: 'Modèle de facture peinture',
  metaTitleFacture: 'Modèle de facture peintre gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture peintre au format Word : mentions obligatoires, numérotation, TVA, conditions de règlement. Gratuit, prêt à personnaliser.",
  h1Facture: 'Modèle de facture peinture gratuit (Word)',
  excerptFacture:
    "Une facture de peintre conforme, prête à remplir : numérotation continue, détail des prestations, TVA par taux, conditions de règlement. Téléchargez le modèle Word et adaptez-le.",
  introFacture: [
    "La réception d'un chantier de peinture est visuelle et immédiate : le client voit le résultat, c'est le moment de facturer. Une facture émise à la réception, reprenant ligne à ligne le devis accepté — préparation, impression, finitions — se règle sans discussion. Attendre, c'est laisser au client le temps de trouver le petit défaut qui justifiera de « voir plus tard ».",
    "Ce modèle intègre les mentions attendues : numéro unique en séquence continue, dates d'émission et de fin de prestation, détail HT ligne par ligne, TVA par taux, conditions de règlement, pénalités de retard et indemnité de 40 € pour les clients professionnels. Il ne reste qu'à remplir.",
  ],

  lignes: lignes.peintre.lignes,

  faqDevis: [
    {
      q: 'Quel taux de TVA sur un devis de peinture ?',
      a: "10 % pour la peinture d'un logement achevé depuis plus de 2 ans, 20 % dans le neuf ou les locaux professionnels. Les lignes du modèle sont à 10 % à titre d'exemple — vérifiez le taux applicable à votre chantier, notre guide TVA détaille les cas.",
    },
    {
      q: 'Comment chiffrer la préparation des supports ?',
      a: "Sur des lignes séparées de la finition : rebouchage/ponçage, lessivage, impression. C'est la partie invisible du métier, celle que les devis concurrents omettent pour paraître moins chers. La détailler justifie votre prix et fixe noir sur blanc ce qui est compris.",
    },
    {
      q: 'Que faire si je découvre des supports en mauvais état en cours de chantier ?',
      a: "Arrêtez-vous et faites signer un devis complémentaire avant de traiter le supplément. Une réserve écrite au devis initial (« sous réserve de l'état des supports ») prépare cette discussion. Faire le travail d'abord et le facturer ensuite est le plus court chemin vers l'impayé.",
    },
  ],
  faqFacture: [
    {
      q: 'Le client retient un défaut de finition pour ne pas payer : que faire ?',
      a: "Un défaut ponctuel justifie une retenue proportionnée, pas un refus de payer l'ensemble. Proposez par écrit une reprise datée, facturez, et rappelez les conditions de règlement du devis accepté. Notre guide « se faire payer » détaille l'escalade : relance, mise en demeure, injonction de payer.",
    },
    {
      q: 'Quand émettre la facture pour un chantier de peinture ?',
      a: "À la fin de la prestation — idéalement le jour de la réception, quand le client constate le résultat. La facture doit reprendre les libellés du devis accepté pour être immédiatement reconnaissable.",
    },
    {
      q: 'Dois-je mentionner mon assurance sur la facture ?',
      a: "Oui : depuis le 1er juillet 2023, les entreprises artisanales indiquent sur chaque devis et chaque facture leur assurance professionnelle, les coordonnées de l'assureur et la couverture géographique du contrat. Une ligne suffit, le modèle la prévoit.",
    },
  ],
  guides: [
    'mentions-obligatoires-devis-batiment',
    'taux-tva-travaux-renovation',
    'se-faire-payer-artisan-impayes',
    'devis-qui-fait-signer',
  ],
};
