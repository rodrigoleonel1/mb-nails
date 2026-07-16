import { deleteType, getTypeById, updateType } from "@/services/types";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const type = await getTypeById(params.id);
    return NextResponse.json(type, { status: 200 });
  } catch (error) {
    console.log("[TYPE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const type = await updateType(params.id, body);
    return NextResponse.json(type, { status: 200 });
  } catch (error) {
    console.log("[TYPE_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const type = await deleteType(params.id);
    return NextResponse.json(type, { status: 200 });
  } catch (error) {
    console.log("[TYPE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
