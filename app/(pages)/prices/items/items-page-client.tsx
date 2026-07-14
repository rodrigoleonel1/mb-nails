"use client";

import { useCallback, useState } from "react";
import axios from "axios";

import { Item } from "@/lib/types";
import CardPrice from "@/components/card-price";
import TitleHeader from "@/components/title-header";
import { CreateItemForm } from "@/components/create-item-form";

interface ItemsPageClientProps {
  initialItems: Item[];
}

// Receives data already fetched server-side (see page.tsx) so the first
// render shows the real list instead of a loading spinner. It only talks to
// the API again after a create/delete, to refresh the list with the new state.
export default function ItemsPageClient({
  initialItems,
}: ItemsPageClientProps) {
  const [items, setItems] = useState<Item[]>(initialItems);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/items`,
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  }, []);

  return (
    <main className="mx-auto max-w-3xl flex flex-col gap-10 p-6 bg-violet-300">
      <section className="flex flex-col gap-8">
        <div className="space-y-2">
          <TitleHeader title={"Crear item"} subtitle={"Añade un nuevo item."} />
          <CreateItemForm onCreated={fetchData} />
        </div>
        <div className="space-y-2">
          <TitleHeader
            title={"Mis items"}
            subtitle={"Listado de extras y decoraciones creadas."}
          />
          <section className="grid gap-4">
            {items.map((item) => (
              <CardPrice
                item={item}
                key={String(item._id)}
                isTypes={false}
                onDeleted={fetchData}
              />
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
