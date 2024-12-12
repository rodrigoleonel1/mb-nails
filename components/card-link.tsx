import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface CardLinkProps {
  title: string;
  subtitle: string;
  route: string;
}

export default function CardLink({ title, subtitle, route }: CardLinkProps) {
  return (
    <article className="bg-violet-400 rounded-md p-4 flex justify-between place-items-center shadow">
      <div>
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm">{subtitle}</p>
      </div>
      <Link
        href={route}
        className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-all text-white"
      >
        <ExternalLink />
      </Link>
    </article>
  );
}
