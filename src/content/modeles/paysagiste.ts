import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'paysagiste',
  labelLower: 'paysagiste',
  deMetier: 'de paysagiste',

  titreDevis: 'Modèle de devis paysagiste',
  metaTitleDevis: 'Modèle de devis paysagiste gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis paysagiste gratuit au format Word : lignes d'exemple chiffrées (engazonnement, clôture, terrasse, plantations), mentions obligatoires. Prêt à remplir.",
  h1Devis: 'Modèle de devis paysagiste gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir pour les paysagistes : tableau de chiffrage avec des lignes types (engazonnement, clôture, terrasse bois, plantations), mentions obligatoires en place, totaux HT/TVA/TTC. Téléchargez et adaptez à votre chantier.",
  introDevis: [
    "Un jardin se vend sur un rêve et se réalise sur un chantier : le devis de paysagiste est le document qui fait le pont entre les deux. Le client imagine la pelouse finie ; vous savez qu'il y a d'abord la préparation du sol, l'amendement, le semis, le roulage — et que le résultat dépend aussi de l'arrosage qu'il fera ou non. Un devis précis décrit les étapes ET les conditions de réussite : c'est lui qui transformera un « ce n'est pas ce que j'imaginais » en simple relecture du document signé.",
    "Ce modèle chiffre les prestations courantes — engazonnement avec préparation du sol, clôture rigide, terrasse bois, plantation de haie, paillage — avec unité, quantité et prix. Remplacez les exemples par votre projet ; les mentions qui doivent figurer sur tout devis de travaux sont déjà en place.",
  ],
  specTitreDevis: 'Ce qu’un devis de paysagiste doit détailler',
  specDevis: [
    "Décrivez les végétaux comme un menuisier décrit ses fenêtres : espèce, force ou taille à la plantation (une charmille en 60/80 et une en 150/175 n'ont ni le même prix ni le même effet immédiat), densité au mètre linéaire, amendement compris ou non. Pour les ouvrages — terrasse, clôture —, précisez matériaux, sections, hauteurs et mode de fixation. Et distinguez création et entretien : ce sont deux prestations, souvent deux régimes de TVA différents.",
    "Le vivant impose une clause propre au métier : la reprise des végétaux. Dites par écrit ce que vous garantissez (remplacement des sujets morts à la reprise, sous condition d'arrosage par le client, hors sécheresse exceptionnelle) — c'est LA source de litige du métier, et une clause claire au devis la désamorce presque entièrement. Indiquez aussi la saison de plantation si elle conditionne le calendrier : planter une haie racines nues en juillet n'est un service pour personne.",
  ],

  titreFacture: 'Modèle de facture paysagiste',
  metaTitleFacture: 'Modèle de facture paysagiste gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture paysagiste au format Word : mentions obligatoires, numérotation, TVA, conditions de règlement. Gratuit, prêt à personnaliser.",
  h1Facture: 'Modèle de facture paysagiste gratuit (Word)',
  excerptFacture:
    "Une facture de paysagiste conforme, prête à remplir : numérotation continue, détail des prestations, TVA, conditions de règlement. Téléchargez le modèle Word et adaptez-le.",
  introFacture: [
    "La facture de paysagiste reprend le devis accepté poste par poste : préparation, fournitures végétales, ouvrages, finitions. Si vous facturez aussi de l'entretien récurrent, gardez des factures distinctes de la création — les régimes (TVA, éventuels avantages fiscaux du client pour l'entretien de jardin via un organisme de services à la personne) ne se mélangent pas.",
    "Ce modèle intègre les mentions attendues : numéro unique en séquence continue, dates d'émission et de fin de prestation, détail HT ligne par ligne, TVA, conditions de règlement, pénalités de retard et indemnité de 40 € pour les clients professionnels — utiles pour les marchés avec syndics, entreprises et collectivités.",
  ],

  lignes: lignes.paysagiste.lignes,

  faqDevis: [
    {
      q: 'Quel taux de TVA sur un devis de paysagiste ?',
      a: "Les travaux de création et d'aménagement paysager relèvent en principe de la TVA à 20 % — les exemples du modèle sont à ce taux. Certains cas particuliers existent selon la nature des travaux et leur lien avec un logement : vérifiez votre situation avec notre guide TVA ou votre comptable avant d'envoyer le devis.",
    },
    {
      q: 'Comment rédiger la garantie de reprise des végétaux ?',
      a: "Par une clause explicite : ce qui est garanti (remplacement des sujets non repris), la durée, et les conditions (arrosage assuré par le client, hors épisodes climatiques exceptionnels). Une garantie conditionnée et écrite protège les deux parties ; une garantie implicite promet tout et n'importe quoi.",
    },
    {
      q: 'Dois-je détailler la préparation du sol ?',
      a: "Oui : c'est le travail invisible qui fait la réussite (décompactage, amendement, nivellement). La détailler justifie l'écart avec un devis « semis seul » — et fixe ce qui a été fait le jour où une pelouse clairsemée cherche son responsable.",
    },
  ],
  faqFacture: [
    {
      q: 'Création et entretien : une seule facture ou deux ?',
      a: "Deux, dès que possible. La création est un chantier ponctuel ; l'entretien récurrent obéit à d'autres règles (dont l'éventuel crédit d'impôt du client si vous intervenez via le cadre des services à la personne). Des factures distinctes gardent les régimes lisibles.",
    },
    {
      q: 'Quand facturer un chantier de création de jardin ?',
      a: "À la fin du chantier de plantation — pas à la reprise des végétaux, qui peut prendre des mois. La garantie de reprise prévue au devis s'exerce ensuite comme un service après-vente : elle ne suspend pas le paiement du chantier réalisé.",
    },
    {
      q: 'Un acompte est-il d’usage pour un aménagement paysager ?',
      a: "Oui, pour financer les fournitures végétales et matériaux, s'il est prévu au devis. Attention au devis signé chez le client (régime « hors établissement ») : aucun paiement ne peut être reçu avant un délai de 7 jours après la conclusion du contrat — notre guide sur le devis signé détaille ce point.",
    },
  ],
  guides: [
    'mentions-obligatoires-devis-batiment',
    'taux-tva-travaux-renovation',
    'devis-signe-valeur-juridique',
    'chiffrer-un-devis-btp',
  ],
};
