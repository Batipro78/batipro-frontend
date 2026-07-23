import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'plombier',
  labelLower: 'plombier-chauffagiste',
  deMetier: 'de plombier-chauffagiste',

  titreDevis: 'Modèle de devis plombier',
  metaTitleDevis: 'Modèle de devis plombier gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis plombier-chauffagiste gratuit au format Word : lignes d'exemple chiffrées (chauffe-eau, sanitaires), mentions obligatoires, TVA. Prêt à remplir.",
  h1Devis: 'Modèle de devis plombier-chauffagiste gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir pour les plombiers-chauffagistes : tableau de chiffrage avec des lignes types (chauffe-eau, WC suspendu, reprise d'alimentation), mentions obligatoires en place, totaux HT/TVA/TTC. Téléchargez, personnalisez, envoyez.",
  introDevis: [
    "En plomberie, la moitié des litiges naissent de ce que le devis ne disait pas : la dépose de l'ancien chauffe-eau était-elle comprise ? Le groupe de sécurité est-il neuf ? La reprise du carrelage après passage des tuyaux est-elle incluse ou exclue ? Un devis de plombier protège quand il décrit l'intervention pièce par pièce, fourniture et pose distinguées, et quand il dit aussi clairement ce qui n'est PAS compris.",
    "Ce modèle est construit pour ça. Le tableau de chiffrage contient des lignes d'exemple typiques — remplacement de chauffe-eau avec groupe de sécurité, WC suspendu avec bâti-support, reprise d'alimentation en PER, évacuations — avec unité, quantité et prix unitaire. Remplacez-les par votre intervention, ajustez vos prix, les mentions légales sont déjà en place.",
  ],
  specTitreDevis: 'Ce qu’un devis de plombier-chauffagiste doit détailler',
  specDevis: [
    "Précisez systématiquement la marque et la capacité des équipements fournis (chauffe-eau 200 L stéatite, mitigeur thermostatique de telle gamme) : c'est ce qui justifie votre prix face à un devis concurrent équipé en entrée de gamme, et ce qui évite la déception du client à la livraison. Distinguez la fourniture de la pose ligne par ligne, et chiffrez à part ce qui relève de la remise en état (saignées, rebouchage, raccords de carrelage) — c'est le poste le plus souvent contesté.",
    "Pensez aussi aux exclusions explicites : une ligne « non compris : reprise de faïence, peinture, dépose de meuble vasque » vaut mieux qu'une discussion sur le chantier. Et si l'intervention touche au gaz, mentionnez le certificat de conformité correspondant : le client doit savoir qu'une mise en service en dépend.",
    "En dépannage chez un particulier — fuite, ballon en panne, canalisation bouchée —, le devis préalable est une obligation réglementaire sans seuil de montant, pas une politesse commerciale. Le régime particulier du dépannage (informations préalables, taux horaires affichés) est détaillé dans notre guide dédié.",
  ],

  titreFacture: 'Modèle de facture plombier',
  metaTitleFacture: 'Modèle de facture plombier gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture plombier-chauffagiste au format Word : mentions obligatoires, numérotation, TVA, conditions de règlement. Gratuit, prêt à personnaliser.",
  h1Facture: 'Modèle de facture plombier-chauffagiste gratuit (Word)',
  excerptFacture:
    "Une facture de plombier conforme et prête à remplir : numérotation continue, dates, détail des prestations, TVA par taux, conditions de règlement. Téléchargez le modèle Word et adaptez-le à votre entreprise.",
  introFacture: [
    "Le bon moment pour facturer une intervention de plomberie, c'est la fin de l'intervention : l'eau chaude est revenue, la fuite est réparée, le client constate le résultat. Une facture émise sur place ou le soir même se règle sans discussion ; la même facture envoyée un mois plus tard devient une relance. Ce modèle reprend la structure du devis accepté — mêmes lignes, mêmes libellés — pour que le client retrouve exactement ce qu'il a signé.",
    "Toutes les mentions attendues sur une facture sont en place : numéro unique en séquence continue, date d'émission et date de fin de prestation, détail HT ligne par ligne, TVA par taux, conditions de règlement, pénalités de retard et indemnité forfaitaire de 40 € pour les clients professionnels. Il ne reste qu'à remplir.",
  ],

  lignes: lignes.plombier.lignes,

  faqDevis: [
    {
      q: 'Quel taux de TVA sur un devis de plomberie ?',
      a: "10 % pour la plupart des travaux dans un logement achevé depuis plus de 2 ans, 20 % dans le neuf ou les locaux professionnels, et 5,5 % pour certains équipements de rénovation énergétique. Les lignes du modèle sont à 10 % à titre d'exemple : vérifiez le taux applicable à votre chantier — notre guide TVA détaille les cas concrets.",
    },
    {
      q: 'Comment facturer un dépannage urgent (fuite, ballon en panne) ?',
      a: "Même en urgence, le devis préalable reste la règle chez un particulier, et vos taux horaires et frais de déplacement doivent avoir été portés à sa connaissance. L'urgence permet d'intervenir sans attendre pour ce qui est strictement nécessaire, pas de s'affranchir du devis pour le reste : la réfection complète de la salle de bains proposée dans la foulée repose sur un devis classique.",
    },
    {
      q: 'Dois-je indiquer la marque du chauffe-eau sur le devis ?',
      a: "Rien ne l'impose formellement, mais c'est fortement conseillé : « chauffe-eau électrique 200 L » sans marque ni gamme laisse le client imaginer le meilleur et vous reprocher la différence. La désignation précise du matériel fourni fait partie d'un décompte détaillé sérieux — et c'est votre argument face à un devis concurrent moins-disant.",
    },
  ],
  faqFacture: [
    {
      q: 'Puis-je facturer le déplacement en plus de la main-d’œuvre ?',
      a: "Oui, à condition qu'il ait été annoncé avant l'intervention — sur le devis ou dans les informations préalables pour le dépannage. Un frais de déplacement découvert sur la facture est le type même de ligne contestée, à raison.",
    },
    {
      q: 'Quelles dates doivent figurer sur ma facture ?',
      a: "La date d'émission de la facture, et la date de fin d'exécution de la prestation lorsqu'elle en diffère. Le modèle prévoit les deux champs, plus la date d'échéance du règlement.",
    },
    {
      q: 'Que risque une facture non conforme ?',
      a: "Une amende fiscale par mention manquante, et surtout un prétexte commode offert au client pour retarder le paiement. Une facture complète et carrée se conteste beaucoup plus difficilement — c'est votre premier outil de recouvrement.",
    },
  ],
  guides: [
    'mentions-obligatoires-devis-batiment',
    'taux-tva-travaux-renovation',
    'devis-depannage-urgence-regles',
    'se-faire-payer-artisan-impayes',
  ],
};
