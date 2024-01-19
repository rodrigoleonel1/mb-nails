"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
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
    <div className="bg-violet-700 text-white p-2 rounded-md hover:bg-violet-600 cursor-pointer">
      <Trash onClick={onDelete} />
    </div>
  );
}
