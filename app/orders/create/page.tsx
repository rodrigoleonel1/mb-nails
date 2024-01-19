import OrderForm from "./components/order-form";

async function getTypes() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/types`);
  const data = response.json();
  return data;
}

async function getItems() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/items`);
  const data = response.json();
  return data;
}

export default async function OrderPage() {
  const types = await getTypes();
  const items = await getItems();

  return <OrderForm types={types} items={items} />;
}
