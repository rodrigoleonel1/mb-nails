import { format } from "date-fns";

import { Item, Type } from "@/lib/types";
import { ItemForm } from "./item-form";
import { TypeForm } from "./type-form";
import DeleteButton from "./delete-button";

interface CardPriceProps {
  item: Item | Type;
  isTypes: boolean;
  onDeleted?: () => void;
}

export default function CardPrice({
  item,
  isTypes,
  onDeleted,
}: CardPriceProps) {
  return (
    <article className="font-medium flex flex-col gap-2 w-full bg-violet-400 p-4 rounded-md shadow">
      <div className="flex justify-between place-items-center gap-2">
        <p>{item.name}</p>
        <DeleteButton
          id={String(item._id)}
          resource={isTypes ? "types" : "items"}
          onSuccess={onDeleted}
        />
      </div>
      {isTypes ? (
        <TypeForm type={item as Type} />
      ) : (
        <ItemForm item={item as Item} />
      )}
      <span className="text-xs">
        Última actualización:
        {item.updatedAt && <span> {format(item.updatedAt, "dd/MM/yyyy")}</span>}
      </span>
    </article>
  );
}
