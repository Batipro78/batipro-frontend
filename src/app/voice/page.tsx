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
import { Mic, MicOff, Loader2, CheckCircle, AlertCircle, Zap, Wrench, ShoppingBag } from 'lucide-react';
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

type Phase = 'idle' | 'recording' | 'uploading' | 'queued' | 'transcription' | 'parsing' | 'matching' | 'creating_devis' | 'completed' | 'failed';
type Gamme = 'eco' | 'standard' | 'premium';
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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    api.get<{ data: { clients: Client[] } }>('/clients').then((res) => setClients(res.data?.clients || [])).catch(() => {});
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, []);

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
        await uploadAudio(audioBlob);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setPhase('recording');
      setErrorMsg('');
      setFournisseurs([]);
    } catch {
      toast.error('Impossible d\'accéder au microphone');
    }
  };

  const stopRecording = () => {
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

      const res = await api.upload<{ data: { logId: number } }>('/ia/devis-vocal', formData);
      const newLogId = res.data.logId;
      setPhase('queued');
      startPolling(newLogId);
    } catch (err) {
      setPhase('failed');
      setErrorMsg(err instanceof Error ? err.message : 'Erreur upload');
    }
  };

  const startPolling = (id: number) => {
    pollingRef.current = setInterval(async () => {
      try {
        const res = await api.get<{ data: { phase: Phase; errorMessage?: string; devisMetadata?: { fournisseurs_liste?: FournisseurGroup[] } } }>(`/ia/devis-vocal/${id}/status`);
        const { phase: newPhase, errorMessage, devisMetadata } = res.data;
        setPhase(newPhase);

        if (newPhase === 'completed') {
          clearInterval(pollingRef.current!);
          toast.success('Devis créé avec succès !');
          if (devisMetadata?.fournisseurs_liste) {
            setFournisseurs(devisMetadata.fournisseurs_liste);
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

  const reset = () => {
    setPhase('idle');
    setErrorMsg('');
    setFournisseurs([]);
    if (pollingRef.current) clearInterval(pollingRef.current);
  };

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
              <div className="grid grid-cols-3 gap-3">
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
                      {opt.value === 'premium' ? t('premiumLabel') : t(opt.value)}
                    </span>
                    <span className="text-xs text-muted-foreground text-center">
                      {t(`${opt.value}Desc` as 'ecoDesc' | 'standardDesc' | 'premiumDesc')}
                    </span>
                  </button>
                ))}
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
                  className="rounded-full h-20 w-20"
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

              {phase === 'completed' && (
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
                  {!selectedMetier ? t('selectTrade') : t('selectClient')}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Supplier List (after completion) */}
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
