import { Schema, Document, models, model } from "mongoose";

export interface Item extends Document {
  name: string;
  price: number;
  quantity?: number;
  type: "decoracion" | "extra";
  createdAt?: Date;
  updatedAt?: Date;
}

export const ItemSchema = new Schema<Item>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

const ItemModel = models.Item || model("Item", ItemSchema);

export default ItemModel;
