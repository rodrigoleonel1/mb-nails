"use client";

import Link from "next/link";
import { ClipboardPen } from "lucide-react";
import { format } from "date-fns";

import { formatter } from "@/lib/utils";
import { Item } from "@/models/item";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/ui/loader";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/items`
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="mx-auto max-w-3xl flex flex-col gap-10 p-6 bg-violet-300">
      <section className="flex flex-col gap-6">
        <header>
          <h2 className="text-2xl font-bold tracking-tight">Mis items</h2>
          <p className="text-sm">Listado de items creados.</p>
        </header>
        <section className="flex flex-col gap-4">
          {items.map((item: Item) => (
            <article
              key={item._id}
              className="font-medium flex flex-col gap-2 w-full bg-violet-400 p-4 rounded-md"
            >
              <p>
                {item.name}: {formatter.format(item.price)}
              </p>
              <span>
                Última actualización:
                {item.updatedAt && (
                  <span> {format(item.updatedAt, "dd/MM/yyyy")}</span>
                )}
              </span>
              <Link
                href={`/prices/items/${item._id}`}
                className="w-full flex justify-center bg-violet-600 gap-1 text-white rounded-md py-2"
              >
                <ClipboardPen />
                Editar
              </Link>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
