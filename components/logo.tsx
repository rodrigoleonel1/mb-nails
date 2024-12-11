import { Dancing_Script } from "next/font/google";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Logo() {
  return (
    <Link href={"/"}>
      <h1
        className={`text-3xl font-bold flex place-items-center ${dancingScript.className}`}
      >
        MarianaNails
        <Sparkles className="w-5" />
      </h1>
    </Link>
  );
}
