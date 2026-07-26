'use client';

type Props = {
  /** Chemin du .docx dans /public (ex. /modeles/modele-devis-electricien.docx). */
  fichier: string;
  metier: string;
  /** 'devis' ou 'facture' — permet de comparer les deux familles de modeles. */
  type: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Bouton de telechargement instrumente.
 *
 * Le fichier est un statique servi depuis /public : une requete de
 * telechargement ne passe donc JAMAIS par le script de Vercel Analytics, qui ne
 * voit que les pages vues. Sans ce clic instrumente, le nombre de
 * telechargements n'existe nulle part.
 *
 * On n'utilise PAS `track()` de @vercel/analytics : les evenements personnalises
 * exigent un plan Vercel Pro, et le projet est en Hobby — l'appel serait
 * silencieusement ignore. On emet donc vers les trois canaux gratuits et sans
 * plafond, chacun pouvant etre absent selon les variables d'environnement
 * renseignees (cf AnalyticsScripts) :
 *   - `gtag`      : GA4 charge en direct via NEXT_PUBLIC_GA_ID ;
 *   - `dataLayer` : Google Tag Manager, deja charge en production ;
 *   - `clarity`   : Microsoft Clarity via NEXT_PUBLIC_CLARITY_ID.
 *
 * Aucun de ces appels ne bloque le telechargement : l'attribut `download` ne
 * provoque pas de navigation, la page reste montee et les requetes partent.
 */
export default function TelechargerModele({ fichier, metier, type, className, children }: Props) {
  function onDownload() {
    const params = { metier, type, fichier };

    // Chaque canal est isole : un traceur absent ou casse ne doit jamais
    // empecher les autres de recevoir l'evenement, ni bloquer le clic.
    for (const emit of [
      () => window.gtag?.('event', 'telechargement_modele', params),
      () => window.dataLayer?.push({ event: 'telechargement_modele', ...params }),
      () => window.clarity?.('event', `telechargement_modele_${type}_${metier}`),
    ]) {
      try {
        emit();
      } catch {
        /* silencieux — la mesure ne doit jamais casser le telechargement */
      }
    }
  }

  return (
    <a href={fichier} download onClick={onDownload} className={className}>
      {children}
    </a>
  );
}
