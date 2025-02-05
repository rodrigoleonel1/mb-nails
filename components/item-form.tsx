"use client";

import * as z from "zod";
import axios from "axios";
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

interface ItemFormProps {
  item: Item;
  isTypes: boolean;
}

export function ItemForm({ item, isTypes }: ItemFormProps) {
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
      if(!isTypes){
        await axios.put(
          `${process.env.NEXT_PUBLIC_URL}/api/items/${item._id}`,
          formData
        );
      } else {
        await axios.put(
          `${process.env.NEXT_PUBLIC_URL}/api/types/${item._id}`,
          formData
        );
      }
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
        className="flex place-items-center gap-4 justify-center mb-2"
      >
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="flex place-items-center">
              <FormLabel className="mt-2 font-normal text-2xl">
                $
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={loading}
                  placeholder="Cantidad de encapsuladas"
                  min={0}
                  className="text-md"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={loading} type="submit">
          Actualizar
        </Button>
      </form>
    </Form>
  );
}