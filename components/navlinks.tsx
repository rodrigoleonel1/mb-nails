import Link from "next/link";
import { MouseEventHandler } from "react";
import {
  ClipboardPen,
  PlusCircle,
  Home,
  NotebookText,
  LucideIcon,
} from "lucide-react";
import { navLinks } from "@/constants";

type IconName = "Home" | "NotebookText" | "PlusCircle" | "ClipboardPen";

const iconMap: Record<IconName, LucideIcon> = {
  Home,
  NotebookText,
  PlusCircle,
  ClipboardPen,
};

interface NavlinksProps {
  menuOpen: boolean;
  handleClick: MouseEventHandler<HTMLAnchorElement>;
}

export default function Navlinks({ menuOpen, handleClick }: NavlinksProps) {
  return !menuOpen ? (
    <>
      {navLinks.map((navLink) => (
        <Link
          key={navLink.route}
          href={navLink.route}
          className="p-2 rounded-md hover:bg-violet-300 flex place-items-center gap-1"
        >
          {navLink.name}
        </Link>
      ))}
    </>
  ) : (
    <>
      {navLinks.map((link) => {
        const IconComponent = iconMap[link.icon as IconName];

        return (
          <Link
            key={link.route}
            onClick={handleClick}
            href={link.route}
            className="p-2 rounded-md hover:bg-violet-300 flex place-items-center gap-1"
          >
            <IconComponent size={22} />
            <span className="text-lg">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
