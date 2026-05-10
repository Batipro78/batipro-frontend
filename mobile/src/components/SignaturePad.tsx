import { useRef } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Signature, { SignatureViewRef } from 'react-native-signature-canvas';
import { colors, fontSize, spacing } from '@/lib/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSign: (base64DataUrl: string) => void;
  title?: string;
}

const WEB_STYLE = `
  .m-signature-pad {
    box-shadow: none;
    border: none;
    margin: 0;
    height: 100%;
  }
  .m-signature-pad--body {
    border: none;
  }
  .m-signature-pad--body canvas {
    background-color: #F8FAFC;
  }
  .m-signature-pad--footer { display: none; }
  body, html { background-color: #F8FAFC; height: 100%; }
`;

export function SignaturePad({
  visible,
  onClose,
  onSign,
  title = 'Signature client',
}: Props) {
  const ref = useRef<SignatureViewRef>(null);

  const handleOK = (signature: string) => {
    onSign(signature);
  };

  const handleEmpty = () => {
    Alert.alert('Signature vide', 'Veuillez signer dans la zone prévue.');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Pressable onPress={onClose} hitSlop={12}>
            <Text style={styles.cancel}>Annuler</Text>
          </Pressable>
          <Text style={styles.title}>{title}</Text>
          <View style={{ width: 50 }} />
        </View>

        <View style={styles.hintWrap}>
          <Ionicons
            name="finger-print-outline"
            size={18}
            color={colors.mutedForeground}
          />
          <Text style={styles.hint}>
            Faites signer le client avec son doigt dans la zone ci-dessous.
          </Text>
        </View>

        <View style={styles.canvasWrap}>
          <Signature
            ref={ref}
            onOK={handleOK}
            onEmpty={handleEmpty}
            webStyle={WEB_STYLE}
            descriptionText=""
            imageType="image/png"
            backgroundColor="#F8FAFC"
            penColor="#0F172A"
            autoClear={false}
          />
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => ref.current?.clearSignature()}
            style={({ pressed }) => [
              styles.btnSecondary,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Ionicons name="refresh" size={18} color={colors.foreground} />
            <Text style={styles.btnSecondaryText}>Effacer</Text>
          </Pressable>
          <Pressable
            onPress={() => ref.current?.readSignature()}
            style={({ pressed }) => [styles.btnPrimary, pressed && { opacity: 0.9 }]}
          >
            <Text style={styles.btnPrimaryText}>Valider la signature</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  cancel: { fontSize: fontSize.base, color: colors.mutedForeground },
  title: { fontSize: fontSize.base, fontWeight: '600', color: colors.foreground },
  hintWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  hint: { fontSize: fontSize.sm, color: colors.mutedForeground, flex: 1 },
  canvasWrap: {
    flex: 1,
    margin: spacing.lg,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#F8FAFC',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    paddingTop: 0,
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnSecondaryText: { fontSize: fontSize.base, color: colors.foreground, fontWeight: '500' },
  btnPrimary: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: { fontSize: fontSize.base, color: '#fff', fontWeight: '600' },
});
