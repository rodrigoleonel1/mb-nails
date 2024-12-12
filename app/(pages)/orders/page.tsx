"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

import Loader from "@/components/ui/loader";
import TitleHeader from "@/components/title-header";
import CardOrder from "@/components/card-order";

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
      <TitleHeader
        title={"Mis ordenes"}
        subtitle={"Listado de ordenes creadas."}
      />
      {orders.length > 0 ? (
        <section className="flex flex-col gap-4">
          {orders.map((order: any) => (
            <CardOrder key={order._id} order={order} />
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
