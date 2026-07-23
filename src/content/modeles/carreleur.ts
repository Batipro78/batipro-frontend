import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'carreleur',
  labelLower: 'carreleur',
  deMetier: 'de carreleur',

  titreDevis: 'Modèle de devis carrelage',
  metaTitleDevis: 'Modèle de devis carrelage gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis carreleur gratuit au format Word : lignes d'exemple chiffrées (pose sol, faïence, ragréage), mentions obligatoires, TVA. Prêt à remplir.",
  h1Devis: 'Modèle de devis carrelage gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir pour les carreleurs : tableau de chiffrage avec des lignes types (pose sol, faïence murale, ragréage, plinthes), mentions obligatoires en place, totaux HT/TVA/TTC. Téléchargez et adaptez à votre chantier.",
  introDevis: [
    "En carrelage, le prix de pose dépend de tout ce que le client ne voit pas : format des carreaux, type de pose (droite, diagonale, décalée), état du support, ragréage nécessaire ou non. Un devis qui annonce « pose carrelage : 22 m² » sans ces précisions sera comparé à des devis qui ne recouvrent pas la même prestation — et la discussion de fin de chantier portera sur ce qui n'a jamais été écrit.",
    "Ce modèle décompose la prestation en lignes claires — préparation et ragréage, pose du sol, faïence murale, plinthes, joints — avec unité, quantité et prix unitaire. Remplacez les exemples par votre chantier ; les mentions qui doivent figurer sur tout devis de travaux sont déjà en place.",
  ],
  specTitreDevis: 'Ce qu’un devis de carrelage doit détailler',
  specDevis: [
    "Précisez le format des carreaux et le type de pose : un 60x60 en pose droite, un 120x60 en pose décalée ou une mosaïque n'exigent ni le même temps ni le même prix. Indiquez qui fournit le carrelage — vous ou le client — et, si c'est le client, écrivez la quantité à prévoir chutes comprises : la casse et les chutes mal anticipées sont une source classique de blocage de chantier. Mentionnez aussi le traitement des points singuliers : plinthes, seuils, joints silicone en périphérie des pièces d'eau.",
    "L'état du support mérite sa réserve écrite : un ancien carrelage à déposer, une chape fissurée ou un sol hors tolérance de planéité changent le chiffrage. Une ligne de ragréage conditionnelle ou la mention « sous réserve de l'état du support après dépose » cadre la discussion. Et si un travail supplémentaire apparaît en cours de pose, faites-le valider par un devis complémentaire signé avant de continuer — c'est ce qui sépare un avenant accepté d'une facture contestée.",
  ],

  titreFacture: 'Modèle de facture carrelage',
  metaTitleFacture: 'Modèle de facture carreleur gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture carreleur au format Word : mentions obligatoires, numérotation, TVA, conditions de règlement. Gratuit, prêt à personnaliser.",
  h1Facture: 'Modèle de facture carrelage gratuit (Word)',
  excerptFacture:
    "Une facture de carreleur conforme, prête à remplir : numérotation continue, détail des prestations, TVA par taux, conditions de règlement. Téléchargez le modèle Word et adaptez-le.",
  introFacture: [
    "Comme pour la peinture, la réception d'un chantier de carrelage est immédiate : les joints sont faits, le sol se voit. Facturez à ce moment-là, en reprenant ligne à ligne le devis accepté — préparation, pose, plinthes, joints. Si le client a fourni le carrelage, la facture ne porte que sur la pose et les consommables : la distinction doit être aussi nette sur la facture qu'elle l'était sur le devis.",
    "Ce modèle intègre les mentions attendues : numéro unique en séquence continue, dates d'émission et de fin de prestation, détail HT ligne par ligne, TVA par taux, conditions de règlement, pénalités de retard et indemnité de 40 € pour les clients professionnels.",
  ],

  lignes: lignes.carreleur.lignes,

  faqDevis: [
    {
      q: 'Quel taux de TVA sur un devis de carrelage ?',
      a: "10 % pour la pose dans un logement achevé depuis plus de 2 ans, 20 % dans le neuf ou les locaux professionnels. Les lignes du modèle sont à 10 % à titre d'exemple — vérifiez le taux applicable à votre chantier, notre guide TVA détaille les cas.",
    },
    {
      q: 'Le client fournit le carrelage : comment le noter sur le devis ?',
      a: "Écrivez « fourniture carrelage par le client » et indiquez la quantité à prévoir chutes comprises (généralement +10 % en pose droite, davantage en diagonale ou grands formats). Ainsi, une casse ou un manque de carreaux en cours de pose ne vous est pas imputable — le devis l'avait anticipé.",
    },
    {
      q: 'Le ragréage doit-il être une ligne à part ?',
      a: "Oui. C'est un travail réel avec son coût propre, et il dépend de l'état du support. Une ligne dédiée — ferme ou conditionnelle (« si nécessaire après dépose ») — vaut mieux qu'un prix au mètre carré gonflé en silence ou qu'un supplément découvert en cours de chantier.",
    },
  ],
  faqFacture: [
    {
      q: 'Quand facturer un chantier de carrelage ?',
      a: "À la fin de la prestation, joints terminés — c'est le moment où le client constate le résultat. La facture reprend les libellés exacts du devis accepté, y compris la mention « fourniture par le client » le cas échéant.",
    },
    {
      q: 'Comment facturer un supplément décidé en cours de chantier ?',
      a: "Uniquement s'il a fait l'objet d'un devis complémentaire signé avant exécution. Sur la facture, les lignes du devis initial et celles de l'avenant apparaissent séparément. Un supplément jamais validé par écrit est un supplément que le client peut refuser.",
    },
    {
      q: 'Quelles conditions de règlement indiquer ?',
      a: "La date d'échéance, le taux des pénalités de retard, et — pour les clients professionnels — l'indemnité forfaitaire de 40 € pour frais de recouvrement, plus la mention sur l'escompte. Le modèle les intègre ; elles n'ont de poids que si le devis les annonçait déjà.",
    },
  ],
  guides: [
    'mentions-obligatoires-devis-batiment',
    'taux-tva-travaux-renovation',
    'chiffrer-un-devis-btp',
    'se-faire-payer-artisan-impayes',
  ],
};
