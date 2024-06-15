import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { fetchAllOrders } from "./api/orderApi";
import { useNavigate } from "react-router-dom";


const Dashboard: React.FC = () => {
  const adminAuth = useSelector((state: RootState) => state.adminAuth);
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getOrders = async () => {
      if (!adminAuth.isAuthenticated) {
        console.log("You are not authenticated to this page");
        navigate("/")
      }
      if (adminAuth.isAuthenticated ) {
        try {
          const ordersData = await fetchAllOrders();
          setOrders(ordersData.data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    getOrders();
  }, [adminAuth.isAuthenticated]);

  

  if (loading) {
    return <div className="text-center mt-[220px]">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-[220px] text-red-500">
        Error: {error}
      </div>
    );
  }
  console.log(orders);
  {orders.map((order) => (
    console.log(order.attributes)
  ))}
  return (
    <div className="mt-[110px] lg:mt-[140px] md:mt-[140px]  px-4 lg:px-7 pb-9 w-auto">
      <h1 className="mb-4 text-2xl font-bold">User Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="px-0 py-2 text-left border-b-2 border-gray-200">Order ID</th>
              <th className="px-0 py-2 text-left border-b-2 border-gray-200">Order Date</th>
              <th className="px-2 py-2 text-left border-b-2 border-gray-200">User</th>
              <th className="px-4 py-2 text-left border-b-2 border-gray-200">Products</th>
              <th className="px-1 py-2 text-left border-b-2 border-gray-200">Total</th>
              {/* <th className="px-4 py-2 text-left border-b-2 border-gray-200">Status</th> */}
            </tr>
          </thead>
          <tbody>
          
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-0 py-2 border-b border-gray-200">{order.id}</td>
                <td className="px-2 py-2 border-b border-gray-200">{order.attributes.publishedAt.substring(0, 10)}</td>
                <td className="px-2 py-2 border-b border-gray-200">{order.attributes.email}</td>
                {order.attributes.products.map((product: any)=>(
                  
                  <td className="flex flex-grow px-2 py-2 border-b border-gray-200">{product.productName}</td>
                ))}
              
                <td className="px-1 py-2 border-b border-gray-200">${order.attributes.price}</td>
                {/* <td className="px-4 py-2 border-b border-gray-200">{order.status}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
