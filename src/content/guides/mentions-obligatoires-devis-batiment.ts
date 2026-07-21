import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'mentions-obligatoires-devis-batiment',
  title: "Les mentions obligatoires d’un devis bâtiment",
  h1: "Les mentions obligatoires d’un devis bâtiment : la liste complète",
  metaTitle: "Mentions obligatoires d’un devis bâtiment : la liste 2026",
  metaDescription:
    "Toutes les mentions obligatoires d’un devis de travaux : identité, décompte détaillé, TVA, assurance décennale, validité. Avec les sanctions encourues.",
  excerpt:
    "Un devis incomplet, c’est un devis contestable — et parfois une amende. Voici, ligne par ligne, ce que la loi vous impose de faire figurer sur vos devis de travaux, et les mentions qui, sans être obligatoires, vous éviteront la plupart des litiges.",
  category: 'Obligations légales',
  updated: '2026-07-21',
  related: [
    'mentions-obligatoires-facture-artisan',
    'taux-tva-travaux-renovation',
    'devis-signe-valeur-juridique',
    'devis-depannage-urgence-regles',
  ],
  blocks: [
    {
      type: 'p',
      text: "Sur un chantier, le devis est le document le plus important que vous produisez. Ce n’est pas un simple prix griffonné : c’est la pièce qui décrit ce que vous vous engagez à faire, pour quel montant, dans quel délai. Le jour où le client conteste une facture, où un expert d’assurance débarque, ou bien où le litige part au tribunal, c’est ce papier-là qu’on ressort. S’il est bien fait, il vous protège. S’il est bâclé, il se retourne contre vous.",
    },
    {
      type: 'p',
      text: "Le problème, c’est que la liste des mentions obligatoires est éparpillée entre le code de la consommation, le code de commerce, le code de l’artisanat et un arrêté de 2017 spécifique au dépannage. Peu d’artisans ont le temps de reconstituer le puzzle. Cet article le fait à votre place, mention par mention, avec ce que vous risquez concrètement quand il en manque une.",
    },

    { type: 'h2', text: 'Un devis, juridiquement, ce n’est pas un prix : c’est une offre' },
    {
      type: 'p',
      text: "Tant que le client ne l’a pas accepté, votre devis est une offre de contrat. Vous pouvez encore le modifier, le retirer, ou laisser sa durée de validité expirer. À la seconde où le client le signe, la nature du document change : il devient un contrat qui engage les deux parties. Vous devez réaliser les travaux décrits, au prix indiqué ; le client doit payer ce prix.",
    },
    {
      type: 'p',
      text: "Cette bascule explique pourquoi la précision du devis compte autant. Tout ce qui n’y figure pas est, par défaut, considéré comme non compris — mais encore faut-il pouvoir le démontrer. Un devis qui dit « rénovation électrique de l’appartement : 4 800 € » ne prouve rien du tout. Un devis qui détaille 32 points lumineux, 18 prises, un tableau 3 rangées et la dépose de l’ancien réseau prouve exactement ce qui était prévu, et donc exactement ce qui ne l’était pas. Le décompte détaillé n’est pas une formalité administrative : c’est votre meilleure défense.",
    },
    {
      type: 'note',
      title: 'Le réflexe qui change tout',
      text: "Écrivez votre devis en pensant à une personne qui n’était pas là quand vous avez visité le chantier — un juge, un expert, l’assureur du client. Si cette personne peut comprendre ce qui est prévu sans vous poser de question, votre devis est bon.",
    },

    { type: 'h2', text: 'Quand le devis est-il vraiment obligatoire ?' },
    {
      type: 'p',
      text: "Il n’existe pas d’obligation générale d’établir un devis pour toute prestation. L’obligation naît dans trois situations, et le bâtiment est concerné par les trois.",
    },
    { type: 'h3', text: 'Le dépannage, la réparation et l’entretien' },
    {
      type: 'p',
      text: "C’est le cas le plus fréquent et le plus surveillé, et il est plus large que ce que croient la plupart des artisans. L’arrêté du 24 janvier 2017 impose la remise d’un devis détaillé préalablement à l’exécution de toute prestation, sans aucun seuil de montant, pour un large éventail de métiers : maçonnerie, fumisterie, génie climatique, isolation, menuiserie, serrurerie, couverture, plomberie, installation sanitaire, étanchéité, plâtrerie, peinture, vitrerie, revêtements de murs et de sols, électricité, ramonage, miroiterie, évacuation des eaux pluviales et usées, débouchage de canalisations, entretien et réparation des systèmes d’alarme et de surveillance, entretien des extincteurs, et prestations de dératisation ou désinsectisation, entre autres.",
    },
    {
      type: 'p',
      text: "Autrement dit : si vous intervenez chez un particulier pour un dépannage, le devis n’est pas une option commerciale, c’est une obligation réglementaire — y compris sur les petites interventions. Ce régime particulier fait l’objet de notre guide [Dépannage et urgence : les règles à respecter](/guides/devis-depannage-urgence-regles). Et il doit être remis avant l’exécution, pas rédigé après coup sur le capot de la camionnette. L’arrêté impose par ailleurs de communiquer au client, avant la conclusion du contrat, vos taux horaires de main-d’œuvre toutes taxes comprises, les modalités de décompte du temps, les éventuels frais de déplacement, le prix des prestations forfaitaires et le caractère gratuit ou payant du devis.",
    },
    { type: 'h3', text: 'Le démarchage à domicile' },
    {
      type: 'p',
      text: "Dès que le contrat est conclu ailleurs que dans vos locaux — chez le client, sur le chantier, dans un salon — vous êtes en « contrat hors établissement ». Un écrit détaillé est alors imposé, avec des mentions supplémentaires que nous détaillons plus bas, dont l’information sur le droit de rétractation.",
    },
    { type: 'h3', text: 'Les travaux couverts par une aide publique' },
    {
      type: 'p',
      text: "Rénovation énergétique aidée, dispositifs type MaPrimeRénov' ou certificats d’économies d’énergie : l’organisme financeur exige systématiquement un devis conforme et détaillé, souvent avec des mentions techniques précises (marque, référence et performance des matériaux posés). Un devis trop vague fait rejeter le dossier de votre client, et c’est vous qu’il appellera. Nous détaillons ce que ces devis doivent contenir dans notre guide [Devis MaPrimeRénov et CEE](/guides/devis-maprimerenov-cee).",
    },
    {
      type: 'p',
      text: "En dehors de ces cas, le devis reste facultatif au sens strict. Dans les faits, s’en passer sur un chantier de plusieurs milliers d’euros revient à travailler sans filet. Notre conseil est simple : faites un devis systématiquement, quel que soit le montant.",
    },

    { type: 'h2', text: 'Les mentions obligatoires, une par une' },
    {
      type: 'p',
      text: "Voici la liste complète. Nous l’avons découpée par bloc, dans l’ordre où ces informations apparaissent naturellement sur une page.",
    },

    { type: 'h3', text: '1. L’identité complète de votre entreprise' },
    {
      type: 'list',
      items: [
        "Votre nom et prénom, ou la dénomination sociale de la société",
        "L’adresse du siège social — l’adresse réelle, pas seulement une boîte postale",
        "La forme juridique (entreprise individuelle, EURL, SASU, SARL…) et, pour les sociétés, le montant du capital social",
        "Le numéro SIRET à 14 chiffres",
        "Le numéro d’immatriculation au registre national des entreprises, avec la ville du greffe ou de la chambre de métiers",
        "Le numéro de TVA intracommunautaire si vous êtes assujetti",
        "Un numéro de téléphone et une adresse e-mail permettant de vous joindre",
      ],
    },
    {
      type: 'p',
      text: "Ces informations paraissent anodines mais elles servent à identifier le professionnel qui s’engage. Un devis sans SIRET est un devis anonyme aux yeux du droit : le client ne peut pas vérifier votre existence légale, ni votre activité déclarée.",
    },

    { type: 'h3', text: '2. L’identité du client et l’adresse du chantier' },
    {
      type: 'p',
      text: "Nom, prénom et adresse du client, et — c’est le point que beaucoup oublient — l’adresse d’exécution des travaux quand elle diffère de l’adresse de facturation. Un propriétaire bailleur qui fait rénover un logement locatif reçoit la facture chez lui mais les travaux ont lieu ailleurs. Les deux adresses doivent figurer, notamment parce que le taux de TVA dépend du logement où les travaux sont réalisés, pas du domicile du payeur.",
    },

    { type: 'h3', text: '3. La date, la durée de validité et le délai d’exécution' },
    {
      type: 'p',
      text: "La date de rédaction du devis est obligatoire, et la durée de validité doit figurer sur les devis de dépannage, de réparation et d’entretien. Sur les autres chantiers, aucun texte ne l’impose formellement, mais s’en passer est une imprudence : c’est la période pendant laquelle vous vous engagez sur le prix annoncé. Aucun texte n’impose de durée particulière, vous la fixez librement — un mois, deux mois, trois mois. Retenez simplement que passé ce délai, vous n’êtes plus tenu par votre prix, ce qui est précieux quand le coût des matériaux bouge.",
    },
    {
      type: 'p',
      text: "Vous devez aussi indiquer la date ou le délai auquel vous vous engagez à exécuter les travaux. « Sous 15 jours à compter du versement de l’acompte » est une formulation correcte. « Dès que possible » n’en est pas une : c’est précisément le flou qui alimente les litiges.",
    },

    { type: 'h3', text: '4. Le décompte détaillé, en quantité et en prix' },
    {
      type: 'p',
      text: "C’est le cœur du devis, et la mention la plus souvent mal exécutée. La réglementation exige le décompte détaillé de chaque prestation et de chaque produit nécessaire à l’opération, ce qui signifie concrètement, pour chaque ligne :",
    },
    {
      type: 'list',
      items: [
        "la dénomination précise de la prestation ou du produit",
        "l’unité à laquelle s’applique le prix (l’heure de main-d’œuvre, le mètre linéaire, le mètre carré, la pièce, le forfait)",
        "la quantité prévue",
        "le prix unitaire correspondant",
      ],
    },
    {
      type: 'p',
      text: "Pour la main-d’œuvre, vous devez faire apparaître soit le taux horaire et le temps estimé, soit un montant forfaitaire. Les deux sont acceptés ; ce qui ne l’est pas, c’est une ligne « main-d’œuvre : 1 200 € » sans base de calcul apparente.",
    },
    {
      type: 'p',
      text: "Un devis honnête et détaillé se vend mieux qu’un devis opaque, contrairement à une idée reçue tenace. Le client qui reçoit trois devis et n’en comprend qu’un seul choisit souvent celui qu’il comprend — même s’il n’est pas le moins cher — parce qu’il a le sentiment de savoir ce qu’il achète.",
    },

    { type: 'h3', text: '5. Les prix : hors taxes, TVA, toutes taxes comprises' },
    {
      type: 'p',
      text: "Le devis doit afficher la somme globale à payer hors taxes et toutes taxes comprises, avec le taux de TVA applicable — pour savoir lequel retenir, voyez notre guide [TVA sur les travaux : 20 %, 10 % ou 5,5 % ?](/guides/taux-tva-travaux-renovation). Quand plusieurs taux coexistent sur un même chantier — ce qui est très courant en rénovation — chaque ligne doit porter son taux, et le récapitulatif doit détailler la base et le montant de TVA par taux.",
    },
    {
      type: 'p',
      text: "Si vous relevez de la franchise en base de TVA, vous ne facturez pas de TVA mais vous devez le signaler explicitement par la mention « TVA non applicable, article 293 B du CGI ». L’omettre expose à une confusion coûteuse : un client professionnel pourrait croire qu’il récupère une TVA qui n’existe pas.",
    },
    {
      type: 'note',
      title: 'Depuis mars 2025, plus besoin d’attestation TVA',
      text: "Pour appliquer un taux réduit de 10 % ou 5,5 % sur des travaux de rénovation, l’ancienne attestation (formulaires 1300-SD et 1301-SD) n’est plus exigée. Le client certifie désormais que les conditions sont remplies par une simple mention portée sur le devis ou la facture. Vous devez toutefois conserver ce document justificatif.",
    },

    { type: 'h3', text: '6. Les frais de déplacement et le caractère payant du devis' },
    {
      type: 'p',
      text: "Si vous facturez un déplacement, il doit être chiffré sur le devis. Si vous facturez l’établissement du devis lui-même — ce qui reste permis —, le client doit en être informé avant que vous ne le rédigiez : le devis doit d’ailleurs indiquer explicitement son caractère gratuit ou payant. Un devis payant découvert au moment de la facture est une pratique qui vous vaudra un signalement à la DGCCRF, et le client aura raison.",
    },
    {
      type: 'p',
      text: "La formulation prudente consiste à annoncer la gratuité quand elle existe : « Établissement du présent devis : gratuit. Déplacement d’étude : 40 € TTC, déduits de la facture en cas d’acceptation. » Le client sait à quoi s’attendre, et vous êtes couvert.",
    },

    { type: 'h3', text: '7. Votre assurance professionnelle' },
    {
      type: 'p',
      text: "Depuis le 1er juillet 2023, les entreprises immatriculées au registre national des entreprises au titre du secteur des métiers et de l’artisanat doivent indiquer, sur chacun de leurs devis et sur chacune de leurs factures : l’assurance professionnelle obligatoire souscrite, les coordonnées de l’assureur ou du garant, et la couverture géographique du contrat.",
    },
    {
      type: 'p',
      text: "En pratique, une ligne suffit : « Assurance responsabilité civile décennale n° XXXXXXXX souscrite auprès de [assureur], [adresse]. Couverture : France métropolitaine. » Attention, c’est bien la couverture géographique du contrat qui doit apparaître, pas seulement le nom de la compagnie. Cette mention est aussi devenue un argument commercial : elle rassure immédiatement un client qui compare plusieurs devis, dont certains sans aucune mention d’assurance.",
    },

    { type: 'h3', text: '8. Les conditions de paiement' },
    {
      type: 'p',
      text: "Ces conditions sont votre première protection contre les impayés, sujet que nous traitons en détail dans [Se faire payer quand on est artisan](/guides/se-faire-payer-artisan-impayes). Acompte demandé, échéancier, modalités de règlement, délai de paiement de la facture, taux des pénalités de retard applicable, indemnité forfaitaire de 40 € pour frais de recouvrement lorsque le client est un professionnel. Ces éléments n’ont de valeur que s’ils ont été acceptés en amont : les écrire sur la facture seulement, quand le client a déjà les travaux et pas l’envie de payer, ne sert plus à grand-chose.",
    },

    { type: 'h3', text: '9. La signature et la mention d’acceptation' },
    {
      type: 'p',
      text: "Aucun texte n’impose une mention manuscrite particulière, contrairement à ce qu’on lit souvent. Ce qui compte, c’est de prouver l’accord du client. La pratique éprouvée reste la mention « Devis reçu avant l’exécution des travaux — bon pour accord », suivie de la date et de la signature. Une signature électronique horodatée a la même valeur probante et vous évite un aller-retour.",
    },

    { type: 'h2', text: 'Le cas particulier du devis signé chez le client' },
    {
      type: 'p',
      text: "Si le client signe le devis chez lui, sur le chantier, ou dans tout lieu qui n’est pas votre établissement, vous êtes dans le régime des contrats hors établissement. Trois conséquences pratiques.",
    },
    {
      type: 'p',
      text: "D’abord, le client dispose d’un délai de rétractation de 14 jours, et vous devez l’en informer par écrit en lui remettant un formulaire de rétractation détachable. Ensuite — et c’est un délai distinct, à ne pas confondre avec le précédent — vous ne pouvez recevoir aucun paiement ni exécuter la prestation avant l’expiration d’un délai de sept jours à compter de la conclusion du contrat. Enfin — et c’est ce que beaucoup ignorent — cette protection ne bénéficie pas qu’aux particuliers : un petit professionnel employant cinq salariés au plus, et dont l’objet du contrat n’entre pas dans le champ de son activité principale, en bénéficie aussi.",
    },
    {
      type: 'p',
      text: "Il existe une exception, précieuse pour les métiers du dépannage : le droit de rétractation ne s’applique pas aux travaux d’entretien ou de réparation à réaliser en urgence au domicile du consommateur et expressément sollicités par lui, dans la limite des pièces de rechange et des travaux strictement nécessaires pour répondre à l’urgence. Deux réserves, toutefois. Cette exception se limite à ce qui est strictement nécessaire : la fuite est réparée sans rétractation, la réfection complète de la salle de bains proposée dans la foulée y reste soumise. Et vous devez informer le client qu’il ne bénéficie pas du droit de rétractation pour cette partie-là.",
    },

    { type: 'h2', text: 'Ce que vous risquez si le devis est incomplet' },
    {
      type: 'p',
      text: "Trois niveaux de risque, du plus fréquent au plus lourd.",
    },
    {
      type: 'steps',
      items: [
        "Le risque commercial, quotidien : sans décompte détaillé, vous ne pouvez pas démontrer qu’une prestation n’était pas comprise. Le client refuse le supplément, vous le faites gratuitement ou vous perdez le client. C’est de loin ce qui coûte le plus cher aux artisans, et cela n’apparaît dans aucune statistique.",
        "Le risque administratif : un manquement aux obligations d’information précontractuelle est passible d’une amende administrative pouvant atteindre 3 000 € pour une personne physique et 15 000 € pour une personne morale. Les contrôles de la DGCCRF ciblent en priorité le dépannage à domicile.",
        "Le risque contentieux : devant le juge, un devis imprécis s’interprète le plus souvent en défaveur de celui qui l’a rédigé — c’est-à-dire vous, le professionnel. L’obligation d’information et de conseil pèse sur l’artisan, pas sur le client.",
      ],
    },

    { type: 'h2', text: 'La trame que vous pouvez réutiliser telle quelle' },
    {
      type: 'p',
      text: "Voici l’ordre logique d’un devis conforme. Si votre modèle actuel contient tout cela, vous êtes en règle.",
    },
    {
      type: 'table',
      head: ['Bloc', 'Contenu'],
      rows: [
        ['En-tête', 'Vos coordonnées complètes, SIRET, forme juridique, capital, TVA intracommunautaire'],
        ['Références', 'Numéro de devis, date d’émission, durée de validité'],
        ['Client', 'Nom, adresse de facturation, adresse du chantier si différente'],
        ['Objet', 'Description de l’opération en une ou deux phrases'],
        ['Détail', 'Une ligne par prestation : désignation, unité, quantité, prix unitaire, total, taux de TVA'],
        ['Totaux', 'Total HT, détail de la TVA par taux, total TTC, acompte demandé'],
        ['Conditions', 'Délai d’exécution, modalités et délai de paiement, pénalités de retard'],
        ['Assurance', 'Garantie décennale, assureur, coordonnées, couverture géographique'],
        ['Acceptation', 'Mention « devis reçu avant l’exécution des travaux », date, signature'],
      ],
    },
    {
      type: 'p',
      text: "Un dernier conseil de méthode : numérotez vos devis en série continue et conservez-les, acceptés ou non. En cas de contrôle, une numérotation avec des trous soulève des questions que vous n’avez pas envie d’avoir à traiter.",
    },

    { type: 'h2', text: 'Automatiser tout ça plutôt que d’y penser à chaque fois' },
    {
      type: 'p',
      text: "Personne ne retient cette liste par cœur, et personne ne devrait avoir à le faire. Le bon réflexe est de la câbler une fois dans votre modèle de devis — vos coordonnées, votre assurance, vos conditions de paiement, vos mentions de TVA — pour ne plus jamais avoir à y penser ensuite. C’est exactement ce que fait MonDevisMinute : vous renseignez ces informations une seule fois à l’inscription, et chaque devis généré les reprend automatiquement, y compris quand vous le dictez à la voix depuis le chantier.",
    },
    {
      type: 'p',
      text: "L’essentiel restera toujours votre travail : décrire précisément ce que vous allez faire. Mais au moins, le cadre légal, lui, n’est plus votre problème.",
    },
  ],
  faq: [
    {
      q: 'Un devis est-il payant ou gratuit ?',
      a: "Vous êtes libre de facturer l’établissement d’un devis, à condition d’en informer le client avant de le rédiger. Dans le secteur du dépannage, de la réparation et de l’entretien du bâtiment, l’arrêté du 24 janvier 2017 impose d’ailleurs d’indiquer explicitement, dans les informations préalables et sur le devis lui-même, si celui-ci est gratuit ou payant. En pratique, la grande majorité des artisans offrent le devis et facturent uniquement le déplacement d’étude quand il est long.",
    },
    {
      q: 'Combien de temps un devis reste-t-il valable ?',
      a: "Aucun texte n’impose de durée. C’est vous qui la fixez et l’indiquez sur le document ; un à trois mois est la pratique courante. Passé ce délai, vous n’êtes plus engagé par le prix annoncé, ce qui vous protège des hausses de matériaux. Attention : si vous n’indiquez aucune durée de validité, vous vous exposez à ce qu’un client revienne six mois plus tard en réclamant l’ancien prix.",
    },
    {
      q: 'Puis-je modifier un devis après sa signature ?',
      a: "Non, pas unilatéralement : une fois signé, le devis est un contrat. Si des travaux supplémentaires apparaissent en cours de chantier, la bonne pratique est d’établir un devis complémentaire — souvent appelé avenant — et de le faire signer avant d’exécuter les travaux concernés. Faire d’abord et facturer ensuite est la première cause d’impayés dans le bâtiment.",
    },
    {
      q: 'Le client peut-il se rétracter après avoir signé mon devis ?',
      a: "Oui, dans un cas précis : si le devis a été signé ailleurs que dans vos locaux (chez lui, sur le chantier), il dispose de 14 jours pour se rétracter, et vous devez l’en avoir informé par écrit. Une exception existe pour les travaux d’entretien ou de réparation réalisés en urgence à sa demande expresse, limitée à ce qui est strictement nécessaire pour répondre à l’urgence.",
    },
    {
      q: 'Dois-je vraiment faire figurer mon assurance décennale sur le devis ?',
      a: "Oui. Depuis le 1er juillet 2023, les entreprises artisanales doivent indiquer sur chaque devis et chaque facture leur assurance professionnelle obligatoire, les coordonnées de l’assureur ou du garant, et la couverture géographique du contrat. Une seule ligne suffit, mais elle doit contenir ces trois éléments.",
    },
    {
      q: 'Un devis envoyé par e-mail et accepté par retour de mail a-t-il de la valeur ?',
      a: "Oui. L’écrit électronique a la même force probante que le papier dès lors qu’on peut identifier son auteur et garantir l’intégrité du document. Un « bon pour accord » par e-mail, ou une signature électronique horodatée, constitue une preuve valable de l’acceptation. Conservez simplement l’échange complet.",
    },
  ],
};
