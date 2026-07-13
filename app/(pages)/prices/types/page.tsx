"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import Loader from "@/components/ui/loader";
import { Type } from "@/lib/types";
import CardPrice from "@/components/card-price";
import TitleHeader from "@/components/title-header";
import { CreateTypeForm } from "@/components/create-type-form";

export default function TypesPage() {
  const [types, setTypes] = useState<Type[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/types/`,
      );
      setTypes(response.data);
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
          <TitleHeader
            title={"Crear uña"}
            subtitle={"Añade un nuevo tipo de uña."}
          />
          <CreateTypeForm onCreated={fetchData} />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="space-y-2">
            <TitleHeader
              title={"Mis uñas"}
              subtitle={"Listado de tipos de uña creados."}
            />
            <section className="grid gap-4">
              {types.map((type) => (
                <CardPrice
                  item={type}
                  key={String(type._id)}
                  isTypes={true}
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
