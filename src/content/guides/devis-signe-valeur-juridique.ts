import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'devis-signe-valeur-juridique',
  title: 'Devis signé : ce qui vous engage vraiment',
  h1: "Devis signé : valeur juridique, modification, annulation et réception des travaux",
  metaTitle: 'Devis signé : valeur juridique et engagements de l’artisan',
  metaDescription:
    "Ce qu’un devis signé engage : rétractation, travaux supplémentaires, annulation, réception de chantier, garanties de parfait achèvement et décennale.",
  excerpt:
    "Un devis signé est un contrat. Cela veut dire que le client ne peut plus reculer librement — mais aussi que vous ne pouvez plus changer votre prix. Voici précisément ce que la signature déclenche, jusqu’à la réception du chantier et aux garanties qui courent ensuite.",
  category: 'Obligations légales',
  updated: '2026-07-21',
  related: [
    'mentions-obligatoires-devis-batiment',
    'se-faire-payer-artisan-impayes',
    'devis-qui-fait-signer',
  ],
  blocks: [
    {
      type: 'p',
      text: "« Il a signé le devis, donc c’est bon. » C’est vrai, et c’est bien plus lourd de conséquences que ce que la phrase laisse entendre. La signature du client fait naître un contrat qui lie les deux parties : elle protège votre prix, mais elle grave aussi votre délai, votre périmètre et vos obligations. Beaucoup de litiges de chantier viennent de ce que l’artisan pensait avoir signé un accord de principe, alors qu’il avait signé un engagement ferme.",
    },
    {
      type: 'p',
      text: "Ce guide suit la vie du contrat dans l’ordre : ce que la signature déclenche, ce qui peut encore être modifié et comment, ce qui se passe si l’une des parties veut reculer, puis la réception des travaux et les garanties qui courent ensuite pendant dix ans.",
    },

    { type: 'h2', text: 'Ce que la signature change exactement' },
    {
      type: 'p',
      text: "Avant signature, votre devis est une offre : vous pouvez la retirer, la corriger, ou laisser sa durée de validité expirer. Après signature, c’est un contrat d’entreprise. Trois conséquences immédiates.",
    },
    {
      type: 'p',
      text: "D’abord, le prix est figé. Vous ne pouvez plus le réviser au motif que les matériaux ont augmenté ou que vous vous êtes trompé dans votre estimation, sauf si le devis contenait une clause de révision explicite. Une erreur de chiffrage n’est pas, en soi, un motif d’annulation : elle est à votre charge. C’est la première raison d’indiquer une durée de validité courte quand le chantier comporte beaucoup de fourniture.",
    },
    {
      type: 'p',
      text: "Ensuite, le périmètre est figé lui aussi, et c’est là que votre devis détaillé devient un actif. Ce qui est écrit est dû ; ce qui n’est pas écrit ne l’est pas. Mais attention à la symétrie : sur ce qui n’est pas écrit, c’est l’obligation de conseil du professionnel qui prend le relais. Si vous refaites une installation électrique sans signaler que la terre est absente, vous aurez du mal à soutenir que ce n’était pas dans le devis.",
    },
    {
      type: 'p',
      text: "Enfin, le délai devient un engagement. Un délai dépassé sans motif légitime ouvre droit à des dommages et intérêts pour le client, et peut justifier la résolution du contrat. D’où l’intérêt d’un délai formulé de manière conditionnelle : « quinze jours ouvrés à compter du versement de l’acompte et de la mise à disposition du logement » vous protège bien mieux que « travaux réalisés avant le 15 mars ».",
    },

    { type: 'h2', text: 'Le droit de rétractation : quand il s’applique et quand il ne s’applique pas' },
    {
      type: 'p',
      text: "Si le devis a été signé ailleurs que dans vos locaux — chez le client, sur le chantier, dans un salon —, le contrat est dit conclu hors établissement, et le client dispose de quatorze jours pour se rétracter. C’est le cas de la grande majorité des devis d’artisans.",
    },
    {
      type: 'p',
      text: "Vous devez l’informer de ce droit par écrit et lui remettre un formulaire de rétractation. À ce délai de rétractation s’ajoute un second délai, plus court et souvent confondu avec le premier : l’article L221-10 du code de la consommation vous interdit de recevoir un paiement, sous quelque forme que ce soit, et d’exécuter la prestation avant l’expiration de sept jours à compter de la conclusion du contrat. Le manquement est sanctionné pénalement. L’exception vise les travaux d’entretien ou de réparation à réaliser en urgence au domicile du client et expressément sollicités par lui, dans la limite de ce qui est strictement nécessaire.",
    },
    {
      type: 'p',
      text: "Deux précisions importantes. La première : cette protection ne concerne pas que les consommateurs. Un petit professionnel employant au plus cinq salariés, lorsque l’objet du contrat n’entre pas dans le champ de son activité principale, en bénéficie aussi. La seconde : il existe une exception pour l’urgence. Le droit de rétractation ne s’applique pas aux travaux d’entretien ou de réparation à réaliser en urgence au domicile du consommateur et expressément sollicités par lui, dans la limite des pièces de rechange et des travaux strictement nécessaires pour répondre à l’urgence.",
    },
    {
      type: 'note',
      title: 'Le périmètre de l’exception « urgence »',
      text: "Elle ne couvre que ce qui répond à l’urgence. Réparer la fuite : pas de rétractation. Remplacer dans la foulée l’ensemble de la colonne de distribution parce que « tant qu’on y est » : la rétractation s’applique sur cette partie. Deux devis distincts sont plus sûrs qu’un seul devis mélangeant les deux.",
    },

    { type: 'h2', text: 'Les travaux supplémentaires : la première cause de litige' },
    {
      type: 'p',
      text: "Sur un chantier de rénovation, la découverte d’un imprévu est la règle plutôt que l’exception : un plancher pourri sous le revêtement, une canalisation en plomb, une cloison porteuse, un réseau non conforme. Le réflexe naturel est de traiter le problème et d’ajouter la ligne à la facture. C’est la manœuvre la plus risquée qui soit.",
    },
    {
      type: 'p',
      text: "En droit, ces travaux ne sont pas couverts par le contrat initial. Si le client conteste les avoir demandés, c’est à vous de prouver son accord. Sans écrit, vous ne l’avez pas, et le juge tranche généralement en faveur de celui qui n’a pas rédigé le contrat. Le supplément que vous avez exécuté de bonne foi devient une prestation offerte.",
    },
    {
      type: 'p',
      text: "La bonne pratique tient en une phrase : arrêter, chiffrer, faire accepter, reprendre. C’est aussi la meilleure protection contre l’impayé, sujet traité dans [Se faire payer quand on est artisan](/guides/se-faire-payer-artisan-impayes). Un devis complémentaire de trois lignes, envoyé par e-mail et accepté par un simple « d’accord pour ce montant » en retour, suffit. Une photo du désordre découvert, jointe à l’envoi, désamorce l’essentiel des contestations ultérieures — le client voit ce que vous avez vu.",
    },
    {
      type: 'p',
      text: "Anticipez aussi dans le devis initial. Une clause du type « la présente offre ne comprend pas la reprise des supports non conformes découverts après dépose ; toute intervention à ce titre fera l’objet d’un devis complémentaire » ne vous garantit pas le paiement, mais elle prépare le terrain et rend la discussion nettement plus simple.",
    },

    { type: 'h2', text: 'Si le client veut annuler après signature' },
    {
      type: 'p',
      text: "Hors délai de rétractation, un client qui renonce à un chantier signé rompt un contrat. Vous êtes en droit d’être indemnisé du préjudice subi : matériaux commandés spécifiquement, temps déjà engagé, éventuellement le manque à gagner sur la marge du chantier.",
    },
    {
      type: 'p',
      text: "En pratique, tout dépend de ce que vous avez prévu. Si le devis comporte une clause d’indemnisation en cas de dédit — par exemple la conservation de l’acompte à titre d’indemnité —, la situation est claire et se règle sans discussion. Sans clause, il vous faut démontrer votre préjudice, ce qui est possible mais fastidieux pour des montants souvent modestes.",
    },
    {
      type: 'p',
      text: "Un point de vocabulaire qui a des conséquences réelles : un versement qualifié d'« acompte » engage définitivement les deux parties, alors que des « arrhes » autorisent chacune à se dédire — le client perd les arrhes, mais vous devez en restituer le double si c’est vous qui renoncez. Écrivez donc « acompte », jamais « arrhes », sauf si vous voulez précisément laisser cette porte ouverte. Et surtout : ne laissez pas la case vide. À défaut de précision, les sommes versées sont présumées être des arrhes — c’est-à-dire l’option la moins favorable pour vous, puisqu’elle autorise le client à se dédire.",
    },

    { type: 'h2', text: 'Si c’est vous qui ne pouvez plus faire le chantier' },
    {
      type: 'p',
      text: "La situation est plus délicate, parce que c’est vous qui êtes le professionnel. Une rupture de votre fait vous expose à indemniser le client du surcoût qu’il subira en confiant le chantier à une autre entreprise, souvent plus cher puisque commandé dans l’urgence.",
    },
    {
      type: 'p',
      text: "Si vous devez renoncer — surcharge, accident, mésentente —, faites-le tôt, par écrit, en proposant une solution : un confrère disponible, la restitution intégrale de l’acompte, un délai réaménagé. Un désengagement précoce et accompagné se règle presque toujours à l’amiable. Un chantier abandonné en cours de route, lui, finit rarement bien.",
    },

    { type: 'h2', text: 'La réception des travaux : l’acte le plus important du chantier' },
    {
      type: 'p',
      text: "La réception est l’acte par lequel le maître d’ouvrage déclare accepter l’ouvrage, avec ou sans réserves. C’est un moment charnière, et beaucoup d’artisans indépendants ne le formalisent jamais — à leur détriment.",
    },
    {
      type: 'p',
      text: "La réception produit trois effets. Elle transfère la garde de l’ouvrage au client, ce qui met fin à votre responsabilité pour les dommages qui pourraient survenir à l’ouvrage. Elle rend exigible le solde du prix. Et surtout, elle constitue le point de départ des garanties légales : sans réception, aucune des trois garanties ne commence à courir, et votre responsabilité contractuelle reste engageable sur le fondement du droit commun, privée du point de départ qui vient normalement borner les garanties spécifiques.",
    },
    {
      type: 'p',
      text: "Formalisez-la par un procès-verbal, même sommaire : la date, l’identification du chantier, la mention que le maître d’ouvrage reçoit les travaux, la liste des réserves éventuelles, et deux signatures. Une page suffit. Si le client refuse de signer sans motif alors que l’ouvrage est achevé, la réception peut être qualifiée de tacite lorsque sa volonté non équivoque de recevoir se manifeste — prise de possession des lieux, paiement du solde. Mais mieux vaut ne pas avoir à en débattre.",
    },
    {
      type: 'p',
      text: "Les réserves ne sont pas un échec : elles sont normales et saines. Elles listent ce qui reste à reprendre, et vous disposez d’un délai pour le faire. Un chantier réceptionné avec trois réserves levées la semaine suivante est un chantier terminé proprement. Un chantier jamais réceptionné parce qu’il restait « deux ou trois bricoles » est un chantier qui peut vous poursuivre pendant des années.",
    },

    { type: 'h2', text: 'Les trois garanties qui courent après la réception' },
    {
      type: 'table',
      head: ['Garantie', 'Durée', 'Ce qu’elle couvre'],
      rows: [
        [
          'Parfait achèvement',
          '1 an à compter de la réception',
          'La reprise de tous les désordres signalés, qu’ils aient fait l’objet de réserves à la réception ou qu’ils apparaissent dans l’année.',
        ],
        [
          'Bon fonctionnement (biennale)',
          '2 ans',
          'Le bon fonctionnement des éléments d’équipement dissociables de l’ouvrage : radiateurs, volets, interphone, robinetterie, appareils installés.',
        ],
        [
          'Décennale',
          '10 ans',
          'Les dommages qui compromettent la solidité de l’ouvrage ou qui le rendent impropre à sa destination, y compris ceux affectant un équipement indissociable.',
        ],
      ],
    },
    {
      type: 'p',
      text: "Ces garanties ne se cumulent pas au hasard : elles se distinguent par la nature du désordre et par sa gravité. Une prise qui ne fonctionne pas relève du parfait achèvement la première année, puis de la garantie de bon fonctionnement. Une installation électrique dangereuse qui rend le logement impropre à l’habitation relève, elle, de la décennale.",
    },
    {
      type: 'p',
      text: "C’est précisément pour couvrir cette dernière que l’assurance de responsabilité décennale est obligatoire, et qu’elle doit figurer sur vos devis et vos factures avec les coordonnées de l’assureur et la couverture géographique du contrat, comme le détaille notre guide [Mentions obligatoires d’un devis bâtiment](/guides/mentions-obligatoires-devis-batiment). Vérifiez chaque année que vos activités déclarées à l’assureur correspondent à ce que vous faites réellement : un sinistre survenu sur une activité non déclarée n’est pas couvert, et c’est alors votre patrimoine personnel qui répond.",
    },

    { type: 'h2', text: 'Les six réflexes à garder' },
    {
      type: 'steps',
      items: [
        "Faire signer le devis avant de commencer, avec la mention « devis reçu avant l’exécution des travaux », la date et la signature.",
        "Indiquer une durée de validité, et un délai d’exécution conditionné à l’acompte et à la mise à disposition du chantier.",
        "Écrire « acompte » et non « arrhes », et prévoir ce qui se passe en cas de dédit.",
        "Ne jamais exécuter un travail supplémentaire sans un devis complémentaire accepté, même par simple e-mail.",
        "Formaliser la réception par un procès-verbal daté et signé, réserves comprises.",
        "Archiver l’ensemble — devis, avenants, PV de réception, photos — pendant au moins dix ans, durée de la garantie décennale.",
      ],
    },
    {
      type: 'p',
      text: "Ce dernier point mérite qu’on s’y arrête. Dix ans, c’est long : les cartons déménagent, les ordinateurs tombent en panne, les boîtes mail se remplissent. Conserver l’historique complet de chaque chantier au même endroit et de façon durable n’est pas un luxe administratif, c’est la seule chose qui vous permettra, huit ans plus tard, de démontrer ce qui avait été prévu et ce qui avait été reçu. Avoir devis, avenants et factures rattachés au même client dans un outil unique — ce que fait MonDevisMinute — vous évitera de reconstituer un dossier au moment précis où vous en aurez le plus besoin.",
    },
  ],
  faq: [
    {
      q: 'Le client a signé mais ne verse pas l’acompte. Dois-je commencer ?',
      a: "Non. Si le devis prévoit un acompte à la commande, son versement conditionne le démarrage : c’est une obligation du client, et ne pas la remplir vous autorise à ne pas commencer. Formulez d’ailleurs votre délai en conséquence — « à compter du versement de l’acompte » — pour qu’aucun retard ne vous soit imputé. Relancez par écrit : un client qui traîne sur l’acompte annonce souvent un client qui traînera sur le solde.",
    },
    {
      q: 'Puis-je augmenter mon prix si les matériaux ont flambé entre le devis et le chantier ?',
      a: "Pas unilatéralement. Le prix signé est ferme, sauf clause de révision expressément prévue au devis. Les deux protections à mettre en place sont une durée de validité courte sur les chantiers à forte part de fourniture, et le cas échéant une clause de révision indexée sur un indice public, rédigée clairement et acceptée par le client.",
    },
    {
      q: 'Un devis signé électroniquement a-t-il la même valeur ?',
      a: "Oui, dès lors que l’on peut identifier le signataire et garantir l’intégrité du document. Un « bon pour accord » par e-mail depuis l’adresse du client, ou une signature électronique horodatée, constitue une preuve valable. Conservez l’échange complet, pas seulement le document final.",
    },
    {
      q: 'Que se passe-t-il si je n’ai jamais fait de réception de travaux ?',
      a: "Les garanties légales ne commencent pas à courir, ce qui joue contre vous : votre responsabilité contractuelle reste engageable sur le fondement du droit commun, sans le point de départ qui vient borner les garanties spécifiques. Une réception tacite peut être retenue quand le client a manifesté sans équivoque sa volonté de recevoir — en prenant possession des lieux et en réglant le solde —, mais cela se plaide. Un procès-verbal d’une page évite tout ce débat.",
    },
    {
      q: 'Le client refuse de réceptionner et ne paie pas le solde. Que faire ?',
      a: "Écrivez-lui pour l’inviter formellement à une date de réception, en recommandé. S’il ne se présente pas ou refuse sans motif alors que l’ouvrage est achevé, constituez la preuve de l’achèvement — photos datées, constat d’un commissaire de justice si l’enjeu le justifie — et engagez la procédure de recouvrement du solde. Le refus de réceptionner n’est pas un moyen légitime de suspendre indéfiniment le paiement.",
    },
    {
      q: 'Suis-je responsable si le client a imposé un matériau que je déconseillais ?',
      a: "Votre obligation de conseil ne disparaît pas, mais elle peut être satisfaite. La condition est d’avoir alerté par écrit, avant l’exécution, sur le risque précis, et d’avoir fait acter le choix du client. Une mention sur le devis ou un e-mail conservé suffit. Un conseil donné oralement sur le chantier n’a, en pratique, aucune valeur probante.",
    },
  ],
};
