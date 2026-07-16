"use client";

import * as z from "zod";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Item, Type } from "@/lib/types";
import { formatter } from "@/lib/utils";
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
  type: z.string().min(1, { message: "Selecciona una opción." }),
  quantities: z.record(z.coerce.number().min(0)),
});

type OrderFormValues = z.infer<typeof formSchema>;

export default function OrderForm({
  items,
  types,
}: {
  types: Type[];
  items: Item[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const extras = items.filter((item) => item.type === "extra");
  const decorations = items.filter((item) => item.type === "decoracion");

  const defaultQuantities = items.reduce(
    (acc, item) => {
      acc[String(item._id)] = 0;
      return acc;
    },
    {} as Record<string, number>,
  );

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      quantities: defaultQuantities,
    },
  });

  const watchType = form.watch("type");
  const watchQuantities = form.watch("quantities");

  const selectedType = types.find((t) => String(t._id) === watchType);
  const itemsTotal = items.reduce((accumulator, item) => {
    const quantity = Number(watchQuantities?.[String(item._id)]) || 0;
    return accumulator + item.price * quantity;
  }, 0);
  const totalPreview = (selectedType?.price ?? 0) + itemsTotal;

  const onSubmit = async (formData: OrderFormValues) => {
    try {
      setLoading(true);
      const prices: number[] = [];
      const extrasOrder: Item[] = [];
      const decorationsOrder: Item[] = [];

      const type = types.find((t) => String(t._id) === formData.type);
      if (type?.price) prices.push(type.price);

      items.forEach((item) => {
        const quantity = formData.quantities[String(item._id)] ?? 0;
        if (!quantity) return;

        const orderItem = {
          name: item.name,
          price: item.price * quantity,
          type: item.type,
          quantity,
        };

        if (item.type === "extra") extrasOrder.push(orderItem);
        else decorationsOrder.push(orderItem);

        prices.push(orderItem.price);
      });

      const totalPrice = prices.reduce(
        (accumulator, number) => accumulator + number,
        0,
      );

      const order = {
        type,
        extras: extrasOrder,
        decorations: decorationsOrder,
        total: totalPrice,
      };

      const response: AxiosResponse = await axios.post("/api/orders", order);
      const data = response.data;

      router.refresh();
      router.push(`/orders/${data._id}`);
    } catch (error) {
      console.log({ "CLIENT ERROR": error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col max-w-3xl mx-auto gap-4 p-6"
      >
        <h2 className="text-2xl font-bold tracking-tight">Tipo de uña</h2>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de uña</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Selecciona un tipo"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem
                      className="cursor-pointer"
                      key={String(type._id)}
                      value={String(type._id)}
                    >
                      {type.name} - {formatter.format(type.price)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {extras.length > 0 && (
          <h2 className="text-2xl font-bold tracking-tight">Extras</h2>
        )}
        {extras.map((item) => (
          <FormField
            key={String(item._id)}
            control={form.control}
            name={`quantities.${String(item._id)}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-full flex justify-between">
                  {item.name}
                  <span>{formatter.format(item.price)}</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    min={0}
                    placeholder={`Cantidad de ${item.name.toLowerCase()}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {decorations.length > 0 && (
          <h2 className="text-2xl font-bold tracking-tight">Decoraciones</h2>
        )}
        {decorations.map((item) => (
          <FormField
            key={String(item._id)}
            control={form.control}
            name={`quantities.${String(item._id)}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-full flex justify-between">
                  {item.name}
                  <span>{formatter.format(item.price)}</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    min={0}
                    placeholder={`Cantidad de ${item.name.toLowerCase()}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="flex justify-between place-items-center font-semibold text-lg bg-violet-400 rounded-md px-4 py-3">
          <span>Total</span>
          <span>{formatter.format(totalPreview)}</span>
        </div>

        <Button disabled={loading} className="w-full" type="submit">
          Crear orden
        </Button>
      </form>
    </Form>
  );
}
