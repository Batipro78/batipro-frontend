/**
 * Pages commerciales « logiciel de devis pour [métier] » (/logiciel-devis/[metier]).
 *
 * Règles d'écriture (cf. errors.md) :
 * - phrases avec le nom du métier écrites EN ENTIER (jamais composées) ;
 * - ne promettre QUE des fonctionnalités réelles du produit : dictée vocale,
 *   bibliothèque de 524 articles BTP, devis→facture 1 clic, signature mobile
 *   eIDAS, mentions légales/TVA gérées, essai 14 j sans CB, 29 € HT/mois.
 *   Le mode comparatif éco/standard/premium n'existe QUE pour électricien et
 *   plombier (METIERS_AVEC_GAMMES) — ne pas le promettre ailleurs.
 */

import type { Metier } from '@/lib/metiers';

export interface LogicielFaq {
  q: string;
  a: string;
}

export interface LogicielMetier {
  metier: Metier;
  titre: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  excerpt: string;
  /** 2 paragraphes d'introduction propres au métier. */
  intro: string[];
  /** Ce que le logiciel change concrètement dans ce métier (3-4 puces). */
  atouts: string[];
  /** Exemple de phrase dictée à la voix, réaliste pour le métier. */
  exempleDictee: string;
  faq: LogicielFaq[];
}

export const logicielMetiers: LogicielMetier[] = [
  {
    metier: 'electricien',
    titre: 'Logiciel de devis électricien',
    metaTitle: 'Logiciel de devis pour électricien | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour électricien : dictez votre devis à la voix (prises, tableau, points lumineux), TVA et mentions gérées. Essai gratuit 14 jours.",
    h1: 'Le logiciel de devis pensé pour les électriciens',
    excerpt:
      "Un devis d'électricien se chiffre au point lumineux et à la prise près. MonDevisMinute le comprend : vous dictez l'intervention à la voix depuis le chantier, le devis détaillé sort en 30 secondes, prêt à faire signer.",
    intro: [
      "Douze prises, six points lumineux, un tableau deux rangées, la mise à la terre : vous connaissez le chiffrage par cœur — c'est la paperasse qui prend du temps. Le soir, il faut ressaisir dans un tableur ce que vous avez constaté le matin, retrouver vos prix, recalculer la TVA, remettre les mentions. C'est exactement ce que MonDevisMinute élimine : vous dictez l'intervention comme vous la décririez à un collègue, et le devis structuré se construit tout seul, ligne par ligne.",
      "La bibliothèque intégrée de 524 articles BTP chiffrés vous sert de base de prix, que vous ajustez à votre marché. Et pour l'électricité, le mode comparatif génère un devis en trois gammes — éco, standard, premium — qui laisse le client choisir son niveau de prestation : un argument commercial redoutable sur les remplacements de tableau.",
    ],
    atouts: [
      'Dictée vocale qui reconnaît le vocabulaire de l’électricité : prises, différentiels, points lumineux, lignes spécialisées',
      'Devis en 3 gammes (éco / standard / premium) pour laisser le client choisir — exclusivité électricien et plombier',
      'TVA par ligne (10 %, 20 %, 5,5 %) calculée automatiquement, mentions légales et assurance déjà en place',
      'Devis signé transformé en facture en un clic, numérotation continue gérée',
    ],
    exempleDictee:
      '« Rénovation électrique séjour : douze prises seize ampères, six points lumineux DCL, remplacement du tableau deux rangées, mise à la terre complète. »',
    faq: [
      {
        q: 'La dictée vocale comprend-elle les termes techniques de l’électricité ?',
        a: "Oui, c'est son terrain : prises 16 A, différentiel 30 mA, ligne spécialisée 32 A, DCL… La reconnaissance a été entraînée sur le vocabulaire réel du BTP, et vous relisez toujours le devis avant l'envoi — vous gardez la main sur chaque ligne et chaque prix.",
      },
      {
        q: 'Puis-je proposer plusieurs niveaux de prestation sur un même devis ?',
        a: "Oui : pour l'électricité, le mode comparatif produit un devis en trois gammes (éco, standard, premium) à partir de la même intervention. Le client compare et choisit — et choisit rarement la moins chère.",
      },
    ],
  },
  {
    metier: 'plombier',
    titre: 'Logiciel de devis plombier',
    metaTitle: 'Logiciel de devis pour plombier-chauffagiste | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour plombier-chauffagiste : dictez le dépannage ou le chantier à la voix, TVA et mentions gérées. Essai gratuit 14 jours sans CB.",
    h1: 'Le logiciel de devis pensé pour les plombiers-chauffagistes',
    excerpt:
      "Entre deux dépannages, personne n'a le temps d'ouvrir un tableur. Dictez l'intervention à la voix — chauffe-eau, WC suspendu, reprise d'alimentation — et envoyez un devis carré avant même de remonter dans le camion.",
    intro: [
      "La plomberie vit dans l'urgence : une fuite le matin, un ballon l'après-midi, et les devis « à envoyer ce soir » qui s'empilent. Chaque devis non envoyé le jour même est un chantier qui refroidit — le client rappelle quelqu'un d'autre. MonDevisMinute règle ce problème à la racine : le devis se dicte à la voix sur place, en trente secondes, et part par email avant que vous ayez quitté la rue.",
      "Le logiciel gère ce qui vous ralentit : les prix de base grâce à la bibliothèque de 524 articles BTP (que vous ajustez), la TVA à 10 % ou 20 % selon le chantier, les mentions obligatoires, la numérotation. Et comme pour l'électricité, le mode comparatif éco / standard / premium vous permet de proposer trois niveaux de prestation sur un remplacement de chauffe-eau — le client choisit, vous vendez mieux.",
    ],
    atouts: [
      'Devis dicté sur place après le diagnostic : le client reçoit le prix avant vos concurrents',
      'Mode comparatif éco / standard / premium — exclusivité plombier et électricien',
      'TVA 10 % / 20 % par ligne, mentions du dépannage et assurance gérées',
      'Le devis accepté devient une facture en un clic, encaissable le jour de l’intervention',
    ],
    exempleDictee:
      '« Remplacement chauffe-eau électrique deux cents litres avec groupe de sécurité neuf, dépose de l’ancien, reprise de l’alimentation en PER. »',
    faq: [
      {
        q: 'Le logiciel convient-il au dépannage comme aux chantiers ?',
        a: "Oui. Pour le dépannage, la vitesse fait la différence : devis dicté et remis avant l'intervention, comme l'exige la réglementation chez le particulier. Pour les chantiers de salle de bains ou de chauffage, vous construisez un devis détaillé poste par poste, avec acompte et conditions.",
      },
      {
        q: 'Puis-je facturer directement après le dépannage ?',
        a: "C'est le scénario prévu : le devis accepté se transforme en facture en un clic, avec la numérotation continue obligatoire gérée automatiquement. Vous facturez sur place, pendant que le client constate que l'eau chaude est revenue.",
      },
    ],
  },
  {
    metier: 'macon',
    titre: 'Logiciel de devis maçonnerie',
    metaTitle: 'Logiciel de devis pour maçon | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour maçon : chiffrez murs, dalles et ouvertures à la voix, TVA et mentions gérées, acomptes et situations. Essai gratuit 14 jours.",
    h1: 'Le logiciel de devis pensé pour les maçons',
    excerpt:
      "Des chantiers longs, des montants élevés, des acomptes et des situations : la maçonnerie exige des documents irréprochables. MonDevisMinute les produit en quelques minutes, dictée vocale comprise.",
    intro: [
      "En maçonnerie, un devis se joue souvent à plusieurs milliers d'euros — et un document approximatif coûte cher : ligne oubliée, TVA mal appliquée, avenant jamais formalisé. MonDevisMinute structure le chiffrage : une ligne par ouvrage avec unité, quantité et prix, les totaux et la TVA calculés, les mentions obligatoires et l'assurance décennale déjà en place sur chaque document.",
      "La dictée vocale prend tout son sens au retour de la visite de chantier : vous décrivez les ouvrages — élévation, dalle, ouverture avec IPN — pendant que les métrés sont frais, et le devis se construit pendant que vous parlez. Il ne reste qu'à relire, ajuster les prix, envoyer. Le devis accepté se transforme ensuite en facture en un clic, y compris pour les acomptes.",
    ],
    atouts: [
      'Chiffrage par ouvrage : murs, dalles, enduits, ouvertures — une ligne propre par poste',
      'Acomptes et facturation gérés dans la continuité du devis accepté',
      'Mentions obligatoires et assurance décennale présentes sur chaque devis et chaque facture',
      'Devis dicté à la voix au retour de la visite, pendant que les métrés sont frais',
    ],
    exempleDictee:
      '« Ouverture de mur porteur avec pose d’IPN, vingt mètres carrés d’élévation en parpaings de quinze, dalle béton armé de douze centimètres sur dix-huit mètres carrés. »',
    faq: [
      {
        q: 'Le logiciel gère-t-il les acomptes ?',
        a: "Oui : vous prévoyez l'acompte au devis, et la facturation suit la vie du chantier jusqu'au solde, avec la numérotation continue obligatoire gérée automatiquement.",
      },
      {
        q: 'Puis-je détailler des ouvrages très différents sur un même devis ?',
        a: "C'est le principe : chaque ouvrage a sa ligne, son unité (m², m³, forfait), sa quantité et son prix. Un devis de maçonnerie lisible rassure le client sur des montants élevés — et vous protège en cas de litige.",
      },
    ],
  },
  {
    metier: 'peintre',
    titre: 'Logiciel de devis peinture',
    metaTitle: 'Logiciel de devis pour peintre en bâtiment | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour peintre : chiffrez préparation et finitions à la voix, TVA 10 % gérée, mentions en place. Essai gratuit 14 jours sans CB.",
    h1: 'Le logiciel de devis pensé pour les peintres',
    excerpt:
      "En peinture, le devis détaillé est votre meilleur argument : il montre la préparation que les concurrents cachent. MonDevisMinute le construit à la voix, pièce par pièce, pendant que vous visitez.",
    intro: [
      "Deux devis de peinture au même prix ne disent pas la même chose : l'un détaille rebouchage, ponçage, sous-couche et deux couches de finition ; l'autre écrit « peinture séjour ». Le client choisit celui qu'il comprend. MonDevisMinute vous fait produire systématiquement le premier : chaque étape a sa ligne, ses mètres carrés, son prix — et le total se justifie de lui-même.",
      "La dictée vocale accélère la visite : vous parcourez les pièces en décrivant les surfaces et l'état des supports, le devis se construit en même temps. La TVA à 10 % en rénovation est appliquée ligne par ligne, les mentions obligatoires sont en place, et le devis accepté devient une facture en un clic à la réception du chantier.",
    ],
    atouts: [
      'Une ligne par étape — préparation, impression, finitions — pour justifier votre prix face aux devis « tout compris »',
      'Chiffrage au m² dicté à la voix pendant la visite, pièce par pièce',
      'TVA 10 % rénovation appliquée automatiquement ligne par ligne',
      'Facture émise en un clic le jour de la réception, quand le client voit le résultat',
    ],
    exempleDictee:
      '« Séjour : quatre-vingt-cinq mètres carrés de murs, préparation complète, sous-couche et deux couches velours ; plafond trente-deux mètres carrés en mat. »',
    faq: [
      {
        q: 'Comment le logiciel m’aide-t-il à vendre la préparation des supports ?',
        a: "En la rendant visible : chaque étape (rebouchage, ponçage, impression) a sa ligne chiffrée. Le client comprend ce qu'il paie, votre devis se distingue des forfaits opaques, et le jour où un support réserve une surprise, la base écrite est déjà là.",
      },
      {
        q: 'Puis-je faire un devis pendant la visite chez le client ?',
        a: "Oui, c'est l'usage idéal : vous dictez pièce par pièce pendant le tour du logement, vous relisez avec le client, et le devis part par email avant que vous soyez parti. Un devis remis à chaud se signe beaucoup plus souvent.",
      },
    ],
  },
  {
    metier: 'menuisier',
    titre: 'Logiciel de devis menuiserie',
    metaTitle: 'Logiciel de devis pour menuisier | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour menuisier : fenêtres, portes, parquets chiffrés proprement, acompte de commande géré. Essai gratuit 14 jours sans CB.",
    h1: 'Le logiciel de devis pensé pour les menuisiers',
    excerpt:
      "En menuiserie, le devis est une fiche technique autant qu'un prix : dimensions, vitrage, mode de pose. MonDevisMinute structure tout ça — et gère l'acompte de commande jusqu'au solde à la pose.",
    intro: [
      "Une fenêtre mal décrite sur un devis, c'est une pose qui se passe mal : mauvais sens d'ouverture, vitrage inattendu, dépose totale découverte en rénovation. MonDevisMinute vous pousse naturellement au devis précis : chaque menuiserie a sa ligne avec ses caractéristiques, la fourniture se distingue de la pose, et les totaux se calculent seuls, TVA comprise.",
      "Le métier vit au rythme des commandes fournisseur : acompte à la signature, fabrication, solde à la pose. Le logiciel suit ce cycle — l'acompte prévu au devis se facture en un clic, le solde rappelle ce qui a déjà été versé. Et la dictée vocale vous évite la ressaisie du soir : vous décrivez les menuiseries après la prise de cotes, le devis est prêt avant le dîner.",
    ],
    atouts: [
      'Une ligne par menuiserie avec ses caractéristiques : dimensions, vitrage, pose rénovation ou dépose totale',
      'Acompte de commande puis solde à la pose : la facturation suit le cycle réel du métier',
      'Fourniture et pose distinguées, TVA calculée ligne par ligne',
      'Devis dicté après la prise de cotes, envoyé le jour même',
    ],
    exempleDictee:
      '« Trois fenêtres PVC double vitrage quatre seize quatre en rénovation, une porte d’entrée aluminium en dépose totale, deux blocs-portes intérieurs postformés. »',
    faq: [
      {
        q: 'Le logiciel gère-t-il l’acompte à la commande ?',
        a: "Oui : l'acompte prévu au devis se facture en un clic au moment du versement, et la facture de solde rappelle automatiquement ce qui a déjà été réglé. La numérotation continue reste propre sur l'ensemble.",
      },
      {
        q: 'Puis-je détailler précisément chaque menuiserie ?',
        a: "C'est fait pour : chaque ligne porte la désignation complète — matériau, dimensions, vitrage, mode de pose. Un devis de menuiserie précis évite les malentendus à la livraison et fait gagner les dossiers d'aides quand les caractéristiques techniques sont exigées.",
      },
    ],
  },
  {
    metier: 'carreleur',
    titre: 'Logiciel de devis carrelage',
    metaTitle: 'Logiciel de devis pour carreleur | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour carreleur : pose, ragréage, faïence chiffrés au m² à la voix, TVA gérée. Essai gratuit 14 jours sans carte bancaire.",
    h1: 'Le logiciel de devis pensé pour les carreleurs',
    excerpt:
      "Pose droite ou diagonale, ragréage ou pas, fourniture client ou pas : un devis de carrelage précis évite les discussions de fin de chantier. MonDevisMinute le structure à la voix, au mètre carré près.",
    intro: [
      "Le prix d'une pose de carrelage dépend de détails que le client ne voit pas : format des carreaux, état du support, ragréage, plinthes. Quand le devis ne les écrit pas, ils se discutent à la fin — au pire moment. MonDevisMinute vous fait chiffrer proprement : une ligne par prestation, la préparation séparée de la pose, la mention « fourniture par le client » quand c'est le cas, et des totaux carrés.",
      "Sur place, vous dictez les surfaces et les prestations pendant le métré ; le devis se construit tout seul et part le jour même. La TVA à 10 % en rénovation s'applique ligne par ligne, les mentions obligatoires sont en place, et la facture reprend le devis accepté en un clic, joints terminés.",
    ],
    atouts: [
      'Préparation (dépose, ragréage) et pose chiffrées séparément — fini les malentendus',
      'Mention « fourniture par le client » gérée proprement sur le devis et la facture',
      'Chiffrage au m² dicté pendant le métré, devis envoyé le jour même',
      'TVA 10 % rénovation et mentions obligatoires appliquées automatiquement',
    ],
    exempleDictee:
      '« Vingt-deux mètres carrés de carrelage sol soixante par soixante en pose droite, ragréage avant pose, dix-huit mètres carrés de faïence murale, plinthes assorties. »',
    faq: [
      {
        q: 'Comment gérer le carrelage fourni par le client ?',
        a: "Une mention claire sur le devis : la pose et les consommables sont chiffrés, la fourniture est indiquée « par le client » avec la quantité à prévoir chutes comprises. La facture reprend la même logique — aucune ambiguïté sur ce que couvre votre garantie.",
      },
      {
        q: 'Le ragréage peut-il être une ligne conditionnelle ?',
        a: "Oui : vous pouvez le chiffrer en ligne ferme ou l'indiquer « si nécessaire après dépose » avec son prix au m². Le client connaît le coût avant la découverte du support — la discussion est déjà cadrée.",
      },
    ],
  },
  {
    metier: 'couvreur',
    titre: 'Logiciel de devis couverture',
    metaTitle: 'Logiciel de devis pour couvreur — toiture | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour couvreur : toiture, zinguerie, échafaudage chiffrés poste par poste, avenants gérés. Essai gratuit 14 jours sans CB.",
    h1: 'Le logiciel de devis pensé pour les couvreurs',
    excerpt:
      "Une toiture se chiffre poste par poste — couverture, liteaunage, zinguerie, échafaudage — et se réserve par écrit pour la charpente. MonDevisMinute structure ce chiffrage et gère les avenants proprement.",
    intro: [
      "Le devis de couverture honnête isole l'échafaudage, précise le modèle de tuiles, réserve l'état de la charpente : c'est ce qui le rend comparable — et défendable quand la dépose révèle une surprise. MonDevisMinute vous fait produire ce devis-là en quelques minutes : chaque poste a sa ligne, chaque réserve son emplacement, les totaux et la TVA se calculent seuls.",
      "Quand un devis complémentaire s'impose en cours de chantier — une panne à remplacer, un liteaunage plus étendu —, il se crée dans la continuité du premier, et la facture finale reprend l'ensemble proprement : lignes du devis initial et de l'avenant séparées, rien de fondu dans un total opaque. La dictée vocale, elle, vous évite de ressaisir le soir ce que vous avez constaté sur le toit.",
    ],
    atouts: [
      'Chiffrage poste par poste : couverture, liteaunage, écran, zinguerie, échafaudage isolé',
      'Devis complémentaires (charpente découverte à la dépose) gérés dans la continuité',
      'Mention d’assurance décennale présente sur chaque document — le premier réflexe du client averti',
      'Devis dicté à la voix après la visite du toit, envoyé le jour même',
    ],
    exempleDictee:
      '« Soixante mètres carrés de dépose et pose de tuiles mécaniques, liteaunage neuf, écran de sous-toiture, vingt-quatre mètres de gouttière zinc, échafaudage compris. »',
    faq: [
      {
        q: 'Comment gérer un avenant quand la dépose révèle une charpente abîmée ?',
        a: "Vous créez un devis complémentaire dans la continuité du premier, le client signe avant l'exécution, et la facture finale présente les deux proprement. L'avenant signé avant travaux se facture sans discussion.",
      },
      {
        q: 'Puis-je isoler l’échafaudage sur sa propre ligne ?',
        a: "Oui, et c'est recommandé : le poste est significatif, et l'afficher permet au client de comparer les devis à périmètre égal — face aux prix au m² « tout compris » qui le cachent.",
      },
    ],
  },
  {
    metier: 'plaquiste',
    titre: 'Logiciel de devis plaquiste',
    metaTitle: 'Logiciel de devis pour plaquiste | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour plaquiste : cloisons, doublages, plafonds chiffrés au m², autoliquidation en sous-traitance. Essai gratuit 14 jours.",
    h1: 'Le logiciel de devis pensé pour les plaquistes',
    excerpt:
      "Cloison 72/48, doublage 13+80, plafond sur suspentes : la composition fait le prix. MonDevisMinute structure vos devis au m² par ouvrage — et tient la route en sous-traitance comme en direct.",
    intro: [
      "Le plaquiste chiffre au mètre carré, mais chaque mètre carré a sa composition : type de plaque, ossature, isolant, niveau de finition des joints. MonDevisMinute vous fait décrire l'ouvrage complet sur chaque ligne — c'est ce qui distingue votre devis d'un prix au m² anonyme, et ce qui fixe noir sur blanc la frontière avec le peintre qui suit.",
      "En sous-traitance pour une entreprise, vos documents circulent : devis vers le donneur d'ordre, factures vers sa comptabilité. Le logiciel les produit propres et complets — mentions, numérotation continue, conditions de règlement avec pénalités — et la dictée vocale vous fait gagner la ressaisie : vous décrivez les ouvrages après la visite, le devis se construit seul.",
    ],
    atouts: [
      'Ouvrages décrits par composition : plaque, ossature, isolant, finition des joints',
      'Documents propres pour la sous-traitance : mentions, numérotation, pénalités de retard',
      'Niveau de finition « prêt à peindre » écrit noir sur blanc — la frontière avec le lot peinture est fixée',
      'Devis dicté à la voix, envoyé le jour de la visite',
    ],
    exempleDictee:
      '« Trente-cinq mètres carrés de cloison soixante-douze quarante-huit avec laine de verre, vingt-deux mètres carrés de plafond suspendu, bandes et trois passes prêt à peindre. »',
    faq: [
      {
        q: 'Le logiciel convient-il au travail en sous-traitance ?',
        a: "Oui : vos devis et factures sortent complets et professionnels — c'est ce que regarde un donneur d'ordre. Pour le régime d'autoliquidation de la TVA propre à la sous-traitance bâtiment, notre guide dédié vous accompagne sur la mention exacte à porter.",
      },
      {
        q: 'Comment éviter les litiges sur la finition des joints ?',
        a: "En écrivant le niveau livré sur le devis : « bandes + 3 passes, prêt à peindre » ou finition supérieure. Ce que le devis dit clairement n'a pas à se discuter à la réception — le logiciel rend cette précision naturelle.",
      },
    ],
  },
  {
    metier: 'charpentier',
    titre: 'Logiciel de devis charpente',
    metaTitle: 'Logiciel de devis pour charpentier | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour charpentier : reprises, solivage, traitements chiffrés pièce par pièce, décennale mentionnée. Essai gratuit 14 jours.",
    h1: 'Le logiciel de devis pensé pour les charpentiers',
    excerpt:
      "La charpente porte la maison : vos devis doivent le montrer. MonDevisMinute produit des documents précis — pièces, sections, traitements — que le client, l'expert ou l'assureur reliront des années plus tard.",
    intro: [
      "Un devis de charpente vague inquiète le client au lieu de le rassurer. Nommer les pièces, donner les sections, décrire le traitement : c'est ce qui prouve le savoir-faire — et ce qui protège des années plus tard, quand un expert relit le dossier. MonDevisMinute structure ce niveau de détail sans effort : une ligne par ouvrage, l'unité adaptée (ml, m², forfait), les totaux calculés.",
      "Le métier vit avec l'aléa de l'état réel des bois : le logiciel gère les devis complémentaires décidés après sondage, signés avant exécution, et la facture finale qui présente le tout proprement. La mention d'assurance décennale — que tout client averti vérifie en premier sur une charpente — est en place sur chaque document.",
    ],
    atouts: [
      'Chiffrage pièce par pièce : pannes, chevrons, solivage, avec sections et linéaires',
      'Devis complémentaires après sondage gérés dans la continuité, signés avant exécution',
      'Décennale mentionnée sur chaque devis et facture — le réflexe n°1 du client sur la structure',
      'Documents conservés et retrouvables des années plus tard, cohérents avec la garantie décennale',
    ],
    exempleDictee:
      '« Remplacement de la panne intermédiaire sur six mètres, reprise de deux chevrons, traitement insecticide et fongicide sur soixante mètres carrés de charpente. »',
    faq: [
      {
        q: 'Comment chiffrer quand l’état des bois est incertain ?',
        a: "Chiffrez fermement le visible, réservez le reste par écrit, et créez un devis complémentaire après sondage — signé avant d'étendre les travaux. Le logiciel garde le fil entre devis initial, avenant et facture finale.",
      },
      {
        q: 'Pourquoi le détail des sections compte-t-il autant ?',
        a: "Parce que vos documents seront relus longtemps après le chantier — par un acquéreur, un expert, un assureur. « Remplacement panne 6 ml, bois classe 2 » prouve ce qui a été fait ; « réparation charpente » ne prouve rien.",
      },
    ],
  },
  {
    metier: 'serrurier',
    titre: 'Logiciel de devis serrurerie',
    metaTitle: 'Logiciel de devis pour serrurier — dépannage | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour serrurier : devis de dépannage remis avant intervention, facture sur place. Essai gratuit 14 jours sans carte bancaire.",
    h1: 'Le logiciel de devis pensé pour les serruriers',
    excerpt:
      "En serrurerie de dépannage, le devis écrit remis AVANT l'intervention est votre meilleur argument face à la méfiance des clients. MonDevisMinute le produit en trente secondes, sur le palier.",
    intro: [
      "Le client qui vous appelle porte claquée à la main a lu partout qu'il fallait exiger un devis écrit avant toute intervention — les abus du secteur sont passés par là. Le serrurier qui dégaine spontanément un devis propre et détaillé gagne la confiance en trente secondes. C'est exactement ce que permet MonDevisMinute : vous dictez l'intervention sur le palier, le devis sort structuré, le client signe en connaissance de cause.",
      "Après l'intervention, la facture reprend le devis accepté en un clic — même prestation, même prix, aucune surprise. C'est la conformité que la DGCCRF attend sur ce secteur surveillé, et c'est aussi ce que l'assureur habitation du client demandera pour rembourser une serrure après effraction : un document précis, avec le matériel posé et son niveau de certification.",
    ],
    atouts: [
      'Devis remis avant l’intervention, comme l’exige la réglementation du dépannage — dicté en 30 secondes',
      'Facture identique au devis accepté, émise sur place en un clic',
      'Matériel décrit précisément (cylindre, certification A2P) — utile pour l’assureur du client',
      'Numérotation continue et mentions gérées : des documents propres en cas de contrôle',
    ],
    exempleDictee:
      '« Ouverture de porte claquée sans destruction, remplacement du cylindre par un modèle haute sûreté débrayable avec carte de propriété, déplacement compris. »',
    faq: [
      {
        q: 'Puis-je vraiment faire le devis sur le palier, avant d’intervenir ?',
        a: "C'est le scénario central : vous dictez l'intervention à la voix, le devis structuré s'affiche, le client le lit et l'accepte avant que vous touchiez la porte. La réglementation du dépannage est respectée, et la relation démarre sur la confiance.",
      },
      {
        q: 'Comment gérer les majorations de nuit ou de week-end ?',
        a: "En les affichant clairement sur le devis remis avant l'intervention — taux et frais de déplacement applicables au moment de l'appel. Une majoration annoncée est légitime ; découverte sur la facture, c'est un litige assuré.",
      },
    ],
  },
  {
    metier: 'paysagiste',
    titre: 'Logiciel de devis paysagiste',
    metaTitle: 'Logiciel de devis pour paysagiste — jardins | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour paysagiste : création de jardins, clôtures, terrasses chiffrées poste par poste. Essai gratuit 14 jours sans CB.",
    h1: 'Le logiciel de devis pensé pour les paysagistes',
    excerpt:
      "Un jardin se vend sur un rêve et se réalise sur un chantier : votre devis fait le pont entre les deux. MonDevisMinute structure vos créations poste par poste, garantie de reprise comprise.",
    intro: [
      "Le paysagiste vend un résultat vivant — et c'est ce qui rend son devis délicat : la pelouse dépend de l'arrosage, la haie de la saison de plantation, la reprise des végétaux de conditions qu'il faut écrire. MonDevisMinute vous fait produire des devis qui cadrent tout ça : préparation du sol détaillée, végétaux décrits avec leur force à la plantation, ouvrages chiffrés, et vos clauses de reprise énoncées noir sur blanc.",
      "La dictée vocale accompagne la visite du terrain : vous décrivez l'aménagement en marchant — engazonnement, clôture, terrasse, massifs — et le devis se construit pendant que les idées sont fraîches. La facture reprend ensuite le devis accepté en un clic, et si vous faites aussi de l'entretien, chaque prestation garde ses documents propres.",
    ],
    atouts: [
      'Créations chiffrées poste par poste : préparation du sol, végétaux, clôtures, terrasses',
      'Vos clauses de garantie de reprise écrites au devis — LA source de litige du métier désamorcée',
      'Devis dicté pendant la visite du terrain, envoyé le jour même',
      'Création et entretien facturés proprement, chacun de son côté',
    ],
    exempleDictee:
      '« Cent vingt mètres carrés d’engazonnement avec préparation du sol, trente mètres de clôture rigide, terrasse bois de vingt mètres carrés, plantation de quinze mètres de haie. »',
    faq: [
      {
        q: 'Comment gérer la garantie de reprise des végétaux ?',
        a: "En l'écrivant au devis avec ses conditions : ce qui est remplacé, la durée, et les obligations du client (arrosage). Le logiciel vous laisse poser vos clauses une fois et les retrouver sur chaque devis — la discussion est cadrée avant la plantation.",
      },
      {
        q: 'Le logiciel convient-il aussi à l’entretien récurrent ?',
        a: "Oui : vous facturez l'entretien séparément de la création, avec des documents propres de chaque côté. Les régimes ne se mélangent pas, votre comptabilité reste lisible.",
      },
    ],
  },
  {
    metier: 'vitrier',
    titre: 'Logiciel de devis vitrerie',
    metaTitle: 'Logiciel de devis pour vitrier | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour vitrier : vitrages décrits précisément pour le client et son assureur, devis de dépannage conforme. Essai 14 jours gratuit.",
    h1: 'Le logiciel de devis pensé pour les vitriers',
    excerpt:
      "Une vitre cassée finit souvent chez l'assureur : vos documents doivent décrire précisément le vitrage. MonDevisMinute produit des devis et factures nets, dictés sur place, conformes au dépannage.",
    intro: [
      "La vitrerie cumule deux exigences : l'urgence du dépannage — avec son devis obligatoire remis avant intervention chez le particulier — et la précision technique, parce que la facture servira au client pour sa déclaration de sinistre. Composition du vitrage, dimensions, mode de pose : MonDevisMinute structure ces détails sur chaque ligne, et vos documents font gagner du temps à tout le monde, assureur compris.",
      "Sur place, vous dictez l'intervention — remplacement du double vitrage, réfection des parcloses, mise en sécurité provisoire — et le devis sort en trente secondes. Après la pose, la facture reprend le devis accepté en un clic. Le client est remboursé plus vite, et vous êtes payé plus vite.",
    ],
    atouts: [
      'Vitrages décrits précisément : composition, dimensions, pose — la pièce qu’attend l’assureur',
      'Devis de dépannage remis avant intervention, conforme à la réglementation',
      'Mise en sécurité provisoire chiffrée sur sa propre ligne',
      'Facture émise en un clic après la pose, calquée sur le devis accepté',
    ],
    exempleDictee:
      '« Remplacement d’un double vitrage quatre seize quatre sur menuiserie existante, un mètre cinquante par un mètre, réfection des parcloses, mise en sécurité provisoire comprise. »',
    faq: [
      {
        q: 'Mes documents suffisent-ils pour l’assurance du client ?',
        a: "C'est le but : composition et dimensions du vitrage, prestations détaillées, dates — tout ce que l'assureur demande pour rembourser « à l'identique » figure sur le devis et la facture. Un document précis accélère l'indemnisation du client, et donc votre paiement.",
      },
      {
        q: 'Comment facturer une intervention en deux temps (sécurisation puis vitrage définitif) ?',
        a: "Chaque intervention peut avoir sa facture, toutes deux rattachées au même devis accepté. La mise en sécurité provisoire se chiffre sur sa propre ligne — c'est un vrai service, il se facture.",
      },
    ],
  },
  {
    metier: 'solier',
    titre: 'Logiciel de devis sols souples',
    metaTitle: 'Logiciel de devis pour solier — sols souples | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour solier : dépose, ragréage, PVC et moquette chiffrés au m², documents propres pour le tertiaire. Essai gratuit 14 jours.",
    h1: 'Le logiciel de devis pensé pour les soliers',
    excerpt:
      "Le prix d'un sol souple se joue sous le revêtement : dépose, ragréage, préparation. MonDevisMinute rend ce travail invisible… visible sur le devis — et vos documents tiennent la route en tertiaire.",
    intro: [
      "Deux devis « sol PVC 30 m² » peuvent différer du tout au tout selon que la préparation est comprise ou non — et le client ne le découvre qu'au moment du supplément. MonDevisMinute vous fait montrer toute la chaîne : dépose de l'existant, ragréage avec sa classe, pose, finitions. Votre devis se compare à périmètre égal, et votre prix se justifie de lui-même.",
      "Le solier travaille souvent en tertiaire, pour des entreprises et des donneurs d'ordre : vos factures doivent porter les mentions attendues entre professionnels — pénalités de retard, indemnité de recouvrement, échéance. Le logiciel les gère d'office, avec la numérotation continue. Et la dictée vocale vous épargne la ressaisie : les surfaces se dictent pendant le métré.",
    ],
    atouts: [
      'Préparation du support (dépose, ragréage) chiffrée visiblement — votre vrai savoir-faire mis en avant',
      'Mentions professionnelles gérées : pénalités, indemnité 40 €, échéances — indispensable en tertiaire',
      'Classe d’usage et caractéristiques du revêtement décrites sur chaque ligne',
      'Surfaces dictées à la voix pendant le métré, devis envoyé dans la foulée',
    ],
    exempleDictee:
      '« Trente mètres carrés de dépose et ragréage P3, pose de sol PVC en lames clipsables, dix-huit mètres carrés de moquette en dalles, barres de seuil comprises. »',
    faq: [
      {
        q: 'Mes factures sont-elles adaptées aux clients professionnels ?',
        a: "Oui : les mentions attendues entre professionnels — taux des pénalités de retard, indemnité forfaitaire de 40 €, conditions d'escompte, échéance — sont gérées d'office. Face à un service comptable, un document complet se règle sans aller-retour.",
      },
      {
        q: 'Comment chiffrer un ragréage qui dépend de l’état du support ?',
        a: "En ligne conditionnelle avec son prix au m² : « si nécessaire après dépose ». Le client connaît le coût avant la découverte — et le supplément éventuel se facture sans discussion, car il était déjà écrit.",
      },
    ],
  },
  {
    metier: 'terrassier',
    titre: 'Logiciel de devis terrassement',
    metaTitle: 'Logiciel de devis pour terrassier | MonDevisMinute',
    metaDescription:
      "Logiciel de devis et factures pour terrassier : volumes, évacuation, tranchées chiffrés au réel, quantités constatées facturées proprement. Essai 14 jours.",
    h1: 'Le logiciel de devis pensé pour les terrassiers',
    excerpt:
      "Le terrassement se chiffre au volume et se facture souvent au réel : vos documents doivent suivre. MonDevisMinute structure devis à hypothèses, quantités constatées et factures qui tiennent la route.",
    intro: [
      "En terrassement, l'inconnu est sous les pieds : nature du sol, rocher, venue d'eau. Le devis qui protège annonce ses hypothèses — terrain meuble, hors rocher — et le prix unitaire qui s'appliquera aux quantités réelles. MonDevisMinute structure ce chiffrage : une ligne par poste avec son unité (m³, ml, m²), vos hypothèses écrites, et des totaux qui se recalculent quand les quantités bougent.",
      "À la facturation, les quantités constatées — bons de décharge à l'appui — remplacent les estimations, au prix unitaire convenu. Vos clients sont souvent des professionnels, constructeurs ou entreprises générales : les factures sortent avec les mentions attendues entre pros, pénalités de retard comprises, et la numérotation continue est gérée.",
    ],
    atouts: [
      'Chiffrage au volume avec hypothèses écrites : terrain meuble, hors rocher, hors venue d’eau',
      'Facturation au réel : quantités constatées au prix unitaire convenu du devis',
      'Poste évacuation visible avec son volume — le poste lourd assumé, pas caché',
      'Mentions professionnelles gérées pour les constructeurs et entreprises générales',
    ],
    exempleDictee:
      '« Quarante-cinq mètres cubes de terrassement en pleine masse terrain meuble, évacuation de trente mètres cubes, trente-cinq mètres de tranchée pour réseaux à quatre-vingts centimètres. »',
    faq: [
      {
        q: 'Comment facturer quand les quantités réelles dépassent le devis ?',
        a: "Au prix unitaire convenu, sur la base des quantités constatées — bons de décharge ou métré contradictoire à l'appui. Si le devis prévoyait la facturation au réel, le dépassement raisonnable se facture proprement ; un changement de nature du travail (rocher) passe par un devis complémentaire.",
      },
      {
        q: 'Le logiciel gère-t-il mes clients professionnels ?',
        a: "Oui : pénalités de retard, indemnité de recouvrement de 40 €, échéances — les mentions obligatoires entre professionnels sortent d'office sur chaque facture, et la numérotation continue reste propre. Ce que regarde la comptabilité d'un constructeur.",
      },
    ],
  },
];

export function getLogicielMetier(metier: string): LogicielMetier | undefined {
  return logicielMetiers.find((m) => m.metier === metier);
}
