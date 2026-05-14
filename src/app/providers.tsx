'use client';

import { AuthProvider } from '@/lib/auth';
import { I18nProvider } from '@/lib/i18n';
import { ReactNode, Component, ErrorInfo } from 'react';

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const isDev = process.env.NODE_ENV === 'development';
      return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: 560, margin: '4rem auto', textAlign: 'center' }}>
          <h2 style={{ color: '#0F172A', fontSize: '1.5rem', fontWeight: 700 }}>
            Une erreur s&apos;est produite
          </h2>
          <p style={{ color: '#64748B', marginTop: '0.75rem' }}>
            Désolé, quelque chose n&apos;a pas fonctionné. Réessayez ou rechargez la page.
          </p>
          {isDev ? (
            <>
              <pre style={{ background: '#fee', padding: '1rem', borderRadius: '8px', whiteSpace: 'pre-wrap', textAlign: 'left', marginTop: '1.5rem' }}>
                {this.state.error.message}
              </pre>
              <pre style={{ background: '#eee', padding: '1rem', borderRadius: '8px', whiteSpace: 'pre-wrap', fontSize: '12px', maxHeight: '300px', overflow: 'auto', textAlign: 'left' }}>
                {this.state.error.stack}
              </pre>
            </>
          ) : null}
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1.5rem',
              background: '#4B39EF',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Réessayer
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <AuthProvider>{children}</AuthProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}
