import { Button } from "@/components/ui/button";
import UserOrder from "./components/UserOrder";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useNavigate } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import UserDetail from "./components/UserDetail";

const Dashboard: React.FC = () => {
  const adminAuth = useSelector((state: RootState) => state.adminAuth);
  const [showUser, setShowUser] = useState<boolean>(false);
  const [showDashboard, setShowDashboard] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminAuth.isAuthenticated) {
      console.log("You are not authenticated to this page");
      navigate("/");
    }
  }, [adminAuth.isAuthenticated, navigate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 sm:mt-20 gap-4 mt-[70px] lg:mt-[140px] md:mt-[140px] b-9 w-auto">

      <div className="col-span-1 shadow-xl md:mt-5 md:text-center md:bg-transparent">
        <div className="p-2 md:mt-9">
          <h1 className="text-lg font-bold text-center uppercase">Dashboard</h1>
          <Button
            variant="ghost"
            onClick={() => {
              setShowUser(true);
              setShowDashboard(false);
            }}
            className="w-full mt-4"
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
            className="w-full mt-2"
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
          <Button className="mt-2 w-full md:w-[100px]">
            Logout
          </Button>
        </div>
      </div>

      <div className="px-5 md:col-span-4 mb-9">
        <h1 className="font-extrabold uppercase text-[27px] text-center"> Admin Dashboard</h1>
        {showUser ? <UserDetail /> : showDashboard ? <UserOrder /> : <AddProduct />}

      </div>

    </div>
  );
};

export default Dashboard;
