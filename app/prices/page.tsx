import { ClipboardPen } from "lucide-react";
import Link from "next/link";

export default function PricesPage() {
  return (
    <main className="mx-auto max-w-3xl flex flex-col gap-6 p-6 bg-violet-300">
      <header>
        <h2 className="text-2xl font-bold tracking-tight">Mis precios</h2>
        <p className="text-sm">Elige que lista precios quieres editar.</p>
      </header>
      <section className="flex flex-col gap-4">
        <Link
          href={"/prices/types"}
          className="bg-violet-400 w-full p-4 rounded-md flex gap-2 place-items-center"
        >
          <ClipboardPen />
          <p className="font-medium">Tipos de uñas</p>
        </Link>
        <Link
          href={"/prices/items"}
          className="bg-violet-400 w-full p-4 rounded-md flex gap-2 place-items-center"
        >
          <ClipboardPen />
          <p className="font-medium">Extras y decoraciones</p>
        </Link>
      </section>
    </main>
  );
}
