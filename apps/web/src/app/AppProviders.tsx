import { ToastHostProvider } from '@shared-ui/core';
import { QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { queryClient } from './queryClient';

type AppProvidersProps = {
  children: React.ReactNode;
};

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastHostProvider>{children}</ToastHostProvider>
    </QueryClientProvider>
  );
};

export { AppProviders };
