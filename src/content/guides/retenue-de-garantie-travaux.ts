import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'retenue-de-garantie-travaux',
  title: "Retenue de garantie : 5 %, durée et libération",
  h1: "Retenue de garantie sur un chantier : 5 %, durée et comment la récupérer",
  metaTitle: "Retenue de garantie : 5 %, durée et comment la lever",
  metaDescription:
    "Retenue de garantie de 5 % : quand elle s’applique, sa durée d’un an, la caution bancaire pour l’éviter et comment récupérer la somme retenue.",
  excerpt:
    "Cinq pour cent des paiements qui restent bloqués pendant un an : la retenue de garantie pèse sur votre trésorerie. Elle n’est pourtant ni automatique ni éternelle. Voici ce que dit la loi, comment l’éviter et comment la récupérer à la bonne date.",
  category: 'Se faire payer',
  updated: '2026-10-27',
  related: [
    'facture-acompte-situation-travaux',
    'pv-reception-travaux',
    'garantie-parfait-achevement-biennale',
  ],
  blocks: [
    {
      type: 'p',
      text: "Le chantier est terminé, le client est content, et pourtant la dernière facture n’est pas réglée en totalité : une petite partie reste bloquée. C’est la retenue de garantie. Beaucoup d’artisans la subissent sans l’avoir vraiment lue dans le contrat, et sans savoir ni quand ni comment la somme leur revient.",
    },
    {
      type: 'p',
      text: "Bonne nouvelle : la retenue est encadrée par la loi, avec un plafond, une durée et des règles de restitution précises. Une fois ces règles en tête, vous pouvez la refuser quand elle n’est pas prévue, l’éviter quand c’est possible, et la récupérer à la date prévue sans courir après personne.",
    },
    {
      type: 'image',
      src: '/guides/retenue-de-garantie-travaux.webp',
      alt: "Salle de bain neuve en grands carreaux gris avec une douche à l’italienne vitrée ; un carreau ébréché est signalé par un morceau de ruban adhésif bleu, avec un maillet blanc et une éponge posés au sol.",
      caption:
        "Un carreau ébréché signalé par un ruban bleu : c’est exactement le genre de réserve que la retenue de garantie sert à couvrir.",
    },

    { type: 'h2', text: 'À quoi sert la retenue de garantie' },
    {
      type: 'p',
      text: "Pour les marchés de travaux privés, la loi n° 71-584 du 16 juillet 1971 permet au client de diminuer ses paiements d’une retenue destinée à garantir l’exécution des travaux et, le cas échéant, à satisfaire aux réserves faites à la réception. En clair : le client garde une petite somme en réserve, au cas où il faudrait revenir corriger quelque chose.",
    },
    {
      type: 'p',
      text: "Pour vous, c’est une avance de trésorerie que vous consentez pendant un an. Pour le client, c’est une garantie que les malfaçons signalées pourront être reprises. Quand tout se passe bien, la somme vous revient intégralement. La retenue n’est pas une pénalité, c’est une garantie.",
    },

    { type: 'h2', text: 'Les règles à connaître' },
    { type: 'h3', text: 'Un plafond de 5 %' },
    {
      type: 'p',
      text: "La retenue ne peut pas dépasser 5 % du montant des paiements. Le client peut donc retenir moins, jamais plus. Un contrat ou un devis qui prévoirait 10 % dépasse le plafond légal.",
    },
    { type: 'h3', text: 'Elle doit être prévue au contrat' },
    {
      type: 'p',
      text: "C’est le point que beaucoup ignorent : la retenue n’est pas automatique. Elle doit être stipulée au contrat. Si votre devis ou votre contrat ne la prévoit pas, le client ne peut pas l’imposer au moment de payer le solde. Relisez donc les conditions que vous signez.",
    },
    { type: 'h3', text: 'La somme doit être consignée' },
    {
      type: 'p',
      text: "Le client qui retient une somme ne la garde pas simplement sur son compte : il doit la consigner entre les mains d’un consignataire accepté par les deux parties. À défaut d’accord sur le choix, c’est le président du tribunal judiciaire qui le désigne. La retenue est donc une somme mise à l’abri, pas une somme dont le client dispose librement.",
    },
    {
      type: 'note',
      title: 'Ce que vous pouvez exiger',
      text: "Si une retenue est pratiquée sur vos paiements, demandez où la somme est consignée. Le contrat peut désigner le consignataire dès le départ ; sinon, il faut s’accorder dessus. C’est une question à poser avant la signature, pas un an plus tard.",
    },

    { type: 'h2', text: 'Un exemple chiffré' },
    {
      type: 'p',
      text: "Prenons une facture de solde de 12 000 € sur un marché qui prévoit la retenue au taux maximum de 5 % du montant des paiements. La retenue est de 12 000 × 5 % = 600 €. Le client vous règle 11 400 € à la réception, et 600 € restent consignés.",
    },
    {
      type: 'table',
      head: ['Ligne', 'Montant'],
      rows: [
        ['Montant de la facture', '12 000 €'],
        ['Retenue de garantie (5 %)', '– 600 €'],
        ['Payé à la réception', '11 400 €'],
        ['Somme consignée pendant un an', '600 €'],
      ],
    },
    {
      type: 'p',
      text: "Le calcul est le même sur chaque paiement : si le marché est réglé en plusieurs fois, la retenue s’applique à chacun, dans la limite de 5 % de son montant. Sur un chantier de 40 000 €, c’est 2 000 € qui dorment pendant un an. Autant savoir à l’avance quand ils reviendront.",
    },

    { type: 'h2', text: 'Éviter la retenue avec une caution bancaire' },
    {
      type: 'p',
      text: "La retenue n’est pas pratiquée si vous fournissez, pour le même montant, une caution personnelle et solidaire délivrée par un établissement financier figurant sur une liste fixée par décret. En pratique, il s’agit d’une caution bancaire.",
    },
    {
      type: 'p',
      text: "L’idée est simple : au lieu de laisser 600 € bloqués chez un consignataire, c’est votre banque qui se porte garante du même montant. Vous encaissez la totalité de la facture. Le prix à payer est celui que votre banque facture pour ce service, à comparer avec le coût de l’argent immobilisé pendant un an. Pour un artisan dont la trésorerie est tendue, la question vaut d’être posée à son banquier avant de signer un marché important.",
    },

    { type: 'h2', text: 'Quand et comment la retenue est libérée' },
    {
      type: 'p',
      text: "À l’expiration d’un délai d’un an à compter de la réception, faite avec ou sans réserve, la caution est libérée ou les sommes consignées vous sont versées. Elles le sont même sans mainlevée, sauf si le client a notifié au consignataire ou à la caution, par lettre recommandée, une opposition motivée par l’inexécution de vos obligations.",
    },
    {
      type: 'p',
      text: "Il existe une seule façon de l’empêcher : le client doit avoir notifié au consignataire ou à la caution, par lettre recommandée, une opposition motivée par l’inexécution de vos obligations. Sans cette lettre dans le délai d’un an, la somme est à vous. Et l’opposition abusive expose son auteur à des dommages-intérêts.",
    },
    {
      type: 'steps',
      items: [
        "Faites signer un procès-verbal de réception daté : c’est cette date qui fait partir le délai d’un an, pas la fin des travaux ni la levée des réserves. Le détail est dans notre guide [Le procès-verbal de réception des travaux](/guides/pv-reception-travaux).",
        "Notez dans votre agenda la date anniversaire de la réception : c’est la date de libération de la retenue.",
        "Si des réserves ont été formulées, reprenez-les rapidement et faites constater par écrit qu’elles sont levées.",
        "À l’échéance, renseignez-vous auprès du consignataire ou de la caution pour savoir si une opposition a été notifiée. Les sommes consignées vous sont alors versées si aucune opposition motivée n’a été notifiée.",
        "Si vous constatez un retard, rappelez la date de réception et le délai d’un an par écrit au client et au consignataire.",
      ],
    },
    {
      type: 'note',
      title: 'Une erreur courante sur le point de départ',
      text: "Le délai d’un an court à partir de la réception, avec ou sans réserve. Un chantier réceptionné avec des réserves n’est donc pas un chantier dont la retenue se débloque plus tard : seule une opposition motivée, notifiée par lettre recommandée, peut retarder le versement.",
    },

    { type: 'h2', text: 'Retenue de garantie et réserves : le lien avec la garantie de parfait achèvement' },
    {
      type: 'p',
      text: "La retenue sert à financer la levée des réserves si vous ne le faites pas vous-même. C’est son rôle : le client dispose d’une somme pour faire réparer ce qui n’a pas été repris. Vous avez donc tout intérêt à lever vos réserves vite, de votre propre initiative : un défaut réparé rapidement ne donne aucune raison de faire opposition, et vous récupérez vos 5 % à la date prévue.",
    },
    {
      type: 'p',
      text: "Cette logique rejoint celle de la garantie de parfait achèvement, qui dure un an elle aussi à compter de la réception et vous oblige à reprendre les désordres signalés. Les deux mécanismes se complètent : la garantie fixe votre obligation de réparer, la retenue donne au client un moyen de la faire respecter. Retrouvez cette garantie en détail dans [Garantie de parfait achèvement et garantie biennale](/guides/garantie-parfait-achevement-biennale).",
    },

    { type: 'h2', text: 'Faire apparaître la retenue sur la facture' },
    {
      type: 'p',
      text: "Quand une retenue s’applique, elle gagne à apparaître clairement sur la facture de solde : le total, la retenue déduite, le net à payer, et la date prévue de libération. Une facture claire évite que le client conteste un montant qu’il ne comprend pas, et vous donne une trace de la somme qui vous reste due.",
    },
    {
      type: 'p',
      text: "Pour le reste de la facture de solde — déduction des acomptes et des situations, numéro, TVA —, reportez-vous à [Facture d’acompte et situation de travaux](/guides/facture-acompte-situation-travaux) et à [Mentions obligatoires d’une facture d’artisan](/guides/mentions-obligatoires-facture-artisan). MonDevisMinute gère les factures d’acompte, les situations de travaux et la facture de solde à partir du devis.",
    },

    { type: 'h2', text: 'Les erreurs qui coûtent cher' },
    {
      type: 'list',
      items: [
        "Accepter une retenue que le contrat ne prévoit pas, parce que le client la présente comme « automatique ». Elle ne l’est pas.",
        "Laisser passer un taux supérieur à 5 % sans réagir.",
        "Ne pas se renseigner sur le consignataire et se retrouver sans savoir où est la somme.",
        "Ne pas faire de procès-verbal de réception : sans date de réception certaine, la date de libération se discute.",
        "Attendre la fin des réserves pour compter le délai d’un an, alors qu’il part de la réception.",
        "Oublier la caution bancaire, alors qu’elle évite la retenue pour le même montant.",
      ],
    },
  ],
  faq: [
    {
      q: 'La retenue de garantie est-elle obligatoire ?',
      a: "Non. Elle doit être stipulée au contrat : si votre devis ou votre contrat ne la prévoit pas, le client ne peut pas l’imposer. Quand elle existe, elle est plafonnée à 5 % du montant des paiements.",
    },
    {
      q: 'Combien de temps dure la retenue de garantie ?',
      a: "Un an à compter de la réception, faite avec ou sans réserve. À l’expiration de ce délai, les sommes consignées vous sont versées ou la caution est libérée, sauf opposition motivée notifiée par lettre recommandée.",
    },
    {
      q: 'Comment lever une retenue de garantie ?',
      a: "À l’issue du délai d’un an, les sommes consignées vous sont versées même sans mainlevée, si aucune opposition motivée n’a été notifiée. Levez vos réserves rapidement et conservez la preuve de la date de réception.",
    },
    {
      q: 'Puis-je éviter la retenue de garantie ?',
      a: "Oui, en fournissant pour le même montant une caution personnelle et solidaire d’un établissement financier figurant sur une liste fixée par décret. En pratique, c’est une caution bancaire. La retenue n’est alors pas pratiquée.",
    },
    {
      q: 'Que risque un client qui fait opposition sans raison ?',
      a: "L’opposition doit être motivée par l’inexécution de vos obligations et notifiée par lettre recommandée au consignataire ou à la caution. Une opposition abusive expose son auteur à des dommages-intérêts.",
    },
  ],
};
