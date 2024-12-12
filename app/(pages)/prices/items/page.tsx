"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Item } from "@/lib/types";
import Loader from "@/components/ui/loader";
import CardPrice from "@/components/card-price";
import TitleHeader from "@/components/title-header";

export default function ItemsPage({ params }: { params: { id: string } }) {
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
        <TitleHeader
          title={"Mis items"}
          subtitle={"Listado de extras y decoraciones creadas."}
        />
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item: Item) => (
            <CardPrice item={item} key={item.name} />
          ))}
        </section>
      </section>
    </main>
  );
}
