import { createOrder } from "@/services/orders";
import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/validations";
import { readJson, validationError } from "@/lib/server-errors";

export async function POST(req: Request) {
  try {
    const json = await readJson(req);
    if (!json.ok) return json.response;

    const parsed = orderSchema.safeParse(json.body);
    if (!parsed.success) return validationError(parsed.error);

    const order = await createOrder(parsed.data);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.log("[ORDER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}