import { createType, getTypes } from "@/services/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const types = await getTypes();
    return NextResponse.json(types, { status: 200 });
  } catch (error) {
    console.log("[TYPES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const type = await createType(body);
    return NextResponse.json(type, { status: 200 });
  } catch (error) {
    console.log("[TYPES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
