import { NextResponse } from "next/server";

import { DECORATIONS, EXTRAS, TYPES } from "@/constants";
import { connectDB } from "@/lib/mongodb";
import ItemModel from "@/models/item";
import TypeModel from "@/models/types";

// Restaura el catálogo original de tipos e items (los que ya venían
// definidos en constants.ts) SOLO si la colección correspondiente está
// vacía. Nunca duplica ni borra datos existentes: es seguro llamarlo
// más de una vez.
export async function POST() {
  try {
    await connectDB();

    const existingTypes = await TypeModel.countDocuments();
    const existingItems = await ItemModel.countDocuments();

    let createdTypes = 0;
    let createdItems = 0;

    if (existingTypes === 0) {
      const typesToInsert = TYPES.map(({ name, price }) => ({ name, price }));
      const inserted = await TypeModel.insertMany(typesToInsert);
      createdTypes = inserted.length;
    }

    if (existingItems === 0) {
      const itemsToInsert = [
        ...EXTRAS.map(({ name, price }) => ({
          name,
          price,
          type: "extra",
        })),
        ...DECORATIONS.map(({ name, price }) => ({
          name,
          price,
          type: "decoracion",
        })),
      ];
      const inserted = await ItemModel.insertMany(itemsToInsert);
      createdItems = inserted.length;
    }

    return NextResponse.json(
      {
        createdTypes,
        createdItems,
        skippedTypes: existingTypes > 0,
        skippedItems: existingItems > 0,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("[SEED_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
