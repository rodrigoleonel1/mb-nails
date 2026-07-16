"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { Toast } from "@/components/ui/toast";

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastOptions {
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
}

type ToastShorthandOptions = Omit<ToastOptions, "description" | "variant">;

export interface ToastFn {
  (options: ToastOptions | string): void;
  success: (description: string, options?: ToastShorthandOptions) => void;
  error: (description: string, options?: ToastShorthandOptions) => void;
  info: (description: string, options?: ToastShorthandOptions) => void;
  warning: (description: string, options?: ToastShorthandOptions) => void;
}

interface ToastItem {
  id: string;
  title?: string;
  description: string;
  variant: ToastVariant;
}

const DEFAULT_DURATIONS: Record<ToastVariant, number> = {
  success: 3500,
  info: 3500,
  warning: 4500,
  error: 5000,
};

// Máximo de toasts visibles a la vez (evita saturar la pantalla en mobile).
const MAX_VISIBLE_TOASTS = 4;

const ToastContext = createContext<ToastFn | null>(null);

let idCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toastItem) => toastItem.id !== id));

    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const push = useCallback(
    (options: ToastOptions) => {
      const id = `toast-${Date.now()}-${idCounter++}`;
      const variant = options.variant ?? "info";
      const duration = options.duration ?? DEFAULT_DURATIONS[variant];

      const item: ToastItem = {
        id,
        title: options.title,
        description: options.description,
        variant,
      };

      setToasts((current) => [...current, item].slice(-MAX_VISIBLE_TOASTS));

      if (duration !== Infinity) {
        const timer = setTimeout(() => dismiss(id), duration);
        timers.current.set(id, timer);
      }
    },
    [dismiss],
  );

  const toast = useMemo(() => {
    const fn = ((options: ToastOptions | string) => {
      push(typeof options === "string" ? { description: options } : options);
    }) as ToastFn;

    fn.success = (description, options) =>
      push({ ...options, description, variant: "success" });
    fn.error = (description, options) =>
      push({ ...options, description, variant: "error" });
    fn.info = (description, options) =>
      push({ ...options, description, variant: "info" });
    fn.warning = (description, options) =>
      push({ ...options, description, variant: "warning" });

    return fn;
  }, [push]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-0 sm:items-end"
        style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      >
        {toasts.map((toastItem) => (
          <Toast
            key={toastItem.id}
            id={toastItem.id}
            title={toastItem.title}
            description={toastItem.description}
            variant={toastItem.variant}
            onDismiss={dismiss}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de un <ToastProvider>");
  }
  return context;
}
