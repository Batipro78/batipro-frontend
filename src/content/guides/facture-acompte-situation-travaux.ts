import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'facture-acompte-situation-travaux',
  title: "Facture d’acompte et situation de travaux",
  h1: "Facture d’acompte et situation de travaux : le guide pratique de l’artisan",
  metaTitle: "Facture d’acompte et situation de travaux : mode d’emploi",
  metaDescription:
    "Établir une facture d’acompte et une situation de travaux : obligations, TVA exigible, retenue de garantie, déduction sur la facture finale.",
  excerpt:
    "Facturer une seule fois, à la fin, c’est financer le chantier de votre poche et concentrer tout le risque d’impayé sur un seul document. L’acompte et la situation de travaux existent pour éviter ça. Voici comment les établir correctement.",
  category: 'Se faire payer',
  updated: '2026-07-21',
  related: [
    'mentions-obligatoires-facture-artisan',
    'se-faire-payer-artisan-impayes',
    'sous-traitance-btp',
  ],
  blocks: [
    {
      type: 'p',
      text: "Beaucoup d’artisans facturent de la même façon depuis toujours : le chantier commence, le chantier se termine, la facture part. Entre les deux, ils ont acheté les matériaux, payé les heures, roulé, et parfois loué du matériel — de leur poche. Puis ils attendent le règlement trente jours de plus.",
    },
    {
      type: 'p',
      text: "C’est un choix qui coûte cher deux fois. Il ponctionne la trésorerie pendant toute la durée du chantier, et il concentre l’intégralité du risque sur une seule facture : si le client ne paie pas, vous perdez tout, pas une partie. Deux outils simples corrigent cela : la facture d’acompte et la situation de travaux. Ils sont parfaitement classiques dans le bâtiment, et pourtant très peu utilisés par les indépendants.",
    },

    { type: 'h2', text: 'La facture d’acompte' },
    { type: 'h3', text: 'Elle est obligatoire, pas optionnelle' },
    {
      type: 'p',
      text: "Dès que vous encaissez un acompte, vous devez émettre une facture d’acompte. Ce n’est pas une courtoisie ni un reçu improvisé : c’est une facture au sens plein, qui porte son propre numéro dans votre séquence chronologique et qui doit comporter les mentions habituelles.",
    },
    {
      type: 'p',
      text: "L’erreur la plus fréquente consiste à encaisser un chèque d’acompte et à ne rien émettre du tout, en se disant qu’on régularisera à la facture finale. Cela crée un encaissement sans pièce justificative, ce qui pose un problème comptable et un problème de TVA.",
    },
    {
      type: 'note',
      title: 'Prévoir l’acompte, oui — l’encaisser tout de suite, non',
      text: "Quand le devis est signé ailleurs que dans vos locaux — donc chez la plupart de vos clients particuliers —, l’article L221-10 du code de la consommation vous interdit de recevoir un paiement avant l’expiration d’un délai de sept jours à compter de la conclusion du contrat, et d’exécuter la prestation pendant ce délai. Il est assorti de sanctions pénales lourdes. Faites signer le devis avec sa clause d’acompte, puis encaissez à partir du huitième jour. L’exception vise les travaux d’entretien ou de réparation à réaliser en urgence, expressément sollicités par le client. Le détail figure dans notre guide [Se faire payer quand on est artisan](/guides/se-faire-payer-artisan-impayes).",
    },
    { type: 'h3', text: 'Ce qu’elle doit contenir' },
    {
      type: 'list',
      items: [
        "Toutes les mentions d’une facture ordinaire : vos coordonnées et identifiants, celles du client, la date, un numéro unique",
        "La mention explicite qu’il s’agit d’un acompte, et la référence de la commande ou du devis concerné",
        "Le montant de l’acompte hors taxes, le taux et le montant de TVA, le montant toutes taxes comprises",
        "Le rappel du montant total de la commande, pour situer l’acompte dans l’ensemble",
        "Votre assurance professionnelle, comme sur tous vos documents",
      ],
    },
    {
      type: 'p',
      text: "Une facture d’acompte ne décrit pas des travaux réalisés — elle constate un versement anticipé. Le renvoi au devis, avec sa référence et sa date, tient lieu de description détaillée : vous n’avez pas à recopier tout le chiffrage.",
    },
    { type: 'h3', text: 'La TVA devient exigible immédiatement' },
    {
      type: 'p',
      text: "C’est le point à comprendre, et il surprend beaucoup d’artisans. Pour les prestations de services — donc pour l’essentiel de la main-d’œuvre du bâtiment —, la TVA est exigible à l’encaissement. Autrement dit : dès que l’acompte arrive sur votre compte, la TVA correspondante est due, même si vous n’avez pas encore posé une seule vis.",
    },
    {
      type: 'p',
      text: "Conséquence pratique : un acompte de 3 000 € TTC encaissé en mars à 10 % de TVA vous rend redevable d’environ 273 € de TVA au titre de mars. Si vous oubliez de le déclarer parce que « le chantier n’est pas fini », vous accumulez un décalage qui finit par se voir.",
    },
    {
      type: 'note',
      title: 'Le réflexe de trésorerie',
      text: "Quand vous encaissez un acompte, la TVA qu’il contient ne vous appartient pas. Sur un acompte de 3 000 € TTC à 10 %, environ 273 € sont à l’État. Le piège classique consiste à raisonner sur le montant encaissé au lieu du montant hors taxes, à dépenser la TVA sans s’en apercevoir, et à se retrouver court à l’échéance.",
    },

    { type: 'h2', text: 'La situation de travaux' },
    { type: 'h3', text: 'Le principe' },
    {
      type: 'p',
      text: "Sur un chantier qui s’étale, la situation de travaux permet de facturer au fur et à mesure de l’avancement réel plutôt que d’attendre la réception. Chaque situation constate ce qui a été exécuté sur la période, et rend exigible le paiement correspondant.",
    },
    {
      type: 'p',
      text: "La différence avec l’acompte est de nature. L’acompte est un versement anticipé, sans lien avec l’avancement : c’est de la confiance monétisée. La situation, elle, facture du travail effectivement réalisé, mesurable, vérifiable sur le chantier. C’est pour cela qu’elle se conteste beaucoup moins.",
    },
    { type: 'h3', text: 'Comment la construire' },
    {
      type: 'p',
      text: "Une situation reprend la structure du devis, poste par poste, et ajoute pour chacun un pourcentage d’avancement. Le calcul se fait toujours en cumulé depuis le début du chantier, puis on déduit ce qui a déjà été facturé.",
    },
    {
      type: 'table',
      head: ['Poste', 'Montant marché HT', 'Avancement', 'Cumul HT'],
      rows: [
        ['Dépose ancienne installation', '1 200 €', '100 %', '1 200 €'],
        ['Passage des réseaux', '4 500 €', '80 %', '3 600 €'],
        ['Tableau et protections', '2 800 €', '50 %', '1 400 €'],
        ['Appareillage et finitions', '2 000 €', '0 %', '0 €'],
        ['Total', '10 500 €', '', '6 200 €'],
        ['Déjà facturé (situation n° 1)', '', '', '3 000 €'],
        ['À payer sur cette situation', '', '', '3 200 €'],
      ],
    },
    {
      type: 'p',
      text: "Ce format a un mérite discret mais décisif : il rend la discussion factuelle. Le client ne conteste pas un montant global, il discute un pourcentage sur un poste précis — et devant le chantier, un pourcentage se vérifie.",
    },
    { type: 'h3', text: 'À quel rythme ?' },
    {
      type: 'p',
      text: "Le rythme mensuel est la norme sur les marchés structurés. Pour un artisan indépendant, le bon repère est plutôt la durée du chantier : au-delà de trois semaines, une situation intermédiaire se justifie. Sur un chantier de deux mois, trois situations valent nettement mieux qu’une facture finale.",
    },
    {
      type: 'p',
      text: "Prévoyez le principe dans le devis : « Facturation par situations mensuelles selon l’avancement, paiement à réception. » Une situation qui arrive sans avoir été annoncée surprend le client et retarde le paiement ; annoncée dès le départ, elle est acceptée sans discussion.",
    },

    { type: 'h2', text: 'La retenue de garantie' },
    {
      type: 'p',
      text: "Sur les marchés qui la prévoient, le maître d’ouvrage retient 5 % du montant des travaux pour couvrir la reprise d’éventuels désordres. Cette somme est consignée, puis restituée à l’expiration d’un délai d’un an à compter de la réception, sauf opposition motivée notifiée par lettre recommandée.",
    },
    {
      type: 'p',
      text: "Deux points à retenir. D’abord, c’est la date de réception qui fait courir le délai, pas la levée des réserves — une confusion très répandue. Ensuite, vous pouvez éviter la retenue en fournissant à la place une caution personnelle et solidaire émanant d’un établissement financier figurant sur une liste fixée par décret. Votre banque est le premier interlocuteur à solliciter. Sur un chantier de 40 000 €, cela représente 2 000 € qui restent dans votre trésorerie au lieu d’attendre un an.",
    },
    {
      type: 'p',
      text: "Quand elle s’applique, la retenue doit figurer explicitement sur la facture, sous le total, avec la mention du montant retenu et de sa date de restitution prévue.",
    },

    { type: 'h2', text: 'La facture finale : recoller les morceaux' },
    {
      type: 'p',
      text: "La facture de solde reprend l’intégralité du marché, puis déduit tout ce qui a déjà été facturé. C’est là que les erreurs se logent, parce qu’on manipule plusieurs documents.",
    },
    {
      type: 'steps',
      items: [
        "Reprendre le détail complet des prestations réalisées, avec les montants définitifs et les éventuels travaux supplémentaires qui ont fait l’objet d’un devis complémentaire accepté.",
        "Afficher le total hors taxes du marché, puis la TVA par taux, puis le total toutes taxes comprises.",
        "Déduire chaque acompte et chaque situation, en rappelant pour chacun son numéro de facture et sa date. Ne jamais déduire un montant global sans référence : c’est ingérable en cas de contrôle ou de litige.",
        "Appliquer, le cas échéant, la retenue de garantie.",
        "Faire apparaître le net à payer, en toutes lettres si vous le souhaitez, pour couper court aux malentendus.",
      ],
    },
    {
      type: 'p',
      text: "Attention à un piège de TVA : vous déduisez les acomptes toutes taxes comprises, pas seulement leur montant hors taxes. La TVA de ces acomptes a déjà été déclarée ; la redéclarer sur la facture finale revient à la payer deux fois. C’est une erreur fréquente, et elle se récupère mal.",
    },

    { type: 'h2', text: 'Les cinq erreurs qui reviennent le plus' },
    {
      type: 'list',
      items: [
        "Encaisser un acompte sans émettre de facture d’acompte : pas de justificatif, TVA non déclarée, comptabilité bancale.",
        "Numéroter les acomptes n’importe comment, avec des trous. Une série distincte est admise — un préfixe par année par exemple — à condition qu’elle soit elle-même continue et sans rupture.",
        "Confondre acompte et arrhes : à défaut de précision, les sommes versées sont présumées être des arrhes, ce qui autorise le client à se dédire. Écrivez toujours « acompte ».",
        "Facturer une situation sans référence à l’avancement, sous forme de montant global. Le client n’a alors aucun moyen de vérifier, donc aucune raison de payer vite.",
        "Oublier de déduire un acompte sur la facture finale, ou le déduire deux fois. C’est le genre d’erreur qui vous fait passer pour approximatif au pire moment.",
      ],
    },

    { type: 'h2', text: 'Ce que ça change concrètement sur une année' },
    {
      type: 'p',
      text: "Prenons un artisan qui réalise 120 000 € de chiffre d’affaires sur des chantiers de six semaines en moyenne, facturés une seule fois à la fin, payés à trente jours. Il finance en permanence l’équivalent de plusieurs semaines d’activité : matériaux avancés, heures travaillées, charges payées.",
    },
    {
      type: 'p',
      text: "Le même artisan avec 30 % d’acompte à la commande et une situation à mi-parcours encaisse la majeure partie de chaque chantier avant sa fin. Le besoin de trésorerie fond, et surtout l’exposition à l’impayé passe de la totalité du chantier à son solde.",
    },
    {
      type: 'p',
      text: "Aucun de ces deux outils ne demande d’autorisation particulière ni de logiciel compliqué. Ils demandent juste d’être prévus au devis et émis au bon moment. C’est exactement ce que MonDevisMinute automatise : le devis accepté devient une facture d’acompte puis des situations, chaque document reprend les lignes et les taux de TVA du devis d’origine, et les déductions se calculent toutes seules sur la facture de solde. Vous décidez du rythme ; l’arithmétique ne se trompe plus.",
    },
  ],
  faq: [
    {
      q: 'Puis-je demander un acompte sur un petit chantier ?',
      a: "Oui, il n’existe aucun montant minimum. La question est plutôt commerciale : sur une intervention de quelques centaines d’euros réglée le jour même, l’acompte complique la relation sans rien apporter. À partir du moment où vous avancez des matériaux ou où le chantier dure plusieurs jours, il se justifie pleinement.",
    },
    {
      q: 'Quelle différence entre une facture d’acompte et un devis signé ?',
      a: "Le devis signé est un contrat : il engage les deux parties mais ne constate aucun paiement. La facture d’acompte constate un encaissement réel, entre dans votre comptabilité et rend la TVA exigible. Les deux sont nécessaires, et l’un ne remplace pas l’autre.",
    },
    {
      q: 'Dois-je déclarer la TVA d’un acompte avant d’avoir fait les travaux ?',
      a: "Oui, pour les prestations de services : la TVA est exigible à l’encaissement, indépendamment de l’avancement. C’est une règle de trésorerie à intégrer — la TVA contenue dans l’acompte n’est pas de l’argent disponible.",
    },
    {
      q: 'Le client peut-il refuser de payer une situation ?',
      a: "Il peut la contester s’il estime que l’avancement annoncé ne correspond pas à la réalité du chantier. C’est précisément pour cela qu’une situation doit détailler l’avancement poste par poste : la discussion porte alors sur un pourcentage vérifiable sur place, pas sur un montant. En pratique, une situation bien construite se conteste rarement.",
    },
    {
      q: 'La retenue de garantie est-elle obligatoire ?',
      a: "Non, elle s’applique seulement si le marché la prévoit. Quand elle existe, elle est plafonnée à 5 % et restituée un an après la réception, sauf opposition motivée notifiée par lettre recommandée. Vous pouvez toujours proposer de la remplacer par une caution bancaire : la somme reste alors dans votre trésorerie.",
    },
    {
      q: 'Comment numéroter mes factures d’acompte et mes situations ?',
      a: "Dans une séquence chronologique continue et sans trous. Une série distincte est admise, à condition qu’elle soit elle-même continue. Vous pouvez aussi ajouter un libellé clair — « Acompte 30 % — devis DEV-2026-045 » ou « Situation n° 2 » — qui facilite la lecture sans casser la chronologie.",
    },
  ],
};
