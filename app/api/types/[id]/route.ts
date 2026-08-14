import { deleteType, updateType } from "@/services/types";
import { NextResponse } from "next/server";
import { objectIdSchema, typeUpdateSchema } from "@/lib/validations";
import { badRequest, notFound, readJson, validationError } from "@/lib/server-errors";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!objectIdSchema.safeParse(id).success) {
      return badRequest("El id del tipo no es válido.");
    }

    const json = await readJson(req);
    if (!json.ok) return json.response;

    const parsed = typeUpdateSchema.safeParse(json.body);
    if (!parsed.success) return validationError(parsed.error);

    const type = await updateType(id, parsed.data);
    if (!type) return notFound("El tipo no existe.");

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
    if (!objectIdSchema.safeParse(id).success) {
      return badRequest("El id del tipo no es válido.");
    }

    const type = await deleteType(id);
    if (!type) return notFound("El tipo no existe.");

    return NextResponse.json(type, { status: 200 });
  } catch (error) {
    console.log("[TYPE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}