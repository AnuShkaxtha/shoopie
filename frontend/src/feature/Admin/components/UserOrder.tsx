
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { fetchAllOrders } from '@/feature/Admin/api/orderApi';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from "@/components/ui/separator";

const UserOrder = () => {
  const adminAuth = useSelector((state: RootState) => state.adminAuth);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getOrders = async () => {
      // if (!adminAuth.isAuthenticated) {
      //   console.log("You are not authenticated to this page");
      //   navigate("/")
      // }
      if (adminAuth.isAuthenticated) {
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
  {
    orders.map((order) => (
      console.log(order.attributes)
    ))
  }

  return (
    <div className="mt-5">
      <h1 className="mb-4 text-2xl font-bold">User Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {orders.map((order) => (
    <TableRow key={order.id}>
      <TableCell>{order.id}</TableCell>
      <TableCell>{order.attributes.publishedAt.substring(0, 10)}</TableCell>
      <TableCell>{order.attributes.email}</TableCell>

      <TableCell className="flex flex-col space-y-2">
                  {order.attributes.products.map((product:any, index:any) => (
                    <div key={index} className="text-left" >
                      <span>{product.productName}</span>
                      {index < order.attributes.products.length - 1 && (
                        <Separator className='mt-4 bg-gray-600' />
                      )} 
                    </div>
                  ))}
                </TableCell>
                <TableCell className="space-y-2 ">
                  {order.attributes.products.map((product:any, index:any) => (
                    <div key={index}  className="mb-7">
                      <span >Quantity: {product.quantity}</span>
                      {index < order.attributes.products.length - 1 && (
                        <Separator className='mt-4 bg-gray-600' />
                      )} 
                    </div>
                  ))}
                </TableCell>
      <TableCell>${order.attributes.price}</TableCell>
    </TableRow>


            ))}
          </TableBody>
        </Table>
       
      )}
    </div>
  )
}

export default UserOrder