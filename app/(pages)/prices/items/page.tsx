"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { Item } from "@/lib/types";
import Loader from "@/components/ui/loader";
import CardPrice from "@/components/card-price";
import TitleHeader from "@/components/title-header";
import { CreateItemForm } from "@/components/create-item-form";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/items`,
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="mx-auto max-w-3xl flex flex-col gap-10 p-6 bg-violet-300">
      <section className="flex flex-col gap-8">
        <div className="space-y-2">
          <TitleHeader title={"Crear item"} subtitle={"Añade un nuevo item."} />
          <CreateItemForm onCreated={fetchData} />
        </div>
        {loading ? (
          <Loader />
        ) : (
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
        )}
      </section>
    </main>
  );
}
