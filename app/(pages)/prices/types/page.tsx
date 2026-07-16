import { getTypes } from "@/services/types";
import TypesPageClient from "./types-page-client";

export default async function TypesPage() {
  const types = await getTypes();

  return <TypesPageClient initialTypes={JSON.parse(JSON.stringify(types))} />;
}
