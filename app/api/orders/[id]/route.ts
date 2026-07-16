import { deleteOrder, getOrderById } from "@/services/orders";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const order = await getOrderById(params.id);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const order = await deleteOrder(params.id);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
