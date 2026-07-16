import { createOrder, getOrders } from "@/services/orders";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order = await createOrder(body);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[ORDER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
