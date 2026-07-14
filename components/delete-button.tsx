"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: string;
  resource: "orders" | "types" | "items";
  refresh?: boolean;
  redirectTo?: string;
  onSuccess?: () => void;
}

export default function DeleteButton({
  id,
  resource,
  refresh = false,
  redirectTo,
  onSuccess,
}: DeleteButtonProps) {
  const router = useRouter();

  const onDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/api/${resource}/${id}`,
      );

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
    }
  };

  return (
    <button
      type="button"
      onClick={onDelete}
      className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-all text-white cursor-pointer"
    >
      <Trash className="pointer-events-none" size={22} />
    </button>
  );
}
