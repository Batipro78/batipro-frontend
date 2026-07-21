import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'tva-artisan-declarer-recuperer',
  title: 'La TVA au quotidien pour un artisan',
  h1: 'TVA de l’artisan : régimes, déclaration, récupération et trésorerie',
  metaTitle: 'TVA artisan : régimes, déclaration et récupération',
  metaDescription:
    "Franchise, réel simplifié, réel normal : quel régime, quand déclarer, ce qui est récupérable, et la suppression du simplifié en 2027.",
  excerpt:
    "La TVA n’est pas votre argent, mais elle passe par votre compte — et c’est là que les entreprises se mettent en difficulté. Voici comment fonctionne votre régime, ce que vous récupérez vraiment, et le changement de 2027 qui concerne tout le monde.",
  category: 'Fiscalité',
  updated: '2026-07-21',
  related: [
    'taux-tva-travaux-renovation',
    'micro-entreprise-batiment',
    'facture-acompte-situation-travaux',
  ],
  blocks: [
    {
      type: 'p',
      text: "La TVA est la première cause de trésorerie tendue chez les artisans, et ce n’est pas parce qu’elle serait trop lourde : c’est parce qu’elle transite par votre compte bancaire sans jamais vous appartenir. Vous encaissez 12 000 € toutes taxes comprises, vous voyez 12 000 € sur le relevé, et vous raisonnez sur 12 000 €. Il y en a en réalité une partie qui est déjà à l’État.",
    },
    {
      type: 'p',
      text: "Ce guide ne vous apprendra pas à remplir un formulaire — votre comptable le fait mieux. Il vous explique le mécanisme, ce que vous pouvez récupérer, les échéances qui vous concernent, et un changement de 2027 que beaucoup n’ont pas vu venir.",
    },

    { type: 'h2', text: 'Le principe en une minute' },
    {
      type: 'p',
      text: "Vous collectez de la TVA sur ce que vous vendez. Vous payez de la TVA sur ce que vous achetez. Vous reversez à l’État la différence entre les deux.",
    },
    {
      type: 'p',
      text: "Un mois où vous facturez 20 000 € hors taxes à 10 % — donc 2 000 € de TVA collectée — et où vous achetez 6 000 € hors taxes de fournitures à 20 % — donc 1 200 € de TVA déductible —, vous reversez 800 €. Si le rapport s’inverse, par exemple un mois de gros achats, vous êtes en crédit de TVA : l’État vous doit de l’argent, que vous pouvez reporter ou vous faire rembourser.",
    },
    {
      type: 'p',
      text: "Tout le reste n’est que modalité : quel régime, à quel rythme, sur quelle base.",
    },

    { type: 'h2', text: 'Les trois régimes' },
    { type: 'h3', text: 'La franchise en base' },
    {
      type: 'p',
      text: "Vous ne facturez pas de TVA, vous n’en récupérez pas. Vos factures portent la mention « TVA non applicable, article 293 B du CGI ».",
    },
    {
      type: 'p',
      text: "Vous en relevez tant que votre chiffre d’affaires reste sous les seuils : pour les prestations de services, 37 500 € en seuil de base et 41 250 € en seuil majoré ; pour les livraisons de biens, 85 000 € et 93 500 €. Le mécanisme est le suivant : si le chiffre d’affaires de l’année précédente dépasse le seuil de base mais que vous restez sous le seuil majoré, la franchise court jusqu’à la fin de l’année civile. Au-delà du seuil majoré, vous devenez redevable immédiatement.",
    },
    {
      type: 'p',
      text: "La réforme qui devait instaurer un seuil unique de franchise à 25 000 € a été abandonnée : ces seuils restent inchangés pour 2026. Vérifiez-les tout de même sur impots.gouv.fr si vous lisez cet article longtemps après sa publication.",
    },
    { type: 'h3', text: 'Le réel simplifié' },
    {
      type: 'p',
      text: "Deux acomptes dans l’année, en juillet et en décembre, puis une déclaration annuelle de régularisation — la CA12 — qui récapitule l’ensemble des opérations de l’exercice.",
    },
    {
      type: 'p',
      text: "Il s’applique aux entreprises dont le chiffre d’affaires de l’année précédente se situe entre 37 500 € et 286 000 € pour les prestations de services, et entre 85 000 € et 945 000 € pour le commerce et la fourniture de logement. Une seconde condition, souvent oubliée, s’y ajoute : le montant annuel de TVA doit rester inférieur à 15 000 €. Une entreprise dans la bonne fourchette de chiffre d’affaires mais au-delà de ce montant bascule au réel normal.",
    },
    {
      type: 'p',
      text: "C’est le régime le plus confortable administrativement, et le plus dangereux pour la trésorerie : deux échéances par an, donc deux grosses sorties d’argent, et douze mois pour oublier qu’on les doit.",
    },
    { type: 'h3', text: 'Le réel normal' },
    {
      type: 'p',
      text: "Une déclaration CA3 tous les mois, avec paiement dans la foulée. Il s’applique de plein droit au-delà de 286 000 € pour les prestations de services et de 945 000 € pour le commerce.",
    },
    {
      type: 'p',
      text: "Plus contraignant sur le papier, il est en réalité plus sain : vous soldez chaque mois, vous ne pouvez pas dépenser une TVA que vous devez, et vous récupérez vos crédits beaucoup plus vite. Beaucoup d’artisans qui investissent optent volontairement pour le réel normal alors qu’ils pourraient rester au simplifié.",
    },

    { type: 'h2', text: 'Le changement de 2027 : le régime simplifié disparaît' },
    {
      type: 'p',
      text: "C’est l’information la plus importante de ce guide, et elle est encore peu connue. En application de la loi de finances pour 2025, le régime simplifié de TVA sera supprimé au 1er janvier 2027.",
    },
    {
      type: 'p',
      text: "À compter de cette date, toutes les entreprises qui ne relèvent pas de la franchise en base seront soumises au régime réel normal, avec une déclaration mensuelle ou trimestrielle selon le chiffre d’affaires.",
    },
    {
      type: 'p',
      text: "Pour un artisan aujourd’hui au simplifié, cela change deux choses. La contrainte administrative augmente — mais elle est largement absorbée par un logiciel de facturation correct. Et surtout, le rythme de trésorerie change du tout au tout : au lieu de deux échéances annuelles, vous paierez au fil de l’eau.",
    },
    {
      type: 'p',
      text: "Le conseil qui découle de tout cela : n’attendez pas 2027 pour prendre l’habitude de mettre la TVA de côté chaque mois. Ceux qui basculeront en ayant déjà ce réflexe ne verront pas la différence ; les autres découvriront qu’ils vivaient sur de l’argent qui n’était pas le leur.",
    },

    { type: 'h2', text: 'Ce que vous récupérez vraiment' },
    {
      type: 'p',
      text: "La TVA que vous payez sur vos achats professionnels est déductible, à trois conditions : la dépense doit être nécessaire à votre activité, vous devez détenir une facture en règle à votre nom, et la TVA doit être exigible chez votre fournisseur.",
    },
    {
      type: 'table',
      head: ['Dépense', 'TVA récupérable ?'],
      rows: [
        ['Matériaux, fournitures, consommables', 'Oui, intégralement'],
        ['Outillage, matériel, équipement', 'Oui'],
        ['Véhicule utilitaire (fourgon, camionnette)', 'Oui'],
        ['Véhicule de tourisme', 'Non, en principe exclu'],
        ['Gazole et essence — véhicule utilitaire', 'Oui, intégralement'],
        ['Gazole et essence — véhicule de tourisme', 'Oui, à hauteur de 80 %'],
        ['Téléphone, internet, logiciels professionnels', 'Oui, au prorata de l’usage professionnel'],
        ['Repas pris seul en déplacement professionnel', 'Oui, sur facture nominative'],
        ['Frais de réception et cadeaux clients', 'Encadré, avec des plafonds'],
      ],
    },
    {
      type: 'p',
      text: "Depuis 2022, l’essence est alignée sur le gazole : plus de distinction entre les deux carburants, seule compte la nature du véhicule. Beaucoup d’artisans l’ignorent encore et ne déduisent rien sur l’essence.",
    },
    {
      type: 'p',
      text: "La règle qui fait perdre le plus d’argent aux artisans n’est pourtant dans aucun de ces cas : c’est le ticket de caisse. Un ticket de grande surface de bricolage sans votre nom ni votre numéro de TVA n’est pas une facture. La TVA n’est pas récupérable dessus.",
    },
    {
      type: 'note',
      title: 'Le réflexe qui rapporte le plus, pour zéro effort',
      text: "Ouvrez un compte professionnel chez vos fournisseurs habituels, y compris les grandes enseignes de bricolage, et demandez systématiquement une facture au lieu d’un ticket. Un artisan qui achète 15 000 € par an en tickets non nominatifs laisse jusqu’à 2 500 € de TVA sur la table. C’est plus que ce que la plupart des optimisations rapportent.",
    },

    { type: 'h2', text: 'Le piège du décalage : encaissement contre facturation' },
    {
      type: 'p',
      text: "Pour les prestations de services, la TVA est exigible à l’encaissement. Pour les livraisons de biens, elle l’est à la livraison. Un chantier de fourniture et pose peut donc relever des deux logiques, et c’est là que les erreurs se logent.",
    },
    {
      type: 'p',
      text: "Conséquence directe et souvent mal comprise : un acompte encaissé rend la TVA exigible sur son montant, immédiatement, même si aucun travail n’a commencé. À l’inverse, une facture émise mais non payée ne déclenche pas la TVA sur la part de prestation de services — ce qui vous évite d’avancer la taxe sur une facture impayée.",
    },
    {
      type: 'p',
      text: "Il existe une option pour le paiement de la TVA d’après les débits, qui rend la taxe exigible à la facturation plutôt qu’à l’encaissement. Elle simplifie la gestion quand on facture beaucoup et qu’on est payé régulièrement, mais elle vous fait avancer la TVA sur les factures en attente. Pour un artisan qui subit des retards de paiement, c’est rarement une bonne idée. Si vous l’exercez, la mention « Option pour le paiement de la taxe d’après les débits » doit figurer sur vos factures.",
    },

    { type: 'h2', text: 'Les cas particuliers du bâtiment' },
    { type: 'h3', text: 'Les taux réduits' },
    {
      type: 'p',
      text: "Un chantier de rénovation mélange couramment 20 %, 10 % et 5,5 %. Chaque ligne porte son taux, et le récapitulatif doit détailler la base et le montant de TVA par taux. C’est un sujet à part entière, traité dans notre guide sur les taux de TVA applicables aux travaux.",
    },
    { type: 'h3', text: 'L’autoliquidation en sous-traitance' },
    {
      type: 'p',
      text: "Quand vous intervenez comme sous-traitant pour des travaux de construction au profit d’un preneur assujetti, vous facturez en hors taxes avec la mention « Autoliquidation », et c’est le donneur d’ordre qui déclare la taxe. Attention à l’effet sur votre trésorerie : vous n’encaissez plus de TVA, mais vous continuez à en payer sur vos achats. Une activité principalement en sous-traitance génère donc structurellement des crédits de TVA — que vous pouvez demander en remboursement plutôt que de les laisser dormir.",
    },
    { type: 'h3', text: 'Les crédits de TVA' },
    {
      type: 'p',
      text: "Un crédit de TVA n’est pas une somme perdue : vous pouvez l’imputer sur les échéances suivantes ou en demander le remboursement. Beaucoup d’artisans le reportent indéfiniment par méconnaissance, laissant plusieurs milliers d’euros immobilisés chez l’État alors qu’ils sont à découvert à la banque. Si vous avez investi dans un véhicule ou du matériel lourd, posez la question du remboursement à votre comptable.",
    },

    { type: 'h2', text: 'La méthode pour ne jamais être pris de court' },
    {
      type: 'steps',
      items: [
        "Ouvrez un second compte, même un simple livret, et virez-y la TVA collectée dès l’encaissement de chaque facture. Ce n’est pas de l’épargne, c’est de l’argent qui ne vous appartient pas.",
        "Facturez par acomptes et situations plutôt qu’en une fois : vous lissez à la fois vos encaissements et la TVA correspondante.",
        "Demandez une facture nominative pour chaque achat, sans exception. Un ticket de caisse est de la TVA perdue.",
        "Suivez votre chiffre d’affaires cumulé en cours d’année si vous êtes proche d’un seuil : le passage à la TVA se prépare, il ne se subit pas.",
        "Préparez dès maintenant la suppression du régime simplifié au 1er janvier 2027, en prenant l’habitude du rythme mensuel.",
      ],
    },
    {
      type: 'p',
      text: "Rien de tout cela n’est de la comptabilité avancée. C’est de l’organisation, et ça se joue au moment de la facture — pas au moment de la déclaration. Un outil qui applique le bon taux ligne par ligne, qui distingue les acomptes, qui garde la trace de ce qui est encaissé et de ce qui ne l’est pas, vous évite l’essentiel des erreurs. C’est ce que fait MonDevisMinute : la TVA est calculée par taux sur chaque devis et chaque facture, les acomptes sont déduits automatiquement du solde, et vous savez à tout moment ce qui a été réellement payé.",
    },
  ],
  faq: [
    {
      q: 'Dois-je déclarer la TVA sur une facture que le client n’a pas payée ?',
      a: "Pour les prestations de services, non : la TVA est exigible à l’encaissement, donc une facture impayée ne déclenche pas la taxe. Attention toutefois si vous avez opté pour le paiement d’après les débits : dans ce cas, la TVA devient exigible à la facturation, même sans règlement.",
    },
    {
      q: 'Puis-je récupérer la TVA sur un ticket de caisse ?',
      a: "Non. Un ticket sans votre nom, votre adresse et les mentions d’une facture en règle ne permet pas la déduction. Ouvrez un compte professionnel chez vos fournisseurs et demandez systématiquement une facture : c’est le geste qui rapporte le plus pour le moins d’effort.",
    },
    {
      q: 'Que faire si je suis en crédit de TVA ?',
      a: "Vous pouvez l’imputer sur vos échéances suivantes ou en demander le remboursement, sous conditions de montant et de périodicité. Ne le laissez pas s’accumuler indéfiniment : c’est votre trésorerie qui dort. Après un investissement important, la question du remboursement se pose systématiquement.",
    },
    {
      q: 'Le régime simplifié va-t-il vraiment disparaître ?',
      a: "Oui. En application de la loi de finances pour 2025, il est supprimé au 1er janvier 2027. Les entreprises ne relevant pas de la franchise en base passeront toutes au réel normal, avec une déclaration mensuelle ou trimestrielle selon leur chiffre d’affaires. Le mieux est de prendre dès maintenant le réflexe de provisionner la TVA chaque mois.",
    },
    {
      q: 'Faut-il opter pour le paiement d’après les débits ?',
      a: "Cela simplifie la gestion quand vous facturez beaucoup et que vous êtes payé régulièrement, puisque la TVA suit la facturation. Mais vous avancez alors la taxe sur les factures en attente de règlement. Pour un artisan qui subit des retards de paiement, c’est le plus souvent défavorable. Si vous exercez l’option, la mention correspondante doit figurer sur vos factures.",
    },
    {
      q: 'Je travaille surtout en sous-traitance et je suis toujours en crédit de TVA. Est-ce normal ?',
      a: "Oui, c’est structurel. En autoliquidation vous facturez en hors taxes, donc vous ne collectez rien, alors que vous continuez à payer la TVA sur vos achats. Ce crédit permanent doit être demandé en remboursement plutôt que reporté, sinon vous financez l’État avec votre trésorerie.",
    },
  ],
};
