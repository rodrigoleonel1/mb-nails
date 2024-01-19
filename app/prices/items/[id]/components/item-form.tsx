"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Item } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  price: z.coerce.number().min(0),
});

type TypeFormValues = z.infer<typeof formSchema>;

export default function ItemForm({ item }: { item: Item }) {
  const router = useRouter();
  console.log(item)

  const [loading, setLoading] = useState(false);

  const form = useForm<TypeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: item.price,
    },
  });

  const onSubmit = async (formData: TypeFormValues) => {
    try {
      setLoading(true);
      await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/api/items/${item._id}`,
        formData
      );
      router.refresh();
      router.push(`${process.env.NEXT_PUBLIC_URL}/prices/items`);
    } catch (error: any) {
      console.log({ "CLIENT ERROR": error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 "
      >
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full flex justify-between">
                Precio<span></span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={loading}
                  placeholder="Cantidad de encapsuladas"
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
