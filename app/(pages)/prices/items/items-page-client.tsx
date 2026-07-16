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

export default function ItemsPageClient({
  initialItems,
}: ItemsPageClientProps) {
  const [items, setItems] = useState<Item[]>(initialItems);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("/api/items");
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
