import axios from "axios";
import { Dancing_Script } from "next/font/google";
import { format } from "date-fns";
import { Sparkles } from "lucide-react";

import { formatter } from "@/lib/utils";
import DeleteButton from "@/components/delete-button";
import { Item } from "@/lib/types";

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
    <main className="flex flex-col p-6 gap-6 bg-violet-300">
      <header className="flex justify-between place-items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orden de uñas</h2>
          <p className="text-sm">
            Creada el {format(order.createdAt, "dd/MM/yyyy")}.
          </p>
        </div>
        <DeleteButton id={params.id} />
      </header>

      <section className="flex flex-col gap-4">
        <article className="px-6 py-4 rounded-md bg-violet-400 flex flex-col gap-2">
          <h3
            className={`text-3xl font-bold flex gap-2 place-items-center ${dancingScript.className}`}
          >
            <Sparkles className="w-5" /> Tipo de uña
          </h3>
          <p className="font-semibold flex justify-between">
            {order.type.name} <span>{formatter.format(order.type.price)}</span>
          </p>
        </article>
        <article className="px-6 py-4 rounded-md bg-violet-400 flex flex-col gap-2">
          <h3
            className={`text-3xl font-bold flex gap-2 place-items-center ${dancingScript.className}`}
          >
            <Sparkles className="w-5" />
            Extras
          </h3>
          {order.extras.map((item: Item) => (
            <p key={item.name} className="font-semibold flex justify-between">
              {item.name} x{item.quantity}
              <span>{formatter.format(item.price)}</span>
            </p>
          ))}
        </article>

        <article className="px-6 py-4 rounded-md bg-violet-400 flex flex-col gap-2">
          <h3
            className={`text-3xl font-bold flex gap-2 place-items-center ${dancingScript.className}`}
          >
            <Sparkles className="w-5" />
            Decoraciones
          </h3>
          {order.decorations.map((item: Item) => (
            <p key={item.name} className="font-semibold flex justify-between">
              {item.name} x{item.quantity}
              <span>{formatter.format(item.price)}</span>
            </p>
          ))}
        </article>
        <h3 className="text-2xl font-semibold tracking-tight p-4 text-center rounded-md bg-violet-400">
          Precio total: {formatter.format(order.total)}
        </h3>
      </section>
    </main>
  );
}
