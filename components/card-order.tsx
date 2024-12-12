import Link from "next/link";
import { format } from "date-fns";

import { formatter } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import DeleteButton from "@/components/delete-button";
import { Order } from "@/lib/types";

interface CardOrderProps {
  order: Order;
}

export default function CardOrder({ order }: CardOrderProps) {
  return (
    <article className="font-medium flex gap-2 justify-between place-items-center bg-violet-400 p-4 rounded-md shadow">
      <div>
        <p>
          {order.type.name}: {formatter.format(order.total)}
        </p>
        <span>Orden creada: {format(order.createdAt, "dd/MM/yyyy")}</span>
      </div>
      <div className="flex gap-2 sm:gap-4">
        <Link
          href={`/orders/${order._id}`}
          className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-all text-white"
        >
          <ExternalLink />
        </Link>
        <DeleteButton id={order._id.toString()} refresh={true} />
      </div>
    </article>
  );
}
