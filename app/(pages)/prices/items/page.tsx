import { getItems } from "@/services/items";
import ItemsPageClient from "./items-page-client";

export default async function ItemsPage() {
  const items = await getItems();

  return <ItemsPageClient initialItems={JSON.parse(JSON.stringify(items))} />;
}
