import { Document, Schema, model, models } from "mongoose";

import { Item } from "@/lib/types";

export interface ItemDocument extends Omit<Item, "_id">, Document {}

export const ItemSchema = new Schema<ItemDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number },
    type: {
      type: String,
      required: true,
      enum: ["decoracion", "extra"],
    },
  },
  { timestamps: true }
);

const ItemModel = models.Item || model("Item", ItemSchema);

export default ItemModel;