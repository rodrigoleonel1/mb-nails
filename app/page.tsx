"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import Loader from "@/components/ui/loader";
import { formatter } from "@/lib/utils";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/orders`
        );
        setOrders(response.data);
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
    <main className="mx-auto max-w-3xl flex flex-col gap-6 p-6 bg-violet-300">
      <header>
        <h2 className="text-2xl font-bold tracking-tight">Mis ordenes</h2>
        <p className="text-sm">Listado de ordenes creadas.</p>
      </header>
      {orders.length > 0 ? (
        <section className="flex flex-col gap-4">
          {orders.map((order: any) => (
            <article
              key={order._id}
              className="font-medium flex flex-col gap-2 w-full bg-violet-400 p-4 rounded-md"
            >
              <p>
                {order.type.name}: {formatter.format(order.total)}
              </p>
              <span>Orden creada: {format(order.createdAt, "dd/MM/yyyy")}</span>
              <Link
                href={`/orders/${order._id}`}
                className="w-full flex justify-center bg-violet-600 gap-1 text-white rounded-md py-2"
              >
                Ver orden
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className="font-medium flex flex-col gap-2 w-full bg-violet-400 p-4 rounded-md">
          Todavia no existen ordenes, haz click para crear alguna!
          <Link
            href={"/orders/create"}
            className="p-2 rounded-md bg-violet-600 text-white text-center"
          >
            Crear orden
          </Link>
        </section>
      )}
    </main>
  );
}
