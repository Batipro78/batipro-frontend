import type { ModeleMetier } from '@/lib/modeles';
import lignes from './lignes.json';

export const modele: ModeleMetier = {
  metier: 'solier',
  labelLower: 'solier',
  deMetier: 'de solier',

  titreDevis: 'Modèle de devis sols souples',
  metaTitleDevis: 'Modèle de devis solier gratuit à télécharger (Word)',
  metaDescriptionDevis:
    "Modèle de devis solier gratuit au format Word : lignes d'exemple chiffrées (PVC, moquette, ragréage), mentions obligatoires, TVA. Prêt à remplir.",
  h1Devis: 'Modèle de devis solier gratuit (Word)',
  excerptDevis:
    "Un modèle de devis prêt à remplir pour les soliers : tableau de chiffrage avec des lignes types (dépose, ragréage, sol PVC, moquette), mentions obligatoires en place, totaux HT/TVA/TTC. Téléchargez et adaptez à votre chantier.",
  introDevis: [
    "Le prix d'un sol souple se joue sous le revêtement : dépose de l'existant, ragréage, qualité du support. Deux devis « sol PVC 30 m² » peuvent différer du tout au tout selon que la préparation est comprise ou non — et le client ne le découvrira qu'au moment où votre concurrent lui annoncera le supplément. Votre force commerciale, c'est un devis qui montre toute la chaîne : dépose, préparation, fourniture, pose, finitions.",
    "Ce modèle décompose la prestation en lignes claires — dépose de l'ancien revêtement, ragréage, pose du sol PVC ou de la moquette, barres de seuil — avec unité, quantité et prix unitaire. Remplacez les exemples par votre chantier ; les mentions qui doivent figurer sur tout devis de travaux sont déjà en place.",
  ],
  specTitreDevis: 'Ce qu’un devis de solier doit détailler',
  specDevis: [
    "Précisez le revêtement par ses caractéristiques : type (lames PVC clipsables, rouleau, dalles plombantes), classe d'usage (un séjour et un couloir de bureaux ne demandent pas la même résistance), épaisseur et couche d'usure. Indiquez qui fournit le revêtement, et pour une pose collée, le type de colle et le temps de mise hors service de la pièce — le client doit savoir quand il pourra remeubler.",
    "La préparation du support mérite ses lignes propres : dépose et évacuation de l'ancien revêtement, ragréage avec sa classe (P3 pour un logement, davantage en tertiaire). Réservez par écrit l'état du support sous l'existant (« sous réserve de l'état du support après dépose ») : une chape qui s'effrite ou des traces d'humidité changent le chantier, et un devis complémentaire signé avant de continuer vaut toujours mieux qu'une facture surprise.",
  ],

  titreFacture: 'Modèle de facture sols souples',
  metaTitleFacture: 'Modèle de facture solier gratuit (Word) — 2026',
  metaDescriptionFacture:
    "Modèle de facture solier au format Word : mentions obligatoires, numérotation, TVA, conditions de règlement. Gratuit, prêt à personnaliser.",
  h1Facture: 'Modèle de facture solier gratuit (Word)',
  excerptFacture:
    "Une facture de solier conforme, prête à remplir : numérotation continue, détail des prestations, TVA par taux, conditions de règlement. Téléchargez le modèle Word et adaptez-le.",
  introFacture: [
    "Le solier intervient souvent en fin de chantier, quand les budgets sont tendus et la patience des clients aussi : une facture nette, émise dès la pose terminée et calquée sur le devis accepté, passe devant les factures contestables des autres lots. Détaillez la préparation comme la pose — c'est le travail invisible qui justifie l'écart avec le prix « pose seule » qu'imagine le client.",
    "Ce modèle intègre les mentions attendues : numéro unique en séquence continue, dates d'émission et de fin de prestation, détail HT ligne par ligne, TVA par taux, conditions de règlement, pénalités de retard et indemnité de 40 € pour les clients professionnels.",
  ],

  lignes: lignes.solier.lignes,

  faqDevis: [
    {
      q: 'Quel taux de TVA sur un devis de sols souples ?',
      a: "10 % pour la pose dans un logement achevé depuis plus de 2 ans, 20 % dans le neuf ou les locaux professionnels — le tertiaire est fréquent dans ce métier, pensez-y. Les lignes du modèle sont à 10 % à titre d'exemple : vérifiez le taux applicable, notre guide TVA détaille les cas.",
    },
    {
      q: 'Comment chiffrer le ragréage ?',
      a: "Sur une ligne dédiée, avec sa classe (P3 en logement) et sa surface. S'il dépend de ce qu'on trouvera sous l'ancien revêtement, chiffrez-le en conditionnel (« si nécessaire après dépose, X €/m² ») : le client connaît le prix avant la découverte, la discussion est déjà cadrée.",
    },
    {
      q: 'Faut-il indiquer la classe d’usage du revêtement ?',
      a: "Oui : c'est elle qui garantit que le sol tiendra l'usage prévu (résidentiel, commercial modéré, intensif). La préciser sur le devis prouve que le produit posé correspond au besoin — et vous protège si un revêtement choisi par le client s'use prématurément.",
    },
  ],
  faqFacture: [
    {
      q: 'Quand facturer la pose d’un sol souple ?',
      a: "Dès la fin de la pose, barres de seuil comprises. Si la pièce doit rester hors service le temps du séchage de la colle, la prestation n'en est pas moins terminée : facturez, en rappelant simplement la consigne de remise en service.",
    },
    {
      q: 'Le client a fourni le revêtement : que porte la facture ?',
      a: "La pose et les consommables (colle, ragréage, barres de seuil), avec la mention « revêtement fourni par le client » reprise du devis. La distinction nette entre fourniture et pose évite tout malentendu sur ce que couvre votre garantie.",
    },
    {
      q: 'Que faire face à un donneur d’ordre qui paie à 60 jours ?',
      a: "Entre professionnels, le délai de paiement est plafonné par la loi et les pénalités de retard courent sans rappel. Vos factures doivent porter le taux des pénalités et l'indemnité de 40 € — le modèle les intègre. Notre guide « se faire payer » détaille les recours.",
    },
  ],
  guides: [
    'mentions-obligatoires-devis-batiment',
    'taux-tva-travaux-renovation',
    'chiffrer-un-devis-btp',
    'se-faire-payer-artisan-impayes',
  ],
};
