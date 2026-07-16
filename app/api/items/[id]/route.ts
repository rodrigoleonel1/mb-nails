import { deleteItem, getItemById, updateItem } from "@/services/items";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const item = await getItemById(params.id);
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log("[ITEM_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const item = await updateItem(params.id, body);
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log("[ITEM_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const item = await deleteItem(params.id);
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log("[ITEM_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
