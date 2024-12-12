import CardLink from "@/components/card-link";
import { HomeCards } from "@/constants";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl flex flex-col gap-6 p-6 bg-violet-300">
      {HomeCards.map((card) => (
        <CardLink
          key={card.title}
          title={card.title}
          subtitle={card.subtitle}
          route={card.route}
        />
      ))}
    </main>
  );
}
