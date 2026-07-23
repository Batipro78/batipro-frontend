import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'serrurier',
  labelLower: 'serrurier',
  deMetier: 'de serrurier',

  titreDevis: 'Modèle de devis serrurerie',
  metaTitleDevis: 'Modèle de devis serrurier gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis serrurier gratuit au format Word : lignes d'exemple chiffrées (ouverture de porte, cylindre, blindage), mentions obligatoires. Prêt à remplir.",
  h1Devis: 'Modèle de devis serrurier gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir pour les serruriers : tableau de chiffrage avec des lignes types (ouverture de porte, cylindre, serrure 3 points, blindage), mentions obligatoires en place, totaux HT/TVA/TTC. Téléchargez et adaptez.",
  introDevis: [
    "La serrurerie de dépannage est le métier le plus surveillé du bâtiment — et celui où un devis irréprochable est votre meilleur argument commercial. Les abus de quelques-uns ont rendu les clients méfiants : celui qui vous appelle porte claquée à la main a lu partout qu'il fallait exiger un devis écrit avant toute intervention. Le professionnel qui le dégaine spontanément, propre et détaillé, gagne la confiance en trente secondes — et se distingue immédiatement de la concurrence douteuse.",
    "Ce modèle joue ce rôle : des lignes claires — ouverture de porte sans destruction, remplacement de cylindre, serrure 3 points, blindage — avec unité, quantité et prix. Le déplacement est une ligne visible, pas un supplément découvert. Remplacez les exemples par votre intervention ; les mentions qui doivent figurer sur tout devis sont déjà en place.",
  ],
  specTitreDevis: 'Ce qu’un devis de serrurerie doit détailler',
  specDevis: [
    "En dépannage chez un particulier, le devis préalable est une obligation réglementaire sans seuil de montant, et vos informations tarifaires — taux horaire TTC, frais de déplacement, caractère gratuit ou payant du devis — doivent être communiquées avant l'intervention. Précisez le mode opératoire prévu : « ouverture fine sans destruction » et « perçage du cylindre avec remplacement » sont deux prestations différentes, à deux prix différents, et le client doit savoir laquelle il achète.",
    "Pour l'installation, désignez le matériel par son niveau de sûreté : cylindre débrayable avec carte de propriété, serrure certifiée A2P et son nombre d'étoiles, blindage avec cornières anti-pinces. Ces références objectives justifient vos prix mieux que n'importe quel argumentaire — et elles permettent au client de valoriser l'installation auprès de son assureur habitation, qui exige parfois un niveau A2P minimal.",
  ],

  titreFacture: 'Modèle de facture serrurerie',
  metaTitleFacture: 'Modèle de facture serrurier gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture serrurier au format Word : mentions obligatoires, numérotation, TVA, conditions de règlement. Gratuit, prêt à personnaliser.",
  h1Facture: 'Modèle de facture serrurerie gratuit (Word)',
  excerptFacture:
    "Une facture de serrurier conforme, prête à remplir : numérotation continue, détail de l'intervention, TVA, conditions de règlement. Téléchargez le modèle Word et adaptez-le.",
  introFacture: [
    "En serrurerie, la facture suit l'intervention de quelques minutes : le client est là, la porte est ouverte ou la serrure posée, on facture sur place. La facture doit correspondre exactement au devis accepté avant l'intervention — même prestation, même prix. Un écart entre les deux documents est précisément ce que la DGCCRF traque dans ce secteur, et ce que le client photographiera.",
    "Ce modèle reprend la structure du devis avec les mentions attendues : numéro unique en séquence continue, dates, détail HT, TVA, conditions de règlement. La facture détaillée sert aussi le client : après un cambriolage, son assureur la lui demandera pour rembourser le remplacement de la serrure.",
  ],

  lignes: lignes.serrurier.lignes,

  faqDevis: [
    {
      q: 'Un devis est-il obligatoire pour une ouverture de porte ?',
      a: "Oui : les prestations de dépannage en serrurerie sont couvertes par l'obligation de devis détaillé préalable chez le particulier, sans seuil de montant. Même dans l'urgence, le client signe le devis avant l'intervention. C'est aussi votre protection : le prix accepté avant ne se conteste pas après.",
    },
    {
      q: 'Que faire si un client compare mon prix aux « 39 € » vus sur internet ?',
      a: "Votre devis détaillé est la réponse : il montre ce que couvre réellement le prix (déplacement, ouverture, éventuel remplacement de cylindre). Les prix d'appel cachent presque toujours des suppléments décidés sur place — exactement ce que votre devis écrit, remis avant intervention, rend impossible chez vous.",
    },
    {
      q: 'Dois-je indiquer la majoration de nuit ou de week-end ?',
      a: "Oui, dans vos informations tarifaires préalables et sur le devis : taux horaire et frais de déplacement applicables au moment de l'intervention, clairement affichés. Une majoration annoncée est légitime ; une majoration découverte sur la facture est un litige assuré.",
    },
  ],
  faqFacture: [
    {
      q: 'Le client peut-il se rétracter après un dépannage à domicile ?',
      a: "Pour les travaux d'entretien ou de réparation réalisés en urgence à sa demande expresse, le droit de rétractation ne s'applique pas — dans la limite du strictement nécessaire. En revanche, tout travail supplémentaire proposé dans la foulée (blindage, serrure neuve hors urgence) reste soumis aux règles du démarchage à domicile. Notre guide dépannage détaille la frontière.",
    },
    {
      q: 'La facture doit-elle détailler le matériel posé ?',
      a: "Oui : marque, modèle ou niveau de certification (A2P) du cylindre ou de la serrure. Le client en a besoin pour son assureur habitation, et vous, pour prouver la qualité du matériel au prix facturé.",
    },
    {
      q: 'Comment être payé sur place après un dépannage ?',
      a: "Les conditions de règlement figurent sur le devis accepté : paiement à la fin de l'intervention. Remettez la facture immédiatement, encaissez par carte ou chèque, et pour les rares mauvais payeurs, la mise en demeure s'appuiera sur devis signé + facture — un dossier complet.",
    },
  ],
  guides: [
    'devis-depannage-urgence-regles',
    'mentions-obligatoires-devis-batiment',
    'mentions-obligatoires-facture-artisan',
    'se-faire-payer-artisan-impayes',
  ],
};
