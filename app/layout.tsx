import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Header from "@/components/header";
import { ToastProvider } from "@/hooks/use-toast";

// @ts-ignore
import "./globals.css";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mariana Nails 🦋",
  description: "Mariana Nails page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-violet-300 overflow-x-hidden ${poppins.className}`}>
        <ToastProvider>
          <Header />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
