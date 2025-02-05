
import { Item } from "@/lib/types";
import { ItemForm } from "./item-form";
import { format } from "date-fns";

interface CardPriceProps {
  item: Item;
  isTypes: boolean;
}

export default function CardPrice({ item, isTypes }: CardPriceProps) {
  return (
    <article className="font-medium flex justify-between place-items-center gap-2 w-full bg-violet-400 p-4 rounded-md shadow">
      <div className="w-full">
        <p className="flex justify-center place-items-center gap-1">
          {item.name}
        </p>
        <ItemForm item={item} isTypes={isTypes}/>
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
