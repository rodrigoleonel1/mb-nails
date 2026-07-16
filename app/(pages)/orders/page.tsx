import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { getOrders } from "@/services/orders";
import CardOrder from "@/components/card-order";
import TitleHeader from "@/components/title-header";

export default async function Home() {
  const orders = await getOrders();

  return (
    <main className="mx-auto max-w-3xl flex flex-col gap-6 p-6 bg-violet-300">
      <TitleHeader
        title={"Mis ordenes"}
        subtitle={"Listado de ordenes creadas."}
      />
      {orders.length > 0 ? (
        <section className="flex flex-col gap-4">
          {orders.map((order) => (
            <CardOrder key={String(order._id)} order={order} />
          ))}
        </section>
      ) : (
        <div className="font-medium flex gap-4 justify-between place-items-center w-full bg-violet-400 p-4 rounded-md shadow">
          Todavia no existen ordenes, haz click para crear una nueva!
          <Link
            href={"/orders/create"}
            className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-all text-white"
          >
            <ExternalLink />
          </Link>
        </div>
      )}
    </main>
  );
}
