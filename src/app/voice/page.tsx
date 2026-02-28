'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { ProtectedLayout } from '@/components/protected-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { Mic, MicOff, Loader2, CheckCircle, AlertCircle, Zap, Wrench, ShoppingBag, X, FileEdit, Plus } from 'lucide-react';
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

type Phase = 'idle' | 'recording' | 'transcribing' | 'editing' | 'generating' | 'completed' | 'failed';
type Gamme = 'eco' | 'standard' | 'premium' | 'comparatif';
type Metier = 'electricien' | 'plombier';

function VoicePageContent() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [newClientNom, setNewClientNom] = useState('');
  const [newClientTelephone, setNewClientTelephone] = useState('');
  const [selectedMetier, setSelectedMetier] = useState<Metier | ''>('');
  const [selectedGamme, setSelectedGamme] = useState<Gamme>('standard');
  const [phase, setPhase] = useState<Phase>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fournisseurs, setFournisseurs] = useState<FournisseurGroup[]>([]);
  const [comparatifData, setComparatifData] = useState<ComparatifData | null>(null);
  const [showGammeChooser, setShowGammeChooser] = useState(false);
  const [createdDevisId, setCreatedDevisId] = useState<number | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [avenantDevisId, setAvenantDevisId] = useState<number | null>(null);
  const [avenantResult, setAvenantResult] = useState<{ linesAdded: number; totalHT: number; totalTTC: number } | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recordingStartRef = useRef<number>(0);

  // Detect avenant mode from URL
  useEffect(() => {
    const id = searchParams.get('devis_id');
    if (id) setAvenantDevisId(parseInt(id, 10));
  }, [searchParams]);

  useEffect(() => {
    api.get<{ data: { data: Client[]; pagination: unknown } }>('/clients')
      .then((res) => {
        setClients(res.data?.data || []);
      })
      .catch(() => {});
  }, []);

  const isAvenantMode = avenantDevisId !== null;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        if (audioBlob.size < 10000) {
          toast.error('Audio trop court ou vide — veuillez reessayer en parlant plus longtemps');
          setPhase('idle');
          return;
        }
        await handleTranscribe(audioBlob);
      };

      mediaRecorder.start(500);
      mediaRecorderRef.current = mediaRecorder;
      recordingStartRef.current = Date.now();
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(Math.floor((Date.now() - recordingStartRef.current) / 1000));
      }, 500);
      setPhase('recording');
      setErrorMsg('');
      setFournisseurs([]);
      setComparatifData(null);
      setTranscript('');
      setAvenantResult(null);
    } catch {
      toast.error("Impossible d'acceder au microphone");
    }
  };

  const stopRecording = () => {
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    const duration = Date.now() - recordingStartRef.current;
    if (duration < 2000) {
      toast.warning('Enregistrement trop court — parlez au moins 2 secondes');
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(Math.floor((Date.now() - recordingStartRef.current) / 1000));
      }, 500);
      return;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setPhase('transcribing');
      setRecordingSeconds(0);
    }
  };

  /**
   * Step 1: Upload audio → /voice/transcribe → get text
   */
  const handleTranscribe = async (blob: Blob) => {
    try {
      setPhase('transcribing');
      const formData = new FormData();
      formData.append('audio', blob, 'recording.webm');

      const res = await api.upload<{ data: { text: string } }>('/voice/transcribe', formData);
      const text = res.data?.text || '';

      if (!text || text.trim().length < 3) {
        toast.error('Transcription vide — veuillez reessayer');
        setPhase('idle');
        return;
      }

      setTranscript(text);
      setPhase('editing');
      toast.success('Transcription terminee — verifiez le texte');
    } catch (err) {
      setPhase('failed');
      setErrorMsg(err instanceof Error ? err.message : 'Erreur transcription');
    }
  };

  /**
   * Step 2: Send edited text → /voice/generate → create/update devis
   */
  const handleGenerateLines = async () => {
    if (!transcript.trim()) {
      toast.error('Le texte ne peut pas etre vide');
      return;
    }

    try {
      setPhase('generating');

      const payload: Record<string, unknown> = {
        text: transcript.trim(),
        metier: selectedMetier,
        gamme: selectedGamme,
      };

      if (isAvenantMode) {
        payload.devis_id = avenantDevisId;
      } else {
        payload.client_id = selectedClientId === 'new' ? 0 : parseInt(selectedClientId, 10);
        if (selectedClientId === 'new') {
          if (newClientNom) payload.client_nom = newClientNom;
          if (newClientTelephone) payload.client_telephone = newClientTelephone;
        }
      }

      const res = await api.post<{
        data: {
          mode: 'new' | 'avenant';
          devisId: number;
          linesAdded: number;
          totalHT: number;
          totalTTC: number;
          fournisseurs?: FournisseurGroup[];
          comparaison?: { lignes: ComparatifLigne[]; totaux: ComparatifTotaux };
        };
      }>('/voice/generate', payload);

      const result = res.data;

      if (result.mode === 'avenant') {
        setAvenantResult({ linesAdded: result.linesAdded, totalHT: result.totalHT, totalTTC: result.totalTTC });
        setPhase('completed');
        toast.success(`${result.linesAdded} ligne(s) ajoutee(s) au devis !`);
      } else if (result.comparaison) {
        // Comparatif mode
        setComparatifData({
          lignes: result.comparaison.lignes,
          totaux: result.comparaison.totaux,
          devisId: result.devisId,
        });
        setCreatedDevisId(result.devisId);
        setPhase('completed');
        toast.success('Comparatif pret !');
      } else {
        // Normal mode
        setCreatedDevisId(result.devisId);
        if (result.fournisseurs) setFournisseurs(result.fournisseurs);
        setPhase('completed');
        toast.success('Devis cree avec succes !');
      }
    } catch (err) {
      setPhase('failed');
      setErrorMsg(err instanceof Error ? err.message : 'Erreur generation');
    }
  };

  const handleFinalizeGamme = async (gammeChoisie: 'eco' | 'standard' | 'premium') => {
    if (!comparatifData) return;
    try {
      await api.put(`/ia/devis-vocal/${comparatifData.devisId}/finaliser-gamme`, { gamme: gammeChoisie });
      toast.success(`Devis finalise en gamme ${gammeChoisie}`);
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
    setCreatedDevisId(null);
    setShowGammeChooser(false);
    setTranscript('');
    setAvenantResult(null);
  };

  const formatPrice = (price: number) => price.toFixed(2).replace('.', ',') + ' \u20ac';

  const canRecord = selectedMetier !== ''
    && (isAvenantMode || (selectedClientId !== '' && (selectedClientId !== 'new' || newClientNom.trim() !== '')))
    && phase === 'idle';

  const gammeOptions: { value: Gamme; icon: string; color: string }[] = [
    { value: 'eco', icon: '\ud83d\udcb0', color: 'border-green-500 bg-green-50 dark:bg-green-950' },
    { value: 'standard', icon: '\u2696\ufe0f', color: 'border-blue-500 bg-blue-50 dark:bg-blue-950' },
    { value: 'premium', icon: '\u2728', color: 'border-amber-500 bg-amber-50 dark:bg-amber-950' },
  ];

  return (
    <ProtectedLayout>
      <PageHeader
        title={isAvenantMode ? `Ajout de travaux — Devis #${avenantDevisId}` : t('voiceTitle')}
        description={isAvenantMode ? 'Dictez les travaux supplementaires a ajouter au devis existant' : t('voiceSubtitle')}
      />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Avenant Mode Banner */}
        {isAvenantMode && (
          <Card className="border-2 border-purple-500 bg-purple-50 dark:bg-purple-950">
            <CardContent className="flex items-center gap-3 py-4">
              <Plus className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-semibold text-purple-700 dark:text-purple-300">Mode Avenant</p>
                <p className="text-sm text-purple-600 dark:text-purple-400">Les lignes seront ajoutees au devis #{avenantDevisId}. Les totaux seront recalcules automatiquement.</p>
              </div>
            </CardContent>
          </Card>
        )}

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

        {/* Step 2: Select Gamme — hidden in avenant mode */}
        {selectedMetier && !isAvenantMode && (
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
                {/* Carte Comparatif */}
                <button
                  type="button"
                  onClick={() => setSelectedGamme('comparatif')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    selectedGamme === 'comparatif'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950 shadow-md'
                      : 'border-muted hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl">{'\ud83d\udcca'}</span>
                  <span className="font-semibold text-sm">{t('comparatif')}</span>
                  <span className="text-xs text-muted-foreground text-center">{t('comparatifDesc')}</span>
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Select Client — hidden in avenant mode */}
        {selectedMetier && !isAvenantMode && (
          <Card>
            <CardHeader>
              <CardTitle>{isAvenantMode ? '' : `3. ${t('selectClient')}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedClientId} onValueChange={(val) => { setSelectedClientId(val); if (val !== 'new') { setNewClientNom(''); setNewClientTelephone(''); } }}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectClient')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">+ Nouveau client</SelectItem>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.nom} {c.prenom || ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedClientId === 'new' && (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Nom du client *</label>
                    <input
                      type="text"
                      value={newClientNom}
                      onChange={(e) => setNewClientNom(e.target.value)}
                      placeholder="Ex: M. Dupont"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Telephone (optionnel)</label>
                    <input
                      type="tel"
                      value={newClientTelephone}
                      onChange={(e) => setNewClientTelephone(e.target.value)}
                      placeholder="Ex: 06 12 34 56 78"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 4 (or 2 in avenant): Recording */}
        {selectedMetier && (
          <Card>
            <CardHeader>
              <CardTitle>{isAvenantMode ? '2' : '4'}. Enregistrement vocal</CardTitle>
              <CardDescription>
                {isAvenantMode ? 'Decrivez les travaux supplementaires' : 'Decrivez les materiaux et travaux necessaires'}
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
                <div className="flex flex-col items-center gap-2">
                  <Button
                    size="lg"
                    variant="destructive"
                    className="rounded-full h-20 w-20 animate-pulse"
                    onClick={stopRecording}
                  >
                    <MicOff className="h-8 w-8" />
                  </Button>
                  <span className="text-sm font-mono text-red-500 font-semibold">
                    {recordingSeconds}s {recordingSeconds < 2 && '(min 2s)'}
                  </span>
                </div>
              )}

              {phase === 'transcribing' && (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <Badge variant="outline" className="text-sm">Transcription en cours...</Badge>
                </div>
              )}

              {phase === 'generating' && (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <Badge variant="outline" className="text-sm">Generation du devis...</Badge>
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
                  {!selectedMetier
                    ? '\u2b06\ufe0f Selectionnez un metier ci-dessus'
                    : !isAvenantMode && !selectedClientId
                      ? '\u2b06\ufe0f Selectionnez un client'
                      : ''}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 5 (or 3 in avenant): Transcript Editing */}
        {phase === 'editing' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileEdit className="h-5 w-5" />
                {isAvenantMode ? '3' : '5'}. Verifiez et corrigez le texte
              </CardTitle>
              <CardDescription>
                Corrigez les erreurs de transcription avant de generer les lignes de devis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                rows={6}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Texte transcrit..."
              />
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={reset}>
                  Annuler
                </Button>
                <Button onClick={handleGenerateLines} disabled={!transcript.trim()}>
                  Generer les lignes de devis
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Completed: Avenant result */}
        {phase === 'completed' && avenantResult && (
          <Card className="border-2 border-green-500">
            <CardContent className="flex flex-col items-center gap-4 py-6">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <div className="text-center">
                <p className="font-medium text-green-600 text-lg">{avenantResult.linesAdded} ligne(s) ajoutee(s) au devis</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Nouveau total : {formatPrice(avenantResult.totalHT)} HT / {formatPrice(avenantResult.totalTTC)} TTC
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => router.push('/devis')}>Voir mes devis</Button>
                <Button variant="outline" onClick={reset}>Ajouter encore</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Completed: Normal mode */}
        {phase === 'completed' && !comparatifData && !avenantResult && (
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-6">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <p className="font-medium text-green-600 text-lg">Devis cree avec succes !</p>
              <div className="flex gap-3">
                <Link href="/devis">
                  <Button>{createdDevisId ? 'Voir le devis' : 'Voir mes devis'}</Button>
                </Link>
                <Button variant="outline" onClick={reset}>Nouveau devis vocal</Button>
              </div>
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
                    toast.success('Devis envoye au client');
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
                    <span className="text-2xl">{'\ud83d\udcb0'}</span>
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
                    <span className="text-2xl">{'\u2696\ufe0f'}</span>
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
                    <span className="text-2xl">{'\u2728'}</span>
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

export default function VoicePage() {
  return (
    <Suspense>
      <VoicePageContent />
    </Suspense>
  );
}
