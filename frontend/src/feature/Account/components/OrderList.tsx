import React, { useEffect, useState } from "react";
import { useAuth } from "@/firebase/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { fetchOrders } from "../api/userDataApi";
import { Order } from "@/feature/Account/models/Order";

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const fetchUserOrders = async () => {
      if (!currentUser.email) {
        console.error("Current user email is null.");
        setLoading(false);
        return;
      }
      try {
        const ordersData = await fetchOrders(currentUser.email);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [currentUser, navigate]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="px-4 py-6 mt-5">
      <h1 className="mb-4 text-2xl font-bold">User Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {new Date(order.attributes.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="flex flex-col space-y-2">
                  {order.attributes.products.map((product, index) => (
                    <div key={index} className="text-left" >
                      <span>{product.productName}</span>
                      {index < order.attributes.products.length - 1 && (
                        <Separator className='mt-4 bg-gray-600' />
                      )} 
                    </div>
                  ))}
                </TableCell>
                <TableCell className="space-y-2 ">
                  {order.attributes.products.map((product, index) => (
                    <div key={index}  className="mb-5">
                      <span >Quantity: {product.quantity}</span>
                      
                    </div>
                  ))}
                </TableCell>

                <TableCell className="font-semibold">${order.attributes.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OrderList;

{
  
}
