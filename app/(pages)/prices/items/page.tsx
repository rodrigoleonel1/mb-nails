import { getItems } from "@/services/items";
import CardPrice from "@/components/card-price";
import TitleHeader from "@/components/title-header";
import { CreateItemForm } from "@/components/create-item-form";

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <main className="mx-auto max-w-3xl flex flex-col gap-10 p-6 bg-violet-300">
      <section className="flex flex-col gap-8">
        <div className="space-y-2">
          <TitleHeader title={"Crear item"} subtitle={"Añade un nuevo item."} />
          <CreateItemForm />
        </div>
        <div className="space-y-2">
          <TitleHeader
            title={"Mis items"}
            subtitle={"Listado de extras y decoraciones creadas."}
          />
          <section className="grid gap-4">
            {items.map((item) => (
              <CardPrice item={item} key={String(item._id)} isTypes={false} />
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}