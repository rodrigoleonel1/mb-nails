"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { useToast } from "@/hooks/use-toast";

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<void>;
  label: string;
  refresh?: boolean;
  redirectTo?: string;
  onSuccess?: () => void;
}

export default function DeleteButton({
  id,
  action,
  label,
  refresh = false,
  redirectTo,
  onSuccess,
}: DeleteButtonProps) {
  const router = useRouter();
  const toast = useToast();
  const [deleting, setDeleting] = useState(false);

  const onDelete = async () => {
    try {
      setDeleting(true);
      await action(id);
      toast.success(`La ${label} se eliminó correctamente`);

      if (onSuccess) {
        onSuccess();
        return;
      }

      if (refresh) {
        router.refresh();
      } else {
        router.push(redirectTo ?? "/");
      }
    } catch (error) {
      console.log(error);
      toast.error("No se pudo eliminar, intenta de nuevo");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      type="button"
      aria-label={`Eliminar ${label}`}
      onClick={onDelete}
      disabled={deleting}
      className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-all text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <Trash className="pointer-events-none" size={22} aria-hidden="true" />
    </button>
  );
}