"use server";

import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import OrderModel from "@/models/order";

export const createOrder = async (order: any) => {
  try {
    await connectDB();

    // await OrderModel.create({
    //   type: { name: "Semipermanente", price: 880 },
    //   encapsulado: { name: "Encapsuladas", quantity: 4, price: 880 },
    //   francesa: { name: "Francesas", quantity: 4, price: 600 },
    //   babyboomer: { name: "Babyboomer", quantity: 2, price: 400 },
    //   nailart: { name: "Nailart", quantity: 1, price: 200 },
    //   strass: { name: "Strass", quantity: 10, price: 100 },
    //   total: { total: 5980 },
    // });

    const newOrder = await OrderModel.create({ order });
    redirect(`/orders/${newOrder.id}`);
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async () => {
  try {
    await connectDB();
    const orders = await OrderModel.find({});
    return orders;
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = async (id: string) => {
  try {
    await connectDB();
    const order = await OrderModel.findById(id);
    return order;
  } catch (error) {
    console.log(error);
  }
};
