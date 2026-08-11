import { Document, Schema, model, models } from "mongoose";

import { Order } from "@/lib/types";
import { ItemSchema } from "./item";
import { TypeSchema } from "./types";

export interface OrderDocument extends Omit<Order, "_id">, Document {}

const OrderSchema = new Schema<OrderDocument>(
  {
    type: TypeSchema,
    extras: { type: [ItemSchema], default: [] },
    decorations: { type: [ItemSchema], default: [] },
    total: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "El total debe ser un número entero.",
      },
    },
  },
  { timestamps: true },
);


OrderSchema.index({ createdAt: -1 });

const OrderModel = models.Order || model("Order", OrderSchema);

export default OrderModel;
