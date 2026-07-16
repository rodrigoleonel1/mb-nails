"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Type } from "@/lib/types";
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

type TypeFormValues = z.infer<typeof formSchema>;

export function TypeForm({ type }: { type: Type }) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const form = useForm<TypeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: type.name,
      price: type.price,
    },
  });

  const onSubmit = async (formData: TypeFormValues) => {
    try {
      setLoading(true);
      await axios.put(`/api/types/${type._id}`, formData);
      toast.success("Tipo actualizado ✓");
    } catch (error) {
      console.log({ "CLIENT ERROR": error });
      toast.error("No se pudo actualizar el tipo. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-2 md:items-end mb-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1 min-w-[120px]">
              <FormLabel className="text-xs">Nombre</FormLabel>
              <FormControl>
                <Input disabled={loading} className="text-md" {...field} />
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
                  disabled={loading}
                  className="text-md"
                  min={0}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          Actualizar
        </Button>
      </form>
    </Form>
  );
}
