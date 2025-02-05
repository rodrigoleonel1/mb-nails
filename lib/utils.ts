import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("es-AR", {
  currency: "ARS",
  style: "currency",
});

export function getKey(key: string) {
  if (key == "Encapsuladas") return "encapsuladas";
  if (key == "Retirado") return "retirado";
  if (key == "Francesas") return "francesas";
  if (key == "Babyboomer") return "babyboomer";
  if (key == "Nailart") return "nailart";
  if (key == "Strass") return "strass";
  if (key == "Efecto Aurora") return "aurora";
  if (key == "Efecto 3D") return "relieve";
  if (key == "Efecto Espejo") return "espejo";
  return "strass";
}
