import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { fetchAllUsers } from "@/feature/Admin/api/orderApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserDetail = () => {
  const adminAuth = useSelector((state: RootState) => state.adminAuth);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      if (adminAuth.isAuthenticated) {
        try {
          const usersData = await fetchAllUsers();
          setUsers(usersData.data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    getUsers();
  }, [adminAuth.isAuthenticated]);

  if (loading) {
    return <div className="text-center mt-[220px]">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-[220px] text-red-500">Error: {error}</div>
    );
  }

  return (
    <div className="mt-5">
      <h1 className="mb-4 text-2xl font-bold">User Detail</h1>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>User Id</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Updated Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.attributes.email}</TableCell>
                <TableCell>{user.attributes.userId}</TableCell>
                <TableCell>
                  {user.attributes.createdAt.substring(0, 10)}
                </TableCell>
                <TableCell>
                  {user.attributes.updatedAt.substring(0, 10)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default UserDetail;
