"use client";

import { useCallback, useState } from "react";
import axios from "axios";

import { Type } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import CardPrice from "@/components/card-price";
import TitleHeader from "@/components/title-header";
import { CreateTypeForm } from "@/components/create-type-form";

interface TypesPageClientProps {
  initialTypes: Type[];
}

export default function TypesPageClient({
  initialTypes,
}: TypesPageClientProps) {
  const [types, setTypes] = useState<Type[]>(initialTypes);
  const toast = useToast();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("/api/types");
      setTypes(response.data);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      toast.error("No se pudo actualizar el listado de tipos.");
    }
  }, [toast]);

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
      </section>
    </main>
  );
}
