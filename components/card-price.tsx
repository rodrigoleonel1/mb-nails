import { format } from "date-fns";

import { deleteItem } from "@/app/actions";
import { deleteType } from "@/app/actions";
import { Item, Type } from "@/lib/types";
import DeleteButton from "./delete-button";
import { ItemForm } from "./item-form";
import { TypeForm } from "./type-form";

interface CardPriceProps {
  item: Item | Type;
  isTypes: boolean;
}

export default function CardPrice({ item, isTypes }: CardPriceProps) {
  return (
    <article className="font-medium flex flex-col gap-2 w-full bg-violet-400 p-4 rounded-md shadow">
      <div className="flex justify-between place-items-center gap-2">
        <p>{item.name}</p>
        <DeleteButton
          id={String(item._id)}
          action={isTypes ? deleteType : deleteItem}
          label={isTypes ? "tipo" : "item"}
          refresh
        />
      </div>
      {isTypes ? (
        <TypeForm type={item as Type} />
      ) : (
        <ItemForm item={item as Item} />
      )}
      <span className="text-xs">
        Última actualización:
        {item.updatedAt && (
          <span> {format(new Date(item.updatedAt), "dd/MM/yyyy")}</span>
        )}
      </span>
    </article>
  );
}