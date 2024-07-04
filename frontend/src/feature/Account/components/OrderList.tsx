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
import { fetchOrders} from "../api/userDataApi";
import { Order } from "@/feature/Account/models/Order";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { updateOrderStatus } from "@/feature/Admin/api/orderApi";

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

  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, "Canceled");
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, attributes: { ...order.attributes, status: "Canceled" } }
            : order
        )
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };
  
  if (loading) {
    return <div>Loading orders...</div>;
  }
  {
    orders.map((order, index) => console.log(order));
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
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {new Date(order.attributes.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="flex flex-col space-y-2 min-w-[200px]">
                  {order.attributes.products.map((product, index) => (
                    <div key={index} className="text-left">
                      <span>{product.productName}</span>
                      {index < order.attributes.products.length - 1 && (
                        <Separator className="mt-4 bg-gray-600" />
                      )}
                    </div>
                  ))}
                </TableCell>
                <TableCell className="space-y-2 ">
                  {order.attributes.products.map((product, index) => (
                    <div key={index} className="mb-5">
                      <span>Quantity: {product.quantity}</span>
                      {index < order.attributes.products.length - 1 && (
                        <Separator className="mt-4 bg-gray-600" />
                      )}
                    </div>
                  ))}
                </TableCell>

                <TableCell className="font-semibold">
                  ${order.attributes.price}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span
                      className={`
                      block px-2 py-1 rounded-lg  flex 
                      ${order.attributes.status === "Delivered" ? "bg-green-500 text-white" : ""}
                      ${order.attributes.status === "Order Placed" ? "bg-blue-500 text-white" : ""}
                      ${order.attributes.status === "Shipped" ? "bg-orange-400 text-white" : ""}
                      ${order.attributes.status === "Canceled" ? "bg-red-500 text-white line-through" : ""}
                    `}
                    >
                      {order.attributes.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      {order.attributes.status === "Order Placed" ? (
                        <Button  variant={"destructive"}>
                          Cancle Order
                        </Button>
                      ) : (
                        <Button disabled variant={"destructive"}>Cancle Order</Button>
                      )}
                      
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          cancle your order.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction  onClick={() => handleCancelOrder(order.id)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {order.attributes.status === "Delivered" ? (
                        <Button  variant={"secondary"} className="mt-2">
                        Give review
                      </Button>
                      ) : ""}
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OrderList;

