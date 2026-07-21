import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'mentions-obligatoires-facture-artisan',
  title: "Les mentions obligatoires d’une facture d’artisan",
  h1: "Facture d’artisan : toutes les mentions obligatoires (et les 4 nouvelles de 2026)",
  metaTitle: "Facture artisan : mentions obligatoires et nouveautés 2026",
  metaDescription:
    "Les mentions obligatoires d’une facture d’artisan du bâtiment : numérotation, TVA, autoliquidation, acompte, situation de travaux et sanctions.",
  excerpt:
    "Une facture non conforme, c’est 15 € d’amende par mention manquante — et surtout un client qui a un prétexte tout trouvé pour ne pas payer. Voici la liste complète, les règles propres au bâtiment (acompte, situation, autoliquidation) et les quatre nouvelles mentions qui arrivent avec la facturation électronique.",
  category: 'Obligations légales',
  updated: '2026-07-21',
  related: [
    'mentions-obligatoires-devis-batiment',
    'facturation-electronique-artisan-2026',
    'se-faire-payer-artisan-impayes',
    'devis-depannage-urgence-regles',
  ],
  blocks: [
    {
      type: 'p',
      text: "Le devis se discute, la facture s’exécute. C’est le document qui déclenche le paiement, qui fait naître la TVA, qui alimente votre comptabilité et qui, en cas de contrôle, prouve la réalité de votre activité. Autant dire qu’une facture approximative ne pose pas seulement un problème formel : elle donne à un client de mauvaise foi un argument commode pour retarder le règlement, et à l’administration une raison de vous sanctionner.",
    },
    {
      type: 'p',
      text: "La bonne nouvelle, c’est que la liste des mentions obligatoires est finie et connue. Une fois qu’elle est intégrée à votre modèle, le sujet est réglé pour de bon. Voici cette liste, complétée par les règles propres au bâtiment — facture d’acompte, situation de travaux, autoliquidation en sous-traitance — et par les quatre nouvelles mentions qui entrent en vigueur avec la réforme de la facturation électronique.",
    },

    { type: 'h2', text: 'Quand devez-vous émettre la facture ?' },
    {
      type: 'p',
      text: "La règle est simple et souvent négligée : la facture doit être émise dès la réalisation de la prestation ou la livraison des biens. Vous n’avez pas le droit d’attendre la fin du mois par confort, ni de facturer avec trois semaines de retard parce que vous étiez sur un autre chantier. En pratique, l’administration tolère l’émission à la fin du mois de réalisation pour les entreprises qui facturent au mois — mais pas au-delà.",
    },
    {
      type: 'p',
      text: "Facturer vite n’est pas qu’une obligation, c’est aussi la première règle de trésorerie du bâtiment. Une facture émise le jour de la fin du chantier, quand le client est encore satisfait de voir son installation fonctionner, se paie beaucoup plus facilement qu’une facture qui tombe six semaines plus tard, quand le souvenir du travail s’est estompé et qu’il ne reste que le montant à régler.",
    },
    {
      type: 'p',
      text: "La facture doit être établie en deux exemplaires au minimum : l’original pour le client, la copie pour vous. Vous devez conserver vos factures pendant dix ans au titre des obligations comptables — six ans au titre du contrôle fiscal, mais la durée comptable étant plus longue, c’est elle qui commande.",
    },

    { type: 'h2', text: 'Les mentions communes à toutes les factures' },
    { type: 'h3', text: 'Identification du document' },
    {
      type: 'list',
      items: [
        "La date d’émission de la facture",
        "Un numéro unique, fondé sur une séquence chronologique continue et sans trou",
        "La date de la vente ou de la fin d’exécution de la prestation, lorsqu’elle diffère de la date d’émission",
      ],
    },
    {
      type: 'p',
      text: "La numérotation mérite un mot. Elle doit être continue : pas de saut de numéro, pas de retour en arrière, pas de facture annulée qui disparaît. Si vous devez annuler une facture, vous n’effacez pas son numéro — vous émettez un avoir qui la neutralise. Un séquencement avec des trous est l’un des premiers signaux que cherche un vérificateur, parce que c’est la trace classique d’une facture sortie de la comptabilité.",
    },
    {
      type: 'p',
      text: "Vous pouvez utiliser des séries distinctes (par exemple un préfixe par année ou par établissement), à condition que chaque série soit elle-même continue. « 2026-001, 2026-002, 2026-003 » est parfaitement valable.",
    },

    { type: 'h3', text: 'Identification des parties' },
    {
      type: 'list',
      items: [
        "Votre dénomination sociale ou nom et prénom, ainsi que l’adresse du siège social",
        "Votre forme juridique et, pour les sociétés, le montant du capital social",
        "Votre numéro SIREN ou SIRET et votre numéro d’immatriculation au registre national des entreprises",
        "Votre numéro de TVA intracommunautaire si vous êtes assujetti",
        "Le nom et l’adresse du client, ainsi que l’adresse de facturation si elle est différente",
        "Le numéro de TVA intracommunautaire du client pour les opérations intracommunautaires et pour l’autoliquidation",
      ],
    },
    {
      type: 'p',
      text: "Une précision utile : pour les factures dont le montant hors taxes est inférieur ou égal à 150 €, la mention du numéro de TVA intracommunautaire du vendeur n’est pas exigée sur les opérations franco-françaises. Cela ne dispense pas des autres mentions.",
    },

    { type: 'h3', text: 'Détail de la prestation et des prix' },
    {
      type: 'list',
      items: [
        "La désignation précise et la quantité de chaque produit ou prestation",
        "Le prix unitaire hors taxes de chaque ligne",
        "Les éventuelles remises, ristournes ou rabais, ligne par ligne",
        "Le total hors taxes",
        "Le taux de TVA applicable, et le détail de la base et du montant de TVA lorsque plusieurs taux coexistent",
        "Le total toutes taxes comprises et le net à payer",
      ],
    },

    { type: 'h3', text: 'Conditions de règlement' },
    {
      type: 'list',
      items: [
        "La date à laquelle le règlement doit intervenir",
        "Les conditions d’escompte en cas de paiement anticipé — ou la mention explicite qu’aucun escompte n’est accordé",
        "Le taux des pénalités de retard applicable",
        "Pour les clients professionnels, la mention de l’indemnité forfaitaire de 40 € pour frais de recouvrement",
      ],
    },
    {
      type: 'p',
      text: "Ces trois dernières mentions sont obligatoires entre professionnels et souvent absentes des factures d’artisans ; nous expliquons comment s’en servir dans notre guide [Se faire payer quand on est artisan](/guides/se-faire-payer-artisan-impayes). Elles ne coûtent rien à ajouter et changent tout le jour où vous devez relancer : sans elles, réclamer des pénalités devient une négociation ; avec elles, c’est l’application d’un contrat accepté.",
    },

    { type: 'h3', text: 'Mentions propres à votre situation' },
    {
      type: 'list',
      items: [
        "« TVA non applicable, article 293 B du CGI » si vous relevez de la franchise en base",
        "L’assurance professionnelle obligatoire, les coordonnées de l’assureur ou du garant et la couverture géographique du contrat — obligatoire pour les entreprises artisanales depuis le 1er juillet 2023",
        "L’appartenance à un centre de gestion agréé et la mention d’acceptation des règlements par chèque, le cas échéant",
      ],
    },

    { type: 'h2', text: 'Les mentions spécifiques au bâtiment' },
    { type: 'h3', text: 'La mention TVA à taux réduit' },
    {
      type: 'p',
      text: "Pour appliquer un taux de 10 % ou de 5,5 % sur des travaux portant sur un logement achevé depuis plus de deux ans, le client doit certifier que les conditions sont réunies — le détail des trois taux et de leurs conditions figure dans notre guide [TVA sur les travaux : 20 %, 10 % ou 5,5 % ?](/guides/taux-tva-travaux-renovation). Depuis le 1er mars 2025, l’attestation dédiée a disparu au profit d’une simple mention portée sur le devis ou la facture. Vous devez conserver le document signé, c’est lui qui vous couvre en cas de contrôle. Si l’administration remet en cause le taux et que vous n’avez rien à produire, c’est vous qui payez le rattrapage de TVA, pas le client.",
    },

    { type: 'h3', text: 'L’autoliquidation en sous-traitance' },
    {
      type: 'p',
      text: "C’est la règle qui piège le plus d’artisans. Lorsque vous intervenez comme sous-traitant pour des travaux de construction — ce qui inclut la réparation, le nettoyage, l’entretien, la transformation et la démolition d’un bien immobilier — au profit d’un donneur d’ordre lui-même assujetti à la TVA, ce n’est pas vous qui collectez la TVA : c’est votre client qui la déclare et l’acquitte.",
    },
    {
      type: 'p',
      text: "Concrètement, vous facturez en hors taxes, sans ligne de TVA, et vous portez la mention « Autoliquidation » sur la facture. L’erreur classique consiste à facturer quand même la TVA au donneur d’ordre : celui-ci ne pourra pas la déduire, il vous la réclamera, et vous devrez émettre un avoir puis refacturer. L’erreur inverse — autoliquider alors que vous travaillez en direct pour le maître d’ouvrage — est plus grave encore, puisque vous omettez de collecter une TVA que vous devez.",
    },
    {
      type: 'note',
      title: 'Le test en une question',
      text: "Qui est votre client ? Si c’est une entreprise du bâtiment qui vous a confié une partie du chantier qu’elle a elle-même décroché, vous êtes sous-traitant : autoliquidation. Si c’est le propriétaire, le syndic ou le maître d’ouvrage directement, vous facturez la TVA normalement, même s’il y a d’autres entreprises sur le chantier.",
    },

    { type: 'h3', text: 'La facture d’acompte' },
    {
      type: 'p',
      text: "Dès que vous encaissez un acompte, vous devez émettre une facture d’acompte. Ce n’est pas une option : elle est obligatoire, elle porte son propre numéro dans votre séquence, et elle doit mentionner qu’il s’agit d’un acompte sur une commande identifiée.",
    },
    {
      type: 'p',
      text: "Sur le plan de la TVA, retenez que pour les prestations de services — donc pour l’essentiel de la main-d’œuvre du bâtiment — la TVA est exigible à l’encaissement. L’acompte encaissé déclenche donc la TVA sur son montant, indépendamment de l’avancement des travaux. À la facture finale, vous récapitulez le total, puis vous déduisez les acomptes déjà facturés en rappelant leurs numéros et leurs dates.",
    },

    { type: 'h3', text: 'La situation de travaux' },
    {
      type: 'p',
      text: "Sur les chantiers longs, la situation de travaux est le mécanisme qui vous permet de facturer au fur et à mesure de l’avancement plutôt que d’attendre la fin. Chaque situation décrit les prestations réalisées sur la période, avec le pourcentage d’avancement par poste, le cumul depuis le début du chantier et le montant dû au titre de la période.",
    },
    {
      type: 'p',
      text: "C’est un outil de trésorerie majeur, très largement sous-utilisé par les artisans indépendants qui ont pris l’habitude de tout facturer à la fin. Sur un chantier de deux mois, facturer trois situations plutôt qu’une seule facture finale change radicalement votre besoin en fonds de roulement — et réduit le montant que vous risquez de perdre si le client fait défaut.",
    },
    {
      type: 'p',
      text: "Pensez également à la retenue de garantie : sur les marchés qui la prévoient, 5 % du montant est consigné, puis restitué à l’expiration d’un délai d’un an à compter de la réception, sauf opposition motivée du maître d’ouvrage notifiée par lettre recommandée. C’est bien la date de réception qui commande, et non la levée des réserves. La retenue doit apparaître explicitement sur la facture, et vous pouvez l’éviter en fournissant à la place une caution personnelle et solidaire.",
    },

    { type: 'h2', text: 'Les quatre nouvelles mentions de 2026' },
    {
      type: 'p',
      text: "La réforme de la facturation électronique ajoute quatre mentions obligatoires. Attention à la date qui vous concerne : elles s’imposent aux grandes entreprises et aux ETI dès le 1er septembre 2026, mais aux PME, TPE et micro-entreprises seulement à compter du 1er septembre 2027, en même temps que leur obligation d’émettre des factures électroniques :",
    },
    {
      type: 'steps',
      items: [
        "Le numéro SIREN du client. Jusqu’ici seul le vôtre était exigé ; il faudra désormais identifier aussi votre client professionnel, puisque c’est cet identifiant qui permettra de router la facture vers sa plateforme.",
        "L’adresse de livraison des biens lorsqu’elle diffère de l’adresse de facturation. Pour le bâtiment, cela revient à faire figurer systématiquement l’adresse du chantier.",
        "L’information indiquant si l’opération porte exclusivement sur des livraisons de biens, exclusivement sur des prestations de services, ou sur les deux. La plupart des chantiers relèvent de la troisième catégorie : fourniture et pose.",
        "La mention « Option pour le paiement de la taxe d’après les débits », lorsque vous avez exercé cette option.",
      ],
    },
    {
      type: 'p',
      text: "Ces mentions ne sont pas de simples lignes décoratives : ce sont des données structurées que les plateformes liront automatiquement. Une facture à laquelle il en manque une pourra être rejetée par la plateforme du client, ce qui revient, en pratique, à ne pas avoir facturé du tout. Nous détaillons le fonctionnement complet de la réforme dans notre guide [La facturation électronique expliquée aux artisans](/guides/facturation-electronique-artisan-2026).",
    },

    { type: 'h2', text: 'Ce que vous risquez concrètement' },
    {
      type: 'table',
      head: ['Manquement', 'Sanction'],
      rows: [
        ['Omission ou inexactitude d’une mention', '15 € par mention, plafonné au quart du montant de la facture'],
        ['Absence de facture', '50 % du montant de la transaction, ramenés à 5 % si l’opération est régulièrement comptabilisée et prouvée dans les 30 jours d’une mise en demeure'],
        ['Absence des mentions relatives aux délais de paiement entre professionnels', 'Amende administrative pouvant atteindre 75 000 € pour une personne physique et 2 000 000 € pour une personne morale'],
      ],
    },
    {
      type: 'p',
      text: "Le premier montant paraît anodin — 15 €, ce n’est rien. Mais il s’applique par mention et par facture. Un modèle de facture auquel il manque trois mentions, utilisé cent fois dans l’année, représente 4 500 € d’amende théorique. C’est précisément parce que l’erreur est systémique qu’elle devient coûteuse : on ne se trompe jamais sur une facture, on se trompe sur son modèle.",
    },
    {
      type: 'p',
      text: "Et il faut ajouter à cela le risque le plus banal, celui qui ne figure dans aucun texte : la facture non conforme que le client renvoie pour correction, et qui vous fait perdre trois semaines de délai de paiement.",
    },

    { type: 'h2', text: 'La méthode : régler le problème une fois pour toutes' },
    {
      type: 'p',
      text: "Aucun artisan ne devrait avoir à vérifier vingt lignes avant d’envoyer une facture. Le bon niveau d’action n’est pas la facture, c’est le modèle. Prenez une heure, une seule fois, pour construire un gabarit qui contient déjà toutes les mentions fixes : vos coordonnées et identifiants, votre assurance, vos conditions de règlement, vos pénalités, vos mentions de TVA. Ensuite, chaque facture ne demande plus que le variable — le client, les lignes, les montants.",
    },
    {
      type: 'p',
      text: "C’est l’approche retenue par MonDevisMinute : vos informations d’entreprise et vos mentions légales sont saisies une fois à l’inscription et se reportent automatiquement sur chaque devis et chaque facture. Un devis accepté se transforme en facture en un clic, en conservant le détail des lignes, les taux de TVA appliqués et les acomptes déjà encaissés. Vous ne pouvez plus oublier une mention, puisque vous n’avez plus à y penser.",
    },
  ],
  faq: [
    {
      q: 'Puis-je encore envoyer mes factures en PDF par e-mail ?',
      a: "Oui aujourd’hui, mais plus indéfiniment. À partir du 1er septembre 2026, toutes les entreprises devront être en mesure de recevoir des factures électroniques structurées via une plateforme agréée. Pour l’émission, les micro, petites et moyennes entreprises ont jusqu’au 1er septembre 2027. Un PDF simple envoyé par mail ne sera alors plus une facture électronique au sens de la réforme.",
    },
    {
      q: 'Dois-je facturer la TVA à un client particulier qui me demande de ne pas la mettre ?',
      a: "Oui, sans discussion possible. Si vous êtes assujetti, la TVA est due sur la prestation, quelle que soit la volonté du client. Une facture sans TVA alors que vous en êtes redevable constitue une dissimulation de recettes ; c’est vous qui en supportez les conséquences, pas le client. En revanche, vous pouvez vérifier si les travaux permettent un taux réduit de 10 % ou 5,5 %, ce qui allège légalement la note.",
    },
    {
      q: 'Que faire si je me suis trompé sur une facture déjà envoyée ?',
      a: "Vous n’effacez jamais une facture émise et vous ne réutilisez jamais son numéro. Vous émettez un avoir, qui porte son propre numéro dans la séquence et qui fait référence à la facture initiale, puis vous établissez une nouvelle facture corrigée. La piste reste ainsi lisible pour votre comptable comme pour un contrôleur.",
    },
    {
      q: 'La facture d’acompte est-elle vraiment obligatoire ?',
      a: "Oui, dès lors qu’un acompte est encaissé. Elle porte son numéro propre et mentionne la commande à laquelle elle se rattache. Pour les prestations de services, elle rend la TVA exigible sur le montant encaissé. À la facture finale, vous déduisez les acomptes en rappelant leurs numéros et leurs dates.",
    },
    {
      q: 'Combien de temps dois-je conserver mes factures ?',
      a: "Dix ans à compter de la clôture de l’exercice au titre des obligations comptables. Le délai fiscal est plus court, mais c’est le délai le plus long qui s’impose en pratique. Un archivage numérique est admis à condition de garantir l’intégrité et la lisibilité des documents sur toute la période.",
    },
    {
      q: 'Suis-je concerné par l’autoliquidation si je travaille pour un architecte ?',
      a: "Non, pas dans ce cas. L’autoliquidation en sous-traitance concerne les travaux de construction réalisés pour le compte d’un preneur assujetti dans le cadre d’un contrat de sous-traitance de travaux. Un architecte qui assure la maîtrise d’œuvre n’est en général pas l’entrepreneur principal du marché : c’est le maître d’ouvrage qui vous commande directement. En cas de doute sur un montage particulier, faites-vous confirmer la qualification par votre comptable avant d’émettre la facture.",
    },
  ],
};
