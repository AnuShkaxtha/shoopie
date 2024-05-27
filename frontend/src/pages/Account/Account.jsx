import React from "react";
import { useAuth } from "../../entities/auth/AuthProvider";
import OrderList from "./OrderList";

const Account = () => {
  const { currentUser } = useAuth();
  return (
    <div className="text-center h-200 w-[80%] mx-auto">
        
      <div className="mt-12 text-2xl font-bold pt-14">
        Hello{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email},
        you are now logged in.
      </div>
      <OrderList/>
    </div>
  );
};

export default Account;
