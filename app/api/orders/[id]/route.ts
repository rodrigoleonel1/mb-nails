import { deleteOrder, getOrderById } from "@/services/orders";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const order = await getOrderById(id);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const order = await deleteOrder(id);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
