import { connectDB } from "@/lib/mongodb";
import { Order } from "@/lib/types";
import { computeOrderTotal, OrderInput } from "@/lib/validations";
import OrderModel from "@/models/order";

export async function getOrders() {
  await connectDB();
  return OrderModel.find().sort({ createdAt: -1 }).lean<Order[]>();
}

export async function getOrderById(id: string) {
  await connectDB();
  return OrderModel.findById(id).lean<Order>();
}

export async function createOrder(data: OrderInput) {
  await connectDB();
  const order = new OrderModel({ ...data, total: computeOrderTotal(data) });
  return order.save();
}

export async function deleteOrder(id: string) {
  await connectDB();
  return OrderModel.findByIdAndDelete(id);
}
