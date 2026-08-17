import Link from "next/link";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";

import { deleteOrder } from "@/app/actions";
import { Order } from "@/lib/types";
import { formatter } from "@/lib/utils";
import DeleteButton from "@/components/delete-button";

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
        <span>
          Orden creada: {format(new Date(order.createdAt), "dd/MM/yyyy")}
        </span>
      </div>
      <div className="flex gap-2 sm:gap-4">
        <Link
          href={`/orders/${order._id}`}
          aria-label="Ver orden"
          className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-all text-white"
        >
          <ExternalLink aria-hidden="true" />
        </Link>
        <DeleteButton
          id={order._id.toString()}
          action={deleteOrder}
          label="orden"
          refresh
        />
      </div>
    </article>
  );
}