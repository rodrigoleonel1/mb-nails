"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

type CreateTypeFormValues = z.infer<typeof formSchema>;

interface CreateTypeFormProps {
  onCreated?: () => void;
}

export function CreateTypeForm({ onCreated }: CreateTypeFormProps) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const form = useForm<CreateTypeFormValues>({
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
      toast.error("No se pudo crear el tipo, intenta de nuevo");
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
                  className="placeholder:text-white/70"
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
                <Input type="number" min={0} disabled={loading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading ? "Agregando..." : "Agregar tipo"}
        </Button>
      </form>
    </Form>
  );
}
