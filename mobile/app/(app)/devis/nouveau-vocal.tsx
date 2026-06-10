import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
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
import { router } from 'expo-router';
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
    mode: string;
    devisId: number;
    linesAdded: number;
    totalHT: number;
    totalTTC: number;
    articlesNonTrouves?: string[];
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
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const loadClients = async () => {
    try {
      const res = await api.get<{ data: { data: Client[]; pagination?: unknown } }>('/clients');
      setClients(res.data?.data || []);
    } catch {
      // silencieux au chargement initial : retenté à l'ouverture du picker
    }
  };

  useEffect(() => {
    loadClients();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (recording) {
        recording.stopAndUnloadAsync().catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (step === 'recording') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [step, pulseAnim]);

  const selectedClient = clients.find((c) => c.id === clientId) ?? null;
  const selectedMetier = METIERS.find((m) => m.key === metier);
  const showGammes = selectedMetier?.hasGammes ?? false;

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
      };
      if (showGammes) {
        payload.gamme = gamme;
      }
      if (clientId) {
        payload.client_id = clientId;
      } else if (quickClientNom && quickClientTel) {
        payload.client_nom = quickClientNom.trim();
        payload.client_telephone = quickClientTel.trim();
      }

      const res = await api.post<VoiceGenerateResponse>('/voice/generate', payload);
      // Le backend renvoie data.devisId (pas data.devis.id) : l'ancien chemin
      // etait toujours undefined -> l'artisan retombait sur la liste au lieu
      // d'ouvrir son devis.
      const devisId = res.data?.devisId;
      const nonTrouves = res.data?.articlesNonTrouves ?? [];
      const goToDevis = () => {
        if (devisId) router.replace(`/devis/${devisId}`);
        else router.replace('/devis');
      };
      if (nonTrouves.length > 0) {
        Alert.alert(
          'Articles à chiffrer',
          `${nonTrouves.length} article(s) hors catalogue ajouté(s) à 0 € :\n\n• ${nonTrouves.join('\n• ')}\n\nPensez à mettre vos prix.`,
          [{ text: 'Voir le devis', onPress: goToDevis }],
          { cancelable: false }
        );
      } else {
        goToDevis();
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

  // Step indicator : config = 1, recording/transcribing = 2, review/generating = 3
  const currentStepNum =
    step === 'config' ? 1 : step === 'review' || step === 'generating' ? 3 : 2;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.headerBtn}
        >
          <Ionicons name="close" size={22} color={colors.foreground} />
        </Pressable>
        <Text style={styles.headerTitle}>Nouveau devis vocal</Text>
        <View style={styles.headerBtn} />
      </View>

      {/* Progress bar 3 étapes */}
      <View style={styles.progressWrap}>
        {[1, 2, 3].map((n) => (
          <View
            key={n}
            style={[
              styles.progressBar,
              n <= currentStepNum && styles.progressBarActive,
            ]}
          />
        ))}
      </View>

      {step === 'transcribing' || step === 'generating' ? (
        <View style={styles.fullCenter}>
          <View style={styles.loaderRing}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
          <Text style={styles.loadingText}>
            {step === 'transcribing'
              ? 'Transcription en cours...'
              : 'Génération du devis...'}
          </Text>
          <Text style={styles.loadingHint}>
            {step === 'transcribing'
              ? "L'IA convertit votre voix en texte."
              : "L'IA crée les lignes avec les bons prix."}
          </Text>
        </View>
      ) : null}

      {step === 'recording' ? (
        <View style={styles.fullCenter}>
          <Animated.View
            style={[
              styles.recordingPulse,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <View style={styles.recordingPulseInner}>
              <Ionicons name="mic" size={56} color="#fff" />
            </View>
          </Animated.View>
          <Text style={styles.timer}>{formatTime(recordingDuration)}</Text>
          <Text style={styles.recordingHint}>
            Décrivez les travaux. Soyez précis sur les quantités, surfaces et
            matériel.
          </Text>
          <View style={styles.recordingActions}>
            <Button title="Annuler" variant="outline" onPress={cancelRecording} />
            <Button title="Terminer" onPress={stopRecording} />
          </View>
        </View>
      ) : null}

      {step === 'config' ? (
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Section title="Client" icon="person-outline">
            <Pressable
              onPress={() => {
                if (clients.length === 0) loadClients();
                setClientPickerOpen(true);
              }}
              style={({ pressed }) => [
                styles.selectorRow,
                pressed && styles.pressedCard,
              ]}
            >
              <View style={styles.selectorIcon}>
                <Ionicons
                  name="person"
                  size={16}
                  color={selectedClient || quickClientNom ? colors.primary : colors.mutedForeground}
                />
              </View>
              <Text
                style={[
                  styles.selectorText,
                  !selectedClient && !quickClientNom && {
                    color: colors.mutedForeground,
                  },
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
              hitSlop={8}
            >
              <Ionicons name="add-circle" size={16} color={colors.primary} />
              <Text style={styles.linkText}>Création rapide (nom + tél.)</Text>
            </Pressable>
          </Section>

          <Section title="Métier" icon="briefcase-outline">
            <View style={styles.metierGrid}>
              {METIERS.map((m) => {
                const active = m.key === metier;
                return (
                  <Pressable
                    key={m.key}
                    onPress={() => setMetier(m.key)}
                    style={({ pressed }) => [
                      styles.metierCard,
                      active && styles.metierCardActive,
                      pressed && !active && styles.pressedCard,
                    ]}
                  >
                    <View
                      style={[
                        styles.metierIconWrap,
                        active && styles.metierIconWrapActive,
                      ]}
                    >
                      <Ionicons
                        name={m.icon}
                        size={20}
                        color={active ? '#fff' : colors.primary}
                      />
                    </View>
                    <Text
                      style={[
                        styles.metierLabel,
                        active && styles.metierLabelActive,
                      ]}
                      numberOfLines={1}
                    >
                      {m.label}
                    </Text>
                    {m.hasGammes ? (
                      <View style={styles.metierBadge}>
                        <Text style={styles.metierBadgeText}>3 gammes</Text>
                      </View>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </Section>

          {showGammes ? (
            <Section title="Gamme" icon="layers-outline">
              <View style={styles.gammeList}>
                {GAMMES.map((g) => {
                  const active = g.key === gamme;
                  return (
                    <Pressable
                      key={g.key}
                      onPress={() => setGamme(g.key)}
                      style={({ pressed }) => [
                        styles.gammeRow,
                        active && styles.gammeRowActive,
                        pressed && !active && styles.pressedCard,
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
                        <Text
                          style={[
                            styles.gammeLabel,
                            active && styles.gammeLabelActive,
                          ]}
                        >
                          {g.label}
                        </Text>
                        <Text style={styles.gammeDesc}>{g.description}</Text>
                      </View>
                      {active ? (
                        <Ionicons
                          name="checkmark-circle"
                          size={22}
                          color={colors.primary}
                        />
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>
            </Section>
          ) : null}

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
                pressed && { transform: [{ scale: 0.96 }] },
              ]}
            >
              <Ionicons name="mic" size={36} color="#fff" />
            </Pressable>
            <Text style={styles.recordCtaLabel}>Touchez pour enregistrer</Text>
            <Text style={styles.recordCtaHint}>
              Décrivez les travaux à voix haute
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
            showsVerticalScrollIndicator={false}
          >
            <Section title="Transcription" icon="document-text-outline">
              <Text style={styles.reviewHint}>
                Corrigez le texte si besoin avant de générer le devis.
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

            <Section title="Récapitulatif" icon="list-outline">
              <View style={styles.summaryCard}>
                <SummaryRow label="Client" value={clientLabel} />
                <SummaryRow label="Métier" value={selectedMetier?.label ?? metier} />
                {showGammes ? (
                  <SummaryRow
                    label="Gamme"
                    value={GAMMES.find((g) => g.key === gamme)?.label ?? gamme}
                    last
                  />
                ) : null}
              </View>
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
              style={{ position: 'absolute', left: spacing.lg + spacing.md, top: 15, zIndex: 1 }}
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
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
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

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleRow}>
        {icon ? (
          <Ionicons name={icon} size={14} color={colors.mutedForeground} />
        ) : null}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function SummaryRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.summaryRow, last && { borderBottomWidth: 0 }]}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: '#F8FAFC',
  },
  headerBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  headerTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.foreground,
  },
  progressWrap: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.xs + 2,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
  },
  progressBarActive: { backgroundColor: colors.primary },

  scroll: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
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
  loaderRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.foreground,
  },
  loadingHint: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    textAlign: 'center',
    maxWidth: 280,
  },

  recordingPulse: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(239, 68, 68, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingPulseInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.destructive,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.destructive,
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  timer: {
    fontSize: 52,
    fontWeight: '800',
    color: colors.foreground,
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  recordingHint: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
    maxWidth: 300,
  },
  recordingActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },

  section: { gap: spacing.sm },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.mutedForeground,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  selectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  selectorIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorText: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.foreground,
    fontWeight: '500',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  linkText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },

  metierGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metierCard: {
    width: '48%',
    flexGrow: 1,
    minWidth: 0,
    backgroundColor: '#fff',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#EEF2F7',
    gap: spacing.sm,
    position: 'relative',
  },
  metierCardActive: {
    borderColor: colors.primary,
    backgroundColor: '#F5F3FF',
  },
  metierIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metierIconWrapActive: {
    backgroundColor: colors.primary,
  },
  metierLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.foreground,
  },
  metierLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  metierBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  metierBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#92400E',
    letterSpacing: 0.3,
  },

  gammeList: { gap: spacing.sm },
  gammeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: '#fff',
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: '#EEF2F7',
  },
  gammeRowActive: {
    borderColor: colors.primary,
    backgroundColor: '#F5F3FF',
  },
  gammeRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
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
    fontWeight: '600',
    color: colors.foreground,
  },
  gammeLabelActive: { color: colors.primary },
  gammeDesc: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    marginTop: 2,
  },

  pressedCard: {
    opacity: 0.8,
  },

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
    marginTop: spacing.sm,
  },
  recordButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  recordCtaLabel: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.foreground,
    marginTop: spacing.xs,
  },
  recordCtaHint: { fontSize: fontSize.sm, color: colors.mutedForeground },

  transcriptInput: {
    minHeight: 180,
    backgroundColor: '#fff',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#EEF2F7',
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

  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    overflow: 'hidden',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  summaryLabel: { fontSize: fontSize.sm, color: colors.mutedForeground },
  summaryValue: {
    fontSize: fontSize.sm,
    color: colors.foreground,
    fontWeight: '600',
    maxWidth: '70%',
  },

  modalSafe: { flex: 1, backgroundColor: '#fff' },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  modalCancel: { fontSize: fontSize.base, color: colors.mutedForeground },
  modalSave: { fontSize: fontSize.base, fontWeight: '700', color: colors.primary },
  modalTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.foreground,
  },
  modalSearchWrap: { padding: spacing.lg, paddingBottom: spacing.sm },
  modalSearch: {
    height: 48,
    paddingLeft: spacing.xl + spacing.sm,
    paddingRight: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    backgroundColor: '#F8FAFC',
    color: colors.foreground,
    fontSize: fontSize.base,
  },
  clientPickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  clientPickerName: {
    fontSize: fontSize.base,
    fontWeight: '600',
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
