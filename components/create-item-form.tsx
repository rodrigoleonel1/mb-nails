"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio." }),
  price: z.coerce.number().min(0),
  type: z.enum(["decoracion", "extra"]),
});

type CreateItemFormValues = z.infer<typeof formSchema>;

interface CreateItemFormProps {
  onCreated?: () => void;
}

export function CreateItemForm({ onCreated }: CreateItemFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CreateItemFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      type: "extra",
    },
  });

  const onSubmit = async (formData: CreateItemFormValues) => {
    try {
      setLoading(true);
      setError(null);
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/items`, formData);
      form.reset({ name: "", price: 0, type: formData.type });
      onCreated?.();
    } catch (err: any) {
      console.log({ "CLIENT ERROR": err });
      setError("No se pudo crear el item. Intenta de nuevo.");
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
              <FormLabel className="text-xs">Nombre del item</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  className="placeholder:text-white/70"
                  placeholder="Ej: Efecto Aurora"
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
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Categoría</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="extra">
                    Extra
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="decoracion">
                    Decoración
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading ? "Agregando..." : "Agregar item"}
        </Button>
        {error && <p className="text-sm text-red-800 w-full">{error}</p>}
      </form>
    </Form>
  );
}
