import Navlinks from "./navlinks";
import { MouseEventHandler } from "react";

interface MenuMobileProps {
  menuOpen: boolean;
  handleClick: MouseEventHandler<HTMLAnchorElement>;
}

export default function MenuMobile({ menuOpen, handleClick }: MenuMobileProps) {
  return (
    <aside
      className={`${
        menuOpen ? "w-full p-4 z-50" : "left-full w-0 p-0"
      } absolute h-[calc(100vh-68px)] mt-[68px] top-0 left-0 flex flex-col gap-4 bg-violet-400 transition-all overflow-hidden`}
    >
      <div className="space-y-2">
        <Navlinks menuOpen={menuOpen} handleClick={handleClick} />
      </div>
    </aside>
  );
}
