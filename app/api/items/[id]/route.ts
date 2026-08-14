import { deleteItem, updateItem } from "@/services/items";
import { NextResponse } from "next/server";
import { itemUpdateSchema, objectIdSchema } from "@/lib/validations";
import { badRequest, notFound, readJson, validationError } from "@/lib/server-errors";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!objectIdSchema.safeParse(id).success) {
      return badRequest("El id del item no es válido.");
    }

    const json = await readJson(req);
    if (!json.ok) return json.response;

    const parsed = itemUpdateSchema.safeParse(json.body);
    if (!parsed.success) return validationError(parsed.error);

    const item = await updateItem(id, parsed.data);
    if (!item) return notFound("El item no existe.");

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log("[ITEM_PUT]", error);
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
      return badRequest("El id del item no es válido.");
    }

    const item = await deleteItem(id);
    if (!item) return notFound("El item no existe.");

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log("[ITEM_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}