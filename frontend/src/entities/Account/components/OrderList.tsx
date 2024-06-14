import React, { useEffect, useState } from 'react';
import { useAuth } from '@/firebase/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchOrders } from '../api/orderApi';
import { Order } from '../models/Order';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Fetching order list from strapi api
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    // fetching orders from user backend 
    const fetchUserOrders = async () => {
      if (!currentUser.email) {
        console.error('Current user email is null.');
        setLoading(false);
        return;
      }
      try {
        const ordersData = await fetchOrders(currentUser.email);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
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
    <div className='flex justify-start mt-12 text-left'>
      <Card className="lg:w-[750px]  md:w-[550px]  w-[350px] mx-auto ">
        <CardHeader className='px-1 md:pl-6 lg:px-9'>
          <CardTitle>Your Orders</CardTitle>
        </CardHeader>
        <CardContent className='p-2 md:pl-6 lg:px-6 '>
          {orders.length === 0 ? (
            // NO ORDER 
            <div>No orders found.</div>
          ) : (
            // DISPLAYING ORDER 
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="pb-4 mb-4 border-b">
                  <p className="text-lg font-bold ">Order ID: {order.id}</p>
                  <div className='mt-2 space-y-2 '>
                  {/* create date object and localize string  */}
                  <p className="text-sm">Ordered Date: {new Date(order.attributes.createdAt).toLocaleString()}</p>
                  <p className="text-sm">Total Items: {order.attributes.products.length}</p>
                  <div className="space-y-2 text-left lg:text-right md:text-right md:pl-4 md:pr-5 ">
                    {order.attributes.products.map((product, index) => (
                      <div key={index} className="flex justify-between  lg:ml-8 w-[300px] md:w-auto">
                        <p className="text-sm ">Product: {product.productName}</p>
                        <p className="ml-8 text-sm">Quantity: {product.quantity}</p>
                      </div>
                    ))}
                    <p className="text-sm">Total Price: ${order.attributes.price}</p>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderList;
