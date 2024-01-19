import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import TypeModel from "@/models/types";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const type = await TypeModel.findById(params.id);
    return NextResponse.json(type, { status: 200 });
  } catch (error) {
    console.log("[TYPE_GET]", error);
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
    const type = await TypeModel.findByIdAndUpdate({ _id: params.id }, body, {
      new: true,
    });
    return NextResponse.json(type, { status: 200 });
  } catch (error) {
    console.log("[TYPE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
