"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();

  const onDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/orders/${id}`);
      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-all text-white cursor-pointer">
      <Trash onClick={onDelete} />
    </button>
  );
}
