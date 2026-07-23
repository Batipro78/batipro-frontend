/**
 * Génère les 28 modèles Word (devis + facture x 14 métiers) dans public/modeles/.
 *
 * Source des lignes d'exemple : src/content/modeles/lignes.json (partagée avec
 * les pages /modeles). À relancer après toute modification de ce fichier :
 *   node scripts/generate-modeles-docx.cjs
 *
 * Les fichiers générés sont commités (assets statiques servis par Next).
 */

const fs = require('fs');
const path = require('path');
const {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} = require('docx');

const lignesJson = require('../src/content/modeles/lignes.json');
const OUT_DIR = path.join(__dirname, '..', 'public', 'modeles');

const VIOLET = '4B39EF';
const GRIS = '666666';
const BORD = { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' };
const BORDS = { top: BORD, bottom: BORD, left: BORD, right: BORD };

function euros(n) {
  return (
    n
      .toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      .replace(/[  ]/g, ' ') + ' €'
  );
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 120 },
    alignment: opts.align,
    children: [
      new TextRun({
        text,
        bold: opts.bold,
        italics: opts.italic,
        size: opts.size ?? 20, // demi-points : 20 = 10pt
        color: opts.color,
        font: 'Calibri',
      }),
    ],
  });
}

function cell(text, opts = {}) {
  return new TableCell({
    borders: BORDS,
    width: opts.width ? { size: opts.width, type: WidthType.DXA } : undefined,
    shading: opts.fill ? { fill: opts.fill } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [
      new Paragraph({
        alignment: opts.right ? AlignmentType.RIGHT : AlignmentType.LEFT,
        children: [
          new TextRun({
            text,
            bold: opts.bold,
            size: 18,
            color: opts.color,
            font: 'Calibri',
          }),
        ],
      }),
    ],
  });
}

/** Bloc en-tête entreprise + client, commun devis/facture. */
function blocsEnTete(type, label) {
  const estDevis = type === 'devis';
  return [
    p('[NOM DE VOTRE ENTREPRISE]', { bold: true, size: 28 }),
    p(`${label} — [Forme juridique, capital social le cas échéant]`, { color: GRIS }),
    p('[Adresse du siège social]', { color: GRIS }),
    p('SIRET : [14 chiffres] — RNE : [ville du greffe / CMA]', { color: GRIS }),
    p('Tél : [téléphone] — Email : [email]', { color: GRIS }),
    p('N° TVA intracommunautaire : [FRxx xxx xxx xxx] (ou : « TVA non applicable, article 293 B du CGI »)', {
      color: GRIS,
      after: 240,
    }),
    p(estDevis ? 'DEVIS' : 'FACTURE', { bold: true, size: 44, color: VIOLET, after: 60 }),
    estDevis
      ? p('Devis n° [2026-___]    Date : [__/__/____]    Validité : [30 jours]', { after: 240 })
      : p(
          "Facture n° [2026-___]    Date d'émission : [__/__/____]    Date de fin de prestation : [__/__/____]",
          { after: 240 }
        ),
    p('CLIENT', { bold: true, color: VIOLET }),
    p('[Nom et prénom / raison sociale du client]'),
    p('[Adresse de facturation]'),
    p('Adresse du chantier (si différente) : [adresse]', { after: 240 }),
    p(estDevis ? 'Objet : [description de l’opération en une ou deux phrases]' : 'Objet : [chantier concerné — rappel du devis n° accepté]', {
      after: 240,
    }),
  ];
}

/** Tableau des lignes : exemples du métier + lignes vides à remplir. */
function tableauLignes(lignes) {
  const head = new TableRow({
    children: [
      cell('Désignation', { bold: true, width: 4200, fill: 'F1EEFC' }),
      cell('Unité', { bold: true, width: 1000, fill: 'F1EEFC' }),
      cell('Qté', { bold: true, width: 700, fill: 'F1EEFC', right: true }),
      cell('PU HT', { bold: true, width: 1300, fill: 'F1EEFC', right: true }),
      cell('TVA', { bold: true, width: 700, fill: 'F1EEFC', right: true }),
      cell('Total HT', { bold: true, width: 1400, fill: 'F1EEFC', right: true }),
    ],
  });

  const rows = lignes.map(
    (l) =>
      new TableRow({
        children: [
          cell(l.designation, { width: 4200 }),
          cell(l.unite, { width: 1000 }),
          cell(String(l.quantite).replace('.', ','), { width: 700, right: true }),
          cell(euros(l.prixUnitaire), { width: 1300, right: true }),
          cell(`${l.tva} %`, { width: 700, right: true }),
          cell(euros(l.quantite * l.prixUnitaire), { width: 1400, right: true }),
        ],
      })
  );

  const vides = Array.from({ length: 3 }).map(
    () =>
      new TableRow({
        children: [
          cell('', { width: 4200 }),
          cell('', { width: 1000 }),
          cell('', { width: 700 }),
          cell('', { width: 1300 }),
          cell('', { width: 700 }),
          cell('', { width: 1400 }),
        ],
      })
  );

  return new Table({
    width: { size: 9300, type: WidthType.DXA },
    rows: [head, ...rows, ...vides],
  });
}

/** Bloc totaux : total HT calculé sur les exemples, TVA par taux. */
function blocsTotaux(lignes) {
  const parTaux = new Map();
  let ht = 0;
  for (const l of lignes) {
    const t = l.quantite * l.prixUnitaire;
    ht += t;
    parTaux.set(l.tva, (parTaux.get(l.tva) ?? 0) + t);
  }
  const out = [p('', { after: 60 }), p(`Total HT (exemple) : ${euros(ht)}`, { bold: true, align: AlignmentType.RIGHT })];
  let ttc = ht;
  for (const [taux, base] of [...parTaux.entries()].sort((a, b) => a[0] - b[0])) {
    const tva = base * (taux / 100);
    ttc += tva;
    out.push(
      p(`TVA ${taux} % (base ${euros(base)}) : ${euros(tva)}`, { align: AlignmentType.RIGHT })
    );
  }
  out.push(p(`Total TTC (exemple) : ${euros(ttc)}`, { bold: true, align: AlignmentType.RIGHT, after: 240 }));
  return out;
}

function blocsConditionsDevis() {
  return [
    p('CONDITIONS', { bold: true, color: VIOLET }),
    p("Délai d'exécution : [ex. : sous 3 semaines à compter de l'acceptation du devis]"),
    p('Modalités et délai de paiement : [ex. : acompte de __ % à la commande, solde à réception de facture]'),
    p('Établissement du présent devis : [gratuit / payant : __ €]'),
    p('Taux de TVA à adapter selon la nature des travaux et du logement (rénovation de plus de 2 ans, neuf, rénovation énergétique).', {
      italic: true,
      color: GRIS,
      after: 240,
    }),
    p('ASSURANCE PROFESSIONNELLE', { bold: true, color: VIOLET }),
    p("Assurance responsabilité civile / décennale n° [police] souscrite auprès de [assureur], [adresse de l'assureur]. Couverture géographique : [ex. : France métropolitaine].", {
      after: 240,
    }),
    p('ACCEPTATION DU CLIENT', { bold: true, color: VIOLET }),
    p('Mention « Devis reçu avant l’exécution des travaux — Bon pour accord »'),
    p('Date : ____________________        Signature : ____________________', { after: 240 }),
    p("Si le devis est signé hors de l'établissement du professionnel (au domicile du client, sur le chantier), le client bénéficie d'un droit de rétractation de 14 jours et aucun paiement ne peut être reçu avant un délai de 7 jours à compter de la conclusion du contrat (sauf exceptions légales, notamment l'urgence).", {
      italic: true,
      color: GRIS,
      size: 16,
      after: 240,
    }),
  ];
}

function blocsConditionsFacture() {
  return [
    p('CONDITIONS DE RÈGLEMENT', { bold: true, color: VIOLET }),
    p("Date d'échéance du règlement : [__/__/____]"),
    p('Moyens de paiement acceptés : [virement — IBAN : … / chèque / carte]'),
    p('Pénalités de retard : [taux annuel : __ %], exigibles sans rappel préalable.'),
    p('Indemnité forfaitaire pour frais de recouvrement (clients professionnels) : 40 €.'),
    p("Escompte pour paiement anticipé : néant, sauf mention contraire.", { after: 240 }),
    p('ASSURANCE PROFESSIONNELLE', { bold: true, color: VIOLET }),
    p("Assurance responsabilité civile / décennale n° [police] souscrite auprès de [assureur], [adresse de l'assureur]. Couverture géographique : [ex. : France métropolitaine].", {
      after: 240,
    }),
    p('Acompte(s) déjà versé(s) : [montant] le [date] — facture d’acompte n° [___]. Net restant à payer : [montant].', {
      after: 240,
    }),
  ];
}

function piedDePage() {
  return [
    p(
      'Modèle gratuit proposé par MonDevisMinute (www.mondevisminute.com) — devis et factures d’artisans générés en 30 secondes par dictée vocale. Modèle à adapter à votre situation : il ne constitue pas un conseil juridique.',
      { italic: true, color: GRIS, size: 14 }
    ),
  ];
}

async function genererFichier(type, metierSlug, entree) {
  const doc = new Document({
    creator: 'MonDevisMinute',
    title: `Modèle de ${type} ${entree.label}`,
    description: `Modèle de ${type} gratuit pour ${entree.label} — mondevisminute.com`,
    sections: [
      {
        properties: {},
        children: [
          ...blocsEnTete(type, entree.label),
          tableauLignes(entree.lignes),
          ...blocsTotaux(entree.lignes),
          ...(type === 'devis' ? blocsConditionsDevis() : blocsConditionsFacture()),
          ...piedDePage(),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const nom = `modele-${type}-${metierSlug}.docx`;
  fs.writeFileSync(path.join(OUT_DIR, nom), buffer);
  return nom;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const metiers = Object.entries(lignesJson).filter(([k]) => k !== '_note');
  const produits = [];
  for (const [slug, entree] of metiers) {
    produits.push(await genererFichier('devis', slug, entree));
    produits.push(await genererFichier('facture', slug, entree));
  }
  console.log(`${produits.length} fichiers générés dans public/modeles/ :`);
  for (const f of produits) console.log('  ' + f);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
