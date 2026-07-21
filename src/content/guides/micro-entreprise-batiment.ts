import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'micro-entreprise-batiment',
  title: 'La micro-entreprise dans le bâtiment',
  h1: 'Micro-entreprise dans le bâtiment : seuils, TVA, assurance et pièges',
  metaTitle: 'Micro-entreprise bâtiment : seuils, TVA et obligations',
  metaDescription:
    "Seuils 2026, franchise de TVA, qualification professionnelle, assurance décennale : ce qu’un artisan doit savoir en micro-entreprise.",
  excerpt:
    "C’est le statut le plus simple pour démarrer, et celui qui piège le plus d’artisans. Deux plafonds différents qu’on confond tout le temps, une assurance obligatoire que beaucoup oublient, et un diplôme exigé que personne ne mentionne. Le point complet.",
  category: 'Fiscalité',
  updated: '2026-07-21',
  related: [
    'tva-artisan-declarer-recuperer',
    'assurance-decennale-artisan',
    'mentions-obligatoires-facture-artisan',
  ],
  blocks: [
    {
      type: 'p',
      text: "La micro-entreprise a fait entrer beaucoup de monde dans le bâtiment. Création en quelques minutes, comptabilité réduite à un livre de recettes, cotisations calculées sur ce qu’on encaisse réellement : quand on démarre seul, c’est difficile de faire plus simple.",
    },
    {
      type: 'p',
      text: "Cette simplicité a un revers. Elle donne le sentiment que tout est simple, alors que certaines obligations du bâtiment ne disparaissent pas avec le statut — la qualification professionnelle et l’assurance décennale au premier chef. Et deux plafonds bien différents cohabitent, que presque tout le monde confond.",
    },

    { type: 'h2', text: 'Les deux plafonds à ne pas confondre' },
    {
      type: 'p',
      text: "C’est la source de confusion numéro un, et elle a des conséquences très concrètes sur vos prix.",
    },
    { type: 'h3', text: 'Le plafond du régime micro' },
    {
      type: 'p',
      text: "C’est celui qui détermine si vous restez en micro-entreprise. Pour 2026, il est fixé à 203 100 € pour les activités de vente et à 83 600 € pour les prestations de services. En cas d’activité mixte, le chiffre d’affaires global ne doit pas dépasser 203 100 €, dont au maximum 83 600 € au titre des services.",
    },
    {
      type: 'p',
      text: "Pour un artisan du bâtiment, la question du classement se pose souvent. La fourniture-pose relève en général des prestations de services lorsque la main-d’œuvre est l’essentiel de la prestation. Faites trancher votre situation par votre comptable si vous vendez aussi du matériel sans le poser : le plafond applicable change du simple au double.",
    },
    { type: 'h3', text: 'Le plafond de la franchise de TVA' },
    {
      type: 'p',
      text: "C’est un plafond totalement distinct, beaucoup plus bas, et c’est lui qui vous rattrape en premier. Tant que vous êtes en dessous, vous ne facturez pas de TVA. Au-dessus, vous devenez redevable.",
    },
    {
      type: 'table',
      head: ['Activité', 'Seuil de base', 'Seuil majoré'],
      rows: [
        ['Prestations de services', '37 500 €', '41 250 €'],
        ['Livraisons de biens', '85 000 €', '93 500 €'],
      ],
    },
    {
      type: 'p',
      text: "Le mécanisme est le suivant : vous restez en franchise si votre chiffre d’affaires de l’année précédente est inférieur ou égal au seuil de base. Si vous dépassez en cours d’année mais restez sous le seuil majoré, la franchise continue de s’appliquer jusqu’à la fin de l’année civile. Au-delà du seuil majoré, vous devenez redevable de la TVA immédiatement.",
    },
    {
      type: 'note',
      title: 'Le vrai plafond d’un artisan seul, c’est 37 500 €',
      text: "Un artisan en prestations de services devient redevable de la TVA bien avant d’approcher les 83 600 € du régime micro. Autrement dit : le plafond qui change votre vie quotidienne est celui de la TVA, pas celui de la micro-entreprise. Beaucoup d’artisans découvrent cela en cours de deuxième année, au pire moment.",
    },
    {
      type: 'p',
      text: "Une précision utile : la réforme qui devait instaurer un seuil unique de franchise à 25 000 € a été abandonnée, et les seuils ci-dessus restent inchangés pour 2026. Ils sont donc stables — mais comme toute donnée fiscale, vérifiez-les sur impots.gouv.fr si vous lisez cet article longtemps après sa publication.",
    },

    { type: 'h2', text: 'Ce qui change le jour où vous passez à la TVA' },
    {
      type: 'p',
      text: "Le passage à la TVA n’est pas qu’une formalité déclarative. Il modifie vos prix, votre positionnement et votre rentabilité, et il faut l’anticiper.",
    },
    {
      type: 'p',
      text: "Face à un client particulier, votre prix toutes taxes comprises augmente mécaniquement si vous conservez votre marge. Sur des travaux de rénovation dans un logement de plus de deux ans, le taux applicable est souvent 10 % ou 5,5 %, ce qui limite le choc — mais le choc existe.",
    },
    {
      type: 'p',
      text: "En face, vous récupérez enfin la TVA sur vos achats. Un artisan qui achète beaucoup de fournitures y gagne largement : la TVA sur ses matériaux, son outillage, son carburant professionnel, son matériel devient déductible. Un artisan qui vend surtout de la main-d’œuvre y gagne beaucoup moins.",
    },
    {
      type: 'p',
      text: "Face à un client professionnel, en revanche, le passage à la TVA est neutre : il la récupère. Beaucoup d’artisans qui travaillent en sous-traitance ou pour des entreprises n’ont donc aucun intérêt à s’accrocher à la franchise.",
    },
    {
      type: 'p',
      text: "Point pratique souvent oublié : tant que vous êtes en franchise, vos factures doivent porter la mention « TVA non applicable, article 293 B du CGI ». Son absence laisse croire à un client professionnel qu’il peut déduire une TVA qui n’existe pas.",
    },

    { type: 'h2', text: 'Les obligations du bâtiment ne disparaissent pas' },
    {
      type: 'p',
      text: "C’est le point le plus important de cet article, et le plus mal connu. Le régime micro est un régime fiscal et social. Il ne dispense d’aucune règle propre aux métiers du bâtiment.",
    },
    { type: 'h3', text: 'La qualification professionnelle' },
    {
      type: 'p',
      text: "La plupart des métiers du bâtiment sont réglementés : on ne peut pas les exercer sans qualification. Cela vise notamment la maçonnerie et le gros œuvre, la couverture, la plomberie, le chauffage, l’électricité, la menuiserie et la serrurerie, le ramonage.",
    },
    {
      type: 'p',
      text: "Concrètement, il faut être titulaire d’un diplôme ou d’un titre professionnel du métier — CAP, BEP ou équivalent —, ou justifier de trois années d’expérience professionnelle en qualité de dirigeant, salarié ou indépendant. À défaut, l’activité doit être exercée sous le contrôle effectif et permanent d’une personne qualifiée.",
    },
    {
      type: 'p',
      text: "Le statut de micro-entrepreneur ne crée aucune exception. Se déclarer « peintre » en ligne en trois clics n’octroie pas une qualification qu’on n’a pas.",
    },
    { type: 'h3', text: 'L’assurance décennale' },
    {
      type: 'p',
      text: "Elle est obligatoire dès le premier chantier relevant de la garantie décennale, quel que soit votre statut et quel que soit votre chiffre d’affaires. Ne pas la souscrire est un délit : les textes prévoient jusqu’à six mois d’emprisonnement et 75 000 € d’amende.",
    },
    {
      type: 'p',
      text: "Au-delà de la sanction pénale, l’absence de couverture vous expose personnellement pendant dix ans. Un sinistre sérieux — une infiltration, une installation dangereuse, un affaissement — se chiffre souvent en dizaines de milliers d’euros, et c’est alors votre patrimoine qui répond. Nous détaillons ce point dans notre guide consacré à la décennale.",
    },
    { type: 'h3', text: 'Les mentions sur vos documents' },
    {
      type: 'p',
      text: "Depuis le 1er juillet 2023, toute entreprise immatriculée au titre du secteur des métiers et de l’artisanat doit indiquer sur chaque devis et chaque facture son assurance professionnelle obligatoire, les coordonnées de l’assureur ou du garant, et la couverture géographique du contrat. Là encore, la micro-entreprise ne change rien.",
    },

    { type: 'h2', text: 'La facturation électronique vous concerne aussi' },
    {
      type: 'p',
      text: "Idée fausse très répandue : « je suis en franchise de TVA, donc la réforme de la facturation électronique ne me concerne pas ». C’est faux. La réforme vise tous les assujettis à la TVA établis en France, et la qualité d’assujetti ne dépend pas du fait de collecter effectivement la taxe.",
    },
    {
      type: 'p',
      text: "Un micro-entrepreneur en franchise devra donc désigner une plateforme agréée, être en mesure de recevoir des factures électroniques à partir du 1er septembre 2026, et émettre au format structuré à partir du 1er septembre 2027.",
    },

    { type: 'h2', text: 'Quand la micro-entreprise cesse d’être le bon choix' },
    {
      type: 'p',
      text: "Le régime micro a une limite structurelle : vos cotisations et votre impôt sont calculés sur le chiffre d’affaires, pas sur le bénéfice. Vous ne déduisez aucune charge réelle. Tant que vous vendez surtout du temps avec peu d’achats, c’est avantageux. Dès que les achats montent, ça devient pénalisant.",
    },
    {
      type: 'p',
      text: "Les signaux qui doivent vous faire regarder ailleurs :",
    },
    {
      type: 'list',
      items: [
        "Vos achats de matériaux et de matériel représentent une part importante de votre chiffre d’affaires : vous payez des cotisations sur de l’argent qui n’est jamais resté chez vous.",
        "Vous investissez — véhicule, outillage lourd, local : rien n’est amortissable en micro.",
        "Vous approchez du plafond du régime, ou vous voulez embaucher.",
        "Vous travaillez surtout pour des professionnels : l’argument commercial de la franchise de TVA ne joue plus, puisqu’ils la récupèrent.",
      ],
    },
    {
      type: 'p',
      text: "Le passage en entreprise individuelle au réel, en EURL ou en SASU se prépare avec un comptable, chiffres en main. La bonne question n’est pas « quel statut est le meilleur » mais « à partir de quel niveau d’achats le régime micro me coûte plus qu’il ne me rapporte ». Cette réponse-là est calculable.",
    },
    {
      type: 'p',
      text: "Quel que soit votre statut, une chose ne change pas : vos devis et vos factures doivent être irréprochables. C’est ce que MonDevisMinute prend en charge — vos mentions légales, votre assurance, votre régime de TVA sont paramétrés une fois et se reportent automatiquement, y compris la mention « TVA non applicable » tant que vous êtes en franchise, et les taux réduits le jour où vous basculez.",
    },
  ],
  faq: [
    {
      q: 'Puis-je être artisan du bâtiment en micro-entreprise sans diplôme ?',
      a: "Non, pas pour les métiers réglementés — maçonnerie, couverture, plomberie, chauffage, électricité, menuiserie, serrurerie, ramonage, entre autres. Il faut un diplôme ou titre professionnel du métier, ou trois ans d’expérience, ou exercer sous le contrôle effectif et permanent d’une personne qualifiée. Le statut micro ne crée aucune dérogation.",
    },
    {
      q: 'Que se passe-t-il si je dépasse le seuil de TVA en cours d’année ?',
      a: "Si vous restez sous le seuil majoré, la franchise s’applique jusqu’à la fin de l’année civile. Si vous dépassez le seuil majoré, vous devenez redevable immédiatement — dès le premier jour du dépassement, et non plus au premier jour du mois comme le voulait l’ancienne règle. Vous devez alors facturer la TVA sans délai. C’est pourquoi il faut suivre son chiffre d’affaires cumulé au fil de l’année, pas seulement en fin d’exercice.",
    },
    {
      q: 'Ai-je vraiment besoin d’une décennale en micro-entreprise ?',
      a: "Oui, sans aucune exception, dès que vous réalisez des travaux relevant de la garantie décennale. Le défaut d’assurance est puni de six mois d’emprisonnement et 75 000 € d’amende, ou de l’une de ces deux peines seulement, et vous laisse personnellement exposé pendant dix ans. Aucun client sérieux ne vous confiera de chantier sans attestation.",
    },
    {
      q: 'La franchise de TVA est-elle un avantage commercial ?',
      a: "Face à des particuliers, oui : à marge égale, votre prix final est plus bas. Face à des professionnels, non : ils récupèrent la TVA, donc seul le prix hors taxes compte, et votre impossibilité de déduire la TVA sur vos achats vous rend au contraire moins compétitif.",
    },
    {
      q: 'Puis-je facturer de la TVA volontairement en étant sous le seuil ?',
      a: "Oui, en optant pour le paiement de la TVA. C’est parfois intéressant quand vous avez beaucoup d’achats ou que vous travaillez pour des professionnels, puisque vous récupérez la TVA sur vos dépenses. L’option engage pour une durée minimale : faites le calcul avec votre comptable avant de la lever.",
    },
    {
      q: 'Suis-je concerné par la facturation électronique ?',
      a: "Oui. La réforme vise tous les assujettis à la TVA établis en France, y compris ceux qui relèvent de la franchise en base. Vous devrez pouvoir recevoir des factures électroniques à partir du 1er septembre 2026 et en émettre à partir du 1er septembre 2027.",
    },
  ],
};
