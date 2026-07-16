import { Document, Schema, model, models } from "mongoose";
import { Type } from "@/lib/types";

export interface TypeDocument extends Omit<Type, "_id">, Document {}

export const TypeSchema = new Schema<TypeDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const TypeModel = models.Type || model("Type", TypeSchema);

export default TypeModel;
