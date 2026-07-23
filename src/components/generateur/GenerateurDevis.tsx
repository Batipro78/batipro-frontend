'use client';

/**
 * Générateur de devis public (/generateur-devis) — gratuit, sans inscription.
 *
 * Volontairement SANS IA : formulaire + calculs + PDF côté navigateur (jsPDF,
 * importé dynamiquement au clic pour ne pas alourdir la page). L'IA vocale
 * reste l'argument d'inscription à l'app.
 *
 * Quota gratuit : 7 devis. Compteur localStorage (utilisateur normal) doublé
 * d'un compteur serveur par IP hachée (POST /track/generateur) pour freiner le
 * contournement par vidage de cache. Au-delà : modale d'inscription.
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { API_BASE } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const QUOTA = 7;
// Seuil du garde-fou serveur par IP (fenêtre 30 jours) : volontairement PLUS
// haut que le quota local pour ne jamais bloquer un nouvel utilisateur légitime
// derrière une IP partagée (4G/CGNAT, WiFi d'entreprise). Il ne vise que
// l'abus massif (vidage de cache répété).
const QUOTA_IP = 25;
const LS_KEY = 'mdm_generateur_count';

function lireCompteurLocal(): number {
  try {
    return parseInt(localStorage.getItem(LS_KEY) || '0', 10) || 0;
  } catch {
    return 0; // stockage bloqué par le navigateur : on ne casse rien
  }
}

function ecrireCompteurLocal(n: number) {
  try {
    localStorage.setItem(LS_KEY, String(n));
  } catch {
    /* stockage bloqué : tant pis pour le compteur */
  }
}

const TAUX_TVA = [20, 10, 5.5, 0] as const;
const UNITES = ['forfait', 'unité', 'heure', 'm²', 'ml', 'm³', 'jour'] as const;

interface Ligne {
  designation: string;
  unite: string;
  quantite: string; // saisies texte pour tolérer virgule française
  prixUnitaire: string;
  tva: number;
}

const ligneVide = (): Ligne => ({
  designation: '',
  unite: 'forfait',
  quantite: '1',
  prixUnitaire: '',
  tva: 10,
});

/** "1 234,56" ou "1234.56" -> nombre. Chaîne vide -> 0. */
function toNombre(s: string): number {
  const n = parseFloat(s.replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

/** Format monétaire fr sans espaces insécables exotiques (PDF WinAnsi safe). */
function euros(n: number): string {
  return (
    n
      .toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      .replace(/[  ]/g, ' ') + ' €'
  );
}

function aujourdhuiFr(): string {
  return new Date().toLocaleDateString('fr-FR');
}

const inputCls =
  'w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100';
const labelCls = 'block text-xs font-semibold text-muted-foreground mb-1';

export default function GenerateurDevis() {
  // Entreprise
  const [entNom, setEntNom] = useState('');
  const [entAdresse, setEntAdresse] = useState('');
  const [entSiret, setEntSiret] = useState('');
  const [entTel, setEntTel] = useState('');
  const [entEmail, setEntEmail] = useState('');
  const [franchiseTva, setFranchiseTva] = useState(false);
  const [entTvaIntra, setEntTvaIntra] = useState('');
  const [entAssurance, setEntAssurance] = useState('');

  // Client
  const [cliNom, setCliNom] = useState('');
  const [cliAdresse, setCliAdresse] = useState('');
  const [cliChantier, setCliChantier] = useState('');

  // Devis
  const [numero, setNumero] = useState('');
  // Vide au rendu serveur : la page est statique, une date calculée au build
  // serait figée (et créerait un écart d'hydratation). Remplie au montage.
  const [dateDevis, setDateDevis] = useState('');
  const [validite, setValidite] = useState('30 jours');
  const [objet, setObjet] = useState('');
  const [delaiExecution, setDelaiExecution] = useState('');
  const [modalitesPaiement, setModalitesPaiement] = useState('');

  const [lignes, setLignes] = useState<Ligne[]>([ligneVide(), ligneVide(), ligneVide()]);

  const [gateOuverte, setGateOuverte] = useState(false);
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState('');
  // Lu APRÈS le montage (localStorage indisponible côté serveur → hydratation stable).
  const [utilisationsLocales, setUtilisationsLocales] = useState(0);

  useEffect(() => {
    setUtilisationsLocales(lireCompteurLocal());
    setDateDevis(aujourdhuiFr());
  }, []);

  // MÊME filtre pour l'écran, les totaux et le PDF : sinon le PDF peut afficher
  // un total supérieur à la somme de ses propres lignes (trouvé au verificateur).
  const estLigneValide = (l: Ligne) =>
    Boolean(l.designation.trim()) && toNombre(l.quantite) * toNombre(l.prixUnitaire) > 0;

  const totaux = useMemo(() => {
    let ht = 0;
    const tvaParTaux = new Map<number, number>();
    for (const l of lignes) {
      if (!estLigneValide(l)) continue;
      const t = toNombre(l.quantite) * toNombre(l.prixUnitaire);
      ht += t;
      const taux = franchiseTva ? 0 : l.tva;
      tvaParTaux.set(taux, (tvaParTaux.get(taux) ?? 0) + t * (taux / 100));
    }
    const tvaTotale = [...tvaParTaux.values()].reduce((a, b) => a + b, 0);
    return { ht, tvaParTaux, ttc: ht + tvaTotale };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lignes, franchiseTva]);

  function majLigne(i: number, patch: Partial<Ligne>) {
    setLignes((prev) => prev.map((l, j) => (j === i ? { ...l, ...patch } : l)));
  }

  function lignesValides(): Ligne[] {
    return lignes.filter(estLigneValide);
  }

  /**
   * Quota : compteur local (7) + garde-fou serveur par IP hachée (25 / 30 j).
   * Le serveur ne bloque qu'en cas d'abus massif — jamais un nouvel
   * utilisateur légitime derrière une IP partagée.
   */
  async function verifierQuota(): Promise<boolean> {
    const local = lireCompteurLocal();
    let serveur = 0;
    try {
      const r = await fetch(`${API_BASE}/track/generateur`, { method: 'POST' });
      if (r.ok) serveur = (await r.json()).count || 0;
    } catch {
      /* serveur injoignable : on ne bloque jamais pour ça */
    }
    if (local + 1 > QUOTA || serveur > QUOTA_IP) {
      setUtilisationsLocales(QUOTA); // l'affichage "restants" doit dire 0, pas 7
      setGateOuverte(true);
      return false;
    }
    ecrireCompteurLocal(local + 1);
    setUtilisationsLocales(local + 1);
    return true;
  }

  async function telechargerPdf() {
    setErreur('');
    const valides = lignesValides();
    if (!valides.length) {
      setErreur('Ajoutez au moins une ligne avec une désignation et un prix.');
      return;
    }
    if (!entNom.trim()) {
      setErreur('Indiquez le nom de votre entreprise (il apparaît en haut du devis).');
      return;
    }

    setEnCours(true);
    let creditConsomme = false;
    try {
      // Charger jsPDF AVANT de consommer un crédit : sur un réseau mobile
      // instable, un échec d'import ne doit pas brûler un des 7 devis gratuits.
      const { default: JsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');

      if (!(await verifierQuota())) return;
      creditConsomme = true;

      const doc = new JsPDF({ unit: 'mm', format: 'a4' });
      const M = 15; // marge
      const largeur = 210 - 2 * M;
      let y = M;

      // En-tête entreprise
      doc.setFont('helvetica', 'bold').setFontSize(14).setTextColor(30);
      doc.text(entNom.trim(), M, y);
      y += 6;
      doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(90);
      const coordonnees = [
        entAdresse.trim(),
        entSiret.trim() && `SIRET : ${entSiret.trim()}`,
        [entTel.trim(), entEmail.trim()].filter(Boolean).join(' — '),
        franchiseTva
          ? 'TVA non applicable, article 293 B du CGI'
          : entTvaIntra.trim() && `N° TVA intracommunautaire : ${entTvaIntra.trim()}`,
      ].filter(Boolean) as string[];
      for (const ligne of coordonnees) {
        doc.text(ligne, M, y);
        y += 4.5;
      }

      // Titre + références
      y += 4;
      doc.setFont('helvetica', 'bold').setFontSize(24).setTextColor(75, 57, 239);
      doc.text('DEVIS', M, y);
      doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(90);
      const refs = [
        numero.trim() && `Devis n° ${numero.trim()}`,
        `Date : ${dateDevis.trim() || aujourdhuiFr()}`,
        validite.trim() && `Validité : ${validite.trim()}`,
      ]
        .filter(Boolean)
        .join('    ');
      doc.text(refs, 210 - M, y, { align: 'right' });
      y += 8;

      // Client
      doc.setFont('helvetica', 'bold').setFontSize(10).setTextColor(30);
      doc.text('Client', M, y);
      y += 5;
      doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(60);
      for (const ligne of [
        cliNom.trim(),
        cliAdresse.trim(),
        cliChantier.trim() && `Adresse du chantier : ${cliChantier.trim()}`,
      ].filter(Boolean) as string[]) {
        doc.text(ligne, M, y);
        y += 4.5;
      }
      if (objet.trim()) {
        y += 2;
        doc.setTextColor(30);
        doc.text(`Objet : ${objet.trim()}`, M, y, { maxWidth: largeur });
        y += 4.5 * Math.ceil(doc.getTextWidth(`Objet : ${objet.trim()}`) / largeur);
      }
      y += 3;

      // Tableau des lignes
      autoTable(doc, {
        startY: y,
        margin: { left: M, right: M },
        head: [['Désignation', 'Unité', 'Qté', 'PU HT', 'TVA', 'Total HT']],
        body: valides.map((l) => [
          l.designation.trim(),
          l.unite,
          l.quantite.replace('.', ','),
          euros(toNombre(l.prixUnitaire)),
          franchiseTva ? '—' : `${l.tva} %`,
          euros(toNombre(l.quantite) * toNombre(l.prixUnitaire)),
        ]),
        styles: { font: 'helvetica', fontSize: 8.5, cellPadding: 2, textColor: 40 },
        headStyles: { fillColor: [241, 238, 252], textColor: 40, fontStyle: 'bold' },
        columnStyles: {
          0: { cellWidth: 72 },
          1: { cellWidth: 18 },
          2: { cellWidth: 14, halign: 'right' },
          3: { cellWidth: 26, halign: 'right' },
          4: { cellWidth: 14, halign: 'right' },
          5: { cellWidth: 30, halign: 'right' },
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      y = (doc as any).lastAutoTable.finalY + 6;

      // Totaux
      const totalLignes: string[] = [`Total HT : ${euros(totaux.ht)}`];
      for (const [taux, montant] of [...totaux.tvaParTaux.entries()].sort((a, b) => a[0] - b[0])) {
        if (taux > 0) totalLignes.push(`TVA ${taux} % : ${euros(montant)}`);
      }
      if (franchiseTva) totalLignes.push('TVA non applicable, article 293 B du CGI');
      totalLignes.push(`Total TTC : ${euros(totaux.ttc)}`);
      doc.setFontSize(9.5).setTextColor(30);
      for (let i = 0; i < totalLignes.length; i++) {
        const derniere = i === totalLignes.length - 1;
        doc.setFont('helvetica', derniere || i === 0 ? 'bold' : 'normal');
        if (y > 270) {
          doc.addPage();
          y = M;
        }
        doc.text(totalLignes[i], 210 - M, y, { align: 'right' });
        y += 5;
      }

      // Conditions + assurance + signature
      y += 4;
      doc.setFontSize(8.5).setTextColor(60);
      const conditions = [
        delaiExecution.trim() && `Délai d'exécution : ${delaiExecution.trim()}`,
        modalitesPaiement.trim() && `Modalités de paiement : ${modalitesPaiement.trim()}`,
        entAssurance.trim() && `Assurance professionnelle : ${entAssurance.trim()}`,
        'Bon pour accord — devis reçu avant l’exécution des travaux.',
        'Date : ______________________        Signature : ______________________',
      ].filter(Boolean) as string[];
      for (const ligne of conditions) {
        if (y > 275) {
          doc.addPage();
          y = M;
        }
        doc.setFont('helvetica', 'normal');
        doc.text(ligne, M, y, { maxWidth: largeur });
        y += 5.5;
      }

      // Pied de marque sur chaque page
      const pages = doc.getNumberOfPages();
      for (let i = 1; i <= pages; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'italic').setFontSize(7.5).setTextColor(150);
        doc.text(
          'Devis généré gratuitement avec MonDevisMinute — mondevisminute.com',
          105,
          290,
          { align: 'center' }
        );
      }

      const nomFichier = numero.trim()
        ? `devis-${numero.trim().replace(/[^a-zA-Z0-9-]/g, '-')}.pdf`
        : 'devis-mondevisminute.pdf';
      doc.save(nomFichier);
    } catch {
      // Ne rendre le crédit QUE s'il a été consommé dans CET appel.
      if (creditConsomme) {
        const local = lireCompteurLocal();
        if (local > 0) {
          ecrireCompteurLocal(local - 1);
          setUtilisationsLocales(local - 1);
        }
      }
      setErreur('Impossible de générer le PDF. Réessayez, ou signalez-le-nous via la page contact.');
    } finally {
      setEnCours(false);
    }
  }

  const restants = Math.max(0, QUOTA - utilisationsLocales);

  return (
    <div className="mt-10">
      {/* Entreprise */}
      <section className="rounded-2xl border border-violet-100 border-t-4 border-t-violet-500 bg-gradient-to-b from-violet-50/40 to-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 font-display text-sm font-bold text-white shadow">
            1
          </span>
          <h2 className="font-display text-lg font-bold text-foreground">Votre entreprise</h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="g-ent-nom">Nom de l&apos;entreprise *</label>
            <input id="g-ent-nom" className={inputCls} value={entNom} onChange={(e) => setEntNom(e.target.value)} placeholder="Ex. : Dupont Électricité" />
          </div>
          <div>
            <label className={labelCls} htmlFor="g-ent-siret">SIRET</label>
            <input id="g-ent-siret" className={inputCls} value={entSiret} onChange={(e) => setEntSiret(e.target.value)} placeholder="14 chiffres" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="g-ent-adresse">Adresse</label>
            <input id="g-ent-adresse" className={inputCls} value={entAdresse} onChange={(e) => setEntAdresse(e.target.value)} placeholder="Adresse du siège" />
          </div>
          <div>
            <label className={labelCls} htmlFor="g-ent-tel">Téléphone</label>
            <input id="g-ent-tel" className={inputCls} value={entTel} onChange={(e) => setEntTel(e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="g-ent-email">Email</label>
            <input id="g-ent-email" className={inputCls} value={entEmail} onChange={(e) => setEntEmail(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={franchiseTva}
                onChange={(e) => setFranchiseTva(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-violet-600"
              />
              Je suis en franchise de TVA (mention « TVA non applicable, article 293 B du CGI »)
            </label>
          </div>
          {!franchiseTva && (
            <div>
              <label className={labelCls} htmlFor="g-ent-tva">N° TVA intracommunautaire</label>
              <input id="g-ent-tva" className={inputCls} value={entTvaIntra} onChange={(e) => setEntTvaIntra(e.target.value)} placeholder="FRxx xxx xxx xxx" />
            </div>
          )}
          <div className={franchiseTva ? 'sm:col-span-2' : ''}>
            <label className={labelCls} htmlFor="g-ent-assurance">Assurance professionnelle (n° de police, assureur, couverture géographique)</label>
            <input id="g-ent-assurance" className={inputCls} value={entAssurance} onChange={(e) => setEntAssurance(e.target.value)} placeholder="Décennale n° … souscrite auprès de … — France métropolitaine" />
          </div>
        </div>
      </section>

      {/* Client + références */}
      <section className="mt-6 rounded-2xl border border-sky-100 border-t-4 border-t-sky-500 bg-gradient-to-b from-sky-50/40 to-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 font-display text-sm font-bold text-white shadow">
            2
          </span>
          <h2 className="font-display text-lg font-bold text-foreground">Client et références du devis</h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="g-cli-nom">Nom du client</label>
            <input id="g-cli-nom" className={inputCls} value={cliNom} onChange={(e) => setCliNom(e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="g-cli-adresse">Adresse du client</label>
            <input id="g-cli-adresse" className={inputCls} value={cliAdresse} onChange={(e) => setCliAdresse(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="g-cli-chantier">Adresse du chantier (si différente)</label>
            <input id="g-cli-chantier" className={inputCls} value={cliChantier} onChange={(e) => setCliChantier(e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="g-numero">Numéro du devis</label>
            <input id="g-numero" className={inputCls} value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="2026-001" />
          </div>
          <div>
            <label className={labelCls} htmlFor="g-date">Date</label>
            <input id="g-date" className={inputCls} value={dateDevis} onChange={(e) => setDateDevis(e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="g-validite">Durée de validité</label>
            <input id="g-validite" className={inputCls} value={validite} onChange={(e) => setValidite(e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="g-objet">Objet du devis</label>
            <input id="g-objet" className={inputCls} value={objet} onChange={(e) => setObjet(e.target.value)} placeholder="Ex. : rénovation électrique du séjour" />
          </div>
        </div>
      </section>

      {/* Lignes */}
      <section className="mt-6 rounded-2xl border border-emerald-100 border-t-4 border-t-emerald-500 bg-gradient-to-b from-emerald-50/40 to-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 font-display text-sm font-bold text-white shadow">
            3
          </span>
          <h2 className="font-display text-lg font-bold text-foreground">Vos prestations</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Une ligne par prestation : désignation, unité, quantité, prix unitaire HT, taux de TVA.
        </p>

        <div className="mt-4 space-y-3">
          {lignes.map((l, i) => (
            <div key={i} className="grid grid-cols-12 items-end gap-2 rounded-xl border border-border/60 bg-white p-3">
              <div className="col-span-12 sm:col-span-5">
                <label className={labelCls} htmlFor={`g-l-${i}-d`}>Désignation</label>
                <input id={`g-l-${i}-d`} className={inputCls} value={l.designation} onChange={(e) => majLigne(i, { designation: e.target.value })} placeholder="Ex. : Pose prise 16 A — fourniture et pose" />
              </div>
              <div className="col-span-4 sm:col-span-2">
                <label className={labelCls} htmlFor={`g-l-${i}-u`}>Unité</label>
                <select id={`g-l-${i}-u`} className={inputCls} value={l.unite} onChange={(e) => majLigne(i, { unite: e.target.value })}>
                  {UNITES.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-3 sm:col-span-1">
                <label className={labelCls} htmlFor={`g-l-${i}-q`}>Qté</label>
                <input id={`g-l-${i}-q`} className={inputCls} inputMode="decimal" value={l.quantite} onChange={(e) => majLigne(i, { quantite: e.target.value })} />
              </div>
              <div className="col-span-5 sm:col-span-2">
                <label className={labelCls} htmlFor={`g-l-${i}-p`}>PU HT (€)</label>
                <input id={`g-l-${i}-p`} className={inputCls} inputMode="decimal" value={l.prixUnitaire} onChange={(e) => majLigne(i, { prixUnitaire: e.target.value })} placeholder="0,00" />
              </div>
              <div className="col-span-6 sm:col-span-1">
                <label className={labelCls} htmlFor={`g-l-${i}-t`}>TVA</label>
                <select id={`g-l-${i}-t`} className={inputCls} value={l.tva} disabled={franchiseTva} onChange={(e) => majLigne(i, { tva: parseFloat(e.target.value) })}>
                  {TAUX_TVA.map((t) => (
                    <option key={t} value={t}>{t} %</option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 flex items-center justify-end gap-3 sm:col-span-1">
                <span className="text-sm font-medium text-foreground">
                  {euros(toNombre(l.quantite) * toNombre(l.prixUnitaire))}
                </span>
                {lignes.length > 1 && (
                  <button
                    type="button"
                    aria-label="Supprimer la ligne"
                    onClick={() => setLignes((prev) => prev.filter((_, j) => j !== i))}
                    className="text-muted-foreground transition hover:text-red-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setLignes((prev) => [...prev, ligneVide()])}
          className="mt-4 rounded-lg border border-violet-300 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
        >
          + Ajouter une ligne
        </button>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="g-delai">Délai d&apos;exécution</label>
            <input id="g-delai" className={inputCls} value={delaiExecution} onChange={(e) => setDelaiExecution(e.target.value)} placeholder="Ex. : sous 3 semaines à compter de l'acceptation" />
          </div>
          <div>
            <label className={labelCls} htmlFor="g-paiement">Modalités de paiement</label>
            <input id="g-paiement" className={inputCls} value={modalitesPaiement} onChange={(e) => setModalitesPaiement(e.target.value)} placeholder="Ex. : solde à réception de facture" />
          </div>
        </div>
      </section>

      {/* Totaux + téléchargement */}
      <section className="mt-6 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-5 shadow-md shadow-violet-100 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-sm leading-7 text-muted-foreground">
            <p>
              Total HT : <span className="font-semibold text-foreground">{euros(totaux.ht)}</span>
            </p>
            {!franchiseTva &&
              [...totaux.tvaParTaux.entries()]
                .sort((a, b) => a[0] - b[0])
                .filter(([taux]) => taux > 0)
                .map(([taux, montant]) => (
                  <p key={taux}>
                    TVA {taux} % : <span className="font-medium text-foreground">{euros(montant)}</span>
                  </p>
                ))}
            {franchiseTva && <p>TVA non applicable, article 293 B du CGI</p>}
            <p className="text-base">
              Total TTC :{' '}
              <span className="font-display text-lg font-bold text-foreground">{euros(totaux.ttc)}</span>
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            <button
              type="button"
              onClick={telechargerPdf}
              disabled={enCours}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700 disabled:opacity-60"
            >
              {enCours ? 'Génération…' : 'Télécharger mon devis en PDF'}
            </button>
            <span className="text-xs text-muted-foreground sm:text-right">
              Gratuit, sans inscription — {restants} devis gratuit{restants > 1 ? 's' : ''} restant{restants > 1 ? 's' : ''}
            </span>
          </div>
        </div>
        {erreur && <p className="mt-3 text-sm font-medium text-red-600">{erreur}</p>}
      </section>

      {/* Modale quota atteint */}
      <Dialog open={gateOuverte} onOpenChange={setGateOuverte}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vous avez utilisé vos {QUOTA} devis gratuits</DialogTitle>
            <DialogDescription>
              Le générateur vous a servi {QUOTA} fois — c&apos;est que vous faites des devis
              régulièrement. Créez votre compte gratuit MonDevisMinute : vos coordonnées et
              mentions enregistrées une fois pour toutes, numérotation automatique, devis
              transformé en facture en un clic… et la dictée vocale pour faire tout ça en 30
              secondes depuis le chantier. Essai 14 jours, sans carte bancaire.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-5 py-2.5 font-semibold text-white transition hover:bg-violet-700"
            >
              Créer mon compte gratuit
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
