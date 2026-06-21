import { forwardRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, fontSize } from '@/lib/theme';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = forwardRef<TextInput, Props>(function Input(
  { label, error, style, secureTextEntry, ...rest },
  ref
) {
  // Champ mot de passe : on ajoute un bouton oeil pour afficher/masquer ce qui
  // est tape (utile au mobile ou les caracteres masques sont difficiles a
  // verifier). Le composant gere son propre etat -> tous les ecrans qui passent
  // `secureTextEntry` en profitent sans rien changer.
  const isPassword = !!secureTextEntry;
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.field}>
        <TextInput
          ref={ref}
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry={isPassword && !visible}
          style={[
            styles.input,
            isPassword && styles.inputWithIcon,
            error && styles.inputError,
            style,
          ]}
          {...rest}
        />
        {isPassword && (
          <Pressable
            onPress={() => setVisible((v) => !v)}
            style={styles.toggle}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={
              visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
            }
          >
            <Ionicons
              name={visible ? 'eye-off' : 'eye'}
              size={22}
              color={colors.foreground}
            />
          </Pressable>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: { gap: spacing.xs },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.foreground,
  },
  field: { justifyContent: 'center' },
  input: {
    height: 48,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    color: colors.foreground,
    fontSize: fontSize.base,
  },
  inputWithIcon: { paddingRight: 48 },
  inputError: { borderColor: colors.destructive },
  toggle: {
    position: 'absolute',
    right: spacing.sm,
    height: 48,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: { color: colors.destructive, fontSize: fontSize.xs },
});
