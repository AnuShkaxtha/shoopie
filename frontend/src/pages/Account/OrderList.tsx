import React, { useEffect, useState } from 'react';
import { useAuth } from '@/entities/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Order {
  id: string;
  attributes: {
    createdAt: string;
    products: {
      productName: string;
      quantity: number;
    }[];
    price: number;
  };
}

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

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/orders?filters[email][$eq]=${currentUser.email}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setOrders(data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, navigate]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className='flex justify-start mt-12 text-left'>
      <Card className="w-[750px] mx-3">
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div>No orders found.</div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="pb-4 mb-4 border-b">
                  <p className="text-lg font-bold ">Order ID: {order.id}</p>
                  <div className='mt-2 space-y-2 ml-9'>
                  {/* create date object and localize string  */}
                  <p className="text-sm">Ordered Date: {new Date(order.attributes.createdAt).toLocaleString()}</p>
                  <p className="text-sm">Total Items: {order.attributes.products.length}</p>
                  <div className="space-y-2 text-right">
                    {order.attributes.products.map((product, index) => (
                      <div key={index} className="flex justify-between ml-8 w-[300px]">
                        <p className="text-sm">Product: {product.productName}</p>
                        <p className="text-sm ml-9">Quantity: {product.quantity}</p>
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
