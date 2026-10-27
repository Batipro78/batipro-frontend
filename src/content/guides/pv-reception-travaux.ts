import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'pv-reception-travaux',
  title: "PV de réception des travaux",
  h1: "PV de réception des travaux : modèle, réserves et signature, le guide de l’artisan",
  metaTitle: "PV de réception des travaux : modèle, réserves, signature",
  metaDescription:
    "Procès-verbal de réception des travaux : contenu, modèle à recopier, réserves et levée, refus de signer, réception tacite. Le guide de l’artisan.",
  excerpt:
    "Le chantier est fini, le client est content, et vous repartez sans rien faire signer. Le procès-verbal de réception tient sur une page, et c’est lui qui fait démarrer les garanties et sécurise votre solde.",
  category: 'Obligations légales',
  updated: '2026-10-27',
  related: [
    'devis-signe-valeur-juridique',
    'retenue-de-garantie-travaux',
    'garantie-parfait-achevement-biennale',
  ],
  blocks: [
    {
      type: 'p',
      text: "Dernier jour de chantier. Vous rangez l’outillage, le client fait le tour des pièces, tout lui plaît, vous vous serrez la main. Quelques semaines plus tard, il découvre une plinthe fendue, et vous n’avez aucune trace de ce qui était convenu ce jour-là.",
    },
    {
      type: 'p',
      text: "Ce scénario se règle avec une seule feuille : le procès-verbal de réception. Il dit noir sur blanc que le client a vu l’ouvrage, qu’il l’accepte, et à quelles conditions. Ce guide explique à quoi sert la réception, ce que le procès-verbal doit contenir, comment gérer les réserves, et ce qui se passe quand le client ne veut pas signer.",
    },
    {
      type: 'image',
      src: '/guides/pv-reception-travaux.webp',
      alt: "Pièce rénovée et vide aux murs blancs, avec parquet en point de Hongrie, une porte blanche et une grande fenêtre ; au premier plan, un escabeau en bois portant une planchette à pince avec un formulaire vierge, un stylo et un trousseau de clés.",
      caption: "Avant de signer, on fait le tour de la pièce : le procès-verbal fixe ce que le client a vu et accepté ce jour-là.",
    },

    { type: 'h2', text: 'À quoi sert la réception des travaux' },
    {
      type: 'p',
      text: "Le Code civil la définit à l’article 1792-6 : la réception est l’acte par lequel le maître de l’ouvrage déclare accepter l’ouvrage, avec ou sans réserves. Elle intervient à la demande de la partie la plus diligente, soit à l’amiable, soit à défaut judiciairement. Elle est, en tout état de cause, prononcée contradictoirement.",
    },
    {
      type: 'p',
      text: "La réception sert à trois choses. Elle marque la fin du chantier et le moment où le client prend l’ouvrage en l’état. Elle fixe la liste de ce qui reste à reprendre, s’il y a lieu. Et elle donne une date de départ unique et incontestable, ce qui est précieux pour la suite. Nous détaillons les effets de la réception sur le contrat dans notre guide [Devis signé : valeur juridique et réception des travaux](/guides/devis-signe-valeur-juridique).",
    },

    { type: 'h2', text: 'Avec ou sans réserves' },
    {
      type: 'p',
      text: "Le client peut accepter l’ouvrage de deux façons. Sans réserve, il déclare que tout est conforme et qu’il n’a rien à signaler. Avec réserves, il accepte l’ouvrage tout en listant les défauts constatés, que vous vous engagez à reprendre.",
    },
    {
      type: 'p',
      text: "Les réserves ne sont pas un échec. Un chantier réceptionné avec trois réserves précises, reprises la semaine suivante, est un chantier terminé proprement. Le client sait ce qui sera repris, et vous savez exactement ce qui vous est demandé.",
    },
    {
      type: 'note',
      title: 'Un défaut visible non noté est un défaut accepté',
      text: "Un défaut visible au moment de la réception et non noté en réserve est en principe considéré comme accepté par le client : il ne pourra plus le réclamer ensuite au titre des garanties légales. C’est pourquoi, pour le client comme pour vous, il faut faire un tour complet du chantier, pièce par pièce, avant de signer.",
    },

    { type: 'h2', text: 'Ce que la signature fait démarrer' },
    {
      type: 'p',
      text: "La date de réception est le point de départ de trois garanties et d’un délai :",
    },
    {
      type: 'list',
      items: [
        "la garantie de parfait achèvement, d’un an à compter de la réception ;",
        "la garantie de bon fonctionnement, dite biennale, d’au moins deux ans à compter de la réception ;",
        "la garantie décennale, de dix ans à compter de la réception ;",
        "le délai d’un an de la retenue de garantie, lorsque le marché en prévoit une.",
      ],
    },
    {
      type: 'p',
      text: "Autrement dit, tout se compte à partir d’une seule date. Si elle est floue, tous les délais le sont. Vous trouverez le détail de ce que couvre chaque garantie dans notre guide sur [la garantie de parfait achèvement et la garantie biennale](/guides/garantie-parfait-achevement-biennale), et celui de la garantie décennale dans [le guide sur l’assurance décennale](/guides/assurance-decennale-artisan). Pour le mécanisme de la retenue, voyez [le guide sur la retenue de garantie](/guides/retenue-de-garantie-travaux).",
    },

    { type: 'h2', text: 'Le PV de réception est-il obligatoire ?' },
    {
      type: 'p',
      text: "Il n’existe pas de formulaire officiel obligatoire. Le procès-verbal de réception est un écrit daté et signé par les deux parties, et rien de plus. Vous pouvez le rédiger vous-même sur une feuille, sur un document de votre entreprise ou sur un modèle que vous réutilisez d’un chantier à l’autre.",
    },

    { type: 'h2', text: 'Le modèle de PV à recopier' },
    {
      type: 'p',
      text: "Voici les rubriques à reprendre, dans cet ordre. Une page suffit.",
    },
    {
      type: 'steps',
      items: [
        "Les parties : votre nom ou raison sociale et votre adresse, puis le nom et l’adresse du client, maître de l’ouvrage.",
        "Le chantier : l’adresse précise où les travaux ont été réalisés.",
        "Les travaux concernés : une description courte (par exemple « rénovation complète de la salle de bain ») avec la référence et la date du devis accepté, et celles des éventuels avenants.",
        "La date de réception : le jour même où le tour du chantier est fait et où le document est signé. Écrivez-la en toutes lettres ou en chiffres, mais ne la laissez jamais vide.",
        "La décision du client : soit la mention « Le maître de l’ouvrage déclare accepter l’ouvrage sans réserve », soit « avec les réserves suivantes », suivie de la liste numérotée.",
        "Pour chaque réserve : le lieu précis, le défaut constaté et le délai de levée convenu entre vous, par exemple « Chambre 2, plinthe fendue côté fenêtre, à remplacer avant le 14 novembre ».",
        "Les signatures : le nom, la date et la signature du client, puis les vôtres. Écrivez « lu et approuvé » si vous le souhaitez.",
      ],
    },
    {
      type: 'p',
      text: "Faites deux exemplaires originaux signés, un pour chacun. Conservez l’original, et classez-le avec le devis, les avenants et les factures du chantier.",
    },

    { type: 'h2', text: 'Rédiger des réserves précises' },
    {
      type: 'p',
      text: "Une réserve vague est une réserve inutile, pour vous comme pour le client. Si le procès-verbal indique « finitions à reprendre », personne ne sait de quelles finitions il s’agit. Le client pourra en réclamer de nouvelles au fil des mois en disant qu’elles étaient comprises dans la formule, et vous aurez du mal à prouver le contraire.",
    },
    {
      type: 'table',
      head: ['Réserve trop vague', 'Réserve exploitable'],
      rows: [
        ['Finitions à reprendre', 'Salon, angle nord-est : retouche de peinture sur 1 m² au-dessus de la plinthe'],
        ['Problème sur la porte', 'Chambre 1, porte intérieure : la porte frotte au sol, rabot à prévoir'],
        ['Joints à revoir', 'Salle de bain, mur de la douche : joint de carrelage manquant sur trois carreaux'],
        ['À voir plus tard', 'Prise du couloir : à tester et à remplacer si elle ne fonctionne pas, avant le 20 novembre'],
      ],
    },

    { type: 'h2', text: 'La levée des réserves' },
    {
      type: 'p',
      text: "Une fois les reprises faites, il faut le constater par écrit. Ne vous contentez pas d’un « c’est bon » à la sortie du chantier. Rédigez un second document, daté et signé par les deux parties, qui indique que les réserves du procès-verbal du jour de la réception ont été levées, en reprenant chacune d’elles.",
    },
    {
      type: 'steps',
      items: [
        "Réaliser les reprises dans le délai convenu au procès-verbal.",
        "Inviter le client à constater, réserve par réserve, que le défaut a été corrigé.",
        "Faire signer un écrit daté qui renvoie au procès-verbal de réception et déclare chaque réserve levée.",
        "Archiver cet écrit avec le procès-verbal d’origine.",
      ],
    },
    {
      type: 'p',
      text: "Ce second écrit ne déplace pas la date de réception. Celle-ci reste celle du premier procès-verbal, et c’est à partir d’elle que courent les garanties. La levée des réserves vous sert surtout à clore le sujet sans ambiguïté, et à ne pas voir ces mêmes défauts réapparaître dans une réclamation.",
    },

    { type: 'h2', text: 'Le client refuse de signer' },
    {
      type: 'p',
      text: "Cela arrive : un client mécontent, ou qui prétend vouloir « attendre un peu » pour voir si tout fonctionne. Commencez par proposer une date de réception par écrit, de préférence en lettre recommandée, en indiquant que vous êtes disponible pour faire le tour du chantier ensemble.",
    },
    {
      type: 'p',
      text: "Si le désaccord persiste, la loi prévoit une issue : la réception intervient soit à l’amiable, soit à défaut judiciairement (article 1792-6). Concrètement, vous pouvez demander à la justice de prononcer la réception. Cette démarche suppose de rassembler des preuves que l’ouvrage est achevé : devis, photos datées, échanges écrits avec le client. Avant d’en arriver là, un dialogue sur les réserves règle la plupart des blocages : le client qui hésite à signer redoute souvent un défaut qu’il suffit de noter en réserve.",
    },

    { type: 'h2', text: 'La réception tacite et ses risques' },
    {
      type: 'p',
      text: "Sans procès-verbal, les tribunaux admettent parfois une réception dite « tacite », par exemple quand le client a pris possession des lieux et payé l’essentiel du prix. Cela ne veut pas dire que vous êtes tranquille : la réception tacite se discute et se prouve difficilement.",
    },
    {
      type: 'list',
      items: [
        "Vous ne savez pas à quelle date elle se situe : à l’emménagement, au paiement du solde, à un autre moment ? Or toutes les garanties se comptent à partir de cette date.",
        "Il faut la prouver, et le débat repart de zéro devant un juge à chaque litige.",
        "Aucune réserve n’a été formalisée : les défauts du jour de la fin de chantier ne sont pas établis, ce qui ouvre la porte aux discussions sans fin.",
      ],
    },

    { type: 'h2', text: 'Les erreurs les plus fréquentes' },
    {
      type: 'list',
      items: [
        "Des réserves vagues comme « finitions à reprendre » : personne ne sait ce qu’elles recouvrent, et le litige est assuré.",
        "Oublier la date : sans date, le point de départ des garanties est contestable, et le document perd l’essentiel de son intérêt.",
        "Ne pas garder d’exemplaire signé : le client conserve le sien, vous n’avez plus rien en main le jour où vous en avez besoin.",
        "Négliger la levée des réserves : les défauts sont repris, mais rien ne le prouve par écrit.",
      ],
    },

    { type: 'h2', text: 'Le bon enchaînement le jour de la fin du chantier' },
    {
      type: 'p',
      text: "Intégrez la réception à votre routine de fin de chantier : nettoyage, tour complet avec le client, procès-verbal signé, puis facture de solde.",
    },
    {
      type: 'p',
      text: "Côté facturation, l’application MonDevisMinute transforme un devis accepté en facture en un clic, ce qui vous permet d’enchaîner la réception et la facture de solde sans tout ressaisir.",
    },
  ],
  faq: [
    {
      q: 'Le PV de réception est-il obligatoire ?',
      a: "Il n’existe pas de formulaire officiel obligatoire, et la loi ne vous impose pas de modèle. Mais sans procès-verbal, la date de réception se discute et se prouve difficilement. Un écrit daté et signé par les deux parties évite ce débat.",
    },
    {
      q: 'Peut-on réceptionner les travaux avec des réserves ?',
      a: "Oui, c’est même courant. Le client accepte l’ouvrage tout en listant les défauts à reprendre, avec un délai de levée convenu. La réception est alors prononcée avec réserves et les garanties commencent à courir à cette date.",
    },
    {
      q: 'Comment prouver que les réserves ont été levées ?',
      a: "Par un second écrit daté et signé par les deux parties, qui renvoie au procès-verbal de réception et reprend chaque réserve levée. Gardez-le avec l’original du procès-verbal.",
    },
    {
      q: 'Que faire si le client refuse de signer le PV ?',
      a: "Proposez-lui par écrit une date de réception, de préférence en lettre recommandée. Si le blocage persiste, la loi prévoit que la réception puisse être prononcée judiciairement à défaut d’accord amiable. Rassemblez alors vos preuves d’achèvement : devis, photos datées, échanges écrits.",
    },
    {
      q: 'Qu’est-ce que la réception tacite ?',
      a: "C’est une réception que les tribunaux admettent parfois sans procès-verbal, par exemple quand le client a pris possession des lieux et payé l’essentiel du prix. Elle se discute et se prouve difficilement : un procès-verbal signé est beaucoup plus sûr.",
    },
  ],
};
