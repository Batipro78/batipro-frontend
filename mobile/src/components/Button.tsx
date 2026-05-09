import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius, spacing, fontSize } from '@/lib/theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

interface Props {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  fullWidth,
  style,
}: Props) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? colors.primary : '#fff'} />
      ) : (
        <Text style={[styles.text, textStyles[variant]]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: { alignSelf: 'stretch' },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.85 },
  text: {
    fontSize: fontSize.base,
    fontWeight: '600',
  },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.muted },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: { backgroundColor: 'transparent' },
  destructive: { backgroundColor: colors.destructive },
});

const textStyles = StyleSheet.create({
  primary: { color: colors.primaryForeground },
  secondary: { color: colors.foreground },
  outline: { color: colors.foreground },
  ghost: { color: colors.foreground },
  destructive: { color: '#fff' },
});
