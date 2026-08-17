"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

import { Item } from "@/lib/types";
import { updateItemAction, type ActionState } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = { ok: false };

const selectClassName =
  "flex h-10 w-[140px] rounded-md border border-violet-800 bg-violet-500 px-3 py-2 text-sm text-white shadow-sm [&>option]:text-black cursor-pointer";

export function ItemForm({ item }: { item: Item }) {
  const router = useRouter();
  const toast = useToast();
  const [state, formAction, pending] = useActionState(
    updateItemAction,
    initialState,
  );

  useEffect(() => {
    if (state.ok) {
      toast.success("Item actualizado");
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router, toast]);

  const nameError = state.fields?.name?.[0];
  const priceError = state.fields?.price?.[0];
  const typeError = state.fields?.type?.[0];
  const id = String(item._id);

  return (
    <form
      action={formAction}
      className="flex flex-col md:flex-row gap-2 md:items-start mb-2"
    >
      <input type="hidden" name="id" value={id} />
      <div className="flex-1 min-w-40 space-y-2">
        <Label className="text-xs" htmlFor={`item-name-${id}`}>
          Nombre
        </Label>
        <Input
          id={`item-name-${id}`}
          name="name"
          defaultValue={item.name}
          disabled={pending}
          aria-invalid={!!nameError}
        />
        {nameError && (
          <p className="text-sm font-medium text-destructive">{nameError}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-xs" htmlFor={`item-price-${id}`}>
          Precio
        </Label>
        <Input
          id={`item-price-${id}`}
          name="price"
          type="number"
          min={0}
          defaultValue={item.price}
          disabled={pending}
          aria-invalid={!!priceError}
        />
        {priceError && (
          <p className="text-sm font-medium text-destructive">{priceError}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-xs" htmlFor={`item-type-${id}`}>
          Categoría
        </Label>
        <select
          id={`item-type-${id}`}
          name="type"
          defaultValue={item.type}
          disabled={pending}
          aria-invalid={!!typeError}
          className={selectClassName}
        >
          <option value="extra">Extra</option>
          <option value="decoracion">Decoración</option>
        </select>
        {typeError && (
          <p className="text-sm font-medium text-destructive">{typeError}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <span aria-hidden="true" className="text-xs">
          &nbsp;
        </span>
        <Button disabled={pending} type="submit">
          {pending ? "Guardando..." : "Actualizar"}
        </Button>
      </div>
    </form>
  );
}