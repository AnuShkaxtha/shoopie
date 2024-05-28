import React, { useState } from "react";
import { useAuth } from "../../entities/auth/AuthProvider";
import OrderList from "./OrderList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/processes/theme/theme-provider";

const Account = () => {
  const { currentUser } = useAuth();
  const [showAccount, setShowAccount] = useState(true);
  const { theme, setTheme } = useTheme();
  return (
    <div className="grid grid-cols-5 gap-4 mt-12 h-[630px]">
      {/* GUIDE SECTION */}
      <div className={`col-span-1 mt-5 shadow-xl ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-700"
      }`}>
        <div className="p-2 mt-9">
          <Button variant="ghost" onClick={() => setShowAccount(true)} className="w-full mt-2">My Account</Button>
          <Separator className="my-2 bg-gray-400"/>
          <Button  variant="ghost" onClick={() => setShowAccount(false)} className="w-full mt-2">Order Detail</Button>
        </div>
      </div>
      <div className="text-center h-200 w-[80%] mx-auto col-span-4">
        {showAccount ? (
          <div className="text-2xl font-bold pt-14">
            Hello{" "}
            {currentUser.displayName
              ? currentUser.displayName
              : currentUser.email}
            , you are now logged in.
          </div>
        ) : (
          <OrderList />
        )}
      </div>
    </div>
  );
};

export default Account;
