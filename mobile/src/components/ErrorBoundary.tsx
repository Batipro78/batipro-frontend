import { Component, ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, radius, spacing } from '@/lib/theme';

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;

    const err = this.state.error;
    return (
      <View style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.title}>Une erreur s'est produite</Text>
          <Text style={styles.subtitle}>
            L'application a rencontré un problème. Réessayez ou redémarrez l'application.
          </Text>
          {__DEV__ ? (
            <View style={styles.box}>
              <Text style={styles.errorName}>{err.name}: {err.message}</Text>
              {err.stack ? (
                <Text style={styles.stack}>{err.stack.split('\n').slice(0, 10).join('\n')}</Text>
              ) : null}
            </View>
          ) : null}
          <Pressable onPress={this.reset} style={styles.btn}>
            <Text style={styles.btnText}>Réessayer</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  icon: { fontSize: 48, textAlign: 'center' },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.foreground,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  box: {
    backgroundColor: '#FEE2E2',
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  errorName: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.destructive,
  },
  stack: {
    fontSize: fontSize.xs,
    color: colors.foreground,
    fontFamily: 'monospace',
  },
  btn: {
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  btnText: { color: '#fff', fontWeight: '600', fontSize: fontSize.base },
});
