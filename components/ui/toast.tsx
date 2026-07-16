"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  LucideIcon,
  X,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { ToastVariant } from "@/hooks/use-toast";

export interface ToastProps {
  id: string;
  title?: string;
  description: string;
  variant: ToastVariant;
  onDismiss: (id: string) => void;
}

const VARIANT_STYLES: Record<
  ToastVariant,
  { container: string; icon: string }
> = {
  success: {
    container: "bg-green-50 border-green-200 text-green-900",
    icon: "text-green-600",
  },
  error: {
    container: "bg-red-50 border-red-200 text-red-900",
    icon: "text-red-600",
  },
  info: {
    container: "bg-violet-50 border-violet-200 text-violet-900",
    icon: "text-violet-600",
  },
  warning: {
    container: "bg-amber-50 border-amber-200 text-amber-900",
    icon: "text-amber-600",
  },
};

const VARIANT_ICONS: Record<ToastVariant, LucideIcon> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

export function Toast({
  id,
  title,
  description,
  variant,
  onDismiss,
}: ToastProps) {
  const [leaving, setLeaving] = useState(false);
  const Icon = VARIANT_ICONS[variant];
  const styles = VARIANT_STYLES[variant];

  const handleDismiss = () => setLeaving(true);

  // Fallback por si el navegador no dispara onAnimationEnd
  // (ej. "prefers-reduced-motion" o animaciones deshabilitadas).
  useEffect(() => {
    if (!leaving) return;
    const fallback = setTimeout(() => onDismiss(id), 250);
    return () => clearTimeout(fallback);
  }, [leaving, id, onDismiss]);

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      onAnimationEnd={() => leaving && onDismiss(id)}
      className={cn(
        "pointer-events-auto flex w-full items-start gap-3 rounded-md border p-4 shadow-lg sm:w-[360px]",
        styles.container,
        leaving
          ? "animate-out fade-out slide-out-to-bottom-4 duration-200 sm:slide-out-to-right-4"
          : "animate-in fade-in slide-in-from-bottom-4 duration-300 sm:slide-in-from-right-4",
      )}
    >
      <Icon className={cn("mt-0.5 shrink-0", styles.icon)} size={20} />
      <div className="min-w-0 flex-1">
        {title && <p className="text-sm font-semibold">{title}</p>}
        <p className="break-words text-sm">{description}</p>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Cerrar notificación"
        className={cn(
          "shrink-0 rounded-md p-1 transition-colors hover:bg-black/5 active:bg-black/10",
          styles.icon,
        )}
      >
        <X size={16} />
      </button>
    </div>
  );
}
