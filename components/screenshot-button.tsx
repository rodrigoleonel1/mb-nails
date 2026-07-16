"use client";

import html2canvas from "html2canvas";
import { Download } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

interface ScreenshotButtonProps {
  id: string;
}

export default function ScreenshotButton({ id }: ScreenshotButtonProps) {
  const toast = useToast();

  const takeScreenshot = () => {
    const element = document.getElementById(id);
    if (!element) {
      toast.error("No se pudo generar la captura, intenta de nuevo");
      return;
    }

    html2canvas(element)
      .then((canvas) => {
        const image = canvas.toDataURL("image/jpeg", 1.0);
        const a = document.createElement("a");
        a.href = image;
        a.download = "orden.jpg";
        a.click();
        toast.success("Captura descargada");
      })
      .catch((error) => {
        console.log({ "CLIENT ERROR": error });
        toast.error("No se pudo generar la captura, intenta de nuevo");
      });
  };

  return (
    <button
      onClick={takeScreenshot}
      className="text-white bg-violet-600 p-2 rounded-md"
    >
      <Download />
    </button>
  );
}
