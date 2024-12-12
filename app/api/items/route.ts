import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import ItemModel from "@/models/item";

export async function GET() {
  try {
    await connectDB();
    const items = await ItemModel.find();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.log("[ITEMS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newItem = new ItemModel(body);
    const item = await newItem.save();
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log("[ITEMS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
