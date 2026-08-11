import { createType, getTypes } from "@/services/types";
import { NextResponse } from "next/server";
import { typeSchema } from "@/lib/validations";
import { readJson, validationError } from "@/lib/server-errors";

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
    const json = await readJson(req);
    if (!json.ok) return json.response;

    const parsed = typeSchema.safeParse(json.body);
    if (!parsed.success) return validationError(parsed.error);

    const type = await createType(parsed.data);
    return NextResponse.json(type, { status: 201 });
  } catch (error) {
    console.log("[TYPES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}