import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { api } from '@/lib/api';
import { GAMMES, Gamme, METIERS, MetierKey } from '@/lib/metiers';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

type Step = 'config' | 'recording' | 'transcribing' | 'review' | 'generating';

interface Client {
  id: number;
  nom: string;
  telephone: string;
  ville?: string | null;
}

interface VoiceGenerateResponse {
  data: {
    devis: {
      id: number;
      numero: string;
    };
  };
}

const formatTime = (ms: number) => {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function NouveauVocalScreen() {
  const [step, setStep] = useState<Step>('config');

  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState<number | null>(null);
  const [clientPickerOpen, setClientPickerOpen] = useState(false);
  const [clientSearch, setClientSearch] = useState('');

  const [quickClientOpen, setQuickClientOpen] = useState(false);
  const [quickClientNom, setQuickClientNom] = useState('');
  const [quickClientTel, setQuickClientTel] = useState('');

  const [metier, setMetier] = useState<MetierKey>('electricien');
  const [gamme, setGamme] = useState<Gamme>('standard');

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioUri, setAudioUri] = useState<string | null>(null);

  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<{ data: Client[] }>('/clients');
        setClients(res.data || []);
      } catch {
        // silencieux : sera retenté à l'ouverture du picker
      }
    })();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (recording) {
        recording.stopAndUnloadAsync().catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedClient = clients.find((c) => c.id === clientId) ?? null;
  const selectedMetier = METIERS.find((m) => m.key === metier);

  const startRecording = async () => {
    setError(null);
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        setError(
          "MonDevisMinute a besoin du microphone. Activez-le dans les réglages."
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: rec } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(rec);
      setRecordingDuration(0);
      setStep('recording');

      intervalRef.current = setInterval(() => {
        setRecordingDuration((d) => d + 1000);
      }, 1000);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Impossible de démarrer l'enregistrement"
      );
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);

      if (!uri) {
        setError('Enregistrement vide');
        setStep('config');
        return;
      }

      setStep('transcribing');

      const formData = new FormData();
      formData.append('audio', {
        uri,
        name: 'recording.m4a',
        type: Platform.OS === 'ios' ? 'audio/m4a' : 'audio/mp4',
      } as unknown as Blob);

      const res = await api.upload<{ data: { text: string } }>(
        '/voice/transcribe',
        formData
      );
      const text = res.data?.text ?? '';
      if (!text.trim()) {
        setError("La transcription est vide. Réessayez en parlant plus fort.");
        setStep('config');
        return;
      }
      setTranscript(text);
      setStep('review');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de transcription');
      setStep('config');
    }
  };

  const cancelRecording = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
      } catch {
        /* noop */
      }
    }
    setRecording(null);
    setRecordingDuration(0);
    setAudioUri(null);
    setStep('config');
  };

  const generate = async () => {
    if (!transcript.trim()) {
      setError('Le texte du devis est vide.');
      return;
    }
    setError(null);
    setStep('generating');
    try {
      const payload: Record<string, unknown> = {
        text: transcript.trim(),
        metier,
        gamme,
      };
      if (clientId) {
        payload.client_id = clientId;
      } else if (quickClientNom && quickClientTel) {
        payload.client_nom = quickClientNom.trim();
        payload.client_telephone = quickClientTel.trim();
      }

      const res = await api.post<VoiceGenerateResponse>('/voice/generate', payload);
      const devisId = res.data?.devis?.id;
      if (devisId) {
        router.replace(`/devis/${devisId}`);
      } else {
        router.replace('/devis');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de la génération');
      setStep('review');
    }
  };

  const filteredClients = clients.filter((c) => {
    const q = clientSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      c.nom?.toLowerCase().includes(q) ||
      c.telephone?.toLowerCase().includes(q) ||
      c.ville?.toLowerCase().includes(q)
    );
  });

  const onPickClient = (c: Client) => {
    setClientId(c.id);
    setQuickClientNom('');
    setQuickClientTel('');
    setClientPickerOpen(false);
    setClientSearch('');
  };

  const onQuickClient = () => {
    if (!quickClientNom.trim() || !quickClientTel.trim()) {
      Alert.alert('Champs requis', 'Nom et téléphone sont obligatoires.');
      return;
    }
    setClientId(null);
    setQuickClientOpen(false);
  };

  const clientLabel = selectedClient
    ? selectedClient.nom
    : quickClientNom && quickClientTel
      ? `${quickClientNom} (création rapide)`
      : 'Sélectionner un client';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={colors.foreground} />
        </Pressable>
        <Text style={styles.headerTitle}>Devis vocal</Text>
        <View style={{ width: 24 }} />
      </View>

      {step === 'transcribing' || step === 'generating' ? (
        <View style={styles.fullCenter}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>
            {step === 'transcribing'
              ? 'Transcription en cours...'
              : 'Génération du devis...'}
          </Text>
          <Text style={styles.loadingHint}>
            {step === 'transcribing'
              ? 'L\'IA convertit votre voix en texte.'
              : 'L\'IA crée les lignes du devis avec les prix.'}
          </Text>
        </View>
      ) : null}

      {step === 'recording' ? (
        <View style={styles.fullCenter}>
          <View style={styles.recordingPulse}>
            <Ionicons name="mic" size={48} color="#fff" />
          </View>
          <Text style={styles.timer}>{formatTime(recordingDuration)}</Text>
          <Text style={styles.recordingHint}>
            Décrivez les travaux. Soyez précis sur les quantités, les surfaces, le
            type de matériel.
          </Text>
          <View style={styles.recordingActions}>
            <Button
              title="Annuler"
              variant="outline"
              onPress={cancelRecording}
            />
            <Button title="Terminer" onPress={stopRecording} />
          </View>
        </View>
      ) : null}

      {step === 'config' ? (
        <ScrollView contentContainerStyle={styles.scroll}>
          <Section title="Client">
            <Pressable
              onPress={() => setClientPickerOpen(true)}
              style={styles.selectorRow}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color={colors.mutedForeground}
              />
              <Text
                style={[
                  styles.selectorText,
                  !selectedClient && !quickClientNom && { color: colors.mutedForeground },
                ]}
                numberOfLines={1}
              >
                {clientLabel}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.mutedForeground}
              />
            </Pressable>
            <Pressable
              onPress={() => setQuickClientOpen(true)}
              style={styles.linkRow}
            >
              <Ionicons name="add-circle-outline" size={16} color={colors.primary} />
              <Text style={styles.linkText}>Création rapide (nom + téléphone)</Text>
            </Pressable>
          </Section>

          <Section title="Métier">
            <View style={styles.metierGrid}>
              {METIERS.map((m) => {
                const active = m.key === metier;
                return (
                  <Pressable
                    key={m.key}
                    onPress={() => setMetier(m.key)}
                    style={[styles.metierChip, active && styles.metierChipActive]}
                  >
                    <Ionicons
                      name={m.icon}
                      size={18}
                      color={active ? '#fff' : colors.foreground}
                    />
                    <Text
                      style={[
                        styles.metierChipText,
                        active && styles.metierChipTextActive,
                      ]}
                    >
                      {m.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Section>

          <Section title="Gamme">
            <View style={styles.gammeList}>
              {GAMMES.map((g) => {
                const active = g.key === gamme;
                const disabled = !selectedMetier?.hasGammes && g.key === 'comparatif';
                return (
                  <Pressable
                    key={g.key}
                    onPress={() => !disabled && setGamme(g.key)}
                    style={[
                      styles.gammeRow,
                      active && styles.gammeRowActive,
                      disabled && { opacity: 0.4 },
                    ]}
                  >
                    <View
                      style={[
                        styles.gammeRadio,
                        active && styles.gammeRadioActive,
                      ]}
                    >
                      {active ? <View style={styles.gammeRadioDot} /> : null}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.gammeLabel}>{g.label}</Text>
                      <Text style={styles.gammeDesc}>
                        {disabled
                          ? 'Non disponible pour ce métier'
                          : g.description}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </Section>

          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color={colors.destructive} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.recordCta}>
            <Pressable
              onPress={startRecording}
              style={({ pressed }) => [
                styles.recordButton,
                pressed && { transform: [{ scale: 0.98 }] },
              ]}
            >
              <Ionicons name="mic" size={32} color="#fff" />
            </Pressable>
            <Text style={styles.recordCtaLabel}>Toucher pour enregistrer</Text>
            <Text style={styles.recordCtaHint}>
              Décrivez les travaux à l'oral
            </Text>
          </View>
        </ScrollView>
      ) : null}

      {step === 'review' ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            <Section title="Transcription">
              <Text style={styles.reviewHint}>
                Vous pouvez corriger le texte avant de générer le devis.
              </Text>
              <TextInput
                value={transcript}
                onChangeText={setTranscript}
                multiline
                style={styles.transcriptInput}
                placeholder="Texte transcrit..."
                placeholderTextColor={colors.mutedForeground}
              />
            </Section>

            <Section title="Récapitulatif">
              <SummaryRow label="Client" value={clientLabel} />
              <SummaryRow label="Métier" value={selectedMetier?.label ?? metier} />
              <SummaryRow
                label="Gamme"
                value={GAMMES.find((g) => g.key === gamme)?.label ?? gamme}
              />
            </Section>

            {error ? (
              <View style={styles.errorBox}>
                <Ionicons
                  name="alert-circle"
                  size={16}
                  color={colors.destructive}
                />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.reviewActions}>
              <Button
                title="Recommencer"
                variant="outline"
                onPress={() => {
                  setTranscript('');
                  setAudioUri(null);
                  setStep('config');
                }}
              />
              <Button title="Générer le devis" onPress={generate} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : null}

      <Modal
        visible={clientPickerOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setClientPickerOpen(false)}
      >
        <SafeAreaView style={styles.modalSafe} edges={['top', 'bottom']}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setClientPickerOpen(false)}>
              <Text style={styles.modalCancel}>Fermer</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Choisir un client</Text>
            <View style={{ width: 50 }} />
          </View>
          <View style={styles.modalSearchWrap}>
            <Ionicons
              name="search-outline"
              size={18}
              color={colors.mutedForeground}
              style={{ position: 'absolute', left: spacing.md, top: 15, zIndex: 1 }}
            />
            <TextInput
              value={clientSearch}
              onChangeText={setClientSearch}
              placeholder="Rechercher un client"
              placeholderTextColor={colors.mutedForeground}
              style={styles.modalSearch}
            />
          </View>
          <FlatList
            data={filteredClients}
            keyExtractor={(c) => String(c.id)}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.clientPickerRow,
                  pressed && { backgroundColor: colors.muted },
                ]}
                onPress={() => onPickClient(item)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.clientPickerName}>{item.nom}</Text>
                  <Text style={styles.clientPickerSub}>
                    {item.telephone}
                    {item.ville ? ` · ${item.ville}` : ''}
                  </Text>
                </View>
                {clientId === item.id ? (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={colors.primary}
                  />
                ) : null}
              </Pressable>
            )}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyText}>Aucun client</Text>
              </View>
            }
          />
        </SafeAreaView>
      </Modal>

      <Modal
        visible={quickClientOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setQuickClientOpen(false)}
      >
        <SafeAreaView style={styles.modalSafe} edges={['top', 'bottom']}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setQuickClientOpen(false)}>
                <Text style={styles.modalCancel}>Annuler</Text>
              </Pressable>
              <Text style={styles.modalTitle}>Création rapide</Text>
              <Pressable onPress={onQuickClient}>
                <Text style={styles.modalSave}>OK</Text>
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}>
              <Text style={styles.reviewHint}>
                Le client sera créé automatiquement avec le devis. Vous pourrez
                compléter ses informations plus tard.
              </Text>
              <Input
                label="Nom *"
                value={quickClientNom}
                onChangeText={setQuickClientNom}
                placeholder="M. Dupont"
                autoCapitalize="words"
              />
              <Input
                label="Téléphone *"
                value={quickClientTel}
                onChangeText={setQuickClientTel}
                placeholder="06 12 34 56 78"
                keyboardType="phone-pad"
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.muted },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.foreground,
  },
  scroll: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl * 2,
  },
  fullCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.lg,
  },
  loadingText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.foreground,
  },
  loadingHint: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    textAlign: 'center',
  },
  recordingPulse: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.destructive,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.destructive,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  timer: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.foreground,
    fontVariant: ['tabular-nums'],
  },
  recordingHint: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  recordingActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  section: { gap: spacing.sm },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.mutedForeground,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  selectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectorText: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: spacing.xs,
  },
  linkText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
  },
  metierGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metierChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  metierChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  metierChipText: { fontSize: fontSize.sm, color: colors.foreground },
  metierChipTextActive: { color: '#fff', fontWeight: '600' },
  gammeList: { gap: spacing.sm },
  gammeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  gammeRowActive: { borderColor: colors.primary },
  gammeRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gammeRadioActive: { borderColor: colors.primary },
  gammeRadioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  gammeLabel: {
    fontSize: fontSize.base,
    fontWeight: '500',
    color: colors.foreground,
  },
  gammeDesc: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#FEE2E2',
    padding: spacing.md,
    borderRadius: radius.md,
  },
  errorText: { color: colors.destructive, fontSize: fontSize.sm, flex: 1 },
  recordCta: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  recordButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  recordCtaLabel: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  recordCtaHint: { fontSize: fontSize.sm, color: colors.mutedForeground },
  transcriptInput: {
    minHeight: 160,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    color: colors.foreground,
    fontSize: fontSize.base,
    lineHeight: 22,
    textAlignVertical: 'top',
  },
  reviewHint: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginBottom: spacing.xs,
  },
  reviewActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryLabel: { fontSize: fontSize.sm, color: colors.mutedForeground },
  summaryValue: {
    fontSize: fontSize.sm,
    color: colors.foreground,
    fontWeight: '500',
    maxWidth: '70%',
  },
  modalSafe: { flex: 1, backgroundColor: colors.background },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalCancel: { fontSize: fontSize.base, color: colors.mutedForeground },
  modalSave: { fontSize: fontSize.base, fontWeight: '600', color: colors.primary },
  modalTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  modalSearchWrap: { padding: spacing.lg, paddingBottom: spacing.sm },
  modalSearch: {
    height: 48,
    paddingLeft: spacing.xl + spacing.sm,
    paddingRight: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    color: colors.foreground,
    fontSize: fontSize.base,
  },
  clientPickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  clientPickerName: {
    fontSize: fontSize.base,
    fontWeight: '500',
    color: colors.foreground,
  },
  clientPickerSub: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: { color: colors.mutedForeground, fontSize: fontSize.sm },
});
