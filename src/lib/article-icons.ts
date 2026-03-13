/**
 * Mapping nom d'article → icône Lucide par catégorie de matériel
 * Utilisé pour afficher une icône pertinente dans le tableau et la pop-up articles
 */

export type ArticleIconName =
  | 'circuit-board' // disjoncteurs, différentiels, modulaire
  | 'toggle-left'   // interrupteurs, boutons poussoir, va-et-vient
  | 'plug'          // prises de courant, prises USB, RJ45
  | 'cable'         // câbles, fils
  | 'tube'          // gaines, tubes IRL, moulures, goulottes
  | 'layout-grid'   // tableaux électriques
  | 'box'           // boîtes d'encastrement, dérivation
  | 'link'          // bornes, dominos, connecteurs
  | 'lightbulb'     // ampoules LED
  | 'lamp'          // spots, plafonniers, appliques, hublots
  | 'bell'          // sonnettes, interphones
  | 'thermometer'   // thermostats
  | 'shield-alert'  // détecteurs fumée, parafoudre
  | 'fan'           // VMC, aérateurs, ventilation
  | 'heater'        // convecteurs, radiateurs électriques, sèche-serviettes élec
  | 'timer'         // minuteries, horloges, programmateurs
  // PLOMBERIE
  | 'droplets'      // mitigeurs, robinetterie
  | 'bath'          // baignoires, receveurs douche, parois
  | 'toilet'        // WC, bâti-support, chasse, abattant
  | 'sink'          // éviers, lavabos, vasques, siphons
  | 'pipe'          // tubes PER, multicouche, PVC, cuivre
  | 'git-merge'     // raccords, coudes, culottes, collecteurs
  | 'gauge'         // vannes, clapets, réducteurs, groupes sécurité
  | 'flame'         // chauffe-eau
  | 'shower-head'   // colonnes douche, pommes, flexibles douche
  | 'radiator'      // radiateurs eau chaude, sèche-serviettes eau
  | 'settings'      // têtes thermostatiques, robinets radiateur, circulateurs, vases, purgeurs
  | 'wrench'        // consommables : téflon, filasse, joints, colliers
  | 'zap';          // fallback électricien

const ICON_RULES: [RegExp, ArticleIconName][] = [
  // ÉLECTRICITÉ
  [/disjoncteur|différentiel|platine.*disjoncteur/i, 'circuit-board'],
  [/interrupteur|va-et-vient|bouton.*poussoir|commande.*volet|poussoir.*étanche/i, 'toggle-left'],
  [/prise.*courant|prise.*2p|double.*prise|triple.*prise|prise.*étanche|prise.*usb|prise.*rj45|prise.*tv|prise.*sat|prise.*20a|prise.*32a|sortie.*câble/i, 'plug'],
  [/câble|fil\s*h07|fil.*terre/i, 'cable'],
  [/gaine|tube.*irl|moulure|goulotte(?!.*gtl)/i, 'tube'],
  [/tableau.*électrique|goulotte.*gtl|peigne/i, 'layout-grid'],
  [/boîte.*encastrement|couvercle.*boîte|couvercle.*dcl/i, 'box'],
  [/boîte.*dérivation|boîtier.*connexion|borne|dominos|barret/i, 'link'],
  [/ampoule.*led/i, 'lightbulb'],
  [/spot|plafonnier|applique|hublot|réglette|projecteur|douille|pavillon/i, 'lamp'],
  [/sonnette|sonnerie|carillon|interphone/i, 'bell'],
  [/thermostat.*programm/i, 'thermometer'],
  [/détecteur.*fumée|parafoudre/i, 'shield-alert'],
  [/vmc|aérateur|bouche.*extraction|entrée.*air|conduit.*vmc|commande.*vmc/i, 'fan'],
  [/convecteur|sèche.*serviettes.*élec|radiateur.*élec/i, 'heater'],
  [/minuterie|horloge|programmateur/i, 'timer'],
  [/télérupteur|contacteur/i, 'circuit-board'],
  [/détecteur.*mouvement/i, 'shield-alert'],
  [/bornier.*terre/i, 'link'],
  // PLOMBERIE — Tubes & tuyaux
  [/tube.*cuivre|tube.*per|tube.*multicouche|tube.*pvc/i, 'pipe'],
  // Raccords cuivre, laiton, PVC, biconique, compression, sertir
  [/manchon|coude|té\s|réduction|culotte|bouchon.*cuivre|bouchon.*laiton|bouchon.*pvc|raccord|jonction.*sertir|écrou.*libre|applique.*sertir|biconique|tampon.*réduction/i, 'git-merge'],
  // Collecteurs
  [/collecteur/i, 'git-merge'],
  // Vannes, robinets d'arrêt, clapets
  [/vanne|clapet|réducteur.*pression|groupe.*sécurité|robinet.*arrêt|robinet.*compteur|robinet.*équerre|robinet.*machine|robinet.*orientable/i, 'gauge'],
  // Flexibles
  [/flexible/i, 'shower-head'],
  // Mitigeurs, robinetterie
  [/mitigeur|colonne.*douche/i, 'droplets'],
  // Sanitaires
  [/baignoire|receveur.*douche|paroi.*douche/i, 'bath'],
  [/wc|bâti.*support|chasse.*eau|abattant|pack.*wc/i, 'toilet'],
  [/évier|vasque|lavabo|meuble.*vasque/i, 'sink'],
  [/siphon/i, 'sink'],
  // Chauffe-eau
  [/chauffe.*eau/i, 'flame'],
  // Radiateurs
  [/radiateur.*sèche.*serviettes.*eau|radiateur.*acier/i, 'radiator'],
  [/tête.*thermostatique|robinet.*radiateur|circulateur|vase.*expansion|purgeur/i, 'settings'],
  // Applique murale laiton
  [/applique.*murale.*laiton/i, 'git-merge'],
  // Consommables
  [/téflon|ruban.*téflon|filasse|joint.*fibre|collier.*fixation|colle.*pvc/i, 'wrench'],
];

export function getArticleIcon(articleName: string, metier: string): ArticleIconName {
  for (const [regex, icon] of ICON_RULES) {
    if (regex.test(articleName)) return icon;
  }
  return metier === 'plombier' ? 'droplets' : 'zap';
}
