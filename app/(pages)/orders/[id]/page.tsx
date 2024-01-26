import axios from "axios";
import { Dancing_Script } from "next/font/google";
import { format } from "date-fns";

import { formatter } from "@/lib/utils";
import DeleteButton from "@/components/delete-button";
import { Item } from "@/lib/types";
import ScreenshotButton from "@/components/screenshot-button";

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
});

async function getOrder(id: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/orders/${id}`
  );
  const data = response.data;
  return data;
}

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await getOrder(params.id);
  return (
    <main className="flex flex-col p-6 gap-6 bg-violet-300 max-w-3xl mx-auto">
      <header className="flex justify-between place-items-center">
        <aside>
          <h2 className="text-2xl font-bold tracking-tight">Orden de uñas</h2>
          <p className="text-sm">
            Creada el {format(order.createdAt, "dd/MM/yyyy")}.
          </p>
        </aside>
        <aside className="flex gap-4">
          <ScreenshotButton id={params.id} />
          <DeleteButton id={params.id} />
        </aside>
      </header>

      <section
        id={params.id}
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
              <span>{formatter.format(item.price)}</span>
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
              <span>{formatter.format(item.price)}</span>
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
