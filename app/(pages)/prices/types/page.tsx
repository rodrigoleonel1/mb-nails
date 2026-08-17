import { getTypes } from "@/services/types";
import CardPrice from "@/components/card-price";
import TitleHeader from "@/components/title-header";
import { CreateTypeForm } from "@/components/create-type-form";

export default async function TypesPage() {
  const types = await getTypes();

  return (
    <main className="mx-auto max-w-3xl flex flex-col gap-10 p-6 bg-violet-300">
      <section className="flex flex-col gap-8">
        <div className="space-y-2">
          <TitleHeader
            title={"Crear uña"}
            subtitle={"Añade un nuevo tipo de uña."}
          />
          <CreateTypeForm />
        </div>
        <div className="space-y-2">
          <TitleHeader
            title={"Mis uñas"}
            subtitle={"Listado de tipos de uña creados."}
          />
          <section className="grid gap-4">
            {types.map((type) => (
              <CardPrice item={type} key={String(type._id)} isTypes={true} />
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}