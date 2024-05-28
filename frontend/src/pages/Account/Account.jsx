import React, { useState, useEffect } from "react";
import { useAuth } from "../../entities/auth/AuthProvider";
import OrderList from "./OrderList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/processes/theme/theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from "react-router-dom";
import { doSignOut } from "@/entities/firebase/auth";

const Account = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showAccount, setShowAccount] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    else {
      const userId = currentUser.uid;

      const fetchUserDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:1337/api/user-logins?filters[userId][$eq]=${userId}`
          );
          const result = await response.json();
          if (result.data && result.data.length > 0) {
            setUserDetails(result.data[0].attributes);
          } else {
            console.error("No user data found.");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [currentUser]); // Add currentUser.uid to the dependency array

  useEffect(() => {
    // Log userDetails whenever it changes
    console.log(userDetails);
  }, [userDetails]);

  return (
    <div className="grid grid-cols-5  gap-4 mt-12 min-h-[630px] h-auto">
      {/* GUIDE SECTION */}
      <div
        className={`col-span-1 mt-5  text-center shadow-xl ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-700"
          }`}
      >
        <div className="p-2 mt-9">
          <Button
            variant="ghost"
            onClick={() => setShowAccount(true)}
            className="w-full mt-2"
          >
            My Account
          </Button>
          <Separator className="my-2 bg-gray-400" />
          <Button
            variant="ghost"
            onClick={() => setShowAccount(false)}
            className="w-full mt-2"
          >
            Order Detail
          </Button>
          <Separator className="my-2 bg-gray-400" />
          <Button className="mt-2 w-[100px]" onClick={() => { doSignOut().then(() => { navigate("/login"); }); }}>
            Logout
          </Button>
        </div>
      </div>
      <div className="col-span-4 text-center mb-9">

        {showAccount ? (
          <div className="text-left pt-14">
            <Card className="w-[650px]">
              <CardHeader>
                <CardTitle>My Account</CardTitle>
              </CardHeader>
              <CardContent>
                {userDetails ? (
                  <div className="space-y-[10px]">
                    <p className="font-bold">Name:  <span className="font-normal"> {currentUser.displayName ? currentUser.displayName : currentUser.email.split('@')[0]}</span> </p>
                    <p className="font-bold">Email: <span className="font-normal">{userDetails.email}</span> </p>
                    <p className="font-bold">User ID: <span className="font-normal">{userDetails.userId}</span> </p>
                    <p className="font-bold">Created At: <span className="font-normal">{new Date(userDetails.createdAt).toLocaleString()}</span> </p>

                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </CardContent>
            </Card>

          </div>
        ) : (
          <OrderList />
        )}
      </div>
    </div>
  );
};

export default Account;
