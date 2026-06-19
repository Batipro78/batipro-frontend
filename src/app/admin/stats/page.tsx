'use client';

import { useCallback, useEffect, useState } from 'react';
import { API_BASE } from '@/lib/api';

const TOKEN_KEY = 'mdm_admin_token';
const RENDER_DASHBOARD = 'https://dashboard.render.com';
const VERCEL_ANALYTICS = 'https://vercel.com/dashboard';

type Stats = {
  artisans: {
    total: number;
    premium: number;
    nouveaux_7j: number;
    nouveaux_24h: number;
    actifs_24h: number;
  };
  devis: { total: number; crees_7j: number };
  factures: { total: number; creees_7j: number };
  conversion: {
    visites: number;
    visites_7j: number;
    taux_inscription_pct: number;
    inscrits: number;
    email_verifies: number;
    en_essai: number;
    essai_expire_non_converti: number;
    payants: number;
    premium_offerts: number;
    abonnements_annules: number;
    comptes_supprimes: number;
    taux_conversion_pct: number;
  };
  derniers_inscrits: Array<{
    email: string;
    nom: string | null;
    metier: string | null;
    is_premium: boolean;
    created_at: string;
  }>;
  generated_at: string;
};

type Artisan = {
  id: number;
  email: string;
  nom: string | null;
  metier: string | null;
  is_premium: boolean;
  subscription_status: string | null;
  trial_start: string | null;
  created_at: string;
  account_deleted_at: string | null;
  current_period_end: string | null;
  devis_total: number;
  devis_7j: number;
  devis_30j: number;
};

export default function AdminStatsPage() {
  const [token, setToken] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? sessionStorage.getItem(TOKEN_KEY) : null;
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/admin/stats`, { headers: { 'x-admin-token': token } })
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j?.error?.message || `HTTP ${r.status}`);
        return j.data as Stats;
      })
      .then(setStats)
      .catch((e) => {
        setError(e.message);
        if (e.message?.toLowerCase().includes('token')) {
          sessionStorage.removeItem(TOKEN_KEY);
          setToken(null);
        }
      })
      .finally(() => setLoading(false));
  }, [token]);

  const reloadArtisans = useCallback(() => {
    if (!token) return;
    fetch(`${API_BASE}/admin/artisans`, { headers: { 'x-admin-token': token } })
      .then((r) => r.json())
      .then((j) => setArtisans(j?.data?.artisans || []))
      .catch(() => {});
  }, [token]);

  useEffect(() => {
    reloadArtisans();
  }, [reloadArtisans]);

  async function sendMail(a: Artisan) {
    const subject = window.prompt(`Objet du mail à ${a.email} :`);
    if (!subject) return;
    const message = window.prompt('Message :');
    if (!message) return;
    try {
      const r = await fetch(`${API_BASE}/admin/artisans/${a.id}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token! },
        body: JSON.stringify({ subject, message }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error?.message || 'Échec');
      alert(`Email envoyé à ${a.email}`);
    } catch (e) {
      alert('Erreur : ' + (e as Error).message);
    }
  }

  async function deleteAccount(a: Artisan) {
    if (!window.confirm(`Supprimer le compte ${a.email} ?\nAnonymisation RGPD, irréversible.`)) return;
    try {
      const r = await fetch(`${API_BASE}/admin/artisans/${a.id}/delete`, {
        method: 'POST',
        headers: { 'x-admin-token': token! },
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error?.message || 'Échec');
      reloadArtisans();
    } catch (e) {
      alert('Erreur : ' + (e as Error).message);
    }
  }

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    sessionStorage.setItem(TOKEN_KEY, tokenInput.trim());
    setToken(tokenInput.trim());
  }

  function logout() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setStats(null);
    setArtisans([]);
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <form onSubmit={login} className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Admin MonDevisMinute</h1>
          <p className="text-sm text-slate-600">Entre le token admin pour acceder aux stats.</p>
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="Token admin"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
            autoFocus
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition">
            Entrer
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Stats MonDevisMinute</h1>
            {stats && (
              <p className="text-sm text-slate-500 mt-1">
                Mis a jour : {new Date(stats.generated_at).toLocaleString('fr-FR')}
              </p>
            )}
          </div>
          <button onClick={logout} className="text-sm text-slate-600 hover:text-slate-900 underline">
            Se deconnecter
          </button>
        </header>

        {loading && <div className="text-slate-500">Chargement...</div>}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            Erreur : {error}
          </div>
        )}

        {stats && (
          <>
            <section>
              <h2 className="text-lg font-semibold text-slate-700 mb-3">Conversion — qui s&apos;inscrit, paye, part</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <Stat label="Visiteurs (total)" value={stats.conversion.visites} />
                <div className="rounded-xl shadow p-5 bg-green-600 text-white">
                  <div className="text-sm font-medium text-green-100">Taux de conversion</div>
                  <div className="text-4xl font-bold mt-1">{stats.conversion.taux_conversion_pct}%</div>
                  <div className="text-xs text-green-100 mt-1">
                    {stats.conversion.payants} payants / {stats.conversion.inscrits} inscrits
                  </div>
                </div>
                <Stat label="Payants" value={stats.conversion.payants} highlight />
                <Stat label="En essai (actif)" value={stats.conversion.en_essai} />
              </div>
              <p className="text-sm text-slate-500 mb-4">
                Taux d&apos;inscription (visite → compte) :{' '}
                <span className="font-semibold text-slate-700">{stats.conversion.taux_inscription_pct}%</span>
                {' · '}{stats.conversion.visites_7j} visites sur 7j
                {' · '}
                <span className="text-violet-700">{stats.conversion.premium_offerts} premium offerts (tests)</span>
              </p>

              <div className="bg-white rounded-xl shadow p-5 space-y-3">
                <FunnelBar label="Visiteurs" value={stats.conversion.visites} max={Math.max(stats.conversion.visites, stats.conversion.inscrits, 1)} color="#22d3ee" />
                <FunnelBar label="Inscrits" value={stats.conversion.inscrits} max={Math.max(stats.conversion.visites, stats.conversion.inscrits, 1)} color="#94a3b8" />
                <FunnelBar label="Email vérifié" value={stats.conversion.email_verifies} max={Math.max(stats.conversion.visites, stats.conversion.inscrits, 1)} color="#60a5fa" />
                <FunnelBar label="En essai (actif)" value={stats.conversion.en_essai} max={Math.max(stats.conversion.visites, stats.conversion.inscrits, 1)} color="#818cf8" />
                <FunnelBar label="Payants" value={stats.conversion.payants} max={Math.max(stats.conversion.visites, stats.conversion.inscrits, 1)} color="#22c55e" />
              </div>

              <h3 className="text-sm font-semibold text-slate-600 mt-5 mb-2">Pertes (ceux qui partent)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ChurnStat label="Essai expiré, non converti" value={stats.conversion.essai_expire_non_converti} />
                <ChurnStat label="Abonnements annulés" value={stats.conversion.abonnements_annules} />
                <ChurnStat label="Comptes supprimés" value={stats.conversion.comptes_supprimes} />
              </div>

              <a
                href={VERCEL_ANALYTICS}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 bg-white rounded-xl shadow p-4 hover:shadow-md transition"
              >
                <div className="text-slate-600 text-sm">
                  Visiteurs du site (venus, inscrits ou non) — top de l&apos;entonnoir
                </div>
                <div className="text-blue-600 mt-1 font-medium">Voir sur Vercel Analytics →</div>
              </a>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-700 mb-3">Artisans inscrits</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Stat label="Total" value={stats.artisans.total} />
                <Stat label="Premium" value={stats.artisans.premium} highlight />
                <Stat label="Actifs 24h" value={stats.artisans.actifs_24h} />
                <Stat label="Nouveaux 24h" value={stats.artisans.nouveaux_24h} />
                <Stat label="Nouveaux 7j" value={stats.artisans.nouveaux_7j} />
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-700 mb-3">Activite</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Stat label="Devis (total)" value={stats.devis.total} />
                <Stat label="Devis (7j)" value={stats.devis.crees_7j} />
                <Stat label="Factures (total)" value={stats.factures.total} />
                <Stat label="Factures (7j)" value={stats.factures.creees_7j} />
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-700 mb-3">Requetes API</h2>
              <a
                href={RENDER_DASHBOARD}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl shadow p-6 hover:shadow-md transition"
              >
                <div className="text-slate-600">
                  Voir les graphiques de requetes en temps reel sur Render Dashboard
                </div>
                <div className="text-blue-600 mt-2 font-medium">Ouvrir Render Metrics →</div>
              </a>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-700 mb-3">
                Abonnés payants ({artisans.filter((a) => !a.account_deleted_at && a.subscription_status === 'active').length})
              </h2>
              <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-green-50 text-slate-700">
                    <tr>
                      <th className="text-left px-3 py-3">Email</th>
                      <th className="text-left px-3 py-3">Nom</th>
                      <th className="text-left px-3 py-3">Renouvellement</th>
                      <th className="text-right px-3 py-3">Devis (total)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {artisans.filter((a) => !a.account_deleted_at && a.subscription_status === 'active').length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                          Aucun abonné payant pour le moment
                        </td>
                      </tr>
                    )}
                    {artisans
                      .filter((a) => !a.account_deleted_at && a.subscription_status === 'active')
                      .map((a) => (
                        <tr key={a.id} className="border-t border-slate-100">
                          <td className="px-3 py-2 text-slate-900">{a.email}</td>
                          <td className="px-3 py-2 text-slate-700">{a.nom || '-'}</td>
                          <td className="px-3 py-2 text-slate-600">
                            {a.current_period_end ? new Date(a.current_period_end).toLocaleDateString('fr-FR') : '-'}
                          </td>
                          <td className="px-3 py-2 text-right font-medium text-slate-800">{a.devis_total}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-700 mb-3">
                Gestion des comptes ({artisans.length})
              </h2>
              <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="text-left px-3 py-3">Email</th>
                      <th className="text-left px-3 py-3">Nom</th>
                      <th className="text-left px-3 py-3">Statut</th>
                      <th className="text-right px-3 py-3">Devis</th>
                      <th className="text-right px-3 py-3">7j</th>
                      <th className="text-left px-3 py-3">Inscrit</th>
                      <th className="text-right px-3 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {artisans.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-6 text-center text-slate-500">
                          Aucun compte
                        </td>
                      </tr>
                    )}
                    {artisans.map((a) => (
                      <tr
                        key={a.id}
                        className={`border-t border-slate-100 ${a.account_deleted_at ? 'opacity-40' : ''}`}
                      >
                        <td className="px-3 py-2 text-slate-900">{a.email}</td>
                        <td className="px-3 py-2 text-slate-700">{a.nom || '-'}</td>
                        <td className="px-3 py-2"><StatutBadge a={a} /></td>
                        <td className="px-3 py-2 text-right font-medium text-slate-800">{a.devis_total}</td>
                        <td className="px-3 py-2 text-right text-slate-500">{a.devis_7j}</td>
                        <td className="px-3 py-2 text-slate-600">
                          {new Date(a.created_at).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-3 py-2 text-right whitespace-nowrap">
                          {!a.account_deleted_at && (
                            <>
                              <button onClick={() => sendMail(a)} className="text-blue-600 hover:underline mr-3">
                                Mail
                              </button>
                              <button onClick={() => deleteAccount(a)} className="text-red-600 hover:underline">
                                Suppr.
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-700 mb-3">10 derniers inscrits</h2>
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="text-left px-4 py-3">Email</th>
                      <th className="text-left px-4 py-3">Nom</th>
                      <th className="text-left px-4 py-3">Metier</th>
                      <th className="text-left px-4 py-3">Premium</th>
                      <th className="text-left px-4 py-3">Inscrit le</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.derniers_inscrits.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                          Aucun inscrit pour le moment
                        </td>
                      </tr>
                    )}
                    {stats.derniers_inscrits.map((a) => (
                      <tr key={a.email} className="border-t border-slate-100">
                        <td className="px-4 py-3 text-slate-900">{a.email}</td>
                        <td className="px-4 py-3 text-slate-700">{a.nom || '-'}</td>
                        <td className="px-4 py-3 text-slate-700">{a.metier || '-'}</td>
                        <td className="px-4 py-3">
                          {a.is_premium ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Oui</span>
                          ) : (
                            <span className="text-slate-500 text-xs">Non</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {new Date(a.created_at).toLocaleString('fr-FR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-xl shadow p-5 ${highlight ? 'bg-blue-600 text-white' : 'bg-white'}`}>
      <div className={`text-sm font-medium ${highlight ? 'text-blue-100' : 'text-slate-500'}`}>{label}</div>
      <div className="text-3xl font-bold mt-1">{value}</div>
    </div>
  );
}

function FunnelBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-700 font-medium">{label}</span>
        <span className="text-slate-500">{value} ({pct}%)</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
        <div className="h-4 rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function ChurnStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl shadow p-5 bg-white border-l-4 border-red-400">
      <div className="text-sm font-medium text-slate-500">{label}</div>
      <div className="text-3xl font-bold mt-1 text-red-600">{value}</div>
    </div>
  );
}

function StatutBadge({ a }: { a: Artisan }) {
  if (a.account_deleted_at) return <span className="text-slate-400 text-xs">Supprimé</span>;
  if (a.subscription_status && ['canceled', 'past_due', 'unpaid', 'incomplete_expired'].includes(a.subscription_status))
    return <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs">Annulé</span>;
  if (a.subscription_status === 'active')
    return <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">Payant</span>;
  if (a.is_premium)
    return <span className="bg-violet-100 text-violet-800 px-2 py-0.5 rounded text-xs">Premium offert</span>;
  const expired = a.trial_start
    ? Date.now() > new Date(a.trial_start).getTime() + 14 * 24 * 60 * 60 * 1000
    : false;
  return expired ? (
    <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-xs">Essai expiré</span>
  ) : (
    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">En essai</span>
  );
}
