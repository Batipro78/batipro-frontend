import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'devis-maprimerenov-cee',
  title: "Le devis pour MaPrimeRénov’ et les CEE",
  h1: "Devis MaPrimeRénov’ et CEE : ce qu’il doit contenir pour que le dossier passe",
  metaTitle: "Devis MaPrimeRénov’ : ce qu’il faut y faire figurer",
  metaDescription:
    "Visite préalable, qualification RGE, mentions techniques : pourquoi les dossiers d’aide sont refusés et comment rédiger un devis qui passe.",
  excerpt:
    "Un dossier d’aide refusé, c’est un chantier perdu — et c’est vous que le client appelle. Neuf fois sur dix, le blocage vient du devis ou de l’ordre des étapes. Voici ce qu’il faut y faire figurer et ce qu’il ne faut jamais faire avant.",
  category: 'Aides & subventions',
  updated: '2026-07-21',
  related: [
    'mentions-obligatoires-devis-batiment',
    'taux-tva-travaux-renovation',
    'devis-qui-fait-signer',
  ],
  blocks: [
    {
      type: 'p',
      text: "La rénovation énergétique aidée est devenue une part importante du marché. Elle a aussi apporté une contrainte que les artisans n’avaient pas avant : votre devis ne sert plus seulement à convaincre le client, il doit passer devant un organisme instructeur qui ne vous connaît pas et qui ne vous appellera pas pour demander des précisions.",
    },
    {
      type: 'p',
      text: "Quand un dossier est refusé ou bloqué, le client ne se dit pas « l’administration est compliquée ». Il se dit « l’artisan a mal fait le papier ». Et c’est souvent vrai. Ce guide explique ce qui doit figurer sur le devis et, tout aussi important, dans quel ordre les choses doivent se passer.",
    },
    {
      type: 'note',
      title: 'Une réserve à lire d’abord',
      text: "Les dispositifs d’aide changent souvent — montants, parcours, conditions d’éligibilité, périodes d’ouverture du guichet. Ce guide décrit la logique et les points qui reviennent systématiquement, pas un barème. Avant chaque dossier, vérifiez l’état du dispositif sur france-renov.gouv.fr et anah.gouv.fr.",
    },

    { type: 'h2', text: 'La règle qui fait tout échouer : l’ordre des étapes' },
    {
      type: 'p',
      text: "S’il ne fallait retenir qu’une chose de cet article, ce serait celle-ci : la demande d’aide se dépose avant le début des travaux. Un chantier commencé avant l’accord fait perdre l’aide, définitivement, sans recours.",
    },
    {
      type: 'p',
      text: "Le piège est d’autant plus vicieux que c’est souvent l’artisan qui provoque la faute, par serviabilité. Le client est pressé, la période est calme, on lui propose de commencer tout de suite « pendant que le dossier suit son cours ». L’aide saute, et le client se retourne contre celui qui lui a proposé de démarrer.",
    },
    {
      type: 'p',
      text: "Le devis signé, lui, ne pose pas de problème : il est même la pièce de base du dossier. C’est l’exécution qui doit attendre. Et attention à ce qui compte comme un début de travaux : une commande de matériel spécifique, un acompte encaissé, une dépose préparatoire peuvent suffire à caractériser un commencement.",
    },
    {
      type: 'p',
      text: "Pour les rénovations d’ampleur, une étape supplémentaire est venue s’ajouter en amont : un rendez-vous avec un conseiller France Rénov’ est obligatoire avant le dépôt de la demande, et le recours à un Accompagnateur Rénov’ l’est également. Si votre client vous parle d’un projet global, votre premier réflexe doit être de lui demander s’il a fait ce rendez-vous — pas de sortir votre carnet de devis.",
    },

    { type: 'h2', text: 'La qualification RGE' },
    {
      type: 'p',
      text: "Pour les travaux qui l’exigent, l’entreprise qui les réalise doit être reconnue garant de l’environnement. La qualification est délivrée par domaine de travaux : être RGE pour l’isolation ne vous qualifie pas pour la pompe à chaleur.",
    },
    {
      type: 'p',
      text: "Deux points qui coincent souvent en pratique. D’abord, c’est l’entreprise qui réalise les travaux qui doit être qualifiée — le montage consistant à faire signer le devis par une entreprise RGE et à sous-traiter à une entreprise qui ne l’est pas est régulièrement sanctionné. Ensuite, la qualification doit être valide à la date du devis et à la date des travaux : une qualification expirée entre les deux fait tomber le dossier.",
    },
    {
      type: 'p',
      text: "Faites figurer votre numéro de qualification et son domaine sur le devis. Cela évite un aller-retour avec l’instructeur, et cela rassure le client qui a souvent lu qu’il fallait « un RGE » sans savoir ce que ça recouvre.",
    },

    { type: 'h2', text: 'La visite préalable, et sa date' },
    {
      type: 'p',
      text: "Lorsque la qualification RGE est requise, le professionnel doit effectuer une visite préalable du chantier pour valider l’adéquation des matériaux et équipements au logement. Ce n’est pas une formalité : la date de cette visite doit figurer sur le devis et sur la facture.",
    },
    {
      type: 'p',
      text: "C’est un des motifs de rejet les plus fréquents, et le plus bête, parce qu’il ne coûte rien à éviter. Vous avez fait la visite — vous ne chiffrez pas une pompe à chaleur sans être allé voir. Il suffit d’en noter la date sur le document.",
    },
    {
      type: 'p',
      text: "Ajoutez à votre modèle une ligne fixe, juste sous les coordonnées du chantier : « Visite technique préalable réalisée le __/__/____ ». Vous ne pourrez plus l’oublier.",
    },

    { type: 'h2', text: 'Ce que le devis doit décrire techniquement' },
    {
      type: 'p',
      text: "Un devis classique décrit une prestation. Un devis destiné à un dossier d’aide doit décrire un produit identifiable et ses performances, parce que c’est sur ces caractéristiques que l’éligibilité se juge.",
    },
    {
      type: 'list',
      items: [
        "La marque, la référence exacte et le modèle du matériel ou du matériau posé",
        "Les caractéristiques de performance : résistance thermique pour un isolant, coefficient de performance pour une pompe à chaleur, rendement pour un appareil de chauffage, coefficient thermique pour une menuiserie",
        "Les quantités précises, avec les surfaces traitées et les épaisseurs",
        "La localisation exacte des travaux dans le logement : combles perdus, rampants, murs par l’intérieur ou par l’extérieur, plancher bas",
        "La dépose et l’évacuation de l’ancien équipement quand elles font partie de la prestation",
        "La séparation claire entre fourniture et pose",
      ],
    },
    {
      type: 'p',
      text: "« Isolation des combles : 3 500 € » ne passera jamais. « Isolation de combles perdus par soufflage de laine de verre [marque] [référence], R = 7,5 m².K/W, sur 95 m², dépose de l’ancien isolant et évacuation comprises » passe sans discussion.",
    },
    {
      type: 'p',
      text: "Cette exigence a un effet secondaire bénéfique : ces devis-là se vendent mieux. Le client comprend ce qu’il achète, et il devient beaucoup plus difficile de vous comparer à un concurrent qui n’a écrit que trois lignes.",
    },

    { type: 'h2', text: 'Le taux de TVA' },
    {
      type: 'p',
      text: "Les travaux de rénovation énergétique relèvent généralement du taux réduit de 5,5 %, et les travaux induits qui leur sont indissociablement liés suivent le même taux. Cela suppose que les conditions générales soient remplies : logement à usage d’habitation achevé depuis plus de deux ans, travaux ne conduisant pas à la production d’un immeuble neuf.",
    },
    {
      type: 'p',
      text: "Deux points d’attention se sont ajoutés récemment. Depuis le 1er mars 2025, la fourniture et l’installation de chaudières fonctionnant aux énergies fossiles relèvent du taux normal de 20 %, même lorsque l’énergie fossile n’est qu’un appoint. Et depuis le 1er octobre 2025, les panneaux photovoltaïques d’une puissance inférieure ou égale à 9 kWc bénéficient du taux de 5,5 % sous conditions, dont la consommation de l’électricité sur le lieu de production.",
    },
    {
      type: 'p',
      text: "Enfin, l’attestation de TVA à taux réduit a disparu : depuis le 1er mars 2025, le client certifie que les conditions sont remplies par une simple mention portée sur le devis ou la facture. Vous devez conserver ce document signé. Le détail complet figure dans notre guide sur les taux de TVA applicables aux travaux.",
    },

    { type: 'h2', text: 'Les CEE : le même devis, un autre circuit' },
    {
      type: 'p',
      text: "Les certificats d’économies d’énergie sont un dispositif distinct, financé par les fournisseurs d’énergie et cumulable avec les aides publiques. Le devis doit y répondre aux mêmes exigences de précision technique, mais le circuit est différent : c’est un obligé ou son délégataire qui instruit, et le moment où l’offre est engagée compte.",
    },
    {
      type: 'p',
      text: "Le plus sûr est que l’offre CEE soit engagée avant la signature du devis. Il existe toutefois une souplesse importante à connaître : lorsque le bénéficiaire est une personne physique ou un syndicat de copropriétaires — donc dans la quasi-totalité des chantiers chez les particuliers —, la contractualisation peut intervenir jusqu’à quatorze jours après la date d’engagement de l’opération, et en tout état de cause avant le début des travaux. Un client qui a signé sans avoir fait sa démarche n’a donc pas forcément tout perdu : dites-le-lui vite, l’horloge tourne, et rien ne doit avoir commencé sur le chantier.",
    },

    { type: 'h2', text: 'Ce qui vous protège, vous' },
    {
      type: 'p',
      text: "Travailler sur des chantiers aidés expose à un risque particulier : celui d’être tenu pour responsable d’un refus d’aide qui ne dépend pas de vous — un revenu fiscal qui ne correspond pas, un logement inéligible, un dossier déposé en retard par le client.",
    },
    {
      type: 'p',
      text: "Deux protections simples, à intégrer une fois pour toutes dans votre modèle de devis.",
    },
    {
      type: 'steps',
      items: [
        "Une clause qui dissocie votre prestation de l’aide : « Le présent devis porte sur la réalisation des travaux. L’obtention des aides relève de la seule responsabilité du maître d’ouvrage ; un refus, une réduction ou un retard de versement demeure sans effet sur les conditions de règlement convenues. »",
        "Une clause qui borne le démarrage : « Les travaux ne débuteront qu’après notification écrite au professionnel de l’accord de l’organisme instructeur. » Vous vous protégez, et vous protégez le client contre lui-même.",
      ],
    },
    {
      type: 'p',
      text: "Écrivez aussi noir sur blanc les montants d’aide comme des estimations non garanties si vous les mentionnez — et le plus prudent reste de ne pas les mentionner du tout. Votre devis chiffre des travaux ; le plan de financement appartient au client et à son conseiller.",
    },

    { type: 'h2', text: 'La check-list avant d’envoyer' },
    {
      type: 'list',
      items: [
        "Date de la visite technique préalable indiquée",
        "Numéro et domaine de qualification RGE indiqués, validité vérifiée",
        "Marque, référence et performances de chaque matériau ou équipement",
        "Surfaces, épaisseurs et localisation précises",
        "Dépose et évacuation mentionnées si elles sont incluses",
        "Fourniture et pose distinguées",
        "Taux de TVA correct par ligne, mention de certification du client présente",
        "Clause de non-responsabilité sur l’obtention de l’aide",
        "Clause de démarrage conditionné à l’accord écrit",
        "Vos mentions habituelles : identité, SIRET, assurance décennale et couverture géographique, durée de validité, délai d’exécution",
      ],
    },
    {
      type: 'p',
      text: "Dix points, dont sept sont fixes et ne changent jamais d’un devis à l’autre. C’est exactement le genre de chose qu’il vaut mieux câbler une fois dans un modèle que vérifier à chaque fois : dans MonDevisMinute, vos mentions, votre assurance, vos clauses types et vos taux de TVA sont enregistrés dans votre profil et se reportent automatiquement. Il ne vous reste plus qu’à décrire le chantier — ce que vous seul savez faire.",
    },
  ],
  faq: [
    {
      q: 'Puis-je commencer les travaux si le client me le demande, avant l’accord ?',
      a: "Non, jamais sur un chantier aidé. Un commencement d’exécution avant l’accord fait perdre l’aide sans recours possible. Et attention : une commande de matériel spécifique ou une dépose préparatoire peuvent suffire à caractériser un début de travaux. Refusez, expliquez pourquoi, et gardez une trace écrite de votre refus.",
    },
    {
      q: 'Dois-je être RGE pour tous les travaux de rénovation ?',
      a: "Non, seulement pour ceux qui l’exigent, et la qualification est délivrée par domaine. Être RGE en isolation ne vous qualifie pas pour la pompe à chaleur. C’est l’entreprise qui réalise effectivement les travaux qui doit être qualifiée, et la qualification doit être valide à la date du devis comme à la date des travaux.",
    },
    {
      q: 'Le dossier de mon client a été refusé. Suis-je responsable ?',
      a: "Cela dépend du motif. Si le refus tient à une pièce que vous deviez fournir — visite préalable non datée, références techniques manquantes, qualification expirée —, votre responsabilité peut être recherchée. S’il tient à la situation du client, non. C’est précisément pour éviter cette discussion qu’il faut une clause dissociant votre prestation de l’obtention de l’aide.",
    },
    {
      q: 'Dois-je faire apparaître le montant de l’aide sur mon devis ?',
      a: "Ce n’est pas recommandé. Votre devis chiffre des travaux ; le montant d’une aide dépend de la situation fiscale du client et des règles en vigueur au moment de l’instruction, deux choses que vous ne maîtrisez pas. Si vous en parlez malgré tout, présentez-le explicitement comme une estimation indicative et non garantie.",
    },
    {
      q: 'Quel taux de TVA sur un chantier de rénovation énergétique ?',
      a: "En général 5,5 % pour les travaux d’amélioration de la qualité énergétique et les travaux induits indissociablement liés, dans un logement achevé depuis plus de deux ans. Attention aux exceptions récentes : chaudières aux énergies fossiles à 20 % depuis mars 2025, et régime particulier pour les panneaux photovoltaïques depuis octobre 2025.",
    },
    {
      q: 'Le client peut-il me céder son aide en paiement direct ?',
      a: "Des mécanismes d’avance ou de versement direct au professionnel existent selon les dispositifs et les parcours, mais ils supposent des conditions et parfois un mandat spécifique. Ne comptez jamais dessus par défaut dans votre plan de trésorerie : construisez votre échéancier comme si le client payait lui-même, et traitez l’avance comme un bonus s’il l’obtient.",
    },
  ],
};
