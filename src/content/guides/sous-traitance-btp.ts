import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'sous-traitance-btp',
  title: 'La sous-traitance dans le bâtiment',
  h1: 'Sous-traitance BTP : contrat, autoliquidation de la TVA et paiement',
  metaTitle: 'Sous-traitance BTP : contrat, TVA et action directe',
  metaDescription:
    "Acceptation et agrément, autoliquidation de la TVA, action directe contre le maître d’ouvrage : ce que le sous-traitant doit maîtriser.",
  excerpt:
    "Travailler en sous-traitance, c’est confier son paiement à quelqu’un qui dépend lui-même d’un autre. La loi vous donne des protections sérieuses, mais elles s’activent avant le chantier, pas après l’impayé. Voici lesquelles et comment les enclencher.",
  category: 'Obligations légales',
  updated: '2026-07-21',
  related: [
    'se-faire-payer-artisan-impayes',
    'mentions-obligatoires-facture-artisan',
    'facture-acompte-situation-travaux',
  ],
  blocks: [
    {
      type: 'p',
      text: "La sous-traitance remplit les carnets de commandes. Elle apporte du volume sans prospection, des chantiers plus gros que ceux qu’on décrocherait seul, et une relation qui se renouvelle. Elle apporte aussi une fragilité particulière : votre règlement dépend d’une entreprise qui dépend elle-même du maître d’ouvrage. Quand la chaîne casse en amont, c’est le dernier maillon qui trinque.",
    },
    {
      type: 'p',
      text: "La loi du 31 décembre 1975 relative à la sous-traitance a été écrite exactement pour ça. Elle donne au sous-traitant des protections réelles — mais qui se mettent en place au moment du contrat, pas au moment de l’impayé. C’est tout l’objet de ce guide.",
    },

    { type: 'h2', text: 'Qui est sous-traitant, exactement ?' },
    {
      type: 'p',
      text: "Il y a sous-traitance lorsqu’une entreprise, titulaire d’un marché, confie à une autre l’exécution de tout ou partie de ce marché. Vous n’avez alors aucun lien contractuel avec le maître d’ouvrage : votre client, c’est l’entrepreneur principal.",
    },
    {
      type: 'p',
      text: "C’est différent de la cotraitance, où plusieurs entreprises contractent directement avec le maître d’ouvrage, chacune pour son lot. Et c’est différent de la fourniture simple : livrer du matériel sans le poser n’est pas de la sous-traitance.",
    },
    {
      type: 'p',
      text: "Cette qualification n’est pas théorique. Elle détermine le taux de TVA que vous facturez, les protections dont vous disposez, et les formalités que quelqu’un doit accomplir. Se tromper coûte cher dans les deux sens.",
    },

    { type: 'h2', text: 'Acceptation et agrément : la formalité qui vous protège' },
    {
      type: 'p',
      text: "L’entrepreneur principal qui recourt à un sous-traitant doit le faire accepter par le maître d’ouvrage et faire agréer ses conditions de paiement. Cette double formalité — acceptation de la personne, agrément des conditions de paiement — est une obligation qui pèse sur l’entrepreneur principal, pas sur vous.",
    },
    {
      type: 'p',
      text: "Dans les faits, elle est très souvent négligée sur les petits lots. « On se connaît, on va pas s’embêter avec la paperasse. » Tant que tout se passe bien, personne ne s’en aperçoit. Le jour où l’entreprise principale a des difficultés, le sous-traitant non déclaré doit faire reconnaître sa situation au lieu de se prévaloir d’un dossier clair — il n’est pas démuni, mais il perd du temps et de la simplicité au pire moment.",
    },
    {
      type: 'p',
      text: "Le réflexe à prendre est simple : avant de commencer, demandez par écrit à l’entrepreneur principal la copie du document par lequel le maître d’ouvrage vous a accepté et a agréé vos conditions de paiement. Un simple mail suffit à créer la trace. S’il élude la question, c’est en soi une information sur la façon dont il gère ses affaires.",
    },
    {
      type: 'note',
      title: 'La question à poser avant le premier coup de pelle',
      text: "« Peux-tu me confirmer par mail que je suis bien déclaré comme sous-traitant auprès du maître d’ouvrage, et que mes conditions de paiement sont agréées ? » Une phrase, trente secondes, et vous changez votre position juridique pour toute la durée du chantier.",
    },

    { type: 'h2', text: 'L’autoliquidation de la TVA' },
    {
      type: 'p',
      text: "C’est la règle qui piège le plus d’artisans, dans les deux sens. Pour les travaux de construction réalisés par un sous-traitant pour le compte d’un preneur assujetti à la TVA, ce n’est pas le sous-traitant qui collecte la taxe : c’est le donneur d’ordre qui la déclare et l’acquitte.",
    },
    {
      type: 'p',
      text: "Le champ est large : les travaux de construction, mais aussi la réparation, le nettoyage, l’entretien, la transformation et la démolition d’un bien immobilier. Une nuance sur le nettoyage : il suit le régime des travaux lorsqu’il en est l’accessoire, mais un contrat de nettoyage conclu séparément relève des règles ordinaires. En cas de doute sur un contrat distinct, faites confirmer par votre comptable.",
    },
    { type: 'h3', text: 'Concrètement, sur votre facture' },
    {
      type: 'list',
      items: [
        "Vous facturez en hors taxes, sans ligne de TVA",
        "Vous portez la mention « Autoliquidation » de façon visible",
        "Vous faites figurer le numéro de TVA intracommunautaire de votre client",
        "Le donneur d’ordre déclare la TVA à votre place et la déduit dans le même mouvement",
      ],
    },
    { type: 'h3', text: 'Les deux erreurs symétriques' },
    {
      type: 'p',
      text: "Facturer la TVA alors qu’on est en autoliquidation : le donneur d’ordre ne pourra pas la déduire, il vous la réclamera, et il faudra émettre un avoir puis refacturer. Perte de temps et de crédibilité, mais rattrapable.",
    },
    {
      type: 'p',
      text: "Autoliquider alors qu’on travaille en direct pour le maître d’ouvrage : là, c’est plus grave. Vous omettez de collecter une TVA que vous devez, et l’administration vous la réclamera avec intérêts de retard. Ce n’est pas au client de la payer, c’est à vous.",
    },
    {
      type: 'note',
      title: 'Le test en une question',
      text: "Qui est mon client sur ce chantier ? Si c’est une entreprise du bâtiment qui m’a confié une partie d’un marché qu’elle a décroché : je suis sous-traitant, j’autoliquide. Si c’est le propriétaire, le syndic ou le maître d’ouvrage directement : je facture la TVA normalement, même s’il y a dix autres entreprises sur le chantier.",
    },
    {
      type: 'p',
      text: "Une précision utile : si vous relevez de la franchise en base de TVA, vous ne facturez de toute façon pas de TVA, et le donneur d’ordre n’a alors pas de taxe à autoliquider. Votre facture porte la mention « TVA non applicable, article 293 B du CGI ».",
    },

    { type: 'h2', text: 'Se faire payer : l’action directe' },
    {
      type: 'p',
      text: "C’est la protection la plus puissante de la loi de 1975, et la moins utilisée. Si l’entrepreneur principal ne vous règle pas, vous pouvez réclamer le paiement directement au maître d’ouvrage.",
    },
    {
      type: 'p',
      text: "Le mécanisme est encadré, et un geste y est décisif : vous mettez en demeure l’entrepreneur principal de vous payer, et vous en adressez copie au maître d’ouvrage. Si la mise en demeure reste sans effet pendant un mois, vous pouvez agir directement contre le maître d’ouvrage.",
    },
    {
      type: 'p',
      text: "L’envoi de cette copie n’est pas une politesse : les obligations du maître d’ouvrage sont limitées à ce qu’il doit encore à l’entrepreneur principal à la date où il reçoit cette copie. C’est donc cette date-là qui gèle le montant que vous pourrez réclamer, pas celle de votre réclamation un mois plus tard.",
    },
    {
      type: 'p',
      text: "D’où la conséquence pratique : envoyez la copie au maître d’ouvrage le jour même de la mise en demeure. Chaque semaine d’attente, il règle des situations à l’entrepreneur principal et l’assiette de votre recours fond. Attendre six mois « pour ne pas froisser » revient souvent à agir sur un solde vide.",
    },
    {
      type: 'p',
      text: "L’acceptation et l’agrément prennent ici tout leur sens : ils rendent votre position claire et incontestable. Mais leur absence ne vous laisse pas sans droits, contrairement à ce qu’on entend souvent. La loi prévoit que l’entrepreneur principal reste tenu envers le sous-traitant non accepté, et qu’il ne peut pas lui opposer le contrat de sous-traitance. Elle impose en outre au maître d’ouvrage qui a connaissance de la présence d’un sous-traitant non déclaré de mettre en demeure l’entrepreneur principal — ou le sous-traitant — de régulariser la situation, et cela vaut aussi bien en marchés privés qu’en marchés publics.",
    },
    {
      type: 'p',
      text: "Sur les marchés publics, un mécanisme distinct existe : le paiement direct du sous-traitant accepté par le maître d’ouvrage public, au-delà d’un certain seuil. Le sous-traitant y est payé directement par la personne publique, sans passer par l’entrepreneur principal. Les modalités diffèrent du régime des marchés privés décrit ici.",
    },

    { type: 'h2', text: 'Les documents à réclamer et à fournir' },
    {
      type: 'p',
      text: "La sous-traitance s’accompagne d’obligations de vigilance destinées à lutter contre le travail dissimulé. Elles pèsent sur votre donneur d’ordre, mais elles vous concernent directement puisque c’est vous qui devez produire les pièces.",
    },
    {
      type: 'p',
      text: "Attendez-vous à devoir fournir, à la conclusion du contrat puis périodiquement : votre attestation de vigilance URSSAF, un justificatif d’immatriculation, votre attestation d’assurance décennale, et selon les cas la liste des salariés étrangers employés.",
    },
    {
      type: 'p',
      text: "Prenez-le dans l’autre sens : un donneur d’ordre qui ne vous demande jamais ces pièces n’est pas un client facile, c’est un client qui ne respecte pas ses propres obligations. Statistiquement, c’est aussi celui qui paiera mal.",
    },
    {
      type: 'p',
      text: "Réclamez de votre côté les pièces qui vous intéressent : le contrat de sous-traitance écrit, la preuve de votre acceptation et de l’agrément de vos conditions de paiement, et l’attestation d’assurance de l’entreprise principale.",
    },

    { type: 'h2', text: 'Le contrat de sous-traitance : ce qu’il doit dire' },
    {
      type: 'p',
      text: "Un devis suffit rarement en sous-traitance, parce que les points de friction ne sont pas les mêmes qu’avec un particulier. Ce qui doit être écrit :",
    },
    {
      type: 'list',
      items: [
        "La consistance précise de votre lot, et ce qui n’en fait pas partie",
        "Le prix, et la mention explicite de l’autoliquidation de la TVA",
        "Le calendrier : date de début, durée, conditions de démarrage — accès au chantier, supports prêts, corps d’état précédents terminés",
        "Les modalités de règlement : acomptes, situations mensuelles, délai de paiement, pénalités de retard, indemnité forfaitaire de 40 €",
        "La retenue de garantie si elle est prévue, et la possibilité de la remplacer par une caution",
        "Qui fournit quoi : électricité et eau de chantier, échafaudage, benne, protections, nettoyage",
        "Les pénalités de retard qui vous seraient appliquées, et surtout leur plafond",
        "La procédure en cas de travaux supplémentaires : devis complémentaire écrit et accepté avant exécution",
      ],
    },
    {
      type: 'p',
      text: "Une attention particulière sur deux clauses. Les pénalités de retard qui vous sont opposables doivent être plafonnées : une clause non plafonnée sur un chantier qui dérape pour des raisons qui ne sont pas les vôtres peut absorber toute votre marge. Et les conditions de démarrage doivent être écrites : dans une chaîne de corps d’état, le retard des autres devient votre problème si rien ne le dit.",
    },

    { type: 'h2', text: 'Les signaux qui doivent vous alerter' },
    {
      type: 'list',
      items: [
        "Aucun contrat écrit, tout se cale par téléphone",
        "Refus ou esquive quand vous demandez la preuve de votre acceptation par le maître d’ouvrage",
        "Une première situation payée en retard : c’est presque toujours annonciateur de la suite",
        "Un donneur d’ordre qui ne réclame jamais vos attestations",
        "Des travaux supplémentaires demandés oralement, « on régularisera à la fin »",
        "Un prix anormalement serré accompagné d’une promesse de volume futur",
      ],
    },
    {
      type: 'p',
      text: "Aucun de ces signaux n’est rédhibitoire isolément. Deux ou trois ensemble justifient de demander un acompte plus élevé, de facturer par situations rapprochées, et de ne pas laisser filer plus d’un mois d’encours.",
    },
    {
      type: 'p',
      text: "C’est d’ailleurs le meilleur conseil qu’on puisse donner sur la sous-traitance : ne jamais laisser un encours dépasser ce que vous pouvez perdre. Facturez par situations, suivez les échéances, relancez au premier jour de retard. Dans MonDevisMinute, chaque facture porte son statut et vous voyez d’un coup d’œil ce qui est en attente — ce qui, en sous-traitance, est exactement l’information qui compte.",
    },
  ],
  faq: [
    {
      q: 'Dois-je facturer la TVA à l’entreprise qui me sous-traite ?',
      a: "Non, pour des travaux de construction relevant de l’autoliquidation. Vous facturez en hors taxes avec la mention « Autoliquidation », et c’est le donneur d’ordre qui déclare la TVA. Le champ inclut la réparation, le nettoyage, l’entretien, la transformation et la démolition d’un bien immobilier. En cas de montage particulier, faites confirmer la qualification par votre comptable avant d’émettre la facture.",
    },
    {
      q: 'Que faire si l’entreprise principale ne me paie pas ?',
      a: "Mettez-la en demeure par lettre recommandée. Si cette mise en demeure reste sans effet pendant un mois, vous pouvez réclamer directement le paiement au maître d’ouvrage, dans la limite de ce qu’il doit encore à l’entrepreneur principal. Agissez tôt : cette limite diminue à chaque situation qu’il lui règle.",
    },
    {
      q: 'Puis-je sous-traiter moi-même une partie de mon lot ?',
      a: "Oui, mais vous devenez alors entrepreneur principal vis-à-vis de votre propre sous-traitant, avec les obligations correspondantes : le faire accepter et faire agréer ses conditions de paiement, et exercer la vigilance sociale. Vous cumulez les deux positions, et vous restez responsable de son travail devant votre propre donneur d’ordre.",
    },
    {
      q: 'L’acceptation par le maître d’ouvrage est-elle vraiment obligatoire ?',
      a: "Oui, c’est une obligation qui pèse sur l’entrepreneur principal. Elle est souvent négligée sur les petits lots, mais son absence vous fragilise sérieusement le jour où il faut se faire payer. Demandez-en la preuve par écrit avant de commencer : cela ne coûte qu’un mail.",
    },
    {
      q: 'Suis-je responsable des malfaçons devant le maître d’ouvrage ?',
      a: "Vous n’avez pas de lien contractuel avec lui, mais votre responsabilité peut être recherchée, et vous restez tenu de votre propre assurance décennale pour les travaux que vous réalisez. Vous répondez contractuellement devant l’entrepreneur principal, qui répond lui-même devant le maître d’ouvrage. D’où l’importance de délimiter précisément votre lot par écrit.",
    },
    {
      q: 'Quelle différence entre sous-traitance et cotraitance ?',
      a: "En sous-traitance, vous contractez avec l’entreprise titulaire du marché, et vous n’avez aucun lien avec le maître d’ouvrage. En cotraitance, plusieurs entreprises contractent directement avec le maître d’ouvrage, chacune pour son lot, éventuellement représentées par un mandataire. Les conséquences diffèrent totalement sur la TVA, sur le paiement et sur la responsabilité.",
    },
  ],
};
