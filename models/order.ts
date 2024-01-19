import { Schema, Document, model, models } from "mongoose";
import { Item, ItemSchema } from "./item";
import { Type, TypeSchema } from "./types";

export interface Order extends Document {
  type: Type;
  extras: Item[];
  decorations: Item[];
  total: number;
}

const OrderSchema = new Schema<Order>(
  {
    type: TypeSchema,
    extras: { type: [ItemSchema], default: [] },
    decorations: { type: [ItemSchema], default: [] },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const OrderModel = models.Ticket || model("Ticket", OrderSchema);

export default OrderModel;
