import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl flex flex-col gap-6 p-6 bg-violet-300">
      <article className="bg-violet-400 rounded-md p-4 flex justify-between place-items-center shadow">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Mis ordenes</h2>
          <p className="text-sm">Ver listado de ordenes creadas.</p>
        </div>
        <Link
          href={"/orders"}
          className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-all text-white"
        >
          <ExternalLink />
        </Link>
      </article>
      <article className="bg-violet-400 rounded-md p-4 flex justify-between place-items-center shadow">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Crear orden</h2>
          <p className="text-sm">Accede al formulario para crear una orden.</p>
        </div>
        <Link
          href={"/orders/create"}
          className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-all text-white"
        >
          <ExternalLink />
        </Link>
      </article>
      <article className="bg-violet-400 rounded-md p-4 flex justify-between place-items-center shadow">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Editar precios</h2>
          <p className="text-sm">Edita los precios de tus uñas.</p>
        </div>
        <Link
          href={"/prices"}
          className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-all text-white"
        >
          <ExternalLink />
        </Link>
      </article>
    </main>
  );
}
