import type { Guide } from '@/lib/guides';

export const guide: Guide = {
  slug: 'assurance-decennale-artisan',
  title: "L’assurance décennale de l’artisan",
  h1: "Assurance décennale : qui doit l’avoir, ce qu’elle couvre, ce qui vous expose",
  metaTitle: 'Assurance décennale artisan : obligations et couverture',
  metaDescription:
    "Qui doit souscrire une décennale, ce qu’elle couvre vraiment, les sanctions en cas de défaut et le piège des activités non déclarées à l’assureur.",
  excerpt:
    "Ne pas l’avoir est un délit puni de 75 000 € d’amende. L’avoir mal déclarée revient presque au même : un sinistre sur une activité non couverte se paie sur votre patrimoine personnel. Voici ce qu’il faut vérifier dans votre contrat.",
  category: 'Statut & assurances',
  updated: '2026-07-21',
  related: [
    'devis-signe-valeur-juridique',
    'mentions-obligatoires-devis-batiment',
    'micro-entreprise-batiment',
  ],
  blocks: [
    {
      type: 'p',
      text: "L’assurance décennale est le sujet que les artisans traitent une fois, à la création de l’entreprise, puis plus jamais. On signe un contrat, on range l’attestation dans un tiroir, on la ressort quand un client la réclame. Or c’est précisément dans cet intervalle que les problèmes se créent : l’activité évolue, le contrat non.",
    },
    {
      type: 'p',
      text: "Cet article ne cherche pas à vous vendre une assurance. Il explique ce que la décennale couvre exactement, ce qu’elle ne couvre pas, et surtout comment vérifier que la vôtre correspond encore à ce que vous faites réellement.",
    },

    { type: 'h2', text: 'Qui est concerné ?' },
    {
      type: 'p',
      text: "Toute personne physique ou morale dont la responsabilité décennale peut être engagée doit être couverte par une assurance. Cela vise les constructeurs au sens large : entreprises de travaux, artisans, architectes, techniciens, mais aussi les sous-traitants pour leur propre responsabilité.",
    },
    {
      type: 'p',
      text: "L’obligation existe dès l’ouverture du chantier : vous devez pouvoir justifier à ce moment-là que le contrat est souscrit. Elle ne dépend ni de votre statut juridique, ni de votre chiffre d’affaires, ni de la taille du chantier. Un micro-entrepreneur qui pose une véranda est soumis exactement à la même obligation qu’une entreprise de trente salariés.",
    },
    {
      type: 'p',
      text: "Une précision souvent mal comprise mérite d’être faite ici. Le code des assurances écarte la sanction pénale pour la personne physique qui construit un logement afin de l’occuper elle-même ou de le faire occuper par son conjoint, ses ascendants ou descendants, ou ceux de son conjoint. Attention à ce que cela signifie exactement : c’est la peine qui est écartée, pas l’obligation d’assurance elle-même. Et cela vise le particulier qui construit chez lui, jamais le professionnel.",
    },

    { type: 'h2', text: 'Ce que la décennale couvre exactement' },
    {
      type: 'p',
      text: "La garantie décennale couvre, pendant dix ans à compter de la réception des travaux, les dommages qui compromettent la solidité de l’ouvrage ou qui le rendent impropre à sa destination. Elle couvre aussi les dommages affectant un élément d’équipement indissociable de l’ouvrage.",
    },
    {
      type: 'p',
      text: "Ces deux critères — solidité et impropriété à destination — sont plus larges qu’on ne le croit, et c’est ce qui rend le sujet sérieux.",
    },
    {
      type: 'table',
      head: ['Situation', 'Relève de la décennale ?'],
      rows: [
        ['Fissures structurelles, affaissement de plancher', 'Oui, solidité de l’ouvrage'],
        ['Infiltrations par la toiture rendant une pièce inhabitable', 'Oui, impropriété à destination'],
        ['Installation électrique dangereuse rendant le logement inutilisable', 'Oui, impropriété à destination'],
        ['Chauffage défaillant rendant le logement inhabitable l’hiver', 'Oui, selon la gravité'],
        ['Carrelage qui se décolle sur quelques mètres carrés', 'Généralement non, sauf gravité particulière'],
        ['Peinture qui s’écaille, défaut esthétique', 'Non'],
        ['Volet roulant en panne (équipement dissociable)', 'Non, garantie de bon fonctionnement, 2 ans'],
      ],
    },
    {
      type: 'p',
      text: "La ligne de partage se joue sur la gravité et sur la nature de l’élément. Un désordre purement esthétique n’engage pas la décennale. Un désordre qui empêche d’habiter, de chauffer, de se laver ou de se déplacer normalement, oui.",
    },
    {
      type: 'note',
      title: 'Le point de départ, c’est la réception',
      text: "Les dix ans courent à compter de la réception des travaux. Sans procès-verbal de réception, le point de départ devient discutable, et votre responsabilité reste ouverte sans le bornage que la loi prévoit. C’est une raison très concrète de formaliser chaque fin de chantier, même par une page signée.",
    },

    { type: 'h2', text: 'Les trois garanties, et comment elles s’articulent' },
    {
      type: 'p',
      text: "La décennale n’est qu’une des trois garanties légales qui courent après la réception. Les confondre conduit à refuser une intervention qu’on doit, ou à en accepter une qu’on ne doit pas.",
    },
    {
      type: 'table',
      head: ['Garantie', 'Durée', 'Objet'],
      rows: [
        ['Parfait achèvement', '1 an', 'Tous les désordres signalés, réservés à la réception ou apparus dans l’année'],
        ['Bon fonctionnement (biennale)', '2 ans', 'Les éléments d’équipement dissociables : volets, radiateurs, interphone, robinetterie'],
        ['Décennale', '10 ans', 'Solidité de l’ouvrage et impropriété à destination'],
      ],
    },
    {
      type: 'p',
      text: "En pratique, la première année, presque tout se règle au titre du parfait achèvement — c’est la garantie la plus large et la moins discutée. C’est aussi celle qui vous coûte le moins cher à honorer, parce qu’intervenir tôt sur un désordre naissant est toujours moins lourd que dix ans plus tard.",
    },

    { type: 'h2', text: 'Le piège numéro un : les activités déclarées' },
    {
      type: 'p',
      text: "Votre contrat de décennale ne vous couvre pas « pour le bâtiment ». Il vous couvre pour une liste d’activités précises, énumérées dans les conditions particulières. Un sinistre survenu sur une activité qui n’y figure pas n’est pas couvert.",
    },
    {
      type: 'p',
      text: "C’est le mécanisme qui ruine des entreprises, et il est banal. Un électricien assuré pour l’installation électrique commence à poser des pompes à chaleur parce que le marché le demande. Un plombier ajoute la rénovation de salles de bains complètes, donc de l’étanchéité. Un couvreur se met aux panneaux photovoltaïques. Aucun n’a pensé à prévenir son assureur : ce n’était qu’une extension naturelle du métier.",
    },
    {
      type: 'p',
      text: "Trois ans plus tard, un sinistre survient sur cette activité-là. L’assureur constate qu’elle n’est pas déclarée, refuse sa garantie, et c’est l’entreprise — donc souvent le patrimoine personnel du dirigeant — qui répond du dommage.",
    },
    {
      type: 'p',
      text: "Le réflexe à prendre est simple et gratuit : chaque fois que vous ajoutez une prestation à votre offre, envoyez un mail à votre assureur pour lui demander si elle est couverte, et conservez sa réponse. Une fois par an, relisez la liste de vos activités déclarées en vous demandant : est-ce que ça décrit encore ce que je fais ?",
    },

    { type: 'h2', text: 'Ce que vous risquez sans assurance' },
    {
      type: 'p',
      text: "Ne pas souscrire l’assurance obligatoire est une infraction pénale : les textes prévoient six mois d’emprisonnement et 75 000 € d’amende, ou l’une de ces deux peines seulement.",
    },
    {
      type: 'p',
      text: "Mais ce n’est pas la sanction qui ruine les entreprises, c’est le sinistre. Sans assurance, vous répondez seul de la réparation, et les montants n’ont aucun rapport avec le prix du chantier initial. Une infiltration mal traitée sur une toiture facturée 8 000 € peut coûter cinq fois plus en reprise, expertise et relogement.",
    },
    {
      type: 'p',
      text: "S’y ajoute une conséquence commerciale immédiate : plus aucun maître d’ouvrage sérieux, aucun syndic, aucune entreprise générale ne vous confiera de chantier sans attestation. Dans les faits, travailler sans décennale vous enferme dans le marché le plus fragile.",
    },

    { type: 'h2', text: 'La mention obligatoire sur vos documents' },
    {
      type: 'p',
      text: "Depuis le 1er juillet 2023, les entreprises immatriculées au registre national des entreprises au titre du secteur des métiers et de l’artisanat doivent indiquer, sur chacun de leurs devis et sur chacune de leurs factures :",
    },
    {
      type: 'list',
      items: [
        "l’assurance professionnelle obligatoire souscrite",
        "les coordonnées de l’assureur ou du garant",
        "la couverture géographique du contrat ou de la garantie",
      ],
    },
    {
      type: 'p',
      text: "Une ligne suffit : « Assurance RC décennale n° XXXXXXXX — [assureur], [adresse] — Couverture : France métropolitaine. » Notez bien le troisième élément, celui que presque tout le monde oublie : la couverture géographique. Un artisan francilien qui accepte un chantier en Corse ou outre-mer sans vérifier ce point travaille peut-être sans couverture.",
    },
    {
      type: 'p',
      text: "Cette mention est aussi devenue un argument commercial. Face à trois devis dont deux ne mentionnent aucune assurance, celui qui affiche clairement sa couverture rassure — et un client rassuré négocie moins.",
    },

    { type: 'h2', text: 'La dommages-ouvrage, à ne pas confondre' },
    {
      type: 'p',
      text: "Deux assurances coexistent sur un chantier, et elles n’ont ni le même souscripteur ni le même rôle.",
    },
    {
      type: 'p',
      text: "La décennale est souscrite par vous, le professionnel. Elle couvre votre responsabilité. La dommages-ouvrage est souscrite par le maître d’ouvrage — celui qui fait construire. Elle sert à préfinancer rapidement les réparations sans attendre qu’un tribunal désigne un responsable, l’assureur se retournant ensuite contre qui de droit.",
    },
    {
      type: 'p',
      text: "Elle est en principe obligatoire pour le maître d’ouvrage, y compris pour un particulier qui fait construire ou réaliser des travaux importants. En pratique, beaucoup de particuliers l’ignorent ou s’en dispensent. Ce n’est pas votre responsabilité, mais le signaler par écrit dans votre devis est une bonne pratique : cela vous positionne en professionnel qui connaît le sujet, et cela vous protège si le client vous reproche plus tard de ne pas l’avoir informé.",
    },

    { type: 'h2', text: 'La check-list annuelle, en dix minutes' },
    {
      type: 'steps',
      items: [
        "Sortez vos conditions particulières et relisez la liste des activités déclarées. Correspond-elle à ce que vous avez réellement facturé cette année ?",
        "Vérifiez la couverture géographique, surtout si vous êtes intervenu hors de votre zone habituelle.",
        "Vérifiez le chiffre d’affaires déclaré à l’assureur : une sous-déclaration importante peut réduire l’indemnisation.",
        "Vérifiez que votre attestation en cours de validité est bien celle que vous envoyez aux clients — une attestation périmée circule vite.",
        "Mettez à jour la ligne d’assurance sur vos modèles de devis et de facture si le numéro de contrat ou l’assureur a changé.",
      ],
    },
    {
      type: 'p',
      text: "Ce dernier point est le plus facile à automatiser. Dans MonDevisMinute, votre assurance, ses coordonnées et sa couverture géographique sont saisies une fois dans votre profil et se reportent sur chaque devis et chaque facture. Le jour où vous changez d’assureur, vous modifiez une ligne et tous vos documents suivent — au lieu de traîner pendant des mois un numéro de contrat qui n’existe plus.",
    },
  ],
  faq: [
    {
      q: 'Un micro-entrepreneur doit-il souscrire une décennale ?',
      a: "Oui, exactement comme n’importe quelle entreprise. L’obligation dépend de la nature des travaux réalisés, pas du statut ni du chiffre d’affaires. Un micro-entrepreneur qui réalise des travaux relevant de la garantie décennale sans être assuré commet la même infraction qu’une société.",
    },
    {
      q: 'Combien coûte une assurance décennale ?',
      a: "Le tarif dépend du métier, du chiffre d’affaires déclaré, de l’ancienneté et de la sinistralité. Les métiers du gros œuvre et de l’étanchéité coûtent nettement plus cher que la peinture ou la menuiserie intérieure. Demandez plusieurs devis en décrivant précisément vos activités : une description approximative donne un tarif attractif et une couverture qui ne vaut rien.",
    },
    {
      q: 'Que se passe-t-il si je change d’assureur en cours de route ?',
      a: "La décennale fonctionne en principe sur la base du fait générateur : c’est l’assureur qui vous couvrait à l’ouverture du chantier qui reste concerné pour ce chantier, même des années plus tard. Conservez donc toutes vos attestations passées, classées par année : elles peuvent servir dix ans après. Faites confirmer les modalités exactes par votre courtier, les contrats comportent des variantes.",
    },
    {
      q: 'Mon client me demande mon attestation. Dois-je la donner ?',
      a: "Oui, et c’est même votre intérêt. Les justifications d’assurance prennent la forme d’attestations jointes aux devis et aux factures. Envoyez-la spontanément avec votre devis : cela vous distingue immédiatement des entreprises qui restent floues sur le sujet.",
    },
    {
      q: 'Une décennale couvre-t-elle une malfaçon esthétique ?',
      a: "Non. La décennale vise les dommages qui compromettent la solidité de l’ouvrage ou le rendent impropre à sa destination. Une peinture mal appliquée, un joint irrégulier ou une teinte non conforme relèvent de la garantie de parfait achèvement la première année, ou du simple litige contractuel ensuite.",
    },
    {
      q: 'Suis-je couvert si je fais une activité non déclarée à mon assureur ?',
      a: "Non, et c’est le piège le plus dangereux du sujet. Le contrat couvre une liste d’activités précises ; un sinistre survenu en dehors n’est pas garanti, et c’est alors votre entreprise, souvent votre patrimoine personnel, qui répond. Chaque fois que vous élargissez votre offre, prévenez votre assureur par écrit et conservez sa réponse.",
    },
  ],
};
