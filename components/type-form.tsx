"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

import { Type } from "@/lib/types";
import { updateTypeAction, type ActionState } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = { ok: false };

export function TypeForm({ type }: { type: Type }) {
  const router = useRouter();
  const toast = useToast();
  const [state, formAction, pending] = useActionState(
    updateTypeAction,
    initialState,
  );

  useEffect(() => {
    if (state.ok) {
      toast.success("Tipo actualizado");
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router, toast]);

  const nameError = state.fields?.name?.[0];
  const priceError = state.fields?.price?.[0];
  const id = String(type._id);

  return (
    <form
      action={formAction}
      className="flex flex-col md:flex-row gap-2 md:items-end mb-2"
    >
      <input type="hidden" name="id" value={id} />
      <div className="flex-1 min-w-[120px] space-y-2">
        <Label className="text-xs" htmlFor={`type-name-${id}`}>
          Nombre
        </Label>
        <Input
          id={`type-name-${id}`}
          name="name"
          defaultValue={type.name}
          disabled={pending}
          aria-invalid={!!nameError}
        />
        {nameError && (
          <p className="text-sm font-medium text-destructive">{nameError}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-xs" htmlFor={`type-price-${id}`}>
          Precio
        </Label>
        <Input
          id={`type-price-${id}`}
          name="price"
          type="number"
          min={0}
          defaultValue={type.price}
          disabled={pending}
          aria-invalid={!!priceError}
        />
        {priceError && (
          <p className="text-sm font-medium text-destructive">{priceError}</p>
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