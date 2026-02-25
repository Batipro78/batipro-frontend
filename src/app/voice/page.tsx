'use client';

import { useState, useRef, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { ProtectedLayout } from '@/components/protected-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { Mic, MicOff, Loader2, CheckCircle, AlertCircle, Zap, Wrench, ShoppingBag, X } from 'lucide-react';
import { toast } from 'sonner';

interface Client {
  id: number;
  nom: string;
  prenom?: string;
}

interface FournisseurGroup {
  fournisseur: string;
  articles: string[];
}

interface ComparatifLigne {
  catalogId: string;
  nom: string;
  quantite: number;
  unite: string;
  tva: number;
  confidence: string;
  eco: { prix_ht: number; marque: string; fournisseur: string };
  standard: { prix_ht: number; marque: string; fournisseur: string };
  premium: { prix_ht: number; marque: string; fournisseur: string };
}

interface ComparatifTotaux {
  eco: { total_ht: number; total_ttc: number };
  standard: { total_ht: number; total_ttc: number };
  premium: { total_ht: number; total_ttc: number };
}

interface ComparatifData {
  lignes: ComparatifLigne[];
  totaux: ComparatifTotaux;
  devisId: number;
}

type Phase = 'idle' | 'recording' | 'uploading' | 'queued' | 'transcription' | 'parsing' | 'matching' | 'creating_devis' | 'completed' | 'failed';
type Gamme = 'eco' | 'standard' | 'premium' | 'comparatif';
type Metier = 'electricien' | 'plombier';

export default function VoicePage() {
  const { t } = useI18n();
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedMetier, setSelectedMetier] = useState<Metier | ''>('');
  const [selectedGamme, setSelectedGamme] = useState<Gamme>('standard');
  const [phase, setPhase] = useState<Phase>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fournisseurs, setFournisseurs] = useState<FournisseurGroup[]>([]);
  const [comparatifData, setComparatifData] = useState<ComparatifData | null>(null);
  const [showGammeChooser, setShowGammeChooser] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    api.get<{ data: { clients: Client[] } }>('/clients').then((res) => setClients(res.data?.clients || [])).catch(() => {});
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, []);

  const startRecording = async () => {
    console.log('[VOICE] Démarrage enregistrement...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('[VOICE] Micro activé, stream OK');
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        console.log('[VOICE] Arrêt enregistrement, taille blob:', audioBlob.size, 'octets');
        toast.info('Envoi en cours...');
        await uploadAudio(audioBlob);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setPhase('recording');
      setErrorMsg('');
      setFournisseurs([]);
      setComparatifData(null);
    } catch (err) {
      console.error('[VOICE] Erreur micro:', err);
      toast.error('Impossible d\'accéder au microphone');
    }
  };

  const stopRecording = () => {
    console.log('[VOICE] Stop recording demandé');
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setPhase('uploading');
    }
  };

  const uploadAudio = async (blob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('audio', blob, 'recording.webm');
      formData.append('client_id', selectedClientId);
      formData.append('gamme', selectedGamme);
      formData.append('metier', selectedMetier);

      const token = localStorage.getItem('token');
      console.log('[VOICE] Envoi du fichier vers API...', { taille: blob.size, client: selectedClientId, gamme: selectedGamme, metier: selectedMetier, hasToken: !!token, tokenPreview: token ? token.substring(0, 20) + '...' : 'NONE' });
      const res = await api.upload<{ data: { logId: number } }>('/ia/devis-vocal', formData);
      console.log('[VOICE] Réponse API:', res);
      const newLogId = res.data.logId;
      toast.success(`Audio envoyé ! Job #${newLogId} en cours...`);
      setPhase('queued');
      startPolling(newLogId);
    } catch (err) {
      console.error('[VOICE] Erreur upload:', err);
      setPhase('failed');
      setErrorMsg(err instanceof Error ? err.message : 'Erreur upload');
    }
  };

  const startPolling = (id: number) => {
    pollingRef.current = setInterval(async () => {
      try {
        const res = await api.get<{
          data: {
            phase: Phase;
            errorMessage?: string;
            devisId?: number;
            devisMetadata?: {
              gamme?: string;
              fournisseurs_liste?: FournisseurGroup[];
              comparaison?: { lignes: ComparatifLigne[]; totaux: ComparatifTotaux };
            };
          };
        }>(`/ia/devis-vocal/${id}/status`);
        const { phase: newPhase, errorMessage, devisMetadata, devisId } = res.data;
        setPhase(newPhase);

        if (newPhase === 'completed') {
          clearInterval(pollingRef.current!);

          if (devisMetadata?.gamme === 'comparatif' && devisMetadata.comparaison && devisId) {
            // Comparatif mode: show comparison table
            setComparatifData({
              lignes: devisMetadata.comparaison.lignes,
              totaux: devisMetadata.comparaison.totaux,
              devisId,
            });
            toast.success('Comparatif prêt !');
          } else {
            // Normal mode: show supplier list
            toast.success('Devis créé avec succès !');
            if (devisMetadata?.fournisseurs_liste) {
              setFournisseurs(devisMetadata.fournisseurs_liste);
            }
          }
        } else if (newPhase === 'failed') {
          clearInterval(pollingRef.current!);
          setErrorMsg(errorMessage || 'Erreur inconnue');
        }
      } catch {
        // continue polling
      }
    }, 2000);
  };

  const handleFinalizeGamme = async (gammeChoisie: 'eco' | 'standard' | 'premium') => {
    if (!comparatifData) return;
    try {
      await api.put(`/ia/devis-vocal/${comparatifData.devisId}/finaliser-gamme`, { gamme: gammeChoisie });
      toast.success(`Devis finalisé en gamme ${gammeChoisie}`);
      setShowGammeChooser(false);
      reset();
    } catch {
      toast.error('Erreur lors de la finalisation');
    }
  };

  const reset = () => {
    setPhase('idle');
    setErrorMsg('');
    setFournisseurs([]);
    setComparatifData(null);
    setShowGammeChooser(false);
    if (pollingRef.current) clearInterval(pollingRef.current);
  };

  const formatPrice = (price: number) => price.toFixed(2).replace('.', ',') + ' €';

  const phaseLabels: Record<string, string> = {
    queued: 'En file d\'attente...',
    transcription: 'Transcription audio...',
    parsing: 'Analyse du contenu...',
    matching: 'Recherche des articles...',
    creating_devis: 'Création du devis...',
    completed: 'Devis créé !',
    failed: 'Échec du traitement',
  };

  const isProcessing = ['queued', 'transcription', 'parsing', 'matching', 'creating_devis'].includes(phase);
  const canRecord = selectedMetier !== '' && selectedClientId !== '' && phase === 'idle';

  const gammeOptions: { value: Gamme; icon: string; color: string }[] = [
    { value: 'eco', icon: '💰', color: 'border-green-500 bg-green-50 dark:bg-green-950' },
    { value: 'standard', icon: '⚖️', color: 'border-blue-500 bg-blue-50 dark:bg-blue-950' },
    { value: 'premium', icon: '✨', color: 'border-amber-500 bg-amber-50 dark:bg-amber-950' },
  ];

  return (
    <ProtectedLayout>
      <PageHeader title={t('voiceTitle')} description={t('voiceSubtitle')} />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Step 1: Select Trade */}
        <Card>
          <CardHeader>
            <CardTitle>1. {t('selectTrade')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedMetier('electricien')}
                className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                  selectedMetier === 'electricien'
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <Zap className={`h-10 w-10 ${selectedMetier === 'electricien' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="font-semibold">{t('electrician')}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedMetier('plombier')}
                className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                  selectedMetier === 'plombier'
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <Wrench className={`h-10 w-10 ${selectedMetier === 'plombier' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="font-semibold">{t('plumber')}</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Select Gamme */}
        {selectedMetier && (
          <Card>
            <CardHeader>
              <CardTitle>2. {t('selectGamme')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {gammeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedGamme(opt.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      selectedGamme === opt.value
                        ? `${opt.color} border-2 shadow-md`
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="font-semibold text-sm">
                      {opt.value === 'premium' ? t('premiumLabel') : t(opt.value as 'eco' | 'standard')}
                    </span>
                    <span className="text-xs text-muted-foreground text-center">
                      {t(`${opt.value}Desc` as 'ecoDesc' | 'standardDesc' | 'premiumDesc')}
                    </span>
                  </button>
                ))}
                {/* Carte Comparatif — classes explicites pour que Tailwind v4 les détecte */}
                <button
                  type="button"
                  onClick={() => setSelectedGamme('comparatif')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    selectedGamme === 'comparatif'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950 shadow-md'
                      : 'border-muted hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl">📊</span>
                  <span className="font-semibold text-sm">{t('comparatif')}</span>
                  <span className="text-xs text-muted-foreground text-center">{t('comparatifDesc')}</span>
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Select Client */}
        {selectedMetier && (
          <Card>
            <CardHeader>
              <CardTitle>3. {t('selectClient')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectClient')} />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.nom} {c.prenom || ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Recording */}
        {selectedMetier && (
          <Card>
            <CardHeader>
              <CardTitle>4. Enregistrement vocal</CardTitle>
              <CardDescription>
                Décrivez les matériaux et travaux nécessaires
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              {phase === 'idle' && (
                <Button
                  size="lg"
                  className="rounded-full h-20 w-20 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 animate-[pulse_2s_ease-in-out_infinite] hover:animate-none"
                  disabled={!canRecord}
                  onClick={startRecording}
                >
                  <Mic className="h-8 w-8" />
                </Button>
              )}

              {phase === 'recording' && (
                <Button
                  size="lg"
                  variant="destructive"
                  className="rounded-full h-20 w-20 animate-pulse"
                  onClick={stopRecording}
                >
                  <MicOff className="h-8 w-8" />
                </Button>
              )}

              {(phase === 'uploading' || isProcessing) && (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <Badge variant="outline" className="text-sm">
                    {phaseLabels[phase] || t('processing')}
                  </Badge>
                </div>
              )}

              {phase === 'completed' && !comparatifData && (
                <div className="flex flex-col items-center gap-3">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                  <p className="font-medium text-green-600">Devis créé avec succès !</p>
                  <Button onClick={reset}>{t('back')}</Button>
                </div>
              )}

              {phase === 'failed' && (
                <div className="flex flex-col items-center gap-3">
                  <AlertCircle className="h-12 w-12 text-destructive" />
                  <p className="text-sm text-destructive">{errorMsg}</p>
                  <Button onClick={reset}>{t('back')}</Button>
                </div>
              )}

              {!canRecord && phase === 'idle' && (
                <p className="text-sm text-muted-foreground">
                  {!selectedMetier ? '⬆️ Sélectionnez un métier ci-dessus' : !selectedClientId ? '⬆️ Sélectionnez un client (étape 3)' : ''}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Comparatif Table */}
        {comparatifData && (
          <Card>
            <CardHeader>
              <CardTitle>{t('comparatifTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">{t('designation')}</th>
                      <th className="text-center py-2 px-2">{t('quantity')}</th>
                      <th className="text-right py-2 px-2 text-green-600">{t('eco')}</th>
                      <th className="text-right py-2 px-2 text-blue-600">{t('standard')}</th>
                      <th className="text-right py-2 px-2 text-amber-600">{t('premiumLabel')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparatifData.lignes.map((ligne, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-2 pr-4">
                          <div className="font-medium">{ligne.nom}</div>
                        </td>
                        <td className="text-center py-2 px-2">{ligne.quantite}</td>
                        <td className="text-right py-2 px-2">
                          <div className="text-green-600">{formatPrice(ligne.eco.prix_ht * ligne.quantite)}</div>
                          <div className="text-xs text-muted-foreground">{ligne.eco.marque}</div>
                        </td>
                        <td className="text-right py-2 px-2">
                          <div className="text-blue-600">{formatPrice(ligne.standard.prix_ht * ligne.quantite)}</div>
                          <div className="text-xs text-muted-foreground">{ligne.standard.marque}</div>
                        </td>
                        <td className="text-right py-2 px-2">
                          <div className="text-amber-600">{formatPrice(ligne.premium.prix_ht * ligne.quantite)}</div>
                          <div className="text-xs text-muted-foreground">{ligne.premium.marque}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 font-semibold">
                      <td className="py-2 pr-4">{t('totalHT')}</td>
                      <td></td>
                      <td className="text-right py-2 px-2 text-green-600">{formatPrice(comparatifData.totaux.eco.total_ht)}</td>
                      <td className="text-right py-2 px-2 text-blue-600">{formatPrice(comparatifData.totaux.standard.total_ht)}</td>
                      <td className="text-right py-2 px-2 text-amber-600">{formatPrice(comparatifData.totaux.premium.total_ht)}</td>
                    </tr>
                    <tr className="font-semibold">
                      <td className="py-2 pr-4">{t('totalTTC')}</td>
                      <td></td>
                      <td className="text-right py-2 px-2 text-green-600">{formatPrice(comparatifData.totaux.eco.total_ttc)}</td>
                      <td className="text-right py-2 px-2 text-blue-600">{formatPrice(comparatifData.totaux.standard.total_ttc)}</td>
                      <td className="text-right py-2 px-2 text-amber-600">{formatPrice(comparatifData.totaux.premium.total_ttc)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex gap-3 mt-6 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast.success('Devis envoyé au client');
                  }}
                >
                  {t('sendToClient')}
                </Button>
                <Button onClick={() => setShowGammeChooser(true)}>
                  {t('signNow')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gamme Chooser Dialog */}
        {showGammeChooser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('chooseGamme')}</CardTitle>
                  <button type="button" onClick={() => setShowGammeChooser(false)}>
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleFinalizeGamme('eco')}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-green-500 bg-green-50 dark:bg-green-950 hover:shadow-md transition-all"
                  >
                    <span className="text-2xl">💰</span>
                    <span className="font-semibold text-sm">{t('eco')}</span>
                    {comparatifData && (
                      <span className="text-xs font-medium text-green-600">
                        {formatPrice(comparatifData.totaux.eco.total_ttc)}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFinalizeGamme('standard')}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-blue-500 bg-blue-50 dark:bg-blue-950 hover:shadow-md transition-all"
                  >
                    <span className="text-2xl">⚖️</span>
                    <span className="font-semibold text-sm">{t('standard')}</span>
                    {comparatifData && (
                      <span className="text-xs font-medium text-blue-600">
                        {formatPrice(comparatifData.totaux.standard.total_ttc)}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFinalizeGamme('premium')}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-amber-500 bg-amber-50 dark:bg-amber-950 hover:shadow-md transition-all"
                  >
                    <span className="text-2xl">✨</span>
                    <span className="font-semibold text-sm">{t('premiumLabel')}</span>
                    {comparatifData && (
                      <span className="text-xs font-medium text-amber-600">
                        {formatPrice(comparatifData.totaux.premium.total_ttc)}
                      </span>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Supplier List (after completion - normal mode) */}
        {fournisseurs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                {t('supplierList')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fournisseurs.map((group) => (
                  <div key={group.fournisseur} className="rounded-lg border p-4">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      {t('pickupAt')} <Badge variant="outline">{group.fournisseur}</Badge>
                    </h4>
                    <ul className="space-y-1">
                      {group.articles.map((article, i) => (
                        <li key={i} className="text-sm text-muted-foreground pl-4 border-l-2 border-muted">
                          {article}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ProtectedLayout>
  );
}
