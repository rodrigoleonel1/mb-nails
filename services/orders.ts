import { cacheLife, cacheTag } from "next/cache";

import { connectDB } from "@/lib/mongodb";
import { Order } from "@/lib/types";
import { computeOrderTotal, OrderInput } from "@/lib/validations";
import OrderModel from "@/models/order";

function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export async function getOrders() {
  "use cache";
  cacheLife("minutes");
  cacheTag("orders");
  await connectDB();
  const orders = await OrderModel.find().sort({ createdAt: -1 }).lean<Order[]>();
  return serialize(orders);
}

export async function getOrderById(id: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag("orders", `order-${id}`);
  await connectDB();
  const order = await OrderModel.findById(id).lean<Order>();
  return order ? serialize(order) : null;
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