import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'taux-tva-travaux-renovation',
  title: 'Quel taux de TVA appliquer sur vos travaux',
  h1: 'TVA sur les travaux : 20 %, 10 % ou 5,5 % ? Le guide pour ne pas se tromper',
  metaTitle: 'TVA travaux : 20 %, 10 % ou 5,5 % ? Guide artisan 2026',
  metaDescription:
    'Choisir entre 20 %, 10 % et 5,5 % de TVA sur un chantier de rénovation : conditions, équipements exclus, chaudières, panneaux solaires, justificatifs.',
  excerpt:
    "C’est l’erreur la plus chère du bâtiment, parce que c’est l’entreprise qui paie le rattrapage, jamais le client. Voici comment déterminer le bon taux chantier par chantier, ce qui reste à 20 % malgré tout, et ce qui a changé en 2025.",
  category: 'Fiscalité',
  updated: '2026-07-21',
  related: [
    'mentions-obligatoires-facture-artisan',
    'mentions-obligatoires-devis-batiment',
    'chiffrer-un-devis-btp',
  ],
  blocks: [
    {
      type: 'p',
      text: "Sur un chantier de 20 000 €, la différence entre 20 % et 10 % de TVA représente 2 000 €. Le client, lui, voit surtout que le voisin a eu 10 % et lui 20 %, et il le prend mal. L’artisan, de son côté, sait qu’en cas de contrôle, c’est lui qui devra sortir le rattrapage — pas le client. Le taux de TVA est donc à la fois un sujet commercial et un vrai risque financier personnel.",
    },
    {
      type: 'p',
      text: "La matière est technique, mais elle s’organise autour d’un petit nombre de questions qu’on peut se poser dans l’ordre. Ce guide les déroule, en s’appuyant sur les règles en vigueur, et signale les changements importants intervenus en 2025 : la disparition de l’attestation, le passage des chaudières à énergies fossiles au taux normal, et l’arrivée des panneaux solaires à 5,5 %.",
    },

    { type: 'h2', text: 'Les trois taux, en une phrase chacun' },
    {
      type: 'table',
      head: ['Taux', 'Ce qu’il couvre'],
      rows: [
        [
          '5,5 %',
          'Les travaux d’amélioration de la qualité énergétique du logement : pose, installation, adaptation ou entretien de matériaux et équipements qui économisent l’énergie ou recourent aux énergies renouvelables — ainsi que les travaux induits qui leur sont indissociablement liés.',
        ],
        [
          '10 %',
          'Les travaux d’amélioration, de transformation, d’aménagement et d’entretien qui ne relèvent ni de la construction ou reconstruction, ni de l’agrandissement, et qui ne bénéficient pas du 5,5 %.',
        ],
        [
          '20 %',
          'Tout le reste : construction neuve, reconstruction, agrandissement, locaux professionnels, logements de moins de deux ans, et certains équipements expressément exclus des taux réduits.',
        ],
      ],
    },
    {
      type: 'p',
      text: "Le raisonnement se fait toujours dans cet ordre : je vérifie d’abord si le chantier est éligible aux taux réduits ; si oui, je regarde si les travaux relèvent du 5,5 % ; sinon, ils relèvent du 10 %. Le 20 % est le taux par défaut, celui qui s’applique quand une condition manque.",
    },

    { type: 'h2', text: 'Étape 1 : le chantier est-il éligible aux taux réduits ?' },
    {
      type: 'p',
      text: "Trois conditions doivent être réunies simultanément. Il suffit qu’une seule manque pour que tout le chantier bascule à 20 %.",
    },
    { type: 'h3', text: 'Un local à usage d’habitation' },
    {
      type: 'p',
      text: "Le logement peut être une résidence principale ou secondaire, occupé par son propriétaire ou loué, une maison ou un appartement. Ce qui compte est l’usage d’habitation. Un local commercial, un bureau, un entrepôt ou un cabinet professionnel relèvent du taux normal, même s’ils appartiennent à un particulier.",
    },
    {
      type: 'p',
      text: "Le cas des locaux mixtes mérite attention : dans un immeuble comportant à la fois des logements et des commerces, les travaux sur les parties communes bénéficient des taux réduits au prorata de la surface affectée à l’habitation. Le syndic est en mesure de vous fournir cette répartition ; demandez-la par écrit et conservez-la.",
    },
    { type: 'h3', text: 'Achevé depuis plus de deux ans' },
    {
      type: 'p',
      text: "L’achèvement s’apprécie à la date de commencement des travaux. Un logement livré il y a vingt-trois mois ne permet pas le taux réduit ; le même chantier lancé deux mois plus tard le permettra. Sur les constructions récentes, vérifiez la date de la déclaration attestant l’achèvement et la conformité des travaux plutôt que de vous fier à la mémoire du client.",
    },
    { type: 'h3', text: 'Ne pas produire un immeuble neuf au sens fiscal' },
    {
      type: 'p',
      text: "C’est la condition la moins connue et la plus piégeuse. Des travaux, même sur un logement ancien, sont assimilés fiscalement à la production d’un immeuble neuf lorsqu’ils remettent à l’état neuf la majorité des fondations, des éléments hors fondations déterminant la résistance et la rigidité de l’ouvrage, de la consistance des façades hors ravalement, ou l’ensemble des éléments de second œuvre dans une proportion fixée par les textes. Dans ce cas, tout le chantier repasse à 20 %.",
    },
    {
      type: 'p',
      text: "Deux garde-fous complètent cela : les travaux ne doivent pas, sur une période de deux ans, augmenter la surface de plancher des locaux existants de plus de 10 %, ni conduire à une surélévation. Le seuil des 10 % s’apprécie sur deux ans et non chantier par chantier, ce qui vise les découpages artificiels en plusieurs marchés successifs.",
    },
    {
      type: 'note',
      title: 'Le réflexe à avoir sur une grosse rénovation',
      text: "Dès qu’un chantier touche à la structure, aux façades ou reprend l’essentiel du second œuvre, ne validez pas le taux réduit seul. C’est exactement le type de dossier que l’administration requalifie, avec un rattrapage à votre charge. Faites-le confirmer par un comptable et gardez sa réponse écrite dans le dossier du chantier.",
    },

    { type: 'h2', text: 'Étape 2 : 5,5 % ou 10 % ?' },
    {
      type: 'p',
      text: "Une fois le chantier éligible, la répartition entre les deux taux réduits dépend de la nature des travaux.",
    },
    { type: 'h3', text: 'Le 5,5 % : l’amélioration énergétique' },
    {
      type: 'p',
      text: "Il couvre la pose, l’installation, l’adaptation et l’entretien des matériaux, équipements, appareils ou systèmes destinés à économiser l’énergie ou à recourir à une énergie renouvelable. En pratique : isolation des murs, des combles et des planchers bas, remplacement de menuiseries par des modèles isolants, pompes à chaleur, chaudières biomasse, systèmes de ventilation performants, appareils de régulation et de programmation du chauffage. Les équipements doivent respecter les caractéristiques techniques et les critères de performance fixés par les textes : c’est cette condition, et non le seul type d’équipement, qui ouvre le taux de 5,5 %.",
    },
    {
      type: 'p',
      text: "Ces mêmes chantiers ouvrent souvent droit à des aides, dont le dossier impose ses propres exigences de rédaction : voyez [Devis MaPrimeRénov et CEE](/guides/devis-maprimerenov-cee). Le taux de 5,5 % s’étend aussi aux travaux induits, c’est-à-dire aux travaux indissociablement liés à l’opération d’amélioration énergétique. Si vous isolez par l’intérieur, la reprise des cloisons, des plinthes, de l’électricité déplacée et des finitions de peinture sur les surfaces concernées suit le même taux. C’est une règle favorable et largement sous-exploitée : beaucoup d’artisans facturent l’isolation à 5,5 % et toutes les reprises à 10 % par excès de prudence, ce qui pénalise leur devis face à un concurrent mieux informé.",
    },
    {
      type: 'p',
      text: "Attention toutefois : le travail induit doit être la conséquence directe et nécessaire du geste énergétique, réalisé dans le même temps et sur les mêmes surfaces. Repeindre l’ensemble de la pièce parce qu’on a isolé un mur ne relève pas des travaux induits.",
    },
    { type: 'h3', text: 'Le 10 % : tout le reste de la rénovation' },
    {
      type: 'p',
      text: "Amélioration, transformation, aménagement, entretien. C’est le taux du gros des chantiers de rénovation : refaire une salle de bains, reprendre un tableau électrique, poser un carrelage, changer une porte intérieure, rénover une toiture, repeindre un logement, remplacer une installation sanitaire.",
    },

    { type: 'h2', text: 'Ce qui reste à 20 % même dans un logement ancien' },
    {
      type: 'p',
      text: "Certains équipements sont expressément exclus des taux réduits par la réglementation. Leur fourniture reste taxée au taux normal, même quand les conditions générales sont remplies. Cela concerne notamment :",
    },
    {
      type: 'list',
      items: [
        "La fourniture d’un ascenseur — sauf s’il est spécialement conçu pour les personnes handicapées",
        "La fourniture d’une chaudière, d’une cuve à fioul, d’une citerne à gaz ou d’une pompe à chaleur implantée pour un usage commun dans un immeuble collectif",
        "Les systèmes de climatisation",
        "Le mobilier et les équipements ménagers, ainsi que tout ce qui n’est pas incorporé à l’immeuble",
      ],
    },
    {
      type: 'p',
      text: "Un cas mérite d’être signalé à part : les pompes à chaleur air/air. Elles ont longtemps été explicitement exclues des taux réduits, et la doctrine fiscale publiée les exclut toujours, mais la documentation administrative destinée au public les présente désormais comme éligibles au 5,5 % sous conditions de performance, à la suite de la redéfinition des énergies renouvelables opérée par la loi de finances pour 2025. Tant que ce point n’est pas clarifié, ne tranchez pas seul sur un chantier : faites confirmer le taux par votre comptable, ou demandez un rescrit.",
    },
    {
      type: 'p',
      text: "Un point essentiel dans ce cas de figure : seule la fourniture de l’équipement est au taux normal. Les travaux d’installation, eux, restent au taux réduit dès lors que le logement est achevé depuis plus de deux ans. D’où la règle pratique : sur ces chantiers, séparez très clairement sur le devis la ligne « fourniture de l’équipement » de la ligne « pose et raccordement », avec leurs taux respectifs. Une ligne unique globalisée vous expose à ce que l’administration applique 20 % sur l’ensemble.",
    },

    { type: 'h2', text: 'Deux changements majeurs de 2025 à connaître' },
    { type: 'h3', text: 'Les chaudières à énergies fossiles sont passées à 20 %' },
    {
      type: 'p',
      text: "Depuis le 1er mars 2025, la fourniture et l’installation de chaudières utilisant des énergies fossiles — gaz, fioul — sont soumises au taux normal de 20 %. Cette exclusion vaut même lorsque l’énergie fossile n’intervient qu’en appoint. C’est un revirement important pour les chauffagistes, qui ont longtemps posé des chaudières gaz à condensation à taux réduit.",
    },
    {
      type: 'p',
      text: "Une mesure transitoire a été prévue : les opérations pour lesquelles un devis daté a été accepté par les deux parties et a donné lieu au versement d’un acompte avant le 1er mars 2025 conservent l’ancien régime. Si vous avez encore des chantiers de cette génération, conservez précieusement le devis signé et la preuve de l’acompte.",
    },
    { type: 'h3', text: 'Les panneaux solaires sont passés à 5,5 %' },
    {
      type: 'p',
      text: "Dans l’autre sens, depuis le 1er octobre 2025, la fourniture et l’installation dans les logements de panneaux solaires photovoltaïques d’une puissance inférieure ou égale à 9 kWc bénéficient du taux réduit de 5,5 %. C’est un changement significatif pour les installateurs, qui appliquaient jusque-là 10 % ou 20 % selon la puissance et la configuration.",
    },
    {
      type: 'p',
      text: "Trois conditions accompagnent ce taux, et elles sont cumulatives : l’électricité produite doit être consommée sur le lieu de production, la prestation doit être réalisée par une personne disposant de la certification ou de la qualification professionnelle correspondant au type d’installation, et l’équipement doit respecter les caractéristiques techniques fixées par les textes. Une installation en revente totale n’ouvre donc pas le taux de 5,5 % : c’est le piège principal de cette mesure.",
    },
    {
      type: 'p',
      text: "Là encore, un régime transitoire existe pour les chantiers engagés avant le changement : pour les installations dont le devis daté, accepté des deux parties, a donné lieu à un acompte ou à une offre de financement avant le 1er janvier 2026, il est admis de continuer à se fonder sur les commentaires administratifs antérieurs.",
    },

    { type: 'h2', text: 'L’attestation a disparu : ce que vous devez faire à la place' },
    {
      type: 'p',
      text: "Jusqu’en 2025, appliquer un taux réduit supposait de faire remplir au client une attestation, normale ou simplifiée, sur formulaire administratif. Depuis le 1er mars 2025, ces formulaires ne sont plus exigés. Le client certifie désormais, par une simple mention portée sur le devis ou sur la facture, que les travaux remplissent les conditions d’application du taux réduit.",
    },
    {
      type: 'p',
      text: "C’est une simplification réelle, mais elle ne supprime pas votre obligation de preuve. Vous devez conserver le document portant cette mention, signé par le client. En cas de contrôle, c’est ce document qui vous permet d’appeler le client en garantie du complément de taxe lorsque les informations qu’il a certifiées se révèlent inexactes — sans pour autant vous décharger de votre qualité de redevable. Sans lui, le rattrapage de TVA reste intégralement et définitivement à votre charge.",
    },
    {
      type: 'p',
      text: "Une formulation qui fait le travail, à intégrer une fois pour toutes dans votre modèle : « Le client certifie que les travaux objet du présent devis portent sur un local à usage d’habitation achevé depuis plus de deux ans, qu’ils n’aboutissent pas à la production d’un immeuble neuf et qu’ils n’augmentent pas la surface de plancher de plus de 10 %. » Suivie de la date, du nom et de la signature du client.",
    },

    { type: 'h2', text: 'Gérer un chantier à plusieurs taux' },
    {
      type: 'p',
      text: "La plupart des rénovations complètes mélangent les taux : de l’isolation à 5,5 %, de la peinture et du carrelage à 10 %, la fourniture d’un équipement exclu à 20 %. Il n’y a pas de taux moyen ni de taux dominant : chaque prestation porte son taux.",
    },
    {
      type: 'p',
      text: "Le devis doit donc afficher le taux ligne par ligne, et le récapitulatif doit détailler, pour chaque taux, la base hors taxes et le montant de TVA correspondant. La facture reprend exactement la même structure : voyez les guides [Mentions obligatoires d’un devis bâtiment](/guides/mentions-obligatoires-devis-batiment) et [Mentions obligatoires d’une facture d’artisan](/guides/mentions-obligatoires-facture-artisan). C’est ici que le tableur artisanal montre ses limites : un simple décalage de ligne suffit à fausser tout le calcul, et l’erreur ne se voit pas.",
    },
    {
      type: 'p',
      text: "Un conseil d’organisation qui vaut pour tous les métiers : regroupez vos lignes par taux dans le devis, avec un sous-total par taux. Le client comprend immédiatement pourquoi une partie du chantier est plus taxée qu’une autre, et vous coupez court à la discussion « pourquoi mon voisin a eu 10 % partout ».",
    },

    { type: 'h2', text: 'Qui paie quand le taux est faux ?' },
    {
      type: 'p',
      text: "C’est le point qu’il faut avoir en tête avant d’accepter un arrangement. La TVA est due par l’entreprise qui réalise les travaux. Si l’administration requalifie un chantier facturé à 10 % en chantier à 20 %, elle réclame la différence à l’entreprise, avec intérêts de retard et éventuellement des pénalités. Vous pouvez théoriquement vous retourner vers le client pour lui réclamer le complément — en pratique, deux ans après, avec un client qui a déménagé ou qui conteste, la récupération est illusoire.",
    },
    {
      type: 'p',
      text: "C’est pourquoi la seule protection sérieuse est documentaire : la mention signée par le client, l’année d’achèvement du logement notée au dossier, la nature des travaux décrite précisément sur le devis, la répartition fourniture/pose isolée sur les équipements exclus. Ce n’est pas de la paperasse : c’est ce qui fait la différence entre un contrôle qui se termine par une observation et un contrôle qui se termine par un chèque.",
    },
    {
      type: 'p',
      text: "Un dernier réflexe : quand le doute persiste après avoir déroulé les questions de ce guide, ne tranchez pas seul en faveur du taux le plus bas pour gagner le chantier. Posez la question à votre comptable, ou sollicitez un rescrit auprès de l’administration fiscale, qui l’engage. Le temps passé est sans commune mesure avec le montant en jeu.",
    },
    {
      type: 'p',
      text: "Sur le plan pratique, la gestion des taux multiples est exactement le genre de tâche qu’il vaut mieux ne pas faire à la main. Dans MonDevisMinute, chaque ligne de devis porte son propre taux, les sous-totaux par taux se calculent automatiquement, la mention de certification du client est incluse dans le modèle, et la facture reprend la ventilation sans ressaisie. Vous décidez du taux ; le calcul, lui, ne se trompe pas.",
    },
  ],
  faq: [
    {
      q: 'Mon client me demande de tout passer à 10 % pour baisser le prix. Que faire ?',
      a: "Refusez, et expliquez pourquoi : ce n’est pas lui qui supportera le redressement, c’est vous. Le taux de TVA n’est pas un levier de négociation, c’est la conséquence de la nature des travaux. Proposez plutôt de vérifier si une partie du chantier peut légitimement relever du 5,5 %, ce qui fera baisser la note davantage et en toute sécurité.",
    },
    {
      q: 'Le taux réduit s’applique-t-il aux logements loués ?',
      a: "Oui. La condition porte sur l’usage d’habitation du local et sur son ancienneté, pas sur l’identité de l’occupant. Un propriétaire bailleur bénéficie des taux réduits pour les travaux réalisés dans le logement qu’il loue. Attention à bien faire figurer l’adresse du chantier sur le devis et la facture, puisque c’est elle qui détermine le taux, et non l’adresse du payeur.",
    },
    {
      q: 'Et si le logement a exactement deux ans ?',
      a: "La condition est « achevé depuis plus de deux ans », appréciée à la date de commencement des travaux. Un logement achevé il y a exactement deux ans ne remplit pas la condition ; il faut avoir dépassé la date anniversaire. Sur un dossier serré, décaler le démarrage de quelques jours peut suffire — à condition de dater correctement le devis et la facture.",
    },
    {
      q: 'Puis-je appliquer 5,5 % sur la peinture qui suit une isolation intérieure ?',
      a: "Oui, au titre des travaux induits, si cette reprise est la conséquence directe et nécessaire de l’isolation et qu’elle porte sur les surfaces concernées par les travaux. En revanche, repeindre le reste de la pièce ou du logement à cette occasion relève du taux de 10 %. Le critère est le lien indissociable, pas la simultanéité.",
    },
    {
      q: 'Je pose une chaudière gaz : quel taux en 2026 ?',
      a: "20 %. Depuis le 1er mars 2025, la fourniture comme l’installation de chaudières à énergies fossiles relèvent du taux normal, y compris lorsque l’énergie fossile est un simple appoint. Seuls les chantiers dont le devis a été accepté et l’acompte versé avant cette date conservent l’ancien régime.",
    },
    {
      q: 'Dois-je toujours faire signer une attestation TVA à mon client ?',
      a: "Non, plus depuis le 1er mars 2025 : les formulaires 1300-SD et 1301-SD ne sont plus exigés. Ils sont remplacés par une mention de certification portée sur le devis ou la facture, que le client signe. Vous devez conserver ce document : c’est votre justificatif en cas de contrôle.",
    },
  ],
};
