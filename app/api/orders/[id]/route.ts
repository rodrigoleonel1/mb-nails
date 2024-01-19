import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import OrderModel from "@/models/order";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    revalidateTag("orders");
    await connectDB();
    const order = await OrderModel.findById(params.id);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    revalidateTag("orders");
    await connectDB();
    const order = await OrderModel.findByIdAndDelete(params.id);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
