import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'menuisier',
  labelLower: 'menuisier',
  deMetier: 'de menuisier',

  titreDevis: 'Modèle de devis menuiserie',
  metaTitleDevis: 'Modèle de devis menuiserie gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis menuisier gratuit au format Word : lignes d'exemple chiffrées (fenêtres, portes, parquet), mentions obligatoires, TVA. Prêt à remplir.",
  h1Devis: 'Modèle de devis menuiserie gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir pour les menuisiers : tableau de chiffrage avec des lignes types (fenêtres, porte d'entrée, blocs-portes, parquet), mentions obligatoires en place, totaux HT/TVA/TTC. Téléchargez et adaptez à votre chantier.",
  introDevis: [
    "En menuiserie, la fourniture pèse souvent plus lourd que la pose : le devis doit donc décrire précisément CE qui est fourni. « Fenêtre PVC : 780 € » ne dit ni le vitrage, ni les dimensions, ni le mode de pose (rénovation sur dormant existant ou dépose totale), ni la couleur. Or chacun de ces choix change le prix — et le client s'en souviendra à la livraison. Le devis de menuisier qui protège est une fiche technique autant qu'un prix.",
    "Ce modèle est structuré ainsi : chaque menuiserie sur sa ligne avec ses caractéristiques, la pose distinguée de la fourniture quand c'est utile, et des exemples courants — fenêtres double vitrage en rénovation, porte d'entrée, blocs-portes intérieurs, parquet flottant. Remplacez-les par votre chantier ; les mentions légales de tout devis de travaux sont déjà en place.",
  ],
  specTitreDevis: 'Ce qu’un devis de menuiserie doit détailler',
  specDevis: [
    "Pour chaque menuiserie extérieure, notez les dimensions (ou « prises de cotes à la commande »), le matériau et la gamme, le vitrage (4/16/4, phonique, contrôle solaire), le sens d'ouverture et le mode de pose : en rénovation sur dormant conservé ou en dépose totale — l'écart de prix et de travail est important, le client doit le comprendre. Pour le parquet, précisez l'essence, l'épaisseur de la couche d'usure, le type de pose et la sous-couche.",
    "Deux précisions qui évitent des litiges : le délai d'approvisionnement (une menuiserie sur mesure se commande, indiquez le délai entre la signature et la pose) et le sort des menuiseries déposées (évacuation comprise ou non). Si vos fenêtres ouvrent droit à une aide à la rénovation énergétique, le devis devra comporter les caractéristiques techniques exigées par l'organisme — notre guide MaPrimeRénov'/CEE détaille ces exigences.",
  ],

  titreFacture: 'Modèle de facture menuiserie',
  metaTitleFacture: 'Modèle de facture menuisier gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture menuisier au format Word : mentions obligatoires, numérotation, TVA, conditions de règlement. Gratuit, prêt à personnaliser.",
  h1Facture: 'Modèle de facture menuiserie gratuit (Word)',
  excerptFacture:
    "Une facture de menuisier conforme, prête à remplir : numérotation continue, détail fourniture et pose, TVA par taux, conditions de règlement. Téléchargez le modèle Word et adaptez-le.",
  introFacture: [
    "En menuiserie, l'acompte à la commande est la règle du métier — le sur-mesure se fabrique, il faut bien financer l'approvisionnement. La conséquence côté facturation : une facture d'acompte au versement, puis la facture de solde à la pose, qui rappelle l'acompte déjà réglé et le net restant à payer. Ce modèle prévoit ces champs.",
    "Les mentions attendues sont en place : numéro unique en séquence continue, dates, détail HT ligne par ligne, TVA par taux, conditions de règlement, pénalités de retard et indemnité de 40 € pour les clients professionnels. Si le chantier ouvre droit à une aide, conservez précieusement le dossier : la facture devra porter les mêmes caractéristiques techniques que le devis.",
  ],

  lignes: lignes.menuisier.lignes,

  faqDevis: [
    {
      q: 'Quel taux de TVA sur un devis de menuiserie ?',
      a: "10 % pour le remplacement de menuiseries dans un logement achevé depuis plus de 2 ans, 20 % dans le neuf ; certaines menuiseries performantes liées à la rénovation énergétique peuvent relever de 5,5 %. Les lignes du modèle sont à 10 % à titre d'exemple — vérifiez le taux applicable, notre guide TVA détaille les cas.",
    },
    {
      q: 'Pose en rénovation ou dépose totale : pourquoi le préciser ?',
      a: "Parce que ce n'est ni le même travail ni le même résultat : la pose en rénovation conserve le dormant existant (plus rapide, clair de vitrage réduit), la dépose totale repart du tableau nu. L'écart de prix est significatif et le client doit choisir en connaissance de cause — sur le devis, pas à la pose.",
    },
    {
      q: 'Comment gérer le délai de fabrication sur le devis ?',
      a: "Indiquez deux délais distincts : le délai d'approvisionnement à compter de la signature (ou de la prise de cotes), et la durée de pose. « Pose sous 6 à 8 semaines après commande » cadre l'attente du client — et vous protège si le fournisseur allonge.",
    },
  ],
  faqFacture: [
    {
      q: 'Comment facturer l’acompte de commande ?',
      a: "Par une facture d'acompte émise au versement, portant la TVA correspondante. La facture de solde rappelle ensuite l'acompte déjà versé et le net à payer. Notre guide sur les factures d'acompte et de situation détaille le mécanisme, TVA comprise. Attention au devis signé chez le client : aucun paiement ne peut être reçu avant 7 jours dans ce régime.",
    },
    {
      q: 'Le client a signé pour une aide (MaPrimeRénov’, CEE) : quel impact sur la facture ?',
      a: "La facture doit reprendre les caractéristiques techniques exigées par le dispositif (performances des menuiseries, références) telles qu'annoncées au devis. Un dossier d'aide se joue sur la cohérence devis-facture : un libellé qui change entre les deux fait rejeter le dossier du client.",
    },
    {
      q: 'Que faire si le client refuse de payer le solde à la pose ?',
      a: "Rappelez par écrit le devis accepté et la facture, puis mise en demeure : les pénalités de retard prévues courent. Une réserve mineure à la réception justifie une reprise, pas un refus de payer l'ensemble. Notre guide « se faire payer » détaille l'escalade complète.",
    },
  ],
  guides: [
    'mentions-obligatoires-devis-batiment',
    'taux-tva-travaux-renovation',
    'devis-maprimerenov-cee',
    'facture-acompte-situation-travaux',
  ],
};
