import { Schema, Document, models, model } from "mongoose";

export interface Type extends Document {
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const TypeSchema = new Schema<Type>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const TypeModel = models.Type || model("Type", TypeSchema);

export default TypeModel;
