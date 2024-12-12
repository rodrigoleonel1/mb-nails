
import { Item } from "@/lib/types";
import { ItemForm } from "./item-form";
import { format } from "date-fns";

interface CardPriceProps {
  item: Item;
}

export default function CardPrice({ item }: CardPriceProps) {
  return (
    <article className="font-medium flex justify-between place-items-center gap-2 w-full bg-violet-400 p-4 rounded-md shadow">
      <div className="w-full">
        <p className="flex justify-center place-items-center gap-1">
          {item.name}:{item && <ItemForm item={item} />}
        </p>
        <span>
          Última actualización:
          {item.updatedAt && (
            <span> {format(item.updatedAt, "dd/MM/yyyy")}</span>
          )}
        </span>
      </div>
    </article>
  );
}
