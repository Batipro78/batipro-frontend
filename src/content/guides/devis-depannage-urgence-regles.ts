import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'devis-depannage-urgence-regles',
  title: 'Dépannage et urgence : les règles à respecter',
  h1: "Dépannage, réparation, entretien : les règles de prix et de devis à respecter",
  metaTitle: 'Devis de dépannage : les règles imposées aux artisans',
  metaDescription:
    'Affichage des prix, information préalable, devis obligatoire sans seuil, pièces remplacées, rétractation en urgence : les règles du dépannage à domicile.',
  excerpt:
    "C’est le secteur le plus contrôlé du bâtiment, et celui où les règles sont le plus souvent ignorées de bonne foi. Contrairement à une idée très répandue, le devis y est obligatoire sans aucun seuil de montant. Voici l’ensemble des obligations, et comment les tenir sans y passer sa journée.",
  category: 'Obligations légales',
  updated: '2026-07-21',
  related: [
    'mentions-obligatoires-devis-batiment',
    'mentions-obligatoires-facture-artisan',
    'devis-signe-valeur-juridique',
  ],
  blocks: [
    {
      type: 'p',
      text: "Le dépannage à domicile concentre à lui seul une part considérable des litiges du bâtiment, et il fait l’objet d’une réglementation dédiée : l’arrêté du 24 janvier 2017 relatif à la publicité des prix des prestations de dépannage, de réparation et d’entretien dans le secteur du bâtiment et de l’équipement de la maison, entré en vigueur le 1er avril 2017.",
    },
    {
      type: 'p',
      text: "Ce texte existe à cause d’une minorité d’entreprises qui pratiquent des tarifs abusifs sur des personnes en situation d’urgence. Mais il s’applique à tout le monde, y compris à l’artisan honnête qui répare une fuite un dimanche soir. Le connaître, c’est éviter un contrôle désagréable — et, accessoirement, se démarquer d’une concurrence qui, elle, ne le respecte pas.",
    },

    { type: 'h2', text: 'Êtes-vous concerné ?' },
    {
      type: 'p',
      text: "Le champ d’application est large. Sont visées les prestations de dépannage, de réparation et d’entretien portant notamment sur : maçonnerie, fumisterie, génie climatique, isolation, menuiserie, serrurerie, couverture, plomberie, installation sanitaire, étanchéité, plâtrerie, peinture, vitrerie, revêtements de murs et de sols, électricité, ramonage, miroiterie, évacuation des eaux pluviales et usées, débouchage de canalisations, entretien et réparation des systèmes d’alarme et de surveillance, entretien des extincteurs, entretien des plates-formes élévatrices privatives, ainsi que les prestations de dératisation et de désinsectisation.",
    },
    {
      type: 'p',
      text: "Autrement dit : la quasi-totalité des métiers du bâtiment sont concernés dès lors qu’ils interviennent en réparation ou en entretien, et non en travaux neufs. Un électricien qui rénove une installation complète relève du régime général du devis ; le même électricien qui vient remplacer un disjoncteur défaillant relève, lui, de cet arrêté.",
    },

    { type: 'h2', text: 'Le point que presque tout le monde ignore : il n’y a pas de seuil' },
    {
      type: 'p',
      text: "On lit très souvent, y compris sur des sites destinés aux professionnels, que le devis serait obligatoire « à partir de 150 € TTC ». C’est une confusion tenace avec l’ancienne réglementation. Le texte en vigueur impose la remise d’un devis détaillé préalablement à l’exécution de toute prestation, sans fixer de seuil de montant.",
    },
    {
      type: 'p',
      text: "La conséquence pratique est directe : sur une intervention de dépannage à 90 €, le devis préalable est dû au même titre que sur une intervention à 900 €. C’est une contrainte réelle pour les métiers de l’urgence, où l’on intervient souvent en quelques minutes. Elle se gère par la standardisation — un devis type de dépannage, préparé à l’avance, dans lequel il ne reste qu’à renseigner la nature de la panne, le temps estimé et les pièces — et non par l’improvisation.",
    },
    {
      type: 'note',
      title: 'Le seuil de 150 € existe bien, mais ailleurs',
      text: "Ce montant circule parce qu’il apparaît dans des recommandations de la DGCCRF adressées aux consommateurs, qui les invitent à toujours demander un devis au-delà de cette somme. C’est un conseil au client, pas une limite à votre obligation. Ne bâtissez pas votre pratique dessus.",
    },

    { type: 'h2', text: 'Ce que vous devez dire avant même d’intervenir' },
    {
      type: 'p',
      text: "Avant la conclusion du contrat, vous devez porter à la connaissance du client un ensemble d’informations tarifaires précises :",
    },
    {
      type: 'list',
      items: [
        "Le ou les taux horaires de main-d’œuvre, exprimés toutes taxes comprises",
        "Les modalités de décompte du temps estimé — au quart d’heure, à la demi-heure, avec ou sans minimum de facturation",
        "Le cas échéant, le prix toutes taxes comprises des prestations forfaitaires proposées",
        "Le cas échéant, les frais de déplacement",
        "Le caractère gratuit ou payant du devis",
        "Toute autre condition de rémunération : majoration de nuit, de week-end, de jour férié",
      ],
    },
    {
      type: 'p',
      text: "Les modalités de décompte du temps méritent une attention particulière, parce que c’est là que se logent la plupart des abus reprochés au secteur. Facturer toute heure commencée comme une heure pleine est licite si c’est annoncé ; c’est l’absence d’annonce qui pose problème. Écrivez-le une fois pour toutes dans vos conditions : « Main-d’œuvre décomptée par tranche de trente minutes, toute tranche entamée étant due, avec un minimum de facturation d’une heure. » Le client sait, et vous êtes couvert.",
    },
    {
      type: 'p',
      text: "Sur les majorations d’urgence, le principe est le même : elles sont parfaitement légitimes — une intervention à minuit un dimanche n’a pas le même coût qu’un mardi à 10 h — mais elles doivent être annoncées avant, jamais découvertes sur la facture.",
    },

    { type: 'h2', text: 'Où ces informations doivent-elles figurer ?' },
    {
      type: 'p',
      text: "Le texte prévoit trois canaux, et le troisième surprend souvent.",
    },
    {
      type: 'p',
      text: "Si vous recevez la clientèle dans vos locaux, ces informations font l’objet d’un affichage visible à l’intérieur, à l’endroit où se tient la clientèle. Si le local dispose d’un accès indépendant depuis la voie publique ou d’une vitrine, elles doivent également être affichées de façon visible et lisible depuis l’extérieur.",
    },
    {
      type: 'p',
      text: "Pour les contrats conclus hors établissement ou à distance — c’est-à-dire l’essentiel du dépannage —, ces informations doivent être communiquées selon les règles applicables à ces contrats, donc avant l’engagement du client.",
    },
    {
      type: 'p',
      text: "Enfin, elles doivent être aisément accessibles sur tout espace de communication en ligne dédié au professionnel. Concrètement : si vous avez un site internet ou une page professionnelle, vos taux horaires et vos frais de déplacement doivent y figurer. C’est l’obligation la plus fréquemment ignorée du texte, alors qu’elle est aussi la plus facile à satisfaire — et, contrairement à ce que craignent beaucoup d’artisans, afficher ses tarifs en ligne fait plutôt gagner des appels qu’il n’en fait perdre : le client qui appelle a déjà accepté le prix.",
    },

    { type: 'h2', text: 'Le contenu du devis de dépannage' },
    {
      type: 'p',
      text: "Le devis doit comporter, en plus des [mentions habituelles d’un devis de travaux](/guides/mentions-obligatoires-devis-batiment) :",
    },
    {
      type: 'list',
      items: [
        "La date de rédaction, le nom et l’adresse de l’entreprise",
        "Le nom du client et le lieu d’exécution de l’intervention",
        "La nature exacte des réparations à effectuer",
        "Le décompte détaillé de chaque prestation et produit : dénomination, prix unitaire, unité de référence et quantité prévue",
        "Le cas échéant, les frais de déplacement",
        "La somme globale à payer hors taxes et toutes taxes comprises, avec le taux de TVA applicable",
        "La durée de validité de l’offre",
        "L’indication du caractère gratuit ou payant du devis",
      ],
    },
    {
      type: 'p',
      text: "Pour les contrats conclus hors établissement — au domicile du client, donc —, le devis doit en outre faire apparaître le taux horaire de main-d’œuvre et le temps estimé, ou un montant forfaitaire par prestation, ainsi que la dénomination et le prix unitaire des produits et matériels nécessaires.",
    },

    { type: 'h2', text: 'Les pièces remplacées appartiennent au client' },
    {
      type: 'p',
      text: "C’est une obligation spécifique et souvent oubliée : le devis ou le contrat doit informer le client qu’il peut conserver les pièces, éléments ou appareils remplacés, selon un modèle-type annexé à l’arrêté.",
    },
    {
      type: 'p',
      text: "Cette règle paraît anecdotique mais elle a une vraie logique : elle permet au client de vérifier que la pièce était effectivement défectueuse, et elle constitue une garantie contre les remplacements fictifs. Ajoutez la mention à votre modèle de devis de dépannage, et prenez l’habitude de proposer spontanément la pièce déposée. C’est un geste qui rassure, et qui vous coûte le temps de le dire.",
    },

    { type: 'h2', text: 'La facture est due, quel que soit le montant' },
    {
      type: 'p',
      text: "Toute prestation doit donner lieu à la remise d’une note avant paiement. Si le client le demande expressément, ce document doit lui être remis quel que soit le montant, gratuitement, et sur un support durable.",
    },
    {
      type: 'p',
      text: "Les mentions à y faire figurer sont celles de toute [facture d’artisan](/guides/mentions-obligatoires-facture-artisan). « Support durable » exclut le simple affichage sur un écran de téléphone : un papier, un PDF envoyé par e-mail ou un document téléchargeable conviennent. Dans la pratique du dépannage, où l’on encaisse souvent sur place, cela signifie disposer d’un moyen d’émettre une facture depuis le chantier — l’envoyer le lendemain depuis le bureau, c’est prendre le risque de ne jamais le faire.",
    },

    { type: 'h2', text: 'Le droit de rétractation face à l’urgence' },
    {
      type: 'p',
      text: "Un dépannage à domicile est, par définition, un contrat conclu hors établissement. Le client dispose donc en principe de quatorze jours pour se rétracter, ce qui, appliqué mécaniquement, rendrait impossible toute intervention immédiate.",
    },
    {
      type: 'p',
      text: "Le législateur a prévu l’exception : le droit de rétractation ne s’applique pas aux travaux d’entretien ou de réparation à réaliser en urgence au domicile du consommateur et expressément sollicités par lui, dans la limite des pièces de rechange et des travaux strictement nécessaires pour répondre à l’urgence. Vous devez toutefois informer le client qu’il ne bénéficie pas du droit de rétractation pour cette partie de l’intervention.",
    },
    {
      type: 'p',
      text: "Le mot important est « strictement ». L’exception couvre la réparation qui met fin à l’urgence, pas ce que vous proposez en plus pendant que vous êtes sur place. Colmater la fuite et remplacer le flexible : couvert. Remplacer dans la foulée le chauffe-eau et refaire l’alimentation : non couvert, et donc soumis aux quatorze jours.",
    },
    {
      type: 'p',
      text: "La bonne pratique est de séparer les deux dès le départ : un devis pour l’urgence, exécuté immédiatement avec la mention d’absence de rétractation, et un second devis pour les travaux complémentaires, soumis au délai normal. Deux documents valent mieux qu’un litige.",
    },

    { type: 'h2', text: 'Ce que vous risquez, et pourquoi ce secteur est surveillé' },
    {
      type: 'p',
      text: "Les manquements aux obligations d’information précontractuelle sont passibles d’une amende administrative pouvant atteindre 3 000 € pour une personne physique et 15 000 € pour une personne morale. S’y ajoutent, en cas de pratiques plus graves — prestations non réalisées, prix sans rapport avec le service rendu, pression exercée sur une personne vulnérable —, les qualifications de pratique commerciale trompeuse ou agressive, dont les sanctions sont sans commune mesure.",
    },
    {
      type: 'p',
      text: "Le dépannage à domicile fait l’objet d’enquêtes régulières de la DGCCRF, et les taux d’anomalies relevés y sont parmi les plus élevés de tous les secteurs contrôlés. Un artisan sérieux n’a rien à craindre sur le fond — mais il peut se faire sanctionner sur la forme, faute d’avoir affiché ses taux horaires ou remis un devis sur une petite intervention.",
    },

    { type: 'h2', text: 'Comment tenir tout ça sans y passer sa journée' },
    {
      type: 'p',
      text: "Les obligations sont nombreuses mais elles sont répétitives, ce qui est une excellente nouvelle : tout ce qui est répétitif se standardise une fois pour toutes.",
    },
    {
      type: 'steps',
      items: [
        "Rédigez une fois vos conditions tarifaires : taux horaires TTC, modalités de décompte du temps, majorations de nuit et de week-end, frais de déplacement, gratuité du devis. Mettez-les sur votre site, dans votre camionnette et dans votre modèle de devis.",
        "Créez un modèle de devis de dépannage prérempli avec toutes les mentions fixes, y compris l’information sur la conservation des pièces remplacées et, le cas échéant, l’absence de droit de rétractation en cas d’urgence.",
        "Équipez-vous pour produire devis et facture depuis le chantier, sur téléphone. C’est la seule façon réaliste de respecter l’obligation de devis préalable sur une intervention d’une demi-heure.",
        "Séparez systématiquement l’urgence des travaux complémentaires en deux documents distincts.",
        "Proposez la pièce déposée avant qu’on ne vous la demande.",
      ],
    },
    {
      type: 'p',
      text: "C’est précisément l’usage pour lequel MonDevisMinute est le plus utile : produire, depuis le téléphone et en dictant à la voix, un devis complet et conforme avant de commencer l’intervention, puis la facture dans la foulée. Sur du dépannage, où le temps administratif dépasse parfois le temps de réparation, c’est la différence entre respecter la réglementation et l’ignorer faute de moyen pratique de la respecter.",
    },
  ],
  faq: [
    {
      q: 'Dois-je vraiment faire un devis pour une intervention de 80 € ?',
      a: "Oui. L’arrêté du 24 janvier 2017 impose un devis détaillé préalablement à l’exécution de toute prestation de dépannage, de réparation ou d’entretien relevant de son champ, sans seuil de montant. Le fameux plafond de 150 € que l’on lit partout est une recommandation adressée aux consommateurs, pas une limite à votre obligation.",
    },
    {
      q: 'Puis-je majorer mes tarifs la nuit et le week-end ?',
      a: "Oui, sans difficulté, à condition de l’avoir annoncé avant l’intervention. Les majorations font partie des conditions de rémunération qui doivent être portées à la connaissance du client avant la conclusion du contrat, et figurer sur vos supports d’information, dont votre site internet. Ce qui est sanctionné n’est pas la majoration, c’est la majoration découverte au moment de payer.",
    },
    {
      q: 'Le client refuse de signer le devis mais veut que j’intervienne tout de suite. Que faire ?',
      a: "Ne commencez pas sans trace écrite. Un devis accepté par SMS ou par e-mail depuis le téléphone du client, avec le montant estimé, remplit la fonction de preuve et prend trente secondes. Intervenir sans document sur une urgence, c’est cumuler le risque réglementaire et le risque d’impayé, sur le type de client qui conteste le plus souvent.",
    },
    {
      q: 'Dois-je afficher mes prix sur mon site internet ?',
      a: "Oui, si vous relevez du champ de l’arrêté. Les informations tarifaires doivent être aisément accessibles sur tout espace de communication en ligne dédié au professionnel. C’est l’obligation la plus souvent oubliée. Elle est aussi la plus simple à satisfaire : une page « tarifs » avec vos taux horaires TTC, vos frais de déplacement et vos majorations suffit.",
    },
    {
      q: 'Que faire des pièces que j’ai remplacées ?',
      a: "Vous devez informer le client, via le devis ou le contrat et selon le modèle-type annexé à l’arrêté, qu’il peut les conserver. S’il ne les souhaite pas, vous les évacuez normalement en respectant les filières de déchets applicables. Proposer spontanément de montrer et de laisser la pièce déposée est un excellent réflexe commercial autant que réglementaire.",
    },
    {
      q: 'Un devis est-il obligatoire si le client est une entreprise et non un particulier ?',
      a: "Les obligations de cet arrêté relèvent de la protection du consommateur et visent donc les relations avec les particuliers. Pour un client professionnel, vous n’êtes pas soumis à ce formalisme spécifique — mais un devis écrit reste vivement recommandé : entre professionnels, l’absence d’écrit est la première cause de litige sur le périmètre et sur le prix.",
    },
  ],
};
