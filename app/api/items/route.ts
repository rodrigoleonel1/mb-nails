import { createItem, getItems } from "@/services/items";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const items = await getItems();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.log("[ITEMS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const item = await createItem(body);
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log("[ITEMS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
