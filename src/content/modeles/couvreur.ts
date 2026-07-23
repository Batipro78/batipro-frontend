import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'couvreur',
  labelLower: 'couvreur',
  deMetier: 'de couvreur',

  titreDevis: 'Modèle de devis couvreur',
  metaTitleDevis: 'Modèle de devis couvreur gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis couvreur gratuit au format Word : lignes d'exemple chiffrées (tuiles, zinguerie, échafaudage), mentions obligatoires, TVA. Prêt à remplir.",
  h1Devis: 'Modèle de devis couvreur gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir pour les couvreurs : tableau de chiffrage avec des lignes types (couverture, liteaunage, zinguerie, échafaudage), mentions obligatoires en place, totaux HT/TVA/TTC. Téléchargez et adaptez à votre chantier.",
  introDevis: [
    "Une toiture se chiffre rarement à l'identique d'un chantier à l'autre : état de la charpente découvert en cours de dépose, accès plus ou moins commode, météo. C'est justement parce que le métier comporte des aléas que le devis de couvreur doit être carré sur ce qui est certain : surface traitée, type de tuiles, présence d'un écran de sous-toiture, linéaire de zinguerie, échafaudage. Le client qui lit un devis précis accepte bien mieux l'avenant du jour où la découverte du support révèle une mauvaise surprise.",
    "Ce modèle est structuré dans cet esprit : des lignes d'exemple couvrant les postes courants d'une réfection — dépose et pose de tuiles, liteaunage, écran HPV, gouttières, faîtage, échafaudage — avec unité, quantité et prix unitaire. Remplacez-les par votre chantier ; les mentions qui doivent figurer sur tout devis de travaux sont déjà en place.",
  ],
  specTitreDevis: 'Ce qu’un devis de couverture doit détailler',
  specDevis: [
    "Chiffrez l'échafaudage et les moyens d'accès sur une ligne dédiée : c'est un poste important, que certains concurrents noient dans le prix au mètre carré pour paraître moins chers. Une ligne explicite « échafaudage de pied : montage, location, démontage » permet au client de comparer à périmètre égal. Précisez le modèle et la teinte des tuiles, la classe du bois de liteaunage, et si la dépose comprend l'évacuation des gravats — le bennage se retrouve sinon en litige de fin de chantier.",
    "Réservez par écrit le sort de la charpente : tant que la couverture n'est pas déposée, son état exact est inconnu. Une mention du type « le remplacement d'éléments de charpente dégradés découverts à la dépose fera l'objet d'un devis complémentaire soumis à accord avant exécution » vous protège — et protège le client. C'est la règle générale : tout travail non prévu au devis initial exige un accord écrit avant d'être réalisé.",
  ],

  titreFacture: 'Modèle de facture couvreur',
  metaTitleFacture: 'Modèle de facture couvreur gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture couvreur au format Word : mentions obligatoires, numérotation, TVA, conditions de règlement. Gratuit, prêt à personnaliser.",
  h1Facture: 'Modèle de facture couvreur gratuit (Word)',
  excerptFacture:
    "Une facture de couvreur conforme, prête à remplir : numérotation continue, détail des postes, TVA par taux, conditions de règlement. Téléchargez le modèle Word et adaptez-le à votre entreprise.",
  introFacture: [
    "Un chantier de couverture s'étale souvent sur plusieurs jours et comporte parfois un avenant (reprise de charpente découverte à la dépose). La facture finale doit refléter fidèlement le devis accepté PLUS les devis complémentaires signés — chaque avenant sur ses propres lignes, jamais fondu dans un total global. C'est ce qui rend la facture lisible et incontestable.",
    "Ce modèle intègre les mentions attendues : numéro unique en séquence continue, dates d'émission et de fin de travaux, détail HT par poste, TVA par taux, conditions de règlement, pénalités de retard et indemnité de 40 € pour les clients professionnels. Reprenez les libellés exacts de vos devis : le client doit s'y retrouver ligne à ligne.",
  ],

  lignes: lignes.couvreur.lignes,

  faqDevis: [
    {
      q: 'Quel taux de TVA sur un devis de couverture ?',
      a: "10 % pour la réfection de la toiture d'un logement achevé depuis plus de 2 ans, 20 % dans le neuf. L'isolation de la toiture peut relever de 5,5 % au titre de la rénovation énergétique. Les lignes du modèle sont à 10 % à titre d'exemple — vérifiez le taux applicable à votre chantier, notre guide TVA détaille les cas.",
    },
    {
      q: "Dois-je chiffrer l'échafaudage à part ?",
      a: "C'est la bonne pratique : le poste est significatif et sa présence explicite permet au client de comparer les devis à périmètre égal. Un prix au mètre carré « tout compris » qui cache l'échafaudage paraît moins cher mais se compare mal — et alimente les malentendus.",
    },
    {
      q: 'Comment traiter la charpente dans un devis de couverture ?',
      a: "Par une réserve écrite : son état exact n'est connu qu'à la dépose. Prévoyez la mention « remplacement d'éléments dégradés sur devis complémentaire soumis à accord avant exécution ». Vous êtes couvert, et le client n'a pas de surprise non annoncée.",
    },
  ],
  faqFacture: [
    {
      q: 'Comment facturer un avenant (reprise de charpente) ?',
      a: "Sur la facture finale, faites apparaître les lignes du devis initial et celles du devis complémentaire séparément, chacune avec ses quantités et prix. Un avenant signé avant exécution se facture sans discussion ; des lignes surprises fondues dans le total se contestent.",
    },
    {
      q: 'Puis-je demander un acompte avant de commander les tuiles ?',
      a: "Un acompte prévu au devis est une pratique normale pour couvrir l'approvisionnement. Attention toutefois au devis signé chez le client (régime « hors établissement ») : aucun paiement ne peut être reçu avant un délai de 7 jours suivant la conclusion du contrat. Notre guide sur le devis signé détaille ce point.",
    },
    {
      q: 'Quelles mentions d’assurance sur mes devis et factures ?',
      a: "Depuis le 1er juillet 2023, les entreprises artisanales doivent indiquer sur chaque devis et chaque facture leur assurance professionnelle obligatoire, les coordonnées de l'assureur et la couverture géographique du contrat. Pour un couvreur, la décennale est évidemment le point que le client vérifie en premier.",
    },
  ],
  guides: [
    'mentions-obligatoires-devis-batiment',
    'taux-tva-travaux-renovation',
    'assurance-decennale-artisan',
    'devis-signe-valeur-juridique',
  ],
};
