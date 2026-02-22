'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ padding: '2rem', fontFamily: 'monospace' }}>
        <h2>Erreur capturée :</h2>
        <pre style={{ background: '#fee', padding: '1rem', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
          {error.message}
        </pre>
        <pre style={{ background: '#eee', padding: '1rem', borderRadius: '8px', whiteSpace: 'pre-wrap', fontSize: '12px' }}>
          {error.stack}
        </pre>
        <button onClick={reset} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Réessayer
        </button>
      </body>
    </html>
  );
}
