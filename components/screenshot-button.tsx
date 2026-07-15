"use client";

import html2canvas from "html2canvas";
import { Download } from "lucide-react";

interface ScreenshotButtonProps {
  id: string;
}

export default function ScreenshotButton({ id }: ScreenshotButtonProps) {
  const takeScreenshot = () => {
    const element = document.getElementById(id);
    if (element) {
      html2canvas(element).then((canvas) => {
        const image = canvas.toDataURL("image/jpeg", 1.0);
        const a = document.createElement("a");
        a.href = image;
        a.download = "orden.jpg";
        a.click();
      });
    }
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
