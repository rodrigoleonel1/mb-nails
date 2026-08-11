"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { extractApiErrors } from "@/lib/client-errors";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio." }),
  price: z.coerce.number().min(0),
});

type CreateTypeFormInput = z.input<typeof formSchema>;
type CreateTypeFormValues = z.output<typeof formSchema>;

interface CreateTypeFormProps {
  onCreated?: () => void;
}

export function CreateTypeForm({ onCreated }: CreateTypeFormProps) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const form = useForm<CreateTypeFormInput, any, CreateTypeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const onSubmit = async (formData: CreateTypeFormValues) => {
    try {
      setLoading(true);
      await axios.post("/api/types", formData);
      form.reset({ name: "", price: 0 });
      toast.success(`Tipo "${formData.name}" creado correctamente`);
      onCreated?.();
    } catch (err) {
      console.log({ "CLIENT ERROR": err });

      const api = extractApiErrors(err);
      const entries = Object.entries(api?.fields ?? {});

      if (entries.length > 0) {
        entries.forEach(([path, messages]) => {
          form.setError(path as "name" | "price", {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(
          api?.message ?? "No se pudo crear el tipo, intenta de nuevo",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap place-items-end gap-2 bg-violet-400 p-4 rounded-md shadow"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1 min-w-[160px]">
              <FormLabel className="text-xs">Nombre del tipo</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Ej: Acrílicas Nº7"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Precio</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  disabled={loading}
                  {...field}
                  value={field.value as number}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <span aria-hidden="true" className="text-xs">
            &nbsp;
          </span>
          <Button disabled={loading} type="submit">
            {loading ? "Agregando..." : "Agregar tipo"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
