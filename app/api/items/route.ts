import { createItem, getItems } from "@/services/items";
import { NextResponse } from "next/server";
import { itemSchema } from "@/lib/validations";
import { readJson, validationError } from "@/lib/server-errors";

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
    const json = await readJson(req);
    if (!json.ok) return json.response;

    const parsed = itemSchema.safeParse(json.body);
    if (!parsed.success) return validationError(parsed.error);

    const item = await createItem(parsed.data);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.log("[ITEMS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}