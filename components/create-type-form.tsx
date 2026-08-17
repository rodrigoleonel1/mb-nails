"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

import { createTypeAction, type ActionState } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = { ok: false };

export function CreateTypeForm() {
  const router = useRouter();
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    createTypeAction,
    initialState,
  );

  useEffect(() => {
    if (!state.ok) return;
    formRef.current?.reset();
    toast.success("Tipo creado correctamente");
    router.refresh();
  }, [state, router, toast]);

  const nameError = state.fields?.name?.[0];
  const priceError = state.fields?.price?.[0];

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-wrap place-items-end gap-2 bg-violet-400 p-4 rounded-md shadow"
    >
      <div className="flex-1 min-w-[160px] space-y-2">
        <Label className="text-xs" htmlFor="type-name">
          Nombre del tipo
        </Label>
        <Input
          id="type-name"
          name="name"
          placeholder="Ej: Acrílicas Nº7"
          disabled={pending}
          aria-invalid={!!nameError}
        />
        {nameError && (
          <p className="text-sm font-medium text-destructive">{nameError}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-xs" htmlFor="type-price">
          Precio
        </Label>
        <Input
          id="type-price"
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
      <div className="flex flex-col gap-2">
        <span aria-hidden="true" className="text-xs">
          &nbsp;
        </span>
        <Button disabled={pending} type="submit">
          {pending ? "Agregando..." : "Agregar tipo"}
        </Button>
      </div>
    </form>
  );
}