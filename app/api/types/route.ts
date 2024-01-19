import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import TypeModel from "@/models/types";

export async function GET() {
  try {
    await connectDB();
    const types = await TypeModel.find();
    return NextResponse.json(types, { status: 200 });
  } catch (error) {
    console.log("[TYPES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newType = new TypeModel(body);
    const type = await newType.save();
    return NextResponse.json(type, { status: 200 });
  } catch (error) {
    console.log("[TYPES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
