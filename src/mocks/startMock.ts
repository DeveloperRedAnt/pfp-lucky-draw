// Call this at app entrypoint (e.g. in _app.tsx or main.tsx) for local development
if (typeof window !== 'undefined') {
  import('./browser').then(({ worker }) => {
    worker.start();
  });
}
