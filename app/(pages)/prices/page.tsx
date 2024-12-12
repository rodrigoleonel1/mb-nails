import CardLink from "@/components/card-link";
import { PricesCards } from "@/constants";

export default function PricesPage() {
  return (
    <main className="mx-auto max-w-3xl flex flex-col gap-6 p-6 bg-violet-300">
      <header>
        <h2 className="text-2xl font-bold tracking-tight">Mis precios</h2>
        <p className="text-sm">Elige que lista precios quieres editar.</p>
      </header>
      <section className="flex flex-col gap-4">
        {PricesCards.map((card) => (
          <CardLink
            key={card.title}
            title={card.title}
            subtitle={card.subtitle}
            route={card.route}
          />
        ))}
      </section>
    </main>
  );
}
