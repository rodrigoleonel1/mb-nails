import { deleteType, getTypeById, updateType } from "@/services/types";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const type = await getTypeById(id);
    return NextResponse.json(type, { status: 200 });
  } catch (error) {
    console.log("[TYPE_GET]", error);
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
    const type = await updateType(id, body);
    return NextResponse.json(type, { status: 200 });
  } catch (error) {
    console.log("[TYPE_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const type = await deleteType(id);
    return NextResponse.json(type, { status: 200 });
  } catch (error) {
    console.log("[TYPE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
