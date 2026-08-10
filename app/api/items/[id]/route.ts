import { deleteItem, getItemById, updateItem } from "@/services/items";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const item = await getItemById(id);
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log("[ITEM_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const item = await updateItem(id, body);
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log("[ITEM_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const item = await deleteItem(id);
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log("[ITEM_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
