import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'chiffrer-un-devis-btp',
  title: 'Chiffrer un devis sans se planter',
  h1: 'Chiffrer un devis BTP : déboursé sec, frais généraux, taux horaire et marge',
  metaTitle: 'Chiffrer un devis BTP : méthode et calcul du taux horaire',
  metaDescription:
    'La méthode pour calculer un prix de vente dans le bâtiment : déboursé sec, heures facturables, frais généraux, taux horaire et marge, exemple chiffré.',
  excerpt:
    "La plupart des artisans qui déposent le bilan travaillaient beaucoup. Leur problème n’était pas le carnet de commandes, c’était le prix. Voici la méthode pour calculer un tarif qui couvre tout — y compris ce que vous oubliez toujours.",
  category: 'Chiffrage',
  updated: '2026-07-21',
  related: [
    'devis-qui-fait-signer',
    'taux-tva-travaux-renovation',
    'se-faire-payer-artisan-impayes',
  ],
  blocks: [
    {
      type: 'p',
      text: "Il existe une phrase qu’on entend dans tous les bars à côté des chantiers : « je travaille comme un fou et je ne gagne rien ». Neuf fois sur dix, ce n’est pas un problème de volume, c’est un problème de prix. L’artisan a chiffré son chantier sur la base de ce qu’il paie ses matériaux et d’un taux horaire choisi au feeling, en oubliant la moitié de ce qu’il lui en coûte réellement de faire tourner son entreprise.",
    },
    {
      type: 'p',
      text: "Ce guide déroule la méthode complète, dans l’ordre, avec un exemple chiffré du début à la fin. L’objectif n’est pas de vous faire augmenter vos prix pour le plaisir : c’est de vous permettre de savoir, chantier par chantier, si vous gagnez de l’argent ou si vous en perdez. Beaucoup découvrent en faisant ce calcul qu’ils travaillaient à perte sur un type de prestation précis, sans l’avoir jamais su.",
    },

    { type: 'h2', text: 'Les quatre étages d’un prix de vente' },
    {
      type: 'p',
      text: "Un prix de vente correct s’empile toujours de la même façon. Chaque étage a une fonction, et sauter l’un d’eux revient à le payer de sa poche.",
    },
    {
      type: 'table',
      head: ['Étage', 'Ce qu’il couvre'],
      rows: [
        ['1. Le déboursé sec', 'Ce que le chantier coûte directement : matériaux, main-d’œuvre, matériel spécifique'],
        ['2. Les frais généraux', 'Ce que l’entreprise coûte, qu’il y ait ou non un chantier : véhicule, assurances, comptable, outillage, téléphone'],
        ['3. Votre rémunération', 'Ce que vous devez vous verser, cotisations sociales comprises'],
        ['4. La marge', 'Ce qui reste pour investir, absorber les imprévus et encaisser un impayé sans couler'],
      ],
    },
    {
      type: 'p',
      text: "L’erreur classique consiste à s’arrêter à l’étage 1 et à ajouter « un peu » par-dessus. Le « un peu » est presque toujours en dessous de ce qu’il faudrait, parce qu’il ne repose sur aucun calcul.",
    },

    { type: 'h2', text: 'Étape 1 : le déboursé sec' },
    {
      type: 'p',
      text: "Le déboursé sec, c’est le coût direct du chantier, sans rien d’autre. Il se compose de trois éléments.",
    },
    { type: 'h3', text: 'Les fournitures' },
    {
      type: 'p',
      text: "Le prix d’achat hors taxes de tout ce que vous posez, remises fournisseur déduites, plus le transport quand il est facturé. Ajoutez toujours une provision pour chutes et casse : entre 5 et 10 % selon le métier. Un carreleur qui ne provisionne pas ses chutes se trompe systématiquement, et toujours dans le même sens.",
    },
    { type: 'h3', text: 'La main-d’œuvre' },
    {
      type: 'p',
      text: "Le nombre d’heures nécessaires multiplié par votre coût horaire réel — dont le calcul fait l’objet de l’étape suivante, car c’est là que presque tout se joue. Estimez les heures de façon honnête : le temps de préparation, les allers-retours au dépôt, la protection des sols, le nettoyage et l’évacuation des gravats sont du temps de travail, même s’ils ne « produisent » rien de visible.",
    },
    { type: 'h3', text: 'Le matériel spécifique' },
    {
      type: 'p',
      text: "La location d’une nacelle, d’un échafaudage, d’une carotteuse, la benne à gravats, le percement facturé par un prestataire. Tout ce que vous n’auriez pas dépensé sans ce chantier précis. L’outillage courant, lui, n’est pas ici : il appartient aux frais généraux.",
    },

    { type: 'h2', text: 'Étape 2 : votre vrai coût horaire' },
    {
      type: 'p',
      text: "C’est le calcul le plus important de tout ce guide, et le plus souvent bâclé. Un artisan qui se dit « je me paie 15 € de l’heure, donc je facture 35, ça va » se trompe de deux façons à la fois : il ignore les heures qu’il travaille sans les facturer, et il ignore ce que coûte l’entreprise autour de lui.",
    },
    { type: 'h3', text: 'Combien d’heures pouvez-vous réellement facturer ?' },
    {
      type: 'p',
      text: "C’est la question qui fait mal. Vous travaillez peut-être 45 semaines par an à 39 heures, soit environ 1 750 heures. Mais sur ces heures, combien atterrissent sur une facture ? Il faut retirer les devis et les visites, la comptabilité et l’administratif, les déplacements non facturés, les approvisionnements, les relances de clients, l’entretien du matériel, la formation, et les heures perdues quand un chantier n’est pas prêt.",
    },
    {
      type: 'p',
      text: "Dans la réalité d’un artisan seul, le taux de productivité se situe le plus souvent entre 60 et 70 %. Prenons 65 % : sur 1 750 heures travaillées, environ 1 150 heures sont facturables. C’est sur ces 1 150 heures — et non sur 1 750 — que doivent être répartis tous vos coûts.",
    },
    {
      type: 'note',
      title: 'La faute qui coûte le plus cher',
      text: "Répartir ses charges sur les heures travaillées plutôt que sur les heures facturables provoque une sous-évaluation d’environ un tiers du taux horaire. C’est exactement l’écart entre une entreprise qui vit correctement et une entreprise qui survit.",
    },
    { type: 'h3', text: 'Additionnez ce que l’entreprise coûte par an' },
    {
      type: 'p',
      text: "Reprenez votre relevé bancaire sur douze mois et listez tout ce qui sort et qui n’est pas de la fourniture de chantier. Voici un exemple réaliste pour un artisan seul, à ajuster à votre situation :",
    },
    {
      type: 'table',
      head: ['Poste', 'Montant annuel'],
      rows: [
        ['Véhicule : crédit ou location, carburant, entretien, assurance', '4 800 €'],
        ['Assurances professionnelles : RC décennale et RC pro', '2 400 €'],
        ['Local, dépôt ou garage', '1 800 €'],
        ['Outillage, consommables, EPI, renouvellement', '1 500 €'],
        ['Comptable', '1 200 €'],
        ['Téléphone, internet, logiciels, site web', '1 000 €'],
        ['Publicité, cartes, marquage véhicule', '600 €'],
        ['Formation, cotisations, frais bancaires, divers', '1 700 €'],
        ['Total frais généraux', '15 000 €'],
      ],
    },
    { type: 'h3', text: 'Ajoutez votre rémunération, cotisations comprises' },
    {
      type: 'p',
      text: "Décidez ce que vous voulez gagner net, puis remontez aux cotisations. Si vous visez 2 200 € net par mois, soit 26 400 € par an, il faut dégager un résultat sensiblement supérieur pour couvrir les cotisations sociales du travailleur indépendant. En ordre de grandeur, comptez environ 1,45 fois votre revenu net cible — soit environ 38 000 € de résultat à dégager pour 26 400 € net dans la poche. Faites préciser le chiffre exact par votre comptable, il dépend de votre forme juridique.",
    },
    { type: 'h3', text: 'Le calcul final' },
    {
      type: 'p',
      text: "Frais généraux 15 000 € plus rémunération chargée 38 000 € égale 53 000 € à couvrir sur l’année. Divisés par 1 150 heures facturables, cela donne un coût horaire de revient d’environ 46 € de l’heure.",
    },
    {
      type: 'p',
      text: "Ce chiffre n’est pas votre prix de vente : c’est votre point mort. À 46 € de l’heure, vous ne gagnez rien de plus que le salaire que vous vous êtes fixé, et votre entreprise ne met pas un centime de côté. Ajoutez une marge — 10 % est un minimum raisonnable — et vous obtenez un taux horaire de vente d’environ 51 € de l’heure hors taxes.",
    },
    {
      type: 'p',
      text: "Si ce chiffre vous paraît élevé par rapport à ce que vous facturez aujourd’hui, c’est précisément l’information que vous cherchiez.",
    },

    { type: 'h2', text: 'Étape 3 : la marge sur les fournitures' },
    {
      type: 'p',
      text: "Vous avancez la trésorerie des matériaux, vous les transportez, vous les stockez, vous les choisissez, et vous les garantissez. Ce travail se rémunère. Une marge de 15 à 30 % sur le déboursé fournitures est la pratique courante, selon le métier et le niveau de service.",
    },
    {
      type: 'p',
      text: "Attention à ne pas confondre marge et coefficient. Appliquer un coefficient de 1,20 à un achat de 100 € donne un prix de vente de 120 €, soit une marge de 20 € qui représente 16,7 % du prix de vente. La confusion entre taux de marque et taux de marge conduit régulièrement à surestimer sa rentabilité de plusieurs points.",
    },
    {
      type: 'p',
      text: "Un conseil sur la présentation : ne détaillez pas le prix d’achat de vos fournitures sur le devis. Vous n’y êtes pas tenu — l’obligation porte sur la désignation, l’unité, la quantité et le prix unitaire de vente. Un client qui découvre votre prix d’achat au catalogue transformera votre marge en sujet de négociation.",
    },

    { type: 'h2', text: 'La méthode alternative : le coefficient global' },
    {
      type: 'p',
      text: "Certaines entreprises préfèrent une méthode plus rapide : calculer un coefficient unique qui, appliqué au déboursé sec, donne directement le prix de vente. Attention, ce n’est pas la même arithmétique : ici, le déboursé sec doit valoriser la main-d’œuvre à son coût salarial nu, hors frais généraux et hors rémunération du dirigeant — sinon vous facturez deux fois les mêmes charges.",
    },
    {
      type: 'p',
      text: "Si vos frais généraux et votre rémunération représentent 55 % de votre chiffre d’affaires et que vous visez 10 % de marge, votre coefficient est d’environ 1 divisé par (1 moins 0,55 moins 0,10), soit environ 2,85. Un déboursé sec de 1 000 € se vend alors 2 850 €. Vérifiez ce coefficient sur vos propres comptes avant de l’utiliser : appliqué au déboursé sec de l’exemple précédent, qui inclut déjà les frais généraux dans le coût horaire, il donnerait 3 600 € au lieu de 1 458 €. Les deux méthodes ne parlent tout simplement pas du même déboursé.",
    },
    {
      type: 'p',
      text: "Cette méthode va vite mais elle a un défaut : elle applique le même coefficient à un chantier très gourmand en fournitures et à un chantier essentiellement composé de main-d’œuvre, ce qui vous rend trop cher sur le premier et trop bon marché sur le second. Pour les métiers où la part de fournitures varie beaucoup d’un chantier à l’autre — électricité, plomberie, menuiserie —, la méthode « taux horaire plus marge fournitures » est nettement plus juste.",
    },

    { type: 'h2', text: 'Un exemple complet, du début à la fin' },
    {
      type: 'p',
      text: "Remplacement d’un tableau électrique et mise en sécurité d’un appartement, pour un particulier, dans un logement de plus de deux ans.",
    },
    {
      type: 'table',
      head: ['Poste', 'Détail', 'Montant HT'],
      rows: [
        ['Fournitures', 'Tableau 3 rangées, disjoncteurs, différentiels 30 mA, câble, goulottes, petit matériel — achat 590 € + 5 % de chutes', '620 €'],
        ['Main-d’œuvre', '14 h à 51 €/h', '714 €'],
        ['Marge fournitures', 'Coefficient 1,20 sur les 620 € de déboursé', '124 €'],
        ['Total HT', '', '1 458 €'],
        ['TVA 10 %', 'Logement achevé depuis plus de deux ans', '146 €'],
        ['Total TTC', '', '1 604 €'],
      ],
    },
    {
      type: 'p',
      text: "Vérifions que ce prix tient. Le coût de revient du chantier est de 620 € de fournitures plus 14 heures à 46 € de coût horaire, soit 644 €, ce qui donne 1 264 €. Le prix de vente étant de 1 458 €, la marge dégagée est de 194 €, soit environ 13 % du prix de vente. C’est correct : le chantier paie les matériaux, paie votre salaire, paie sa quote-part de frais généraux, et laisse un peu à l’entreprise.",
    },
    {
      type: 'p',
      text: "Maintenant, refaites le même calcul avec le raisonnement intuitif : 590 € de matériel, « une bonne journée et demie de boulot à 300 € la journée », soit 450 €, plus « un peu de marge ». On arrive à 1 100 € et on croit avoir bien travaillé. En réalité, le chantier a rapporté moins que son coût de revient : on a payé pour travailler.",
    },

    { type: 'h2', text: 'Les six oublis les plus fréquents' },
    {
      type: 'list',
      items: [
        "Le temps de déplacement et les allers-retours au fournisseur, jamais comptés alors qu’ils représentent souvent une heure par jour.",
        "Le service après-vente et les reprises sous garantie, qui doivent être provisionnés dans le prix des chantiers réussis puisqu’ils ne se facturent pas.",
        "Les remises accordées en fin de négociation, prises directement sur la marge : accorder 10 % de remise sur un chantier à 13 % de marge, c’est diviser son bénéfice par quatre.",
        "La hausse du prix des matériaux entre le devis et la commande, d’où l’intérêt d’une durée de validité courte sur les chantiers à forte part de fourniture.",
        "Le temps administratif : rédiger un devis, relancer, facturer, faire la TVA. C’est du travail non facturé qui doit être absorbé par le taux horaire.",
        "Les impayés : sur un an, un seul chantier non réglé peut annuler la marge de dix chantiers réussis.",
      ],
    },

    { type: 'h2', text: 'Et le prix du marché dans tout ça ?' },
    {
      type: 'p',
      text: "Votre calcul vous donne le prix en dessous duquel vous ne devez pas descendre. Le marché, lui, vous dit ce que le client est prêt à payer. Les deux ne coïncident pas toujours, et c’est une information stratégique, pas une fatalité.",
    },
    {
      type: 'p',
      text: "Si votre prix calculé est nettement au-dessus du marché local, trois explications sont possibles : votre productivité est faible et vous pouvez la travailler, vos frais généraux sont trop lourds pour votre volume d’activité, ou bien vous êtes sur un segment où la concurrence travaille à perte — et dans ce cas, ne la suivez pas. Beaucoup d’entreprises qui cassent les prix ne durent que le temps de découvrir leur propre calcul.",
    },
    {
      type: 'p',
      text: "Le bon réflexe n’est jamais de baisser le prix : c’est de justifier le prix — c’est tout l’objet de notre guide [Comment faire un devis qui fait signer](/guides/devis-qui-fait-signer). Un devis détaillé, qui montre ce qui est fourni, ce qui est posé, ce qui est garanti et ce qui est repris derrière, se défend beaucoup mieux qu’un montant global. C’est aussi le meilleur moyen de sortir du terrain de la comparaison ligne à ligne avec un concurrent qui, lui, n’a rien détaillé.",
    },
    {
      type: 'p',
      text: "Une fois vos paramètres posés — taux horaire, coefficient fournitures, temps standards par prestation —, le chiffrage devient mécanique. C’est exactement ce que fait MonDevisMinute : vos prix et vos articles sont enregistrés une fois, et vous produisez un devis complet en dictant le chantier à la voix depuis la voiture. Le calcul, lui, ne varie plus selon votre humeur ou l’heure de la journée.",
    },
  ],
  faq: [
    {
      q: 'Quel taux horaire pratiquer quand on démarre ?',
      a: "Faites le calcul plutôt que de copier un voisin : ses frais généraux, son matériel et sa productivité ne sont pas les vôtres. Un artisan seul qui démarre a souvent moins de frais fixes mais aussi beaucoup moins d’heures facturables, ce qui compense en grande partie. Refaites le calcul tous les six mois la première année, le temps de connaître vos vrais chiffres.",
    },
    {
      q: 'Faut-il facturer les déplacements séparément ?',
      a: "Les deux approches se défendent. Soit vous intégrez le temps de déplacement dans votre taux horaire, ce qui simplifie le devis mais pénalise les chantiers proches ; soit vous facturez un forfait de déplacement distinct, ce qui est plus juste et plus lisible. Dans tous les cas, le déplacement doit apparaître sur le devis s’il est facturé : le découvrir sur la facture est une source de litige classique.",
    },
    {
      q: 'Quelle marge viser dans le bâtiment ?',
      a: "Une marge nette de 8 à 15 % du chiffre d’affaires est un ordre de grandeur sain pour une entreprise artisanale. En dessous de 5 %, la moindre difficulté — un impayé, un chantier qui dérape, une panne de véhicule — se transforme en problème de trésorerie. Attention : cette marge se calcule après votre rémunération, pas à sa place.",
    },
    {
      q: 'Comment justifier un prix plus élevé qu’un concurrent ?',
      a: "En rendant visible ce que l’autre n’a pas écrit. Détaillez les marques et références posées, la dépose et l’évacuation, la protection des lieux, les garanties, le délai d’intervention, votre assurance décennale. Un client compare rarement des prix : il compare ce qu’il comprend. Le devis le plus clair l’emporte souvent, même en étant plus cher.",
    },
    {
      q: 'Dois-je faire payer mes devis ?',
      a: "Pour un chantier courant, non : le devis fait partie de l’acte commercial. Sachez simplement que dans le secteur du dépannage, de la réparation et de l’entretien du bâtiment, vous devez indiquer explicitement au client, avant de le rédiger, si le devis est gratuit ou payant. En revanche, une étude longue — relevé complet, plans, chiffrage détaillé de plusieurs variantes — peut légitimement être facturée, à condition de l’annoncer avant. La formule qui passe le mieux consiste à déduire le montant de l’étude de la facture si le chantier se fait.",
    },
    {
      q: 'Comment gérer les travaux supplémentaires découverts en cours de chantier ?',
      a: "En établissant systématiquement un devis complémentaire signé avant d’exécuter les travaux concernés. Les faire d’abord et les facturer ensuite est la première cause d’impayés du bâtiment : le client conteste avoir demandé quoi que ce soit, et vous n’avez rien à produire. Un devis complémentaire d’une ligne, envoyé et accepté par SMS ou par e-mail, suffit à changer complètement votre position.",
    },
  ],
};
