import Link from "next/link";
import { ClipboardPen, PlusCircle, Home } from "lucide-react";
import { MouseEventHandler } from "react";

export default function MenuMobile({
  menuOpen,
  handleClick,
}: {
  menuOpen: boolean;
  handleClick: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <div
      className={`${
        menuOpen ? "w-full p-4 z-50" : "left-full w-0 p-0"
      } absolute h-[calc(100vh-68px)] mt-[68px] top-0 left-0 flex flex-col gap-4 bg-violet-400 transition-all overflow-hidden`}
    >
      <div className="space-y-2">
        <Link
          onClick={handleClick}
          href={"/"}
          className="p-2 rounded-md hover:bg-violet-300 flex place-items-center gap-1"
        >
          <Home size={22} />
          <span className="text-lg">Inicio</span>
        </Link>
        <Link
          onClick={handleClick}
          href={"/orders/create"}
          className="p-2 rounded-md hover:bg-violet-300 flex place-items-center gap-1"
        >
          <PlusCircle size={22} />
          <span className="text-lg">Crear orden</span>
        </Link>
        <Link
          onClick={handleClick}
          href={"/prices"}
          className="p-2 rounded-md hover:bg-violet-300 flex place-items-center gap-1"
        >
          <ClipboardPen size={22} />
          <span className="text-lg">Editar precios</span>
        </Link>
      </div>
    </div>
  );
}
