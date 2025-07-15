// This file is imported at the root of your app to start MSW in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  import('../mocks/browser').then(({ worker }) => {
    worker.start();
  });
}
