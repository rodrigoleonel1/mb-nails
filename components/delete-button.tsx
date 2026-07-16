"use client";

import { useState } from "react";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { useToast } from "@/hooks/use-toast";

interface DeleteButtonProps {
  id: string;
  resource: "orders" | "types" | "items";
  refresh?: boolean;
  redirectTo?: string;
  onSuccess?: () => void;
}

const RESOURCE_LABELS: Record<DeleteButtonProps["resource"], string> = {
  orders: "La orden",
  types: "El tipo",
  items: "El item",
};

export default function DeleteButton({
  id,
  resource,
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
      await axios.delete(`/api/${resource}/${id}`);
      toast.success(`${RESOURCE_LABELS[resource]} se eliminó correctamente`);

      if (onSuccess) {
        onSuccess();
        return;
      }

      if (refresh) {
        router.refresh();
      } else {
        router.push(redirectTo ?? `/${resource}`);
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
      onClick={onDelete}
      disabled={deleting}
      className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-all text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <Trash className="pointer-events-none" size={22} />
    </button>
  );
}
