import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import OrderModel from "@/models/order";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    await connectDB();
    const orders = await OrderModel.find();

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newOrder = new OrderModel(body);
    const order = await newOrder.save();
    revalidateTag("orders");
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[ORDER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
