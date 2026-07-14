import { connectDB } from "@/lib/mongodb";
import ItemModel from "@/models/item";
import ItemsPageClient from "./items-page-client";

export default async function ItemsPage() {
  await connectDB();
  const items = await ItemModel.find().lean();

  return <ItemsPageClient initialItems={JSON.parse(JSON.stringify(items))} />;
}
