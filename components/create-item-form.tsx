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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio." }),
  price: z.coerce.number().min(0),
  type: z.enum(["decoracion", "extra"]),
});

type CreateItemFormInput = z.input<typeof formSchema>;
type CreateItemFormValues = z.output<typeof formSchema>;

interface CreateItemFormProps {
  onCreated?: () => void;
}

export function CreateItemForm({ onCreated }: CreateItemFormProps) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const form = useForm<CreateItemFormInput, any, CreateItemFormValues>({
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
      await axios.post("/api/items", formData);
      form.reset({ name: "", price: 0, type: formData.type });
      toast.success(`Item "${formData.name}" creado correctamente`);
      onCreated?.();
    } catch (err) {
      console.log({ "CLIENT ERROR": err });

      const api = extractApiErrors(err);
      const entries = Object.entries(api?.fields ?? {});

      if (entries.length > 0) {
        entries.forEach(([path, messages]) => {
          form.setError(path as "name" | "price" | "type", {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(
          api?.message ?? "No se pudo crear el item, intenta de nuevo",
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
        className="flex flex-col gap-2 md:flex-row md:items-start bg-violet-400 p-4 rounded-md shadow"
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
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Categoría</FormLabel>
              <Select
                name="type"
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
        <div className="flex flex-col gap-2">
          <span aria-hidden="true" className="text-xs">
            &nbsp;
          </span>
          <Button disabled={loading} type="submit">
            {loading ? "Agregando..." : "Agregar item"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
