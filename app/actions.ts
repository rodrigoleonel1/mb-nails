"use server";

import { updateTag } from "next/cache";
import { z } from "zod";

import { Item } from "@/lib/types";
import {
  itemSchema,
  orderSchema,
  typeSchema,
} from "@/lib/validations";
import {
  createItem as createItemService,
  deleteItem as deleteItemService,
  getItems,
  updateItem as updateItemService,
} from "@/services/items";
import {
  createOrder as createOrderService,
  deleteOrder as deleteOrderService,
} from "@/services/orders";
import {
  createType as createTypeService,
  deleteType as deleteTypeService,
  getTypeById,
  updateType as updateTypeService,
} from "@/services/types";

export interface ActionState {
  ok: boolean;
  message?: string;
  fields?: Record<string, string[]>;
  orderId?: string;
}

function fieldsFromIssues(issues: z.ZodIssue[]): Record<string, string[]> {
  return issues.reduce<Record<string, string[]>>((acc, issue) => {
    const key = issue.path.join(".") || "form";
    (acc[key] ??= []).push(issue.message);
    return acc;
  }, {});
}

export async function createTypeAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = typeSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
  });
  if (!parsed.success) {
    return { ok: false, fields: fieldsFromIssues(parsed.error.issues) };
  }

  await createTypeService(parsed.data);
  updateTag("types");
  return { ok: true };
}

export async function updateTypeAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const parsed = typeSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
  });
  if (!parsed.success) {
    return { ok: false, fields: fieldsFromIssues(parsed.error.issues) };
  }

  const updated = await updateTypeService(id, parsed.data);
  if (!updated) return { ok: false, message: "El tipo no existe." };

  updateTag("types");
  return { ok: true };
}

export async function createItemAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = itemSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    type: formData.get("type"),
  });
  if (!parsed.success) {
    return { ok: false, fields: fieldsFromIssues(parsed.error.issues) };
  }

  await createItemService(parsed.data);
  updateTag("items");
  return { ok: true };
}

export async function updateItemAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const parsed = itemSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    type: formData.get("type"),
  });
  if (!parsed.success) {
    return { ok: false, fields: fieldsFromIssues(parsed.error.issues) };
  }

  const updated = await updateItemService(id, parsed.data);
  if (!updated) return { ok: false, message: "El item no existe." };

  updateTag("items");
  return { ok: true };
}

const orderFormSchema = z.object({
  type: z.string().min(1, { message: "Selecciona una opción." }),
  quantities: z.record(
    z.string(),
    z.coerce.number().int().min(0, { message: "La cantidad no puede ser negativa." }),
  ),
});

export async function createOrderAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const quantities: Record<string, number> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("quantities-")) {
      const id = key.slice("quantities-".length);
      quantities[id] = value === "" ? 0 : Number(value);
    }
  }

  const parsed = orderFormSchema.safeParse({
    type: formData.get("type"),
    quantities,
  });
  if (!parsed.success) {
    return { ok: false, fields: fieldsFromIssues(parsed.error.issues) };
  }

  const type = await getTypeById(parsed.data.type);
  if (!type) return { ok: false, message: "El tipo de uña seleccionado no existe." };

  const items = await getItems();
  const extras: Item[] = [];
  const decorations: Item[] = [];

  for (const item of items) {
    const quantity = parsed.data.quantities[String(item._id)] ?? 0;
    if (!quantity) continue;

    const orderItem: Item = {
      name: item.name,
      price: item.price,
      type: item.type,
      quantity,
    };

    if (item.type === "extra") extras.push(orderItem);
    else decorations.push(orderItem);
  }

  const orderInput = {
    type: { _id: String(type._id), name: type.name, price: type.price },
    extras,
    decorations,
  };

  const validated = orderSchema.safeParse(orderInput);
  if (!validated.success) {
    return { ok: false, fields: fieldsFromIssues(validated.error.issues) };
  }

  const order = await createOrderService(validated.data);
  updateTag("orders");
  return { ok: true, orderId: String(order._id) };
}

export async function deleteType(id: string) {
  const deleted = await deleteTypeService(id);
  if (!deleted) throw new Error("El tipo no existe.");
  updateTag("types");
}

export async function deleteItem(id: string) {
  const deleted = await deleteItemService(id);
  if (!deleted) throw new Error("El item no existe.");
  updateTag("items");
}

export async function deleteOrder(id: string) {
  const deleted = await deleteOrderService(id);
  if (!deleted) throw new Error("La orden no existe.");
  updateTag("orders");
}