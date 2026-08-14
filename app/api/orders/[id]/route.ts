import { deleteOrder } from "@/services/orders";
import { NextResponse } from "next/server";
import { objectIdSchema } from "@/lib/validations";
import { badRequest, notFound } from "@/lib/server-errors";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!objectIdSchema.safeParse(id).success) {
      return badRequest("El id de la orden no es válido.");
    }

    const order = await deleteOrder(id);
    if (!order) return notFound("La orden no existe.");

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}