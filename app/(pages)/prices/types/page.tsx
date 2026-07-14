import { connectDB } from "@/lib/mongodb";
import TypeModel from "@/models/types";
import TypesPageClient from "./types-page-client";

export default async function TypesPage() {
  await connectDB();
  const types = await TypeModel.find().lean();

  return <TypesPageClient initialTypes={JSON.parse(JSON.stringify(types))} />;
}
