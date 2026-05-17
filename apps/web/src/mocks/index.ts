type MockingEnv = {
  VITE_ENABLE_MSW?: string;
};

const shouldEnableMocking = (env: MockingEnv) => {
  return env.VITE_ENABLE_MSW === 'true';
};

const enableMocking = async () => {
  if (!shouldEnableMocking(import.meta.env)) {
    return;
  }

  const { worker } = await import('./browser');

  await worker.start({
    onUnhandledRequest: 'bypass',
  });
};

export { enableMocking, shouldEnableMocking };
