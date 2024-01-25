import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function PricesPage() {
  return (
    <main className="mx-auto max-w-3xl flex flex-col gap-6 p-6 bg-violet-300">
      <header>
        <h2 className="text-2xl font-bold tracking-tight">Mis precios</h2>
        <p className="text-sm">Elige que lista precios quieres editar.</p>
      </header>
      <section className="flex flex-col gap-4">
        <article className="bg-violet-400 w-full p-4 rounded-md flex justify-between place-items-center shadow">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Tipos de uñas</h2>
            <p className="text-sm">Listado de precios de tipo de uñas.</p>
          </div>
          <Link
            href={"/prices/types"}
            className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-all text-white"
          >
            <ExternalLink />
          </Link>
        </article>
        <article className="bg-violet-400 w-full p-4 rounded-md flex justify-between place-items-center shadow">
          <div>
            <p className="text-xl font-bold tracking-tight">
              Extras y decoraciones
            </p>
            <p className="text-sm">
              Listado de precios de decoraciones y extras.
            </p>
          </div>
          <Link
            href={"/prices/items"}
            className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-all text-white"
          >
            <ExternalLink />
          </Link>
        </article>
      </section>
    </main>
  );
}
