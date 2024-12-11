"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import MenuMobile from "./menu-mobile";
import Navlinks from "./navlinks";
import Logo from "./logo";

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
    <header className="flex justify-center place-items-center gap-2 bg-violet-400 py-4 shadow mb-2">
      <nav
        className={
          "flex justify-between place-items-center w-full max-w-3xl px-6"
        }
      >
        <Logo />
        <div className="hidden space-x-2 md:flex">
          <Navlinks menuOpen={menuOpen} handleClick={handleClick} />
        </div>
        <span
          className={`md:hidden cursor-pointer transition-transform group: ${
            !menuOpen ? "rotate-0" : "rotate-90"
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
