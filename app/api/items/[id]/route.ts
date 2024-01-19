import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import ItemModel from "@/models/item";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const item = await ItemModel.findById(params.id);
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log("[ITEM_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await req.json();
    const item = await ItemModel.findByIdAndUpdate({ _id: params.id }, body, {
      new: true,
    });
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log("[ITEM_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
