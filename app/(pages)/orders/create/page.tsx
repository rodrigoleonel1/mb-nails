import { connectDB } from "@/lib/mongodb";
import TypeModel from "@/models/types";
import ItemModel from "@/models/item";
import OrderForm from "./components/order-form";

export default async function OrderPage() {
  await connectDB();
  const [types, items] = await Promise.all([
    TypeModel.find().lean(),
    ItemModel.find().lean(),
  ]);

  return (
    <OrderForm
      types={JSON.parse(JSON.stringify(types))}
      items={JSON.parse(JSON.stringify(items))}
    />
  );
}
