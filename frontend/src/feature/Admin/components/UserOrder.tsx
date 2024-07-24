import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { fetchAllOrders, updateOrderStatus } from '@/feature/Admin/api/orderApi';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Define the type for daily data
interface DailyData {
  [key: string]: number;
}

// Helper function to process data for the chart
const processDataForChart = (orders: any[]) => {
  const dailyData: { [key: string]: number } = {};
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  orders.forEach((order: { attributes: { publishedAt: string | number | Date; }; }) => {
    const date = new Date(order.attributes.publishedAt).toISOString().split('T')[0];
    const orderDate = new Date(date);

    if (orderDate >= sevenDaysAgo && orderDate <= today) {
      if (!dailyData[date]) {
        dailyData[date] = 0;
      }
      dailyData[date] += 1; // Increment count for each order
    }
  });

  // Create an array for the past 7 days, including days with zero orders
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];
    result.push({
      date: formattedDate,
      TotalOrder: dailyData[formattedDate] || 0,
    });
  }

  return result;
};

const UserOrder = () => {
  const adminAuth = useSelector((state: RootState) => state.adminAuth);
  const [orders, setOrders] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      if (adminAuth.isAuthenticated) {
        try {
          const ordersData = await fetchAllOrders();
          setOrders(ordersData.data);
          const processedData = processDataForChart(ordersData.data);
          setChartData(processedData);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    getOrders();
  }, [adminAuth.isAuthenticated]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // Update status locally first for immediate UI update
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            attributes: {
              ...order.attributes,
              status: newStatus
            }
          };
        }
        return order;
      });
      setOrders(updatedOrders);

      // Update status in backend
      await updateOrderStatus(orderId, newStatus);
    } catch (error: any) {
      console.error("Failed to update order status:", error);
    }
  };

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

  return (
    <div className="mt-5">
      <h1 className="mb-4 text-2xl font-bold">Orders Information</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.attributes.publishedAt.substring(0, 10)}</TableCell>
                  <TableCell>{order.attributes.email}</TableCell>
                  <TableCell className="flex flex-col space-y-2 min-w-[220px]">
                    {order.attributes.products.map((product: any, index: any) => (
                      <div key={index} className="pt-3 text-left">
                        <span>{product.productName}</span>
                        {index < order.attributes.products.length - 1 && (
                          <Separator className='mt-4 bg-gray-600' />
                        )}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="space-y-2 min-w-[120px]">
                    {order.attributes.products.map((product: any, index: any) => (
                      <div key={index} className="pt-2 mb-3">
                        <span>Quantity: {product.quantity}</span>
                        {index < order.attributes.products.length - 1 && (
                          <Separator className='bg-gray-600 mt-9 mb-7 lg:mt-4 lg:mb-3 md:mt-9 md:mb-6' />
                        )}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>${order.attributes.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <select
                        value={order.attributes.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`
                          block px-2 py-1 rounded-lg  flex 
                          ${order.attributes.status === 'Delivered' ? 'bg-green-500 text-white' : ''}
                          ${order.attributes.status === 'Order Placed' ? 'bg-blue-500 text-white' : ''}
                          ${order.attributes.status === 'Shipped' ? 'bg-orange-400 text-white' : ''}
                          ${order.attributes.status === 'Canceled' ? 'bg-red-500 text-white line-through' : ''}
                        `}
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <div className="mt-6 mr-3 ">
            <Card >
              <CardHeader>
                <CardTitle>Daily Orders</CardTitle>
                <CardDescription>
                  Daily order counts for the past week
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center px-0">
                <BarChart width={600} height={300} data={chartData} >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                  <YAxis domain={[20, 'auto']} />
                  <Tooltip />
                  <Bar dataKey="TotalOrder" fill="#8884d8" />
                </BarChart>
              </CardContent>
            </Card>
          </div> */}
        </>
      )}
    </div>
  );
};

export default UserOrder;
