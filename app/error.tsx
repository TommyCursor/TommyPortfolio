'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ padding: '24px', fontFamily: 'monospace', backgroundColor: '#F8F7F4', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>Error Details</h2>
      <p style={{ color: '#cc0000', marginBottom: '12px', fontSize: '14px' }}>
        <strong>{error.message || 'Unknown error'}</strong>
      </p>
      {error.stack && (
        <pre style={{ fontSize: '11px', overflow: 'auto', background: '#eee', padding: '12px', whiteSpace: 'pre-wrap' }}>
          {error.stack}
        </pre>
      )}
      <button
        onClick={reset}
        style={{ marginTop: '16px', padding: '8px 16px', cursor: 'pointer' }}
      >
        Try again
      </button>
    </div>
  )
}
