"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

import { createItemAction, type ActionState } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = { ok: false };

const selectClassName =
  "flex h-10 w-[140px] rounded-md border border-violet-800 bg-violet-500 px-3 py-2 text-sm text-white shadow-sm [&>option]:text-black cursor-pointer";

export function CreateItemForm() {
  const router = useRouter();
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    createItemAction,
    initialState,
  );

  useEffect(() => {
    if (!state.ok) return;
    formRef.current?.reset();
    toast.success("Item creado correctamente");
    router.refresh();
  }, [state, router, toast]);

  const nameError = state.fields?.name?.[0];
  const priceError = state.fields?.price?.[0];
  const typeError = state.fields?.type?.[0];

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-2 md:flex-row md:items-start bg-violet-400 p-4 rounded-md shadow"
    >
      <div className="flex-1 min-w-[160px] space-y-2">
        <Label className="text-xs" htmlFor="item-name">
          Nombre del item
        </Label>
        <Input
          id="item-name"
          name="name"
          placeholder="Ej: Efecto Aurora"
          disabled={pending}
          aria-invalid={!!nameError}
        />
        {nameError && (
          <p className="text-sm font-medium text-destructive">{nameError}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-xs" htmlFor="item-price">
          Precio
        </Label>
        <Input
          id="item-price"
          name="price"
          type="number"
          min={0}
          disabled={pending}
          aria-invalid={!!priceError}
        />
        {priceError && (
          <p className="text-sm font-medium text-destructive">{priceError}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-xs" htmlFor="item-type">
          Categoría
        </Label>
        <select
          id="item-type"
          name="type"
          defaultValue="extra"
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
          {pending ? "Agregando..." : "Agregar item"}
        </Button>
      </div>
    </form>
  );
}