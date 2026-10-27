import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'avenant-travaux-supplementaires',
  title: "Avenant et travaux supplémentaires",
  h1: "Avenant au devis : comment facturer des travaux supplémentaires sans litige",
  metaTitle: "Avenant au devis : travaux supplémentaires sans litige",
  metaDescription:
    "Faire un avenant sur un devis : quand il est nécessaire, ce qu’il contient, comment le faire signer avant les travaux et se faire payer le supplément.",
  excerpt:
    "Une cloison ouverte, un fil gainé de tissu, une canalisation rouillée : l’imprévu fait partie du chantier. Ce qui coûte cher, c’est de le traiter sans accord écrit. Voici comment rédiger un avenant et faire payer ce qui n’était pas au devis.",
  category: 'Se faire payer',
  updated: '2026-10-27',
  related: [
    'devis-signe-valeur-juridique',
    'se-faire-payer-artisan-impayes',
    'pv-reception-travaux',
  ],
  blocks: [
    {
      type: 'p',
      text: "Vous avez chiffré une rénovation de salon, le devis est signé, les travaux commencent. Le troisième jour, vous ouvrez une cloison et vous tombez sur une installation électrique d’un autre âge. Ou le client passe voir le chantier et lâche : « Tant que vous êtes là, vous pourriez aussi refaire le mur d’à côté. » Dans les deux cas, vous venez de sortir du devis.",
    },
    {
      type: 'p',
      text: "Ce moment est celui où beaucoup d’artisans perdent de l’argent. Non pas parce que le client est de mauvaise foi, mais parce que l’accord s’est fait sur le pouce, à l’oral, en vitesse, et que personne n’en a gardé la trace. L’avenant sert à cela : transformer un « oui, faites-le » en engagement écrit, avec un prix, avant de sortir l’outil.",
    },
    {
      type: 'image',
      src: '/guides/avenant-travaux-supplementaires.webp',
      alt: "Un mur de plâtre ancien ouvert en cours de rénovation, laissant voir de vieux fils électriques gainés de tissu et une canalisation rouillée ; un pied de biche est posé contre le mur, un projecteur de chantier est au sol et de la poussière couvre les lieux.",
      caption: "Ce que révèle un mur ouvert n’était écrit nulle part dans le devis : c’est exactement le cas où un avenant doit être signé avant de continuer.",
    },
    {
      type: 'p',
      text: "Ce guide explique ce qu’est un avenant, quand le faire, ce qu’il doit contenir, comment le faire signer et quelles erreurs éviter. Le principe de départ : le contrat initial ne se modifie pas à sens unique.",
    },

    { type: 'h2', text: 'À quoi sert un avenant' },
    {
      type: 'p',
      text: "Un devis signé engage les deux parties sur le prix et sur le contenu qu’il décrit. Vous vous êtes engagé à réaliser ces travaux-là, pour ce prix-là. Le client, lui, s’est engagé à payer ce montant-là, pas un euro de plus sans l’avoir accepté.",
    },
    {
      type: 'p',
      text: "Tout travail en plus, ou différent de ce qui est écrit, doit donc être accepté par le client avant d’être fait. Si vous exécutez d’abord et que vous présentez la note ensuite, vous prenez un risque : le client peut répondre qu’il ne l’a jamais demandé, ou qu’il pensait que c’était compris. Et c’est à vous qu’il revient de prouver son accord. Sans écrit, l’artisan aura du mal à s’en faire payer.",
    },
    {
      type: 'p',
      text: "L’avenant est le document qui modifie le devis initial. Il peut ajouter des travaux, en retirer, ou changer la façon de les réaliser. Il ne remplace pas le devis : il s’y rattache et s’additionne à lui.",
    },

    { type: 'h2', text: 'Ce que dit la loi, et ce qu’elle ne dit pas' },
    {
      type: 'p',
      text: "Pour un cas précis, la loi est très claire. L’article 1793 du Code civil concerne le marché à forfait pour la construction d’un bâtiment d’après un plan convenu : l’entrepreneur ne peut demander aucune augmentation de prix pour des changements ou des augmentations faits sur ce plan, s’ils n’ont pas été autorisés par écrit et si le prix n’en a pas été convenu avec le propriétaire.",
    },
    {
      type: 'note',
      title: 'Ne généralisez pas cet article',
      text: "L’article 1793 vise un type de marché bien défini : le forfait pour la construction d’un bâtiment d’après un plan convenu. Il ne s’applique pas automatiquement à tous les chantiers. Mais la leçon dépasse ce cas : même en dehors de lui, l’écrit signé reste la seule preuve solide que le client a accepté le supplément et son prix.",
    },
    {
      type: 'p',
      text: "Retenez donc une règle de terrain, sans chercher à savoir si votre chantier relève ou non de cet article : pas de supplément sans accord écrit, daté et chiffré.",
    },

    { type: 'h2', text: 'Les situations où il faut un avenant' },
    {
      type: 'p',
      text: "Les occasions sont plus fréquentes qu’on ne le croit. Trois familles reviennent presque toujours.",
    },
    {
      type: 'list',
      items: [
        "La découverte en cours de chantier : une installation électrique vétuste derrière une cloison, une canalisation corrodée, un support abîmé que le devis ne pouvait pas deviner.",
        "La demande du client en cours de route : une prise en plus, une autre couleur, une pièce supplémentaire à peindre, un matériau différent.",
        "La quantité sous-estimée : vous aviez compté une surface ou un métrage, la réalité en demande davantage.",
      ],
    },
    {
      type: 'p',
      text: "Un avenant n’est pas toujours une hausse. Quand le client décide de retirer un poste — il garde son ancien carrelage, il renonce à la dépose d’un meuble —, la réduction se traite aussi par avenant, en négatif. Cela évite qu’un client croie, à la fin, que le prix n’a pas bougé alors qu’il a supprimé une partie du chantier.",
    },

    { type: 'h2', text: 'Ce que doit contenir un avenant' },
    {
      type: 'p',
      text: "L’avenant n’a pas de forme imposée. Il peut tenir sur une page, sur le même modèle que votre devis. Mais pour qu’il vous protège, certaines informations doivent y figurer.",
    },
    {
      type: 'steps',
      items: [
        "La référence du devis initial : son numéro et sa date, pour que l’avenant s’y rattache sans ambiguïté.",
        "La description précise des travaux ajoutés, retirés ou modifiés. « Reprise de l’électricité » ne suffit pas ; « remplacement de 12 mètres de câble et de trois prises dans le salon » oui.",
        "Le prix hors taxes de chaque modification, le taux de TVA applicable et le total toutes taxes comprises.",
        "L’incidence sur le délai : quelques jours de plus, ou aucun changement. Dites-le noir sur blanc.",
        "La date, puis la signature du client précédée de la mention « bon pour accord ». Votre propre signature complète le document.",
      ],
    },
    {
      type: 'p',
      text: "Vous pouvez aussi choisir de rédiger un devis complémentaire plutôt qu’un avenant au sens strict. L’effet est le même, à une condition : que le client le signe avant que les travaux ne soient faits. Signé après coup, il arrive quand la discussion est déjà ouverte.",
    },

    { type: 'h2', text: 'Un exemple concret' },
    {
      type: 'p',
      text: "Reprenons le chantier du salon. Le devis initial portait sur la dépose d’une cloison en placo, la peinture et la pose d’un parquet. En ouvrant le mur, vous découvrez de vieux fils électriques gainés de tissu et une canalisation rouillée. Vous arrêtez, vous prenez des photos, vous appelez le client.",
    },
    {
      type: 'table',
      head: ['Étape', 'Ce que vous faites', 'Ce que vous obtenez'],
      rows: [
        ['Constat', 'Photos du mur ouvert, explication au client', 'Le client voit ce que vous avez vu'],
        ['Chiffrage', 'Avenant avec travaux, prix HT, TVA, TTC et délai', 'Un montant clair, rattaché au devis initial'],
        ['Accord', 'Signature « bon pour accord » avant de reprendre', 'Une preuve écrite et datée'],
        ['Exécution', 'Réalisation des travaux ajoutés', 'Un supplément exigible sans débat'],
        ['Facturation', 'Ajout du montant de l’avenant au solde', 'Une facture finale cohérente avec les documents signés'],
      ],
    },
    {
      type: 'p',
      text: "Il évite des semaines de discussion à la fin, et il montre au client que vous travaillez proprement. Un client à qui l’on annonce un imprévu avec photos et prix, avant d’agir, vit mieux la mauvaise nouvelle qu’un client qui la découvre sur la facture.",
    },

    { type: 'h2', text: 'Comment faire signer l’avenant' },
    {
      type: 'p',
      text: "Sur un chantier, le plus simple est souvent le meilleur. Si le client est présent, faites-lui signer l’avenant sur place. S’il est absent, envoyez le document par e-mail avec les photos et demandez une réponse écrite qui reprend le montant. Le plus important est que le client ait bien vu le prix et la description avant de dire oui.",
    },
    {
      type: 'note',
      title: 'Signature chez le client : attention à la rétractation',
      text: "Si l’avenant ou le devis complémentaire est signé chez le client, c’est-à-dire hors de votre établissement, les règles de rétractation du code de la consommation peuvent s’appliquer. Elles ont des conséquences sur le moment où vous pouvez commencer les travaux supplémentaires. Nous ne les détaillons pas ici : tout est expliqué dans notre guide [Devis signé : valeur juridique et engagements](/guides/devis-signe-valeur-juridique). Lisez-le avant de faire signer un supplément chez un particulier.",
    },
    {
      type: 'p',
      text: "Conservez systématiquement le document signé, les photos et les messages échangés. Le tout doit rester rattaché au devis d’origine : c’est ce dossier complet qui vous servira si le client conteste le supplément. Pour la suite de la facturation, notre guide sur [la facture d’acompte et la situation de travaux](/guides/facture-acompte-situation-travaux) explique comment reprendre les travaux supplémentaires dans la facture de solde.",
    },
    {
      type: 'p',
      text: "Dans MonDevisMinute, vous pouvez dicter à la voix les travaux supplémentaires à ajouter à un devis existant ; les totaux HT et TTC sont recalculés.",
    },

    { type: 'h2', text: 'Les erreurs qui coûtent cher' },
    {
      type: 'list',
      items: [
        "L’accord oral au téléphone. « D’accord, faites-le » dit un mardi soir ne laisse aucune trace. Trois semaines plus tard, le client se souvient d’une autre conversation.",
        "Le SMS sans prix. Un message « ok pour le mur » prouve que le client a répondu, pas qu’il a accepté un montant. Le prix doit apparaître dans l’échange.",
        "Facturer le supplément à la fin sans écrit. C’est la configuration où l’artisan a le plus de mal à s’en faire payer : le client découvre la somme au moment de régler.",
        "Oublier le délai. Un supplément qui rallonge le chantier de quatre jours, non annoncé, devient un nouveau sujet de tension, même si le prix a été accepté.",
        "Rester vague sur la description. Un avenant qui parle de « travaux divers » ne protège ni vous ni le client.",
        "Attendre la réception pour régulariser. Mieux vaut avoir tous les avenants signés quand vous organisez [le procès-verbal de réception](/guides/pv-reception-travaux), pour que le solde soit clair.",
      ],
    },

    { type: 'h2', text: 'Prévenir plutôt que guérir' },
    {
      type: 'p',
      text: "Vous ne pouvez pas empêcher les imprévus, mais vous pouvez en parler avant qu’ils arrivent. Dans votre devis initial, précisez ce qui n’est pas compris, et indiquez que toute intervention non prévue fera l’objet d’un accord écrit préalable. Cette phrase ne vous garantit rien, mais elle prépare le client à l’idée qu’un avenant est une procédure normale, pas un coup de force.",
    },
    {
      type: 'p',
      text: "Au moment de la découverte, restez factuel. Montrez, expliquez, proposez une solution chiffrée. Si le client hésite, laissez-lui le temps de réfléchir, quitte à avancer sur une autre partie du chantier en attendant. Un supplément accepté dans la contrainte est un supplément qui finit parfois en litige.",
    },
    {
      type: 'p',
      text: "Enfin, pour l’impayé en général, notre guide [Se faire payer quand on est artisan](/guides/se-faire-payer-artisan-impayes) rappelle les réflexes à avoir quand le règlement tarde. Un avenant signé en fait partie : c’est la preuve la plus solide de ce que le client a accepté.",
    },
  ],
  faq: [
    {
      q: 'Un avenant est-il obligatoire pour des travaux supplémentaires ?',
      a: "Aucune forme n’est imposée, mais l’accord du client doit être obtenu avant les travaux. L’écrit signé est la seule preuve solide. Sans lui, vous aurez du mal à vous faire payer le supplément.",
    },
    {
      q: 'Quelle différence entre un avenant et un devis complémentaire ?',
      a: "Aucune en pratique, si le client signe avant que les travaux ne soient faits. L’avenant modifie le devis initial, le devis complémentaire s’y ajoute. Dans les deux cas, ce qui compte est la signature préalable.",
    },
    {
      q: 'Que mettre dans un avenant ?',
      a: "La référence du devis initial, la description précise des travaux ajoutés, retirés ou modifiés, le prix HT, la TVA et le TTC, l’incidence sur le délai, la date et la signature avec « bon pour accord ». Ces éléments suffisent.",
    },
    {
      q: 'Peut-on faire un avenant pour retirer des travaux ?',
      a: "Oui. Un poste que le client supprime se traite aussi par avenant, en négatif. Le montant du devis baisse d’autant et chacun sait ce qui a été retiré.",
    },
    {
      q: 'Un SMS ou un accord par téléphone suffit-il ?',
      a: "C’est fragile. Un accord oral ne laisse aucune trace, et un SMS sans prix ne prouve pas que le client a accepté un montant. Faites signer un document ou obtenez un e-mail qui reprend la description et le prix.",
    },
  ],
};
