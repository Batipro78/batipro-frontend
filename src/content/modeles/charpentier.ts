import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'charpentier',
  labelLower: 'charpentier',
  deMetier: 'de charpentier',

  titreDevis: 'Modèle de devis charpente',
  metaTitleDevis: 'Modèle de devis charpente gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis charpentier gratuit au format Word : lignes d'exemple chiffrées (reprise, solivage, traitement), mentions obligatoires, TVA. Prêt à remplir.",
  h1Devis: 'Modèle de devis charpente gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir pour les charpentiers : tableau de chiffrage avec des lignes types (reprise de charpente, solivage, traitement), mentions obligatoires en place, totaux HT/TVA/TTC. Téléchargez et adaptez à votre chantier.",
  introDevis: [
    "La charpente est un métier de structure : ce que vous touchez porte la maison. Le client le sait confusément, et c'est pour ça qu'un devis de charpentier vague l'inquiète au lieu de le rassurer. Décrire précisément les pièces reprises, les sections, les essences et les traitements n'est pas du zèle technique : c'est ce qui montre que vous savez ce que vous faites — et ce qui, en cas d'expertise des années plus tard, prouvera l'étendue exacte de votre intervention.",
    "Ce modèle chiffre par ouvrage : reprise de pièces dégradées, remplacement de panne, solivage, traitement insecticide et fongicide. Chaque ligne porte son unité, sa quantité et son prix. Remplacez les exemples par votre chantier ; les mentions qui doivent figurer sur tout devis de travaux sont déjà en place.",
  ],
  specTitreDevis: 'Ce qu’un devis de charpente doit détailler',
  specDevis: [
    "Nommez les pièces par leur fonction (panne, chevron, entrait, arbalétrier), donnez les sections et la classe du bois, et précisez le périmètre exact de la reprise : « remplacement de la panne intermédiaire du versant sud sur 6 ml » vaut infiniment mieux que « réparation charpente ». Pour un traitement, indiquez le produit ou la famille de produits, la méthode (pulvérisation, injection) et la surface traitée. C'est le niveau de détail qu'attendra aussi l'assureur du client si un sinistre survient un jour.",
    "L'aléa du métier, c'est l'état réel des bois, souvent invisible avant dépose ou sondage. Réservez-le par écrit : « l'étendue exacte des bois à remplacer sera confirmée après sondage ; tout dépassement fera l'objet d'un devis complémentaire soumis à accord avant exécution ». Et rappelez-vous que vos travaux touchent à la structure : la mention de votre assurance décennale, avec les coordonnées de l'assureur et la couverture géographique, est obligatoire sur chaque devis et chaque facture — c'est aussi la première chose qu'un client averti vérifie.",
  ],

  titreFacture: 'Modèle de facture charpente',
  metaTitleFacture: 'Modèle de facture charpentier gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture charpentier au format Word : mentions obligatoires, numérotation, TVA, conditions de règlement. Gratuit, prêt à personnaliser.",
  h1Facture: 'Modèle de facture charpente gratuit (Word)',
  excerptFacture:
    "Une facture de charpentier conforme, prête à remplir : numérotation continue, détail des ouvrages, TVA par taux, conditions de règlement. Téléchargez le modèle Word et adaptez-le.",
  introFacture: [
    "Une facture de charpente peut être relue des années après le chantier — par un expert, un assureur, un notaire lors d'une vente. Elle doit donc décrire les ouvrages avec la même précision que le devis : pièces remplacées, sections, traitement appliqué. C'est votre trace écrite autant que celle du client. Reprenez les libellés exacts du devis accepté et des éventuels devis complémentaires signés après sondage.",
    "Ce modèle intègre les mentions attendues : numéro unique en séquence continue, dates, détail HT par ouvrage, TVA par taux, conditions de règlement, pénalités de retard et indemnité de 40 € pour les clients professionnels — plus la mention d'assurance décennale, obligatoire pour les entreprises artisanales.",
  ],

  lignes: lignes.charpentier.lignes,

  faqDevis: [
    {
      q: 'Quel taux de TVA sur un devis de charpente ?',
      a: "10 % pour la réparation ou le remplacement partiel dans un logement achevé depuis plus de 2 ans, 20 % dans le neuf ou pour une surélévation créant de la surface. Les lignes du modèle sont à 10 % à titre d'exemple — vérifiez le taux applicable à votre chantier avec notre guide TVA.",
    },
    {
      q: 'Comment chiffrer quand l’état des bois est incertain ?',
      a: "Chiffrez fermement ce qui est visible, et réservez le reste par écrit : sondage préalable, puis devis complémentaire signé avant toute extension des travaux. Le client accepte très bien un aléa annoncé dès le départ ; il conteste presque toujours un supplément découvert sur la facture.",
    },
    {
      q: 'La décennale est-elle indispensable pour un charpentier ?',
      a: "La charpente relève typiquement des ouvrages engageant la solidité du bâtiment, cœur de la garantie décennale. Sa mention sur devis et factures — assureur, coordonnées, couverture géographique — est obligatoire pour les entreprises artisanales. Notre guide assurance décennale fait le tour du sujet.",
    },
  ],
  faqFacture: [
    {
      q: 'Que doit contenir la facture après une reprise de charpente ?',
      a: "Le détail des ouvrages réellement exécutés : pièces remplacées avec sections et linéaires, traitement appliqué et surface, conformément au devis et aux avenants signés. Ce niveau de détail servira le jour où un expert ou un acquéreur voudra savoir ce qui a été fait.",
    },
    {
      q: 'Comment facturer le devis complémentaire décidé après sondage ?',
      a: "Sur la facture finale, les lignes du devis initial et celles du devis complémentaire apparaissent séparément, avec leurs propres quantités et prix. L'avenant ayant été signé avant exécution, sa facturation ne se discute pas.",
    },
    {
      q: 'Combien de temps conserver mes factures de chantier ?',
      a: "Dix ans au titre des obligations comptables — et c'est une durée cohérente avec la décennale : vos factures décrivent des ouvrages dont vous répondez pendant dix ans. Conservez le dossier complet : devis, avenants, factures.",
    },
  ],
  guides: [
    'mentions-obligatoires-devis-batiment',
    'assurance-decennale-artisan',
    'taux-tva-travaux-renovation',
    'mentions-obligatoires-facture-artisan',
  ],
};
