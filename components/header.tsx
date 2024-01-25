"use client";

import { Dancing_Script } from "next/font/google";
import { Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import MenuMobile from "./menu-mobile";

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <header className="flex justify-center place-items-center gap-2 bg-violet-400 py-4">
      <nav
        className={
          "flex justify-between place-items-center w-full max-w-3xl px-6"
        }
      >
        <Link href={"/"}>
          <h1
            className={`text-3xl font-bold flex place-items-center ${dancingScript.className}`}
          >
            MarianaNails
            <Sparkles className="w-5" />
          </h1>
        </Link>
        <div className="hidden space-x-2 md:flex">
          <Link
            href={"/"}
            className="p-2 rounded-md hover:bg-violet-300 flex place-items-center gap-1"
          >
            Inicio
          </Link>
          <Link
            href={"/orders"}
            className="p-2 rounded-md hover:bg-violet-300 flex place-items-center gap-1"
          >
            Mis ordenes
          </Link>
          <Link
            href={"/orders/create"}
            className="p-2 rounded-md hover:bg-violet-300 flex place-items-center gap-1"
          >
            Crear orden
          </Link>
          <Link
            href={"/prices"}
            className="p-2 rounded-md hover:bg-violet-300 flex place-items-center gap-1"
          >
            Editar precios
          </Link>
        </div>
        <span
          className={`md:hidden cursor-pointer transition-transform group: ${
            menuOpen === false ? "rotate-0" : "rotate-90"
          }`}
        >
          {menuOpen ? (
            <X size={28} onClick={handleClick} />
          ) : (
            <Menu size={28} onClick={handleClick} />
          )}
        </span>
      </nav>
      <MenuMobile menuOpen={menuOpen} handleClick={handleClick} />
    </header>
  );
}
