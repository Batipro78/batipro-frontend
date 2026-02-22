'use client';

import { useState, useRef, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import { api } from '@/lib/api';
import { Mic, MicOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Client {
  id: number;
  nom: string;
  prenom?: string;
}

type Phase = 'idle' | 'recording' | 'uploading' | 'queued' | 'transcription' | 'parsing' | 'matching' | 'creating_devis' | 'completed' | 'failed';

export default function VoicePage() {
  const { t } = useI18n();
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [logId, setLogId] = useState<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    api.get<{ data: Client[] }>('/clients').then((res) => setClients(res.data || [])).catch(() => {});
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

      const res = await api.upload<{ data: { logId: number } }>('/ia/devis-vocal', formData);
      const newLogId = res.data.logId;
      setLogId(newLogId);
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
        const res = await api.get<{ data: { phase: Phase; errorMessage?: string } }>(`/ia/devis-vocal/${id}/status`);
        const { phase: newPhase, errorMessage } = res.data;
        setPhase(newPhase);

        if (newPhase === 'completed') {
          clearInterval(pollingRef.current!);
          toast.success('Devis créé avec succès !');
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
    setLogId(null);
    setErrorMsg('');
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

  return (
    <div>
      <PageHeader title={t('voiceTitle')} description={t('voiceSubtitle')} />

      <div className="max-w-xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. {t('selectClient')}</CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle>2. Enregistrement vocal</CardTitle>
            <CardDescription>
              Décrivez les matériaux et travaux nécessaires
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {phase === 'idle' && (
              <Button
                size="lg"
                className="rounded-full h-20 w-20"
                disabled={!selectedClientId}
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

            {!selectedClientId && phase === 'idle' && (
              <p className="text-sm text-muted-foreground">{t('selectClient')}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
