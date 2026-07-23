import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'electricien',
  labelLower: 'électricien',
  deMetier: "d'électricien",

  titreDevis: 'Modèle de devis électricien',
  metaTitleDevis: 'Modèle de devis électricien gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis électricien gratuit au format Word : lignes d'exemple chiffrées, mentions obligatoires, TVA. À télécharger et personnaliser en 2 minutes.",
  h1Devis: 'Modèle de devis électricien gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir, pensé pour les électriciens : tableau de chiffrage avec des lignes types (tableau, prises, points lumineux), mentions obligatoires déjà en place, totaux HT/TVA/TTC. Téléchargez-le, remplacez les exemples par votre chantier, c'est prêt.",
  introDevis: [
    "En électricité, le devis flou est une machine à litiges. « Rénovation électrique de l'appartement : 4 800 € » ne dit rien : combien de points lumineux, combien de prises, le tableau est-il remplacé, la terre est-elle reprise ? Le jour où le client s'étonne qu'une ligne spécialisée pour le four ne soit pas comprise, vous n'avez aucun document à lui opposer. Un devis d'électricien digne de ce nom se chiffre au point : chaque prise, chaque circuit, chaque protection est une ligne.",
    "Ce modèle est construit sur cette logique. Le tableau de chiffrage contient des lignes d'exemple typiques d'une rénovation — remplacement de tableau, différentiels 30 mA, points lumineux, prises, mise à la terre — avec unité, quantité et prix unitaire. Vous remplacez les exemples par votre intervention réelle, vous ajustez les prix à votre marché, et les mentions qui doivent figurer sur tout devis de travaux sont déjà en place.",
  ],
  specTitreDevis: "Ce qu'un devis d'électricien doit détailler",
  specDevis: [
    "Le niveau de détail attendu est plus fin que dans beaucoup d'autres corps d'état, parce que l'électricité se compte à l'unité : un point lumineux, une prise 16 A, un circuit spécialisé, une rangée de tableau. Précisez à chaque fois la fourniture ET la pose, et le matériel de référence (marque ou gamme du tableau, type de différentiel — 30 mA type A ou AC). C'est ce qui permet au client de comparer votre devis à un autre sans se tromper, et à vous de justifier un écart de prix par la qualité du matériel.",
    "Deux points méritent une attention particulière. La norme NF C 15-100 est le référentiel des installations électriques des logements : si votre intervention vise une mise en conformité ou une mise en sécurité, dites-le explicitement dans l'objet du devis — les deux ne recouvrent pas la même chose et le client doit savoir ce qu'il achète. Et si les travaux modifient l'installation de façon importante (rénovation totale, nouveau raccordement), signalez au client qu'une attestation de conformité (Consuel) peut être exigée pour la mise en service : mieux vaut l'annoncer sur le devis que la découvrir au moment de remettre le courant.",
    "Enfin, en dépannage chez un particulier, rappelez-vous que le devis préalable est une obligation réglementaire, sans seuil de montant — et pas une option commerciale. Les règles particulières du dépannage sont détaillées dans notre guide dédié.",
  ],

  titreFacture: 'Modèle de facture électricien',
  metaTitleFacture: 'Modèle de facture électricien gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture électricien au format Word : mentions obligatoires, numérotation, TVA, pénalités de retard. Gratuit, à télécharger et personnaliser.",
  h1Facture: 'Modèle de facture électricien gratuit (Word)',
  excerptFacture:
    "Une facture d'électricien conforme, prête à remplir : numérotation, dates, tableau des prestations, TVA par taux, conditions de règlement et mentions obligatoires. Téléchargez le modèle Word et adaptez-le à votre entreprise.",
  introFacture: [
    "La facture déclenche le paiement : plus elle est émise vite et proprement, plus vite vous êtes payé. Pour un électricien, la bonne pratique est de facturer le jour de la fin d'intervention, quand l'installation fonctionne sous les yeux du client — pas trois semaines plus tard depuis le bureau. Ce modèle reprend la structure de votre devis (mêmes lignes, mêmes quantités) pour que la facture soit la suite logique du document accepté, sans surprise pour le client.",
    "Les mentions qui doivent figurer sur toute facture sont déjà en place : numéro unique en séquence continue, dates d'émission et de fin de prestation, détail des lignes en HT, TVA par taux, conditions de règlement, pénalités de retard et — pour les clients professionnels — l'indemnité forfaitaire de 40 € pour frais de recouvrement. Vous n'avez qu'à remplacer les exemples par votre intervention.",
  ],

  lignes: lignes.electricien.lignes,

  faqDevis: [
    {
      q: 'Quel taux de TVA appliquer sur un devis d’électricien ?',
      a: "Cela dépend du chantier : 10 % pour la plupart des travaux de rénovation dans un logement achevé depuis plus de 2 ans, 20 % pour le neuf, les locaux professionnels ou un logement récent. Certains travaux liés à la rénovation énergétique relèvent de 5,5 %. Les lignes du modèle sont à 10 % à titre d'exemple : vérifiez le taux applicable à votre chantier avant d'envoyer le devis, notre guide TVA détaille les cas.",
    },
    {
      q: 'Dois-je détailler chaque prise et chaque point lumineux ?',
      a: "C'est la bonne pratique, et c'est ce que la réglementation entend par « décompte détaillé » : une ligne par type de prestation avec unité, quantité et prix unitaire. « Électricité : forfait 4 800 € » ne prouve rien en cas de litige. « 12 prises 16 A à 78 € l'unité » prouve exactement ce qui était prévu — et ce qui ne l'était pas.",
    },
    {
      q: 'Faut-il mentionner le Consuel sur le devis ?',
      a: "Ce n'est pas une mention obligatoire du devis, mais si vos travaux peuvent entraîner une visite du Consuel (rénovation complète, nouveau raccordement), l'annoncer sur le devis évite un malentendu coûteux : le client saura qu'une attestation de conformité conditionne la mise en service, et si la démarche est facturée, elle doit apparaître en ligne du devis.",
    },
    {
      q: 'Un devis est-il obligatoire pour un simple dépannage électrique ?',
      a: "Oui. Pour les prestations de dépannage, de réparation et d'entretien chez un particulier, un devis détaillé doit être remis avant l'exécution, sans seuil de montant. C'est un secteur surveillé par la DGCCRF : remettre le devis avant d'intervenir, pas après.",
    },
  ],
  faqFacture: [
    {
      q: 'Quand dois-je émettre ma facture après une intervention électrique ?',
      a: "Dès la fin de la prestation. Vous n'avez pas le droit d'attendre plusieurs semaines par confort. En pratique, facturer le jour même est aussi ce qui se paie le mieux : le client vient de voir son installation fonctionner.",
    },
    {
      q: 'Que faire si le chantier comporte deux taux de TVA ?',
      a: "Chaque ligne porte son taux, et le récapitulatif doit détailler la base et le montant de TVA pour chaque taux. Le modèle prévoit ce cas : le bloc de totaux distingue les bases par taux avant le total TTC.",
    },
    {
      q: 'Les pénalités de retard sont-elles obligatoires sur une facture ?',
      a: "Entre professionnels, oui : le taux des pénalités de retard et l'indemnité forfaitaire de 40 € pour frais de recouvrement doivent figurer sur la facture. Avec un particulier, ces clauses n'ont d'effet que si elles ont été acceptées en amont — d'où l'intérêt de les prévoir dès le devis.",
    },
  ],
  guides: [
    'mentions-obligatoires-devis-batiment',
    'taux-tva-travaux-renovation',
    'devis-depannage-urgence-regles',
    'mentions-obligatoires-facture-artisan',
  ],
};
