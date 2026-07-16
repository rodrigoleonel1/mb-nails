import { connectDB } from "@/lib/mongodb";
import { Item } from "@/lib/types";
import ItemModel from "@/models/item";

export async function getItems() {
  await connectDB();
  return ItemModel.find().lean();
}

export async function getItemById(id: string) {
  await connectDB();
  return ItemModel.findById(id).lean();
}

export async function createItem(data: Partial<Item>) {
  await connectDB();
  const item = new ItemModel(data);
  return item.save();
}

export async function updateItem(id: string, data: Partial<Item>) {
  await connectDB();
  return ItemModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteItem(id: string) {
  await connectDB();
  return ItemModel.findByIdAndDelete(id);
}
