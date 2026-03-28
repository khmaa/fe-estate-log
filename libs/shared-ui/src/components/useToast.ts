import { createContext, useContext } from "react";
import type React from "react";
import type { ToastVariant } from "./Toast";

type ShowToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  dismissLabel?: string;
};

type ToastContextValue = {
  dismissToast: () => void;
  showToast: (options: ShowToastOptions) => void;
};

type ToastHostProviderProps = React.PropsWithChildren<{
  duration?: number;
}>;

const ToastContext = createContext<ToastContextValue | null>(null);

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastHostProvider");
  }

  return context;
};

export { ToastContext, useToast };
export type { ShowToastOptions, ToastContextValue, ToastHostProviderProps };
