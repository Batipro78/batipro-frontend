import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, fontSize } from '@/lib/theme';

type Variant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';

interface Props {
  label: string;
  variant?: Variant;
}

const variantStyles: Record<
  Variant,
  { background: string; color: string; border?: string }
> = {
  default: { background: colors.primary, color: colors.primaryForeground },
  secondary: { background: colors.muted, color: colors.foreground },
  destructive: { background: colors.destructive, color: '#fff' },
  outline: {
    background: 'transparent',
    color: colors.foreground,
    border: colors.border,
  },
  success: { background: '#DCFCE7', color: '#15803D' },
  warning: { background: '#FEF3C7', color: '#B45309' },
};

export function Badge({ label, variant = 'default' }: Props) {
  const v = variantStyles[variant];
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: v.background,
          borderColor: v.border ?? 'transparent',
          borderWidth: v.border ? 1 : 0,
        },
      ]}
    >
      <Text style={[styles.text, { color: v.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
