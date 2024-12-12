"use client";

import * as z from "zod";

import { Type } from "@/models/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Item } from "@/lib/types";
import { formatter, getKey } from "@/lib/utils";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  type: z.string().min(1, { message: "Selecciona una opción." }),
  encapsuladas: z.coerce.number().min(0),
  francesas: z.coerce.number().min(0),
  babyboomer: z.coerce.number().min(0),
  aurora: z.coerce.number().min(0),
  espejo: z.coerce.number().min(0),
  nailart: z.coerce.number().min(0),
  strass: z.coerce.number().min(0),
  relieve: z.coerce.number().min(0),
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

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      encapsuladas: 0,
      francesas: 0,
      babyboomer: 0,
      aurora: 0,
      espejo: 0,
      nailart: 0,
      strass: 0,
      relieve: 0,
    },
  });

  const onSubmit = async (formData: OrderFormValues) => {
    try {
      setLoading(true);
      const prices: number[] = [];
      const extras: Item[] = [];
      const decorations: Item[] = [];

      const type = types.find((type) => type._id === formData.type);
      type?.price && prices.push(type?.price);

      items.map((item) => {
        const key = getKey(item.name);
        if (item.type == "extra") {
          extras.push({
            name: item.name,
            price: item.price * formData[key],
            type: item.type,
            quantity: formData[key],
          });
          prices.push(item.price * formData[key]);
        }
      });

      items.map((item) => {
        const key = getKey(item.name);
        if (item.type == "decoracion") {
          decorations.push({
            name: item.name,
            price: item.price * formData[key],
            type: item.type,
            quantity: formData[key],
          });
          prices.push(item.price * formData[key]);
        }
      });

      const totalPrice = prices.reduce(
        (accumulator, number) => accumulator + number,
        0
      );

      const order = {
        type,
        extras,
        decorations,
        total: totalPrice,
      };

      const response: AxiosResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/orders`,
        order
      );
      const data = response.data;

      router.refresh();
      router.push(`${process.env.NEXT_PUBLIC_URL}/orders/${data._id}`);
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
                      key={type._id}
                      value={type._id}
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
        <h2 className="text-2xl font-bold tracking-tight">Extras</h2>
        <FormField
          control={form.control}
          name="encapsuladas"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full flex justify-between">
                Encapsuladas<span>{formatter.format(items[0].price)}</span>
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
        <FormField
          control={form.control}
          name="francesas"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full flex justify-between">
                Francesas<span>{formatter.format(items[1].price)}</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={loading}
                  min={0}
                  placeholder="Cantidad de francesas"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="babyboomer"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full flex justify-between">
                Babyboomer<span>{formatter.format(items[2].price)}</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={loading}
                  min={0}
                  placeholder="Cantidad de babyboomers"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aurora"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full flex justify-between">
                Efecto Aurora<span>{formatter.format(items[5].price)}</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={loading}
                  min={0}
                  placeholder="Cantidad de efecto aurora"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="espejo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full flex justify-between">
                Efecto Espejo<span>{formatter.format(items[7].price)}</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={loading}
                  min={0}
                  placeholder="Cantidad de efecto espejo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h2 className="text-2xl font-bold tracking-tight">Decoraciones</h2>
        <FormField
          control={form.control}
          name="nailart"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full flex justify-between">
                Nailart<span>{formatter.format(items[3].price)}</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={loading}
                  min={0}
                  placeholder="Cantidad de nailart"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="strass"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full flex justify-between">
                Strass<span>{formatter.format(items[4].price)}</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={loading}
                  min={0}
                  placeholder="Cantidad de strass"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relieve"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-full flex justify-between">
                Efecto 3D<span>{formatter.format(items[6].price)}</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={loading}
                  min={0}
                  placeholder="Cantidad de 3D"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} className="w-full" type="submit">
          Crear orden
        </Button>
      </form>
    </Form>
  );
}
