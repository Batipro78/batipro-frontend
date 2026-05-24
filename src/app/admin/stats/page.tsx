'use client';

import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://batipro-backend.onrender.com/api';
const TOKEN_KEY = 'mdm_admin_token';
const RENDER_DASHBOARD = 'https://dashboard.render.com';

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
  derniers_inscrits: Array<{
    email: string;
    nom: string | null;
    metier: string | null;
    is_premium: boolean;
    created_at: string;
  }>;
  generated_at: string;
};

export default function AdminStatsPage() {
  const [token, setToken] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
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
