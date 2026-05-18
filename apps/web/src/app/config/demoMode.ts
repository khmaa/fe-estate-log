type DemoModeEnv = {
  VITE_ENABLE_MSW?: string;
};

const isDemoModeEnabled = (env: DemoModeEnv = import.meta.env) => {
  return env.VITE_ENABLE_MSW === 'true';
};

export { isDemoModeEnabled };
