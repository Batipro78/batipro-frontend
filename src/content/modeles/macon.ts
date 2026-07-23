import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'macon',
  labelLower: 'maçon',
  deMetier: 'de maçon',

  titreDevis: 'Modèle de devis maçonnerie',
  metaTitleDevis: 'Modèle de devis maçonnerie gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis maçon gratuit au format Word : lignes d'exemple chiffrées (murs, dalle, ouverture), mentions obligatoires, TVA. À personnaliser en 2 minutes.",
  h1Devis: 'Modèle de devis maçonnerie gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir pour les maçons : tableau de chiffrage avec des lignes types (ouverture de mur porteur, dalle, élévation, enduit), mentions obligatoires en place, totaux HT/TVA/TTC. Téléchargez et adaptez à votre chantier.",
  introDevis: [
    "En maçonnerie, les montants sont élevés et les imprévus fréquents : c'est exactement le cocktail qui rend un devis vague dangereux. Un client qui a signé « travaux de maçonnerie : 12 000 € » se souviendra toujours d'avoir compris plus que ce que vous aviez prévu. Le devis de maçon qui protège est celui qui chiffre par ouvrage — tant de mètres carrés de mur, tant de mètres carrés de dalle à telle épaisseur, telle ouverture avec tel IPN — et qui isole ce qui dépend de l'inconnu.",
    "Ce modèle applique cette logique. Les lignes d'exemple couvrent des ouvrages courants — ouverture de mur porteur, élévation en parpaings, dalle béton armé, enduit de façade — avec unité, quantité et prix unitaire. Remplacez-les par votre chantier, ajustez vos prix : les mentions qui doivent figurer sur tout devis de travaux sont déjà en place.",
  ],
  specTitreDevis: 'Ce qu’un devis de maçonnerie doit détailler',
  specDevis: [
    "Décrivez les ouvrages avec leurs caractéristiques techniques : épaisseur de la dalle et présence d'un treillis, section des parpaings, nature de l'enduit et nombre de passes. Ce sont ces précisions qui permettent de comparer deux devis — et de justifier le vôtre. Pour une ouverture de mur porteur, indiquez ce que couvre le forfait et ce qu'il ne couvre pas : l'étude béton ou l'avis d'un bureau d'études structure est souvent à part, et le client doit le lire noir sur blanc avant de signer.",
    "Isolez aussi les postes à aléas : reprise en sous-œuvre, découverte d'un sol de mauvaise qualité, évacuation de gravats plus importante que prévu. Mieux vaut une ligne « sondage préalable » ou une réserve écrite qu'un avenant improvisé au milieu du chantier. Et rappelez-vous qu'un travail supplémentaire non prévu au devis doit faire l'objet d'un devis complémentaire signé AVANT d'être exécuté — faire d'abord et facturer ensuite est la première cause d'impayés du bâtiment.",
  ],

  titreFacture: 'Modèle de facture maçonnerie',
  metaTitleFacture: 'Modèle de facture maçon gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture maçon au format Word : mentions obligatoires, numérotation, TVA, situations de travaux. Gratuit, prêt à personnaliser.",
  h1Facture: 'Modèle de facture maçonnerie gratuit (Word)',
  excerptFacture:
    "Une facture de maçon conforme, prête à remplir : numérotation continue, détail des ouvrages, TVA par taux, conditions de règlement. Téléchargez le modèle Word et adaptez-le à votre entreprise.",
  introFacture: [
    "Sur des chantiers de maçonnerie qui durent plusieurs semaines, la facturation ne se résume pas à une facture finale : acomptes et situations de travaux rythment la trésorerie. Ce modèle couvre la facture classique de fin de chantier ; si vous facturez à l'avancement, chaque situation reprend la même structure avec le pourcentage d'avancement par poste, et le cumul déjà facturé.",
    "Les mentions attendues sont en place : numéro unique en séquence continue, dates d'émission et de fin de travaux, détail HT par ouvrage, TVA par taux, conditions de règlement, pénalités de retard et indemnité de 40 € pour les clients professionnels. Reprenez les libellés exacts de votre devis accepté : le client doit retrouver ce qu'il a signé.",
  ],

  lignes: lignes.macon.lignes,

  faqDevis: [
    {
      q: 'Quel taux de TVA sur un devis de maçonnerie ?',
      a: "10 % pour la rénovation d'un logement achevé depuis plus de 2 ans, 20 % pour le neuf, la surélévation qui crée de la surface, ou les locaux professionnels. Les lignes du modèle sont à 10 % à titre d'exemple : le taux dépend du chantier, vérifiez-le avant d'envoyer — notre guide TVA détaille les cas limites (agrandissement, surélévation).",
    },
    {
      q: 'Comment gérer les imprévus (sol, reprise en sous-œuvre) dans le devis ?',
      a: "En les isolant par écrit : soit une ligne conditionnelle chiffrée, soit une réserve explicite (« sous réserve de la qualité du sol au droit des fondations »). En cours de chantier, tout travail supplémentaire passe par un devis complémentaire signé avant exécution. Un aléa annoncé se négocie ; un aléa découvert se conteste.",
    },
    {
      q: "L'étude structure est-elle comprise dans un devis d'ouverture de mur porteur ?",
      a: "Elle ne l'est généralement pas, et c'est précisément pour ça qu'il faut l'écrire. Indiquez si le forfait comprend ou non l'étude béton / la note de calcul du bureau d'études, et qui la commande. Le modèle contient une ligne d'exemple avec la mention « étude béton non comprise » à adapter.",
    },
  ],
  faqFacture: [
    {
      q: 'Comment facturer un chantier de maçonnerie à l’avancement ?',
      a: "Par situations de travaux : à intervalle convenu, vous facturez le pourcentage d'avancement de chaque poste, en faisant apparaître le cumul déjà facturé et le reste à facturer. La facture finale solde le tout. L'échéancier doit avoir été prévu au devis pour être opposable.",
    },
    {
      q: 'Puis-je encaisser un acompte avant de commencer ?',
      a: "Un acompte prévu au devis est une pratique normale — mais attention au cas du devis signé chez le client : dans ce régime dit « hors établissement », la loi interdit de recevoir tout paiement avant un délai de 7 jours suivant la conclusion du contrat. Notre guide sur le devis signé détaille ce point important.",
    },
    {
      q: 'Quelles mentions pour un client professionnel (promoteur, entreprise) ?',
      a: "En plus des mentions communes : le taux des pénalités de retard et l'indemnité forfaitaire de 40 € pour frais de recouvrement sont obligatoires, et les conditions d'escompte doivent être précisées — même pour dire qu'aucun escompte n'est accordé. Le modèle les intègre.",
    },
  ],
  guides: [
    'mentions-obligatoires-devis-batiment',
    'taux-tva-travaux-renovation',
    'facture-acompte-situation-travaux',
    'devis-signe-valeur-juridique',
  ],
};
