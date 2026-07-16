import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AlertMessageProps {
  variant: "success" | "error";
  children: ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<AlertMessageProps["variant"], string> = {
  success: "text-green-800",
  error: "text-red-800",
};

export function AlertMessage({
  variant,
  children,
  className,
}: AlertMessageProps) {
  return (
    <p className={cn("text-sm w-full", VARIANT_CLASSES[variant], className)}>
      {children}
    </p>
  );
}
