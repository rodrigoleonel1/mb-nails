"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

import { Item, Type } from "@/lib/types";
import { createOrderAction, type ActionState } from "@/app/actions";
import { formatter } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = { ok: false };

const selectClassName =
  "flex h-10 w-full rounded-md border border-violet-800 bg-violet-500 px-3 py-2 text-sm text-white shadow-sm [&>option]:text-black cursor-pointer";

export default function OrderForm({
  items,
  types,
}: {
  types: Type[];
  items: Item[];
}) {
  const router = useRouter();
  const toast = useToast();
  const [state, formAction, pending] = useActionState(
    createOrderAction,
    initialState,
  );
  const [typeId, setTypeId] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(items.map((item) => [String(item._id), 0])),
  );

  useEffect(() => {
    if (!state.ok) return;
    toast.success("Orden creada correctamente");
    router.push(`/orders/${state.orderId}`);
  }, [state, router, toast]);

  const extras = items.filter((item) => item.type === "extra");
  const decorations = items.filter((item) => item.type === "decoracion");
  const selectedType = types.find((t) => String(t._id) === typeId);
  const itemsTotal = items.reduce(
    (acc, item) => acc + item.price * (quantities[String(item._id)] ?? 0),
    0,
  );
  const totalPreview = (selectedType?.price ?? 0) + itemsTotal;
  const typeError = state.fields?.type?.[0];

  const renderQuantityField = (item: Item) => {
    const id = String(item._id);
    const error = state.fields?.[`quantities.${id}`]?.[0];

    return (
      <div key={id} className="space-y-2">
        <Label htmlFor={`qty-${id}`} className="w-full flex justify-between">
          {item.name}
          <span>{formatter.format(item.price)}</span>
        </Label>
        <Input
          id={`qty-${id}`}
          name={`quantities-${id}`}
          type="number"
          min={0}
          value={quantities[id] ?? 0}
          onChange={(e) =>
            setQuantities((prev) => ({
              ...prev,
              [id]: Math.max(0, Number(e.target.value) || 0),
            }))
          }
          disabled={pending}
        />
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  };

  return (
    <form
      action={formAction}
      className="flex flex-col max-w-3xl mx-auto gap-4 p-6"
    >
      <h2 className="text-2xl font-bold tracking-tight">Tipo de uña</h2>
      <div className="space-y-2">
        <Label htmlFor="order-type">Tipo de uña</Label>
        <select
          id="order-type"
          name="type"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          disabled={pending}
          aria-invalid={!!typeError}
          className={selectClassName}
        >
          <option value="" disabled>
            Selecciona un tipo
          </option>
          {types.map((type) => (
            <option key={String(type._id)} value={String(type._id)}>
              {type.name} - {formatter.format(type.price)}
            </option>
          ))}
        </select>
        {typeError && (
          <p className="text-sm font-medium text-destructive">{typeError}</p>
        )}
      </div>

      {extras.length > 0 && (
        <h2 className="text-2xl font-bold tracking-tight">Extras</h2>
      )}
      {extras.map(renderQuantityField)}

      {decorations.length > 0 && (
        <h2 className="text-2xl font-bold tracking-tight">Decoraciones</h2>
      )}
      {decorations.map(renderQuantityField)}

      <div className="flex justify-between place-items-center font-semibold text-lg bg-violet-400 rounded-md px-4 py-3">
        <span>Total</span>
        <span>{formatter.format(totalPreview)}</span>
      </div>

      <Button disabled={pending} className="w-full" type="submit">
        {pending ? "Creando..." : "Crear orden"}
      </Button>
    </form>
  );
}