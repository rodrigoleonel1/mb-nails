"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import Loader from "@/components/ui/loader";
import { Item } from "@/lib/types";
import CardPrice from "@/components/card-price";
import TitleHeader from "@/components/title-header";

export default function TypesPage() {
  const [types, setTypes] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/types/`
        );
        setTypes(response.data);
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
          title={"Mis uñas"}
          subtitle={"Listado de tipos de uña creados."}
        />
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {types.map((type: Item) => (
            <CardPrice item={type} key={type.name} />
          ))}
        </section>
      </section>
    </main>
  );
}
