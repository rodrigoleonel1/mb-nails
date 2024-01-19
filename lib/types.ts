import { ObjectId } from "mongoose";

export interface Item {
  _id?: ObjectId;
  name: string;
  price: number;
  quantity?: number;
  type: "decoracion" | "extra";
  createdAt?: Date;
  updatedAt?: Date;
}
