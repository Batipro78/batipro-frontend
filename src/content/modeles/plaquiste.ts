import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'plaquiste',
  labelLower: 'plaquiste',
  deMetier: 'de plaquiste',

  titreDevis: 'Modèle de devis plaquiste',
  metaTitleDevis: 'Modèle de devis plaquiste gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis plaquiste gratuit au format Word : lignes d'exemple chiffrées (cloisons, doublage, plafonds), mentions obligatoires, TVA. Prêt à remplir.",
  h1Devis: 'Modèle de devis plaquiste gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir pour les plaquistes : tableau de chiffrage avec des lignes types (cloisons, doublage, plafonds, joints), mentions obligatoires en place, totaux HT/TVA/TTC. Téléchargez et adaptez à votre chantier.",
  introDevis: [
    "Le métier de plaquiste se chiffre au mètre carré, mais tous les mètres carrés ne se valent pas : une cloison de distribution simple peau, un doublage thermique 13+80 et un plafond acoustique sur suspentes n'ont ni le même prix ni les mêmes performances. Un devis qui aligne « placo : 180 m² » sans préciser les ouvrages installe le malentendu — et vous expose à devoir justifier après coup ce que le document aurait dû dire avant.",
    "Ce modèle détaille les ouvrages courants — cloison sur ossature avec isolant, doublage collé, plafond suspendu, traitement des joints — chacun sur sa ligne avec unité, quantité et prix. Remplacez les exemples par votre chantier ; les mentions qui doivent figurer sur tout devis de travaux sont déjà en place.",
  ],
  specTitreDevis: 'Ce qu’un devis de plaquiste doit détailler',
  specDevis: [
    "Nommez les ouvrages par leur composition : type de plaque (BA13 standard, hydrofuge en pièce d'eau, phonique), ossature (48, 72), isolant et son épaisseur (GR32 de 80, laine de 45). C'est ce qui distingue votre devis d'une simple surface au prix du marché, et ce qui prouvera, en cas de litige, la prestation exactement convenue. Précisez aussi le niveau de finition des joints livré (prêt à peindre ou non) : c'est la frontière classique des différends avec le peintre qui suit.",
    "Indiquez enfin ce que votre prix ne comprend pas : reprise des embrasures, encoffrements supplémentaires, échafaudage éventuel en grande hauteur. Un travail apparu en cours de chantier — un encoffrement de canalisations décidé sur place — doit faire l'objet d'un accord écrit avant exécution : devis complémentaire signé, puis facturation. C'est la règle qui évite l'essentiel des impayés.",
  ],

  titreFacture: 'Modèle de facture plaquiste',
  metaTitleFacture: 'Modèle de facture plaquiste gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture plaquiste au format Word : mentions obligatoires, numérotation, TVA, conditions de règlement. Gratuit, prêt à personnaliser.",
  h1Facture: 'Modèle de facture plaquiste gratuit (Word)',
  excerptFacture:
    "Une facture de plaquiste conforme, prête à remplir : numérotation continue, détail des ouvrages, TVA par taux, conditions de règlement. Téléchargez le modèle Word et adaptez-le.",
  introFacture: [
    "Le plaquiste travaille souvent en sous-traitance ou en co-activité avec d'autres corps d'état : la facture doit alors être irréprochable, car elle circule — vers le donneur d'ordre, vers le maître d'ouvrage, parfois vers un expert. Reprenez exactement les libellés et quantités du devis accepté, et facturez dès la fin de votre lot : plus la facture colle au travail qui vient d'être réceptionné, plus elle se règle vite.",
    "Ce modèle intègre les mentions attendues : numéro unique en séquence continue, dates, détail HT par ouvrage, TVA par taux, conditions de règlement, pénalités de retard et indemnité de 40 € pour les clients professionnels. En sous-traitance pour un professionnel assujetti, pensez au cas de l'autoliquidation de la TVA — voyez notre guide sous-traitance pour la mention exacte.",
  ],

  lignes: lignes.plaquiste.lignes,

  faqDevis: [
    {
      q: 'Quel taux de TVA sur un devis de plaquiste ?',
      a: "10 % pour la rénovation d'un logement achevé depuis plus de 2 ans, 20 % dans le neuf ou les locaux professionnels ; l'isolation thermique peut relever de 5,5 %. Les lignes du modèle sont à 10 % à titre d'exemple — vérifiez le taux applicable à votre chantier avec notre guide TVA.",
    },
    {
      q: 'Comment décrire une cloison dans un devis ?',
      a: "Par sa composition complète : « cloison 72/48, BA13 chaque face, laine GR32 45 mm, hauteur 2,50 m » plutôt que « cloison placo ». La composition fait le prix ET la performance ; c'est aussi elle qui prouve la prestation convenue si le client conteste.",
    },
    {
      q: 'Le « prêt à peindre » doit-il figurer sur le devis ?',
      a: "Oui, écrivez le niveau de finition livré (bandes + 3 passes, prêt à peindre, ou finition supérieure). C'est la source classique de litige à la frontière entre plaquiste et peintre : ce que le devis dit clairement n'a pas à se discuter à la réception.",
    },
  ],
  faqFacture: [
    {
      q: 'Je sous-traite pour une entreprise : qui facture la TVA ?',
      a: "En sous-traitance dans le bâtiment pour un donneur d'ordre assujetti, c'est en principe le régime de l'autoliquidation : vous facturez hors taxe avec la mention « Autoliquidation », et le donneur d'ordre déclare la TVA. Notre guide sous-traitance BTP détaille les conditions et la mention exacte.",
    },
    {
      q: 'Quand émettre ma facture en co-activité avec d’autres lots ?',
      a: "Dès la fin de votre lot, sans attendre la fin du chantier global. Votre prestation est achevée et vérifiable : c'est le bon moment. Attendre la réception générale expose votre facture aux aléas des autres corps d'état.",
    },
    {
      q: 'Que faire si le donneur d’ordre ne paie pas ?',
      a: "Relance écrite, puis mise en demeure : les pénalités de retard mentionnées sur la facture courent sans rappel préalable pour un client professionnel. En sous-traitance, des protections spécifiques existent — notre guide « se faire payer » décrit la marche à suivre étape par étape.",
    },
  ],
  guides: [
    'mentions-obligatoires-devis-batiment',
    'taux-tva-travaux-renovation',
    'sous-traitance-btp',
    'se-faire-payer-artisan-impayes',
  ],
};
