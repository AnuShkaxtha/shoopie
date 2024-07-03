import { Button } from "@/components/ui/button";
import UserOrder from "./components/UserOrder";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useNavigate } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import UserDetail from "./components/UserDetail";
import { logout } from "@/entities/Admin/adminAuthSlice";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
const Dashboard: React.FC = () => {
  const adminAuth = useSelector((state: RootState) => state.adminAuth);
  const [showUser, setShowUser] = useState<boolean>(false);
  const [showDashboard, setShowDashboard] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (!adminAuth.isAuthenticated) {
      console.log("You are not authenticated to this page");
      navigate("/");
    }
  }, [adminAuth.isAuthenticated, navigate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 sm:mt-20 gap-4 mt-[70px] lg:mt-[140px] md:mt-[140px] b-9 w-auto">
      <div className="relative block col-start-5 col-end-5 mt-3 mr-5 lg:hidden md:hidden">
        <Button variant="ghost">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Ellipsis className="w-5 h-5" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-3 w-22">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowUser(true);
                      setShowDashboard(false);
                    }}
                  >
                    User Details
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowUser(false);
                      setShowDashboard(true);
                    }}
                  >
                    Order Management
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowUser(false);
                      setShowDashboard(false);
                    }}
                  >
                    Product Management
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    className="w-full "
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Button>
      </div>
      <div className="hidden col-span-1 shadow-xl md:mt-5 md:text-center md:block lg:block min-w-[150px]">
        <div className="p-2 md:mt-9">
          <h1 className="text-lg font-bold text-center uppercase">Dashboard</h1>
          <Button
            variant="ghost"
            onClick={() => {
              setShowUser(true);
              setShowDashboard(false);
            }}
            className="flex w-full mt-4"
          >
            User Details
          </Button>
          <Separator className="my-2 bg-gray-400" />
          <Button
            variant="ghost"
            onClick={() => {
              setShowUser(false);
              setShowDashboard(true);
            }}
            className="w-full mt-2 "
          >
            Order Management
          </Button>
          <Separator className="my-2 bg-gray-400" />
          <Button
            variant="ghost"
            onClick={() => {
              setShowUser(false);
              setShowDashboard(false);
            }}
            className="w-full mt-2"
          >
            Product Management
          </Button>
          <Separator className="my-2 bg-gray-400" />
          <Button className="mt-2 w-full md:w-[100px]" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="col-span-5 text-center md:col-span-4 lg:col-span-4 mb-9">
        <h1 className="font-extrabold uppercase text-[27px] text-center">
          {" "}
          Admin Dashboard
        </h1>
        {showUser ? (
          <UserDetail />
        ) : showDashboard ? (
          <UserOrder />
        ) : (
          <AddProduct />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
