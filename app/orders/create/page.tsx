import Loader from "@/components/ui/loader";
import OrderForm from "./components/order-form";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const [types, setTypes] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTypes = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/types`
        );
        setTypes(responseTypes.data);
        const responseItems = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/items`
        );
        setItems(responseItems.data)
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;


  return <OrderForm types={types} items={items} />;
}
