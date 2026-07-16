import { connectDB } from "@/lib/mongodb";
import { Type } from "@/lib/types";
import TypeModel from "@/models/types";

export async function getTypes() {
  await connectDB();
  return TypeModel.find().lean();
}

export async function getTypeById(id: string) {
  await connectDB();
  return TypeModel.findById(id).lean();
}

export async function createType(data: Partial<Type>) {
  await connectDB();
  const type = new TypeModel(data);
  return type.save();
}

export async function updateType(id: string, data: Partial<Type>) {
  await connectDB();
  return TypeModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteType(id: string) {
  await connectDB();
  return TypeModel.findByIdAndDelete(id);
}
