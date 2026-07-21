import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'se-faire-payer-artisan-impayes',
  title: 'Se faire payer : acomptes, relances et impayés',
  h1: 'Se faire payer quand on est artisan : acompte, pénalités, relance et recouvrement',
  metaTitle: 'Impayés artisan : acompte, pénalités et recouvrement',
  metaDescription:
    'Sécuriser un chantier et récupérer une facture impayée : acompte, garantie de paiement, pénalités, mise en demeure, injonction de payer, prescription.',
  excerpt:
    "Un impayé n’est presque jamais une surprise : il se joue au moment du devis, pas au moment de la relance. Voici comment sécuriser un chantier avant de le commencer, et quoi faire, dans l’ordre, quand la facture n’est toujours pas réglée.",
  category: 'Se faire payer',
  updated: '2026-07-21',
  related: [
    'chiffrer-un-devis-btp',
    'mentions-obligatoires-facture-artisan',
    'devis-signe-valeur-juridique',
  ],
  blocks: [
    {
      type: 'p',
      text: "Un chantier impayé de 4 000 € ne vous coûte pas 4 000 €. Il vous coûte les matériaux que vous avez avancés, les heures que vous avez travaillées, la TVA que vous avez peut-être déjà déclarée, les heures que vous allez passer à relancer, et le chantier que vous n’avez pas pris pendant ce temps. Sur une entreprise artisanale qui dégage 10 % de marge, il faut environ 40 000 € de chiffre d’affaires supplémentaire pour effacer la perte. C’est pour cela que le sujet mérite mieux qu’un coup de fil agacé.",
    },
    {
      type: 'p',
      text: "La bonne nouvelle, c’est que la plupart des impayés se préviennent. Ce guide traite d’abord de ce qui se joue avant le chantier — c’est là que tout se décide — puis de la marche à suivre quand la facture reste impayée malgré tout.",
    },

    { type: 'h2', text: 'Tout se joue avant le premier coup de perceuse' },
    { type: 'h3', text: 'L’acompte, votre premier filtre' },
    {
      type: 'p',
      text: "Aucun texte ne vous impose de demander un acompte, et aucun texte n’interdit d’en prévoir un. C’est une clause contractuelle : dès lors qu’elle figure sur le devis et que le client le signe, elle s’impose. Un acompte de 30 % à la commande, avec un solde à la réception, est la pratique la plus courante dans le bâtiment. Sur les chantiers longs ou à forte part de fourniture, un échéancier en trois temps — commande, mi-parcours, réception — est plus prudent.",
    },
    {
      type: 'p',
      text: "Attention, en revanche, au moment où vous l’encaissez. Lorsque le devis est signé ailleurs que dans vos locaux — donc chez la plupart de vos clients particuliers —, l’article L221-10 du code de la consommation interdit de recevoir un paiement, quelle qu’en soit la forme, avant l’expiration d’un délai de sept jours à compter de la conclusion du contrat. Cette interdiction vise aussi l’exécution de la prestation, et elle est assortie de sanctions pénales lourdes. Elle ne se confond pas avec le délai de rétractation de quatorze jours : ce sont deux délais distincts, de durées différentes.",
    },
    {
      type: 'note',
      title: 'Prévoir l’acompte, oui — l’encaisser tout de suite, non',
      text: "Faites signer le devis avec sa clause d’acompte, puis encaissez à partir du huitième jour. L’exception existe pour les travaux d’entretien ou de réparation à réaliser en urgence au domicile du client et expressément sollicités par lui, dans la limite de ce qui est strictement nécessaire pour répondre à l’urgence : là, vous pouvez encaisser immédiatement.",
    },
    {
      type: 'p',
      text: "Au-delà de la trésorerie, l’acompte remplit une fonction de filtre que beaucoup sous-estiment. Un client qui accepte de verser un acompte a engagé de l’argent : il a fait le pas psychologique du client, il annule beaucoup moins, il conteste beaucoup moins. Un client qui refuse tout acompte sur un chantier conséquent vous donne une information précieuse et gratuite. Ce n’est pas toujours un mauvais payeur — mais c’est un signal à ne pas ignorer.",
    },
    {
      type: 'p',
      text: "N’oubliez pas d’émettre une facture d’acompte dès l’encaissement : elle est obligatoire, et pour les prestations de services, elle rend la TVA exigible sur le montant reçu. Les règles complètes sont détaillées dans notre guide [Mentions obligatoires d’une facture d’artisan](/guides/mentions-obligatoires-facture-artisan).",
    },
    { type: 'h3', text: 'La garantie de paiement que la loi vous accorde' },
    {
      type: 'p',
      text: "C’est un droit largement méconnu des artisans. Dans les marchés de travaux privés, le maître de l’ouvrage doit garantir le paiement des sommes dues au-delà d’un seuil fixé à 12 000 € hors taxes. Si le chantier est financé par un prêt spécifique, l’établissement prêteur ne verse les fonds qu’après paiement de votre créance. S’il n’y a pas de crédit spécifique, ou seulement en partie, le maître d’ouvrage doit fournir un cautionnement solidaire délivré par un établissement de crédit, une société de financement, une entreprise d’assurance ou un organisme de garantie.",
    },
    {
      type: 'p',
      text: "Et si cette garantie n’est pas fournie ? Vous pouvez surseoir à l’exécution du contrat après une mise en demeure restée sans effet à l’issue d’un délai de quinze jours. Autrement dit, la loi vous autorise à arrêter le chantier — ce qui, en temps normal, vous exposerait à des dommages et intérêts.",
    },
    {
      type: 'note',
      title: 'La limite à connaître avant de la brandir',
      text: "Cette obligation de cautionnement ne s’applique pas lorsque le maître de l’ouvrage conclut le marché pour son propre compte et pour la satisfaction de besoins ne relevant pas d’une activité professionnelle. Autrement dit : pas contre un particulier qui fait rénover son logement. La garantie de paiement est un outil de marchés privés professionnels — promoteurs, bailleurs, entreprises — pas de chantiers chez les particuliers.",
    },
    { type: 'h3', text: 'Les mentions qui arment votre facture' },
    {
      type: 'p',
      text: "Trois lignes changent votre position de créancier, et elles sont d’ailleurs obligatoires entre professionnels : la date à laquelle le règlement doit intervenir, le taux des pénalités de retard applicable, et la mention de l’indemnité forfaitaire de 40 € pour frais de recouvrement.",
    },
    {
      type: 'p',
      text: "À défaut de stipulation contractuelle, le taux des pénalités correspond au taux directeur semestriel de la Banque centrale européenne, en vigueur au 1er janvier ou au 1er juillet, majoré de dix points. Vous pouvez fixer un taux différent dans vos conditions, à condition qu’il ne soit pas inférieur à trois fois le taux d’intérêt légal. L’indemnité de 40 €, elle, est due de plein droit dès le premier jour de retard, sans qu’il soit besoin de la réclamer.",
    },
    {
      type: 'p',
      text: "Ces mentions ne servent pas seulement à encaisser des pénalités — la plupart du temps, vous ne les réclamerez pas. Elles servent à faire savoir, dès le départ, que vous tenez vos comptes. C’est un signal de sérieux, et il coûte trois lignes.",
    },
    { type: 'h3', text: 'Les délais que vous pouvez accorder' },
    {
      type: 'p',
      text: "Entre professionnels, à défaut d’accord entre les parties, le délai de règlement est de trente jours à compter de la réception des marchandises ou de l’exécution de la prestation. C’est la règle qui s’applique si vous n’avez pas de conditions générales de vente — autant le savoir. Lorsqu’un délai est convenu, il ne peut pas dépasser soixante jours nets à compter de l’émission de la facture. Une clause particulière, à condition d’être prévue au contrat, permet un délai de quarante-cinq jours fin de mois. Ces plafonds sont d’ordre public : un client qui vous impose quatre-vingt-dix jours est en infraction, quel que soit son poids commercial.",
    },
    {
      type: 'p',
      text: "Avec un particulier, la liberté est totale, et l’usage dans le bâtiment est le paiement à réception. Ne le laissez pas implicite : écrivez « paiement à réception de facture » sur le devis et sur la facture. Sans échéance écrite, une relance devient une conversation, et une conversation ne se prouve pas.",
    },

    { type: 'h2', text: 'La facture n’est pas payée : la marche à suivre' },
    {
      type: 'p',
      text: "L’escalade se fait par paliers, et l’erreur la plus fréquente est d’y entrer trop tard. Chaque semaine qui passe réduit vos chances de recouvrement, parce que d’autres créanciers, eux, ont relancé plus tôt.",
    },
    {
      type: 'steps',
      items: [
        "Jour 1 après l’échéance : un appel, sur un ton neutre. « Bonjour, je vois que la facture 2026-114 n’est pas encore réglée, est-ce qu’il y a un souci sur le chantier ? » Cet appel règle une bonne moitié des retards, qui sont de simples oublis, et il vous apprend immédiatement s’il existe une contestation cachée.",
        "Jour 8 : une relance écrite, par e-mail, avec la facture en pièce jointe et une nouvelle date de règlement. L’écrit fait basculer le dossier du registre de la conversation à celui de la trace.",
        "Jour 20 : une deuxième relance écrite, qui rappelle explicitement les pénalités de retard applicables et l’indemnité de 40 € si le client est un professionnel.",
        "Jour 30 : une mise en demeure par lettre recommandée avec accusé de réception. Elle doit porter le mot « mise en demeure », rappeler la facture, le montant, l’échéance dépassée, et fixer un délai — huit à quinze jours — au-delà duquel vous engagerez une procédure. Entre professionnels, elle ne « déclenche » pas les pénalités — celles-ci courent de plein droit dès le lendemain de l’échéance, sans rappel ni mise en demeure — mais elle en constitue la preuve, et elle sera la première pièce du dossier judiciaire. Face à un particulier, en revanche, les intérêts au taux légal ne courent qu’à compter de la mise en demeure.",
        "Jour 45 : la procédure. Pour une créance non contestée, l’injonction de payer est la voie la plus rapide et la moins coûteuse : vous déposez une requête accompagnée de vos pièces — devis signé, facture, preuve de livraison, mise en demeure — auprès du tribunal compétent, et le juge peut rendre une ordonnance sans audience. Si le client conteste au fond, l’affaire bascule en procédure classique.",
      ],
    },
    {
      type: 'p',
      text: "Une variante utile lorsque la créance est solide et que l’urgence est réelle : le référé provision. Il permet d’obtenir rapidement une décision exécutoire lorsque l’obligation n’est pas sérieusement contestable. C’est la voie à envisager quand le client conteste pour gagner du temps plutôt que pour un motif réel.",
    },
    {
      type: 'p',
      text: "Le recours à un commissaire de justice — l’ancien huissier — est souvent plus efficace qu’on ne le pense, y compris avant toute procédure. Une lettre à en-tête d’une étude produit un effet que vos propres relances n’auront jamais, pour un coût modeste.",
    },

    { type: 'h2', text: 'Le piège du délai de deux ans' },
    {
      type: 'p',
      text: "Voici le point qui coûte le plus cher aux artisans qui laissent traîner. L’action des professionnels pour les biens ou les services qu’ils fournissent aux consommateurs se prescrit par deux ans. Passé ce délai, votre créance existe toujours mais vous ne pouvez plus la faire valoir en justice.",
    },
    {
      type: 'p',
      text: "Deux ans, sur un chantier chez un particulier, cela passe très vite : quelques relances espacées, un client qui promet de régler « le mois prochain », une saison chargée, et le délai est consommé. Ce délai est d’ordre public : vous ne pouvez pas l’allonger, même avec l’accord du client.",
    },
    {
      type: 'p',
      text: "Entre professionnels, le délai de droit commun est de cinq ans, ce qui laisse davantage de marge — mais l’attente reste une mauvaise stratégie, puisque la solvabilité du débiteur, elle, se dégrade avec le temps.",
    },
    {
      type: 'p',
      text: "Retenez le principe pratique : une facture impayée depuis plus de six mois doit être soit engagée en procédure, soit passée en perte comptable. Et rappelez-vous que la solidité de votre dossier se construit au moment du devis, pas au moment de la relance : voyez [Devis signé : ce qui vous engage vraiment](/guides/devis-signe-valeur-juridique). Un dossier qui dort sur un coin de bureau ne se transforme jamais en encaissement.",
    },

    { type: 'h2', text: 'Le cas de la sous-traitance : votre recours contre le maître d’ouvrage' },
    {
      type: 'p',
      text: "Si vous intervenez comme sous-traitant et que l’entreprise principale ne vous règle pas, vous n’êtes pas prisonnier de la relation avec elle. La loi du 31 décembre 1975 relative à la sous-traitance vous ouvre une action directe contre le maître de l’ouvrage. L’acceptation du sous-traitant et l’agrément de ses conditions de paiement sont une obligation qui pèse sur l’entrepreneur principal et sur le maître d’ouvrage ; leur absence complique sérieusement l’exercice de ce recours, sans nécessairement le fermer.",
    },
    {
      type: 'p',
      text: "Le mécanisme est le suivant : vous mettez en demeure l’entrepreneur principal de vous payer ; si cette mise en demeure reste sans effet pendant un mois, vous pouvez réclamer directement le paiement au maître de l’ouvrage, dans la limite de ce que celui-ci doit encore à l’entrepreneur principal. C’est un levier puissant, notamment lorsque l’entreprise principale traverse des difficultés.",
    },
    {
      type: 'p',
      text: "D’où l’importance de la formalité initiale, souvent négligée sur les petits lots : faites-vous accepter comme sous-traitant et faites agréer vos conditions de paiement par écrit, avant de commencer. Un sous-traitant non déclaré se retrouve dans une position nettement plus fragile, et devra faire trancher sa situation au lieu de se prévaloir d’un dossier clair.",
    },

    { type: 'h2', text: 'Ce qu’il ne faut pas faire' },
    {
      type: 'list',
      items: [
        "Arrêter le chantier sur un coup de tête. Sauf dans les cas prévus — absence de garantie de paiement après mise en demeure de quinze jours, non-paiement d’une échéance contractuelle —, l’interruption vous met en tort et vous expose à des dommages et intérêts.",
        "Reprendre le matériel posé. Une fois incorporé à l’immeuble, il ne vous appartient plus. Une clause de réserve de propriété ne survit pas à l’incorporation.",
        "Menacer d’un affichage public, d’un avis en ligne ou d’une publication sur les réseaux. Vous basculez dans un autre registre juridique, et la position se retourne contre vous.",
        "Renoncer à facturer pour « ne pas envenimer ». Une prestation réalisée doit être facturée : le défaut de facturation est en lui-même sanctionné, et il vous prive de toute preuve de créance.",
        "Accepter un échéancier verbal. Si vous accordez un délai, formalisez-le par écrit avec des dates et des montants. Un échéancier écrit et signé qui n’est pas respecté renforce votre dossier ; un accord oral l’affaiblit.",
      ],
    },

    { type: 'h2', text: 'Le tableau de bord minimal' },
    {
      type: 'p',
      text: "Se faire payer est d’abord une affaire d’organisation. Trois informations suffisent, à condition de les avoir sous les yeux : quelles factures sont émises, lesquelles sont échues, et depuis combien de jours. Un artisan qui consulte cette liste une fois par semaine, dix minutes le vendredi, relance au bon moment et n’atteint jamais le stade du contentieux sur la majorité de ses dossiers.",
    },
    {
      type: 'p',
      text: "C’est ce que permet un suivi tenu au fil de l’eau plutôt qu’un classeur retrouvé à la fin du trimestre. Dans MonDevisMinute, chaque devis accepté devient une facture en un clic, chaque facture porte son statut, et vous voyez d’un coup d’œil ce qui est en attente de règlement. Le recouvrement ne devient un métier que lorsqu’on a laissé la situation se dégrader ; en amont, ce n’est qu’une habitude.",
    },
  ],
  faq: [
    {
      q: 'Puis-je demander un acompte de 50 % ?',
      a: "Oui. Le montant de l’acompte est libre : c’est une clause contractuelle qui s’impose dès lors qu’elle figure sur le devis signé. Dans le bâtiment, 30 % à la commande est la pratique la plus répandue, mais un acompte plus élevé se justifie sur un chantier à forte part de fourniture ou avec des matériaux commandés sur mesure. Au-delà, le client risque de comparer défavorablement avec la concurrence.",
    },
    {
      q: 'Le client refuse de payer en invoquant une malfaçon. Que faire ?',
      a: "Ne restez pas sur le terrain de la parole. Demandez par écrit la description précise du désordre, retournez le constater et rédigez un compte rendu de visite. Si le grief est fondé, reprenez le travail sans discuter : c’est la voie la plus rapide vers le paiement. S’il ne l’est pas, votre écrit devient une pièce. Et si la contestation ne porte que sur une partie du chantier, réclamez le règlement du solde non contesté : rien n’oblige un client à tout retenir pour un désordre limité.",
    },
    {
      q: 'Combien coûte une injonction de payer ?',
      a: "C’est la voie la moins chère : la requête donne lieu à des frais de greffe modestes, et le recours à un avocat n’est pas obligatoire selon les montants et la juridiction. Si l’ordonnance est rendue, les frais de procédure sont en principe mis à la charge du débiteur. Le principal coût reste le temps de constitution du dossier — d’où l’intérêt d’avoir conservé devis signé, facture et accusé de réception de la mise en demeure.",
    },
    {
      q: 'Puis-je facturer des pénalités de retard à un particulier ?',
      a: "Oui, si elles ont été prévues au contrat, donc annoncées sur le devis accepté puis rappelées sur la facture. L’obligation légale de mentionner les pénalités concerne les relations entre professionnels, mais rien ne vous empêche de les prévoir avec un particulier — à condition qu’elles restent raisonnables et qu’elles aient bien été portées à sa connaissance avant la signature. L’indemnité forfaitaire de 40 €, elle, ne s’applique qu’entre professionnels.",
    },
    {
      q: 'Que faire si mon client est en liquidation judiciaire ?',
      a: "Déclarez votre créance auprès du mandataire judiciaire dans le délai imparti, généralement deux mois à compter de la publication du jugement au BODACC. Une créance non déclarée dans les délais devient inopposable à la procédure : vous ne toucherez rien, même si votre facture est parfaitement fondée. C’est une démarche simple mais impérativement à faire dans les temps.",
    },
    {
      q: 'Mon client particulier ne paie pas depuis un an et demi. Est-ce trop tard ?',
      a: "Non, mais il est urgent d’agir. L’action d’un professionnel contre un consommateur se prescrit par deux ans, et ce délai ne peut pas être allongé. Envoyez immédiatement une mise en demeure par lettre recommandée et engagez la procédure sans attendre : au-delà du délai, la créance devient impossible à faire valoir en justice.",
    },
  ],
};
