import { useMemo, useState } from 'react';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast';
import {
  ToastContext,
  type ShowToastOptions,
  type ToastContextValue,
  type ToastHostProviderProps,
} from './useToast';

type ToastState = ShowToastOptions & {
  open: boolean;
};

const ToastHostProvider = ({
  children,
  duration = 3500,
}: ToastHostProviderProps) => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const value = useMemo<ToastContextValue>(
    () => ({
      dismissToast: () => {
        setToast((current) =>
          current
            ? {
                ...current,
                open: false,
              }
            : null,
        );
      },
      showToast: (options) => {
        setToast({
          dismissLabel: options.dismissLabel ?? 'Dismiss',
          duration: options.duration ?? duration,
          open: true,
          variant: options.variant ?? 'info',
          ...options,
        });
      },
    }),
    [duration],
  );

  return (
    <ToastContext.Provider value={value}>
      <ToastProvider duration={duration}>
        {children}
        {toast ? (
          <Toast
            duration={toast.duration}
            open={toast.open}
            variant={toast.variant}
            onOpenChange={(open) =>
              setToast((current) =>
                current
                  ? {
                      ...current,
                      open,
                    }
                  : null,
              )
            }
          >
            <ToastTitle>{toast.title}</ToastTitle>
            {toast.description ? (
              <ToastDescription>{toast.description}</ToastDescription>
            ) : null}
            <ToastClose>{toast.dismissLabel}</ToastClose>
          </Toast>
        ) : null}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
};
export { ToastHostProvider };
export type { ShowToastOptions, ToastHostProviderProps };
