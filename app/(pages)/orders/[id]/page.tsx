import { Dancing_Script } from "next/font/google";
import { format } from "date-fns";
import { notFound } from "next/navigation";

import { deleteOrder } from "@/app/actions";
import { getOrderById } from "@/services/orders";
import { formatter } from "@/lib/utils";
import { Item } from "@/lib/types";
import DeleteButton from "@/components/delete-button";
import ScreenshotButton from "@/components/screenshot-button";
import TitleHeader from "@/components/title-header";

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const instant = false;

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <main className="flex flex-col p-6 gap-6 bg-violet-300 max-w-3xl mx-auto">
      <header className="flex justify-between place-items-center">
        <TitleHeader
          title={"Orden de uñas"}
          subtitle={`Creada el ${format(new Date(order.createdAt), "dd/MM/yyyy")}`}
        />
        <aside className="flex gap-4">
          <ScreenshotButton id={id} />
          <DeleteButton id={id} action={deleteOrder} label="orden" redirectTo="/orders" />
        </aside>
      </header>

      <section
        id={id}
        className="flex flex-col gap-4 bg-violet-400 py-6"
      >
        <article className="px-6 rounded-md bg-violet-400 flex flex-col gap-2">
          <h3
            className={`text-3xl font-bold flex gap-2 place-items-center ${dancingScript.className}`}
          >
            Tipo de uña
          </h3>
          <p className="font-semibold flex justify-between">
            {order.type.name} <span>{formatter.format(order.type.price)}</span>
          </p>
        </article>
        <article className="px-6 rounded-md bg-violet-400 flex flex-col gap-2">
          <h3
            className={`text-3xl font-bold flex gap-2 place-items-center ${dancingScript.className}`}
          >
            Extras
          </h3>
          {order.extras.map((item: Item) => (
            <p key={item.name} className="font-semibold flex justify-between">
              {item.name} x{item.quantity}
              <span>
                {formatter.format(item.price * (item.quantity ?? 1))}
              </span>
            </p>
          ))}
        </article>

        <article className="px-6 rounded-md bg-violet-400 flex flex-col gap-2">
          <h3
            className={`text-3xl font-bold flex gap-2 place-items-center ${dancingScript.className}`}
          >
            Decoraciones
          </h3>
          {order.decorations.map((item: Item) => (
            <p key={item.name} className="font-semibold flex justify-between">
              {item.name} x{item.quantity}
              <span>
                {formatter.format(item.price * (item.quantity ?? 1))}
              </span>
            </p>
          ))}
        </article>
        <h3 className="text-2xl font-semibold tracking-tigh text-center rounded-md bg-violet-400 py-2">
          Precio total: {formatter.format(order.total)}
        </h3>
      </section>
    </main>
  );
}
