"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Item } from "@/lib/types";
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

type ItemFormInput = z.input<typeof formSchema>;
type ItemFormValues = z.output<typeof formSchema>;

interface ItemFormProps {
  item: Item;
}

export function ItemForm({ item }: ItemFormProps) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const form = useForm<ItemFormInput, any, ItemFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      price: item.price,
      type: item.type,
    },
  });

  const onSubmit = async (formData: ItemFormValues) => {
    try {
      setLoading(true);
      await axios.put(`/api/items/${item._id}`, formData);
      toast.success("Item actualizado");
    } catch (error) {
      console.log({ "CLIENT ERROR": error });
      toast.error("No se pudo actualizar el item, intenta de nuevo");
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
            <FormItem className="flex-1 min-w-[160px]">
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
                  min={0}
                  className="text-md"
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
          Actualizar
        </Button>
      </form>
    </Form>
  );
}
