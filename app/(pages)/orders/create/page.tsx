import { getItems } from "@/services/items";
import { getTypes } from "@/services/types";
import OrderForm from "./components/order-form";

export default async function OrderPage() {
  const [types, items] = await Promise.all([getTypes(), getItems()]);

  return <OrderForm types={types} items={items} />;
}