import { ObjectId } from "mongoose";

export interface Item {
  _id?: ObjectId | string;
  name: string;
  price: number;
  quantity?: number;
  type: "decoracion" | "extra";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Type {
  _id: ObjectId | string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: ObjectId | string;
  type: Type;
  extras: Item[];
  decorations: Item[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
