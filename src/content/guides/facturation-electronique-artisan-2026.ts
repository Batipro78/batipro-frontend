import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'facturation-electronique-artisan-2026',
  title: "La facturation électronique expliquée aux artisans",
  h1: "Facturation électronique 2026-2027 : ce qu’un artisan doit vraiment faire",
  metaTitle: 'Facturation électronique artisan : dates et démarches 2026',
  metaDescription:
    'Calendrier, plateformes agréées, e-reporting, nouvelles mentions : ce que la facturation électronique change pour un artisan, même en micro-entreprise.',
  excerpt:
    "Beaucoup d’artisans pensent être hors sujet parce qu’ils travaillent pour des particuliers. C’est faux : la réforme les concerne tous, y compris en micro-entreprise. Voici les deux dates qui comptent, ce qu’il faut faire avant, et ce qui ne change pas.",
  category: 'Obligations légales',
  updated: '2026-07-21',
  related: [
    'mentions-obligatoires-facture-artisan',
    'se-faire-payer-artisan-impayes',
    'mentions-obligatoires-devis-batiment',
  ],
  blocks: [
    {
      type: 'p',
      text: "La réforme de la facturation électronique est le plus gros changement administratif que connaîtront les entreprises françaises depuis longtemps. Elle est aussi mal comprise, parce qu’elle a été reportée plusieurs fois et que le vocabulaire employé — plateforme agréée, e-reporting, format structuré, annuaire — n’évoque rien pour quelqu’un dont le métier est de poser du carrelage.",
    },
    {
      type: 'p',
      text: "Cet article vous explique ce qui vous concerne, ce qui ne vous concerne pas, et ce qu’il faut avoir fait avant chacune des deux échéances. Sans jargon, et en partant du cas le plus fréquent chez les artisans : quelqu’un qui facture surtout des particuliers, parfois quelques entreprises, et qui n’a aucune envie d’y passer ses soirées.",
    },

    { type: 'h2', text: 'Deux dates, et une seule vous met en retard' },
    {
      type: 'p',
      text: "Retenez ces deux échéances, elles structurent tout le reste.",
    },
    {
      type: 'table',
      head: ['Date', 'Ce qui devient obligatoire'],
      rows: [
        [
          '1er septembre 2026',
          'Toutes les entreprises, quelle que soit leur taille, doivent être capables de RECEVOIR des factures électroniques. Les grandes entreprises et les entreprises de taille intermédiaire doivent, elles, commencer à en ÉMETTRE.',
        ],
        [
          '1er septembre 2027',
          'Les micro, petites et moyennes entreprises doivent à leur tour ÉMETTRE leurs factures au format électronique. C’est votre échéance d’émission si vous êtes artisan.',
        ],
      ],
    },
    {
      type: 'p',
      text: "La nuance essentielle est là : en tant qu’artisan, vous avez jusqu’à septembre 2027 pour changer votre façon d’émettre des factures, mais vous devez être en mesure d’en recevoir dès septembre 2026. Autrement dit, la première échéance vous concerne aussi, même si elle est moins visible. Un fournisseur de matériel qui bascule en septembre 2026 vous enverra ses factures par une plateforme : si vous n’en avez pas désigné une, vous ne les recevez pas.",
    },
    {
      type: 'note',
      title: 'Le piège du « je verrai en 2027 »',
      text: "L’échéance qui vous exposera le plus tôt n’est pas celle de l’émission, mais celle de la réception. Vos fournisseurs — négoces, loueurs de matériel, grandes enseignes de matériaux — sont pour beaucoup des grandes entreprises. Ils basculeront en septembre 2026. Sans plateforme désignée de votre côté, vous risquez des factures d’achat qui n’arrivent jamais, donc de la TVA déductible perdue.",
    },

    { type: 'h2', text: 'Non, vous n’êtes pas dispensé parce que vous êtes en micro-entreprise' },
    {
      type: 'p',
      text: "C’est l’idée fausse la plus répandue. La réforme s’applique à tous les assujettis à la TVA établis en France, et la qualité d’assujetti ne dépend pas du fait de collecter effectivement de la TVA. Un micro-entrepreneur, un auto-entrepreneur ou une entreprise en franchise en base est un assujetti : il ne facture pas de TVA, mais il entre bien dans le champ de la réforme.",
    },
    {
      type: 'p',
      text: "Concrètement, un artisan en franchise en base devra lui aussi désigner une plateforme, recevoir ses factures d’achat par ce canal à partir de septembre 2026, et émettre ses factures aux clients professionnels au format structuré à partir de septembre 2027. Le fait de ne pas facturer de TVA ne change rien à l’obligation.",
    },

    { type: 'h2', text: 'Ce qui change quand vous facturez un particulier' },
    {
      type: 'p',
      text: "Voici le point qui rassure la plupart des artisans, et qu’il faut comprendre correctement pour ne pas se croire dispensé de tout.",
    },
    {
      type: 'p',
      text: "La facturation électronique proprement dite — l’envoi d’une facture structurée par une plateforme — concerne les opérations réalisées entre entreprises établies en France et assujetties à la TVA. Vos chantiers pour des particuliers n’entrent pas dans ce cadre. Vous continuerez à leur remettre une facture classique, papier ou PDF, comme aujourd’hui.",
    },
    {
      type: 'p',
      text: "En revanche, ces opérations basculent dans un autre dispositif : l’e-reporting, c’est-à-dire la transmission à l’administration des données de transaction. Pour les ventes et prestations réalisées auprès de personnes non assujetties — les particuliers, mais aussi les associations —, vous devrez transmettre des données cumulées par jour, permettant de déterminer votre chiffre d’affaires ventilé par taux de TVA et le montant de TVA correspondant. Cette transmission passe elle aussi par votre plateforme, et suit le même calendrier que la facturation électronique.",
    },
    {
      type: 'p',
      text: "Résumons pour un artisan type : vos factures aux particuliers restent des factures ordinaires, mais leurs données partent à l’administration ; vos factures aux entreprises deviennent des factures électroniques structurées ; et vos factures d’achat vous arrivent par plateforme. Les trois flux passent par le même outil.",
    },

    { type: 'h2', text: 'Une facture électronique, ce n’est pas un PDF' },
    {
      type: 'p',
      text: "C’est le malentendu technique le plus courant. Vous envoyez déjà vos factures en PDF par e-mail, et vous avez donc le sentiment d’être « en électronique ». Au sens de la réforme, ce n’est pas le cas : un PDF est une image de facture, lisible par un humain mais pas exploitable automatiquement par une machine.",
    },
    {
      type: 'p',
      text: "Une facture électronique au sens légal contient des données structurées : le montant, le taux de TVA, l’identifiant du client, la date, ne sont plus seulement imprimés, ils sont codés dans un format que le logiciel du destinataire et l’administration peuvent lire sans intervention humaine. Trois formats sont admis, et un seul intéresse vraiment les artisans.",
    },
    {
      type: 'list',
      items: [
        "Factur-X : un fichier PDF classique, lisible normalement, dans lequel est glissé un fichier de données. C’est le format hybride, le plus confortable pour les petites entreprises, car votre client voit une facture normale.",
        "UBL et CII : des formats purement structurés, sans rendu visuel. Ils sont utilisés par les grandes structures et les échanges automatisés.",
      ],
    },
    {
      type: 'p',
      text: "Pour un artisan, la cible est donc Factur-X. Vous n’aurez rien à comprendre de ce format : c’est votre logiciel de facturation ou votre plateforme qui le produit. Ce qu’il faut vérifier, c’est que l’outil que vous utilisez sait le générer.",
    },

    { type: 'h2', text: 'La plateforme agréée : ce qu’il faut choisir, et quand' },
    {
      type: 'p',
      text: "La réforme repose sur un réseau de plateformes agréées par l’État — anciennement appelées plateformes de dématérialisation partenaires. Ce sont elles qui transportent les factures d’une entreprise à l’autre et qui transmettent les données à l’administration. Le portail public, lui, a été recentré sur deux fonctions : l’annuaire, qui permet de savoir vers quelle plateforme router une facture, et le rôle de concentrateur des données destinées à l’administration fiscale.",
    },
    {
      type: 'p',
      text: "La conséquence pratique est simple : chaque entreprise doit choisir au moins une plateforme agréée. Ce n’est pas optionnel, et il n’existe pas de circuit gratuit qui permettrait de s’en passer. La liste officielle des plateformes immatriculées est publiée sur impots.gouv.fr ; c’est la seule source à consulter, car des prestataires se présentent parfois comme agréés sans l’être.",
    },
    {
      type: 'p',
      text: "Comment choisir sans y passer trois soirées ? Trois questions suffisent dans la plupart des cas. Est-ce que mon logiciel de devis et de facturation actuel est déjà connecté à une plateforme, ou en propose-t-il une ? Combien cela coûte-t-il par mois, et le tarif dépend-il du nombre de factures ? Est-ce que je peux, depuis cette plateforme, à la fois émettre, recevoir et faire mon e-reporting sans ressaisir quoi que ce soit ?",
    },
    {
      type: 'p',
      text: "Si la réponse à la première question est oui, votre décision est probablement déjà prise, et c’est la meilleure situation : vous continuez à travailler comme aujourd’hui, la conformité se fait derrière. Nous détaillons les options concrètes, dont le portail public Chorus Pro pour les marchés publics, sur notre page [Envoyer une facture en Factur-X](/facture-electronique).",
    },

    { type: 'h2', text: 'Les quatre nouvelles mentions à ajouter sur vos factures' },
    {
      type: 'p',
      text: "Quatre mentions viennent s’ajouter à celles déjà obligatoires. Elles s’imposent aux grandes entreprises et aux entreprises de taille intermédiaire à compter du 1er septembre 2026, et aux PME, TPE et micro-entreprises à compter du 1er septembre 2027 — c’est-à-dire en même temps que votre propre obligation d’émettre :",
    },
    {
      type: 'steps',
      items: [
        "Le numéro SIREN de votre client. C’est lui qui permettra à l’annuaire de router la facture vers la bonne plateforme : sans SIREN correct, la facture ne trouve pas son destinataire.",
        "L’adresse de livraison des biens lorsqu’elle diffère de l’adresse de facturation — en pratique, pour le bâtiment, l’adresse du chantier.",
        "L’indication du type d’opération : livraisons de biens uniquement, prestations de services uniquement, ou les deux. La plupart des chantiers avec fourniture et pose relèvent de la troisième catégorie.",
        "La mention « Option pour le paiement de la taxe d’après les débits » si vous avez exercé cette option.",
      ],
    },
    {
      type: 'p',
      text: "Ces quatre mentions viennent s’ajouter à celles déjà exigées : la liste complète figure dans notre guide [Facture d’artisan : toutes les mentions obligatoires](/guides/mentions-obligatoires-facture-artisan). Elles ne sont pas cosmétiques. Dans un circuit automatisé, une donnée manquante ou mal formée peut provoquer le rejet de la facture par la plateforme du destinataire. Une facture rejetée est une facture non émise : elle ne déclenche aucun délai de paiement, et vous ne l’apprenez parfois qu’au moment de la relance.",
    },

    { type: 'h2', text: 'Le bénéfice qu’on ne vous vend jamais : les délais de paiement' },
    {
      type: 'p',
      text: "La réforme est présentée comme une contrainte, et elle en est une. Mais elle apporte aussi quelque chose de très concret aux petites entreprises : la traçabilité du statut des factures.",
    },
    {
      type: 'p',
      text: "Dans le circuit électronique, une facture porte des statuts successifs — déposée, reçue par la plateforme du client, prise en charge, approuvée, mise en paiement. Vous savez donc à quel moment votre facture a réellement atteint votre client, et vous perdez du même coup l’argument le plus utilisé au monde par les mauvais payeurs : « je ne l’ai jamais reçue ».",
    },
    {
      type: 'p',
      text: "Pour un artisan qui court après ses règlements, ce point vaut à lui seul le coût de la plateforme. Il transforme une discussion invérifiable en fait daté, ce qui change la nature de la relance.",
    },

    { type: 'h2', text: 'Votre plan d’action, dans l’ordre' },
    {
      type: 'steps',
      items: [
        "Vérifiez comment vous facturez aujourd’hui. Si vous êtes encore sur un tableur ou sur un carnet, le passage sera plus lourd : commencez par un outil de facturation, indépendamment de la réforme.",
        "Demandez à votre éditeur de logiciel s’il sera connecté à une plateforme agréée, et à quelles conditions tarifaires. C’est la question à poser en premier, elle évite souvent tout le reste du travail.",
        "Choisissez et déclarez votre plateforme avant l’été 2026, sans attendre la rentrée. Les plateformes connaîtront un afflux à l’approche de l’échéance, et l’inscription demande des vérifications d’identité.",
        "Constituez le fichier SIREN de vos clients professionnels. Le numéro SIREN devenant une mention obligatoire, autant le collecter tranquillement au fil des chantiers plutôt qu’en urgence.",
        "Vérifiez que votre modèle de facture contient les quatre nouvelles mentions, et adaptez-le si nécessaire.",
        "Testez l’émission d’une vraie facture électronique vers un client professionnel volontaire dès que votre plateforme le permet, sans attendre septembre 2027.",
      ],
    },
    {
      type: 'p',
      text: "Un mot enfin sur la tentation de ne rien faire. Le calendrier a déjà été repoussé, et beaucoup en concluent qu’il le sera encore. C’est un pari risqué : la réception au 1er septembre 2026 concerne toutes les entreprises sans distinction de taille, et vos fournisseurs, eux, se préparent. Le coût d’anticiper est faible — quelques euros par mois et une heure de paramétrage. Le coût d’être pris de court est une comptabilité désorganisée en pleine saison.",
    },
    {
      type: 'p',
      text: "Sur le dépannage, où l’on facture souvent sur place, les contraintes se cumulent avec celles décrites dans notre guide [Dépannage et urgence : les règles à respecter](/guides/devis-depannage-urgence-regles). MonDevisMinute produit vos devis et vos factures avec l’intégralité des mentions légales, et permet de transformer un devis accepté en facture en un clic. C’est le socle indispensable : une facturation propre et structurée, sur laquelle le passage au format électronique se greffe sans reprendre tout votre fonctionnement.",
    },
  ],
  faq: [
    {
      q: 'Je ne facture que des particuliers. Suis-je concerné ?',
      a: "Oui, mais pas de la même façon. Vos factures aux particuliers ne deviennent pas des factures électroniques : vous continuerez à les remettre en papier ou en PDF. En revanche, vous devrez transmettre à l’administration les données de ces transactions par l’intermédiaire d’une plateforme — c’est l’e-reporting. Et vous devrez pouvoir recevoir les factures électroniques de vos fournisseurs dès le 1er septembre 2026.",
    },
    {
      q: 'Suis-je concerné en micro-entreprise ou en franchise en base de TVA ?',
      a: "Oui. La réforme vise tous les assujettis à la TVA établis en France, qu’ils collectent la TVA ou non. Un micro-entrepreneur en franchise en base est un assujetti : il doit désigner une plateforme, recevoir ses factures électroniques à partir de septembre 2026 et émettre au format structuré à partir de septembre 2027.",
    },
    {
      q: 'Un PDF envoyé par e-mail suffira-t-il ?',
      a: "Non, pas au sens de la réforme. Une facture électronique doit contenir des données structurées lisibles par une machine. Le format le plus adapté aux petites entreprises est Factur-X, qui est un PDF normal contenant en plus un fichier de données : votre client voit une facture ordinaire, la machine lit les données. C’est votre logiciel ou votre plateforme qui le génère, vous n’avez pas à vous en occuper techniquement.",
    },
    {
      q: 'Combien coûte une plateforme agréée ?',
      a: "Les tarifs varient selon les prestataires et le volume de factures ; il s’agit généralement d’un abonnement mensuel de quelques euros à quelques dizaines d’euros pour une petite structure. Comparez sur trois points : le prix, le fait que l’émission, la réception et l’e-reporting soient inclus, et l’intégration avec le logiciel que vous utilisez déjà. La liste officielle des plateformes immatriculées est publiée sur impots.gouv.fr.",
    },
    {
      q: 'Que se passe-t-il si je ne fais rien d’ici septembre 2027 ?',
      a: "Vous vous exposez d’abord à un problème pratique : vos clients professionnels ne pourront plus traiter vos factures, et certains refuseront de les payer tant qu’elles ne parviennent pas par le circuit prévu. S’y ajoutent les sanctions applicables aux manquements aux règles de facturation. Le vrai risque n’est pas l’amende, c’est l’arrêt des règlements de vos clients professionnels.",
    },
    {
      q: 'Dois-je changer de logiciel de facturation ?',
      a: "Pas nécessairement. La bonne démarche est de demander à votre éditeur actuel s’il sera connecté à une plateforme agréée et à quel prix. S’il l’est, vous ne changez rien à vos habitudes. S’il ne prévoit rien, vous avez le temps de migrer — mais faites-le avant l’échéance, pas pendant.",
    },
  ],
};
