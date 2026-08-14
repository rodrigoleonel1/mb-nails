import { z } from "zod";

export const ITEM_TYPES = ["decoracion", "extra"] as const;

const nameSchema = z
  .string({ error: "El nombre es obligatorio." })
  .trim()
  .min(1, { message: "El nombre es obligatorio." });

const priceSchema = z.coerce
  .number({ error: "El precio debe ser un número." })
  .int({ message: "El precio debe ser un número entero." })
  .min(0, { message: "El precio no puede ser negativo." });

export const itemTypeSchema = z.enum(ITEM_TYPES, {
  error: "La categoría debe ser 'decoracion' u 'extra'.",
});

export const objectIdSchema = z.string().trim().regex(/^[0-9a-fA-F]{24}$/, {
  message: "El id enviado no es válido.",
});

export const typeSchema = z.object({
  name: nameSchema,
  price: priceSchema,
});

export const typeUpdateSchema = typeSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "Debes enviar al menos un campo para actualizar." },
);

export const itemSchema = z.object({
  name: nameSchema,
  price: priceSchema,
  type: itemTypeSchema,
});

export const itemUpdateSchema = itemSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "Debes enviar al menos un campo para actualizar." },
);

const orderItemSchema = z.object({
  name: nameSchema,
  price: priceSchema,
  type: itemTypeSchema,
  quantity: z.coerce
    .number({ error: "La cantidad debe ser un número." })
    .int({ message: "La cantidad debe ser un número entero." })
    .min(1, { message: "La cantidad debe ser al menos 1." }),
});

const orderTypeSchema = z
  .object({
    _id: objectIdSchema,
    name: nameSchema,
    price: priceSchema,
  })
  .passthrough();

export const orderSchema = z.object({
  type: orderTypeSchema,
  extras: z.array(orderItemSchema).default([]),
  decorations: z.array(orderItemSchema).default([]),
});

export function computeOrderTotal(data: OrderInput): number {
  const itemsTotal = [...data.extras, ...data.decorations].reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return data.type.price + itemsTotal;
}

export type OrderInput = z.infer<typeof orderSchema>;