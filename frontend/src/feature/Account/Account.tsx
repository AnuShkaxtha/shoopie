//Account.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "@/firebase/AuthProvider";
import OrderList from "../../entities/Account/OrderList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from "react-router-dom";
import { doSignOut } from "@/firebase/auth";

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showAccount, setShowAccount] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
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
  }, [currentUser, navigate]);

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 sm:mt-20 pt-14 gap-4 md:mt-12 mt-12 min-h-[630px] h-auto">
      <div className="shadow-xl md:col-span-1 md:mt-5 md:text-center md:bg-transparent">
        <div className="p-2 md:mt-9">
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
          <Button className="mt-2 w-full md:w-[100px]" onClick={() => { doSignOut().then(() => { navigate("/login"); }); }}>
            Logout
          </Button>
        </div>
      </div>
      <div className="text-center md:col-span-4 md:text-left mb-9">

        {showAccount ? (
          <div className="pt-14">
            <Card className="mx-3 md:w-[650px]">
              <CardHeader>
                <CardTitle>My Account</CardTitle>
              </CardHeader>
              <CardContent>
                {userDetails ? (
                  <div className="space-y-4 md:space-y-10">
                    <p className="font-bold">Name: <span className="font-normal"> {currentUser?.displayName ? currentUser.displayName : currentUser?.email?.split('@')[0]}</span></p>
                    <p className="font-bold">Email: <span className="font-normal">{userDetails.email}</span></p>
                    <p className="font-bold">User ID: <span className="font-normal">{userDetails.userId}</span></p>
                    <p className="font-bold">Created At: <span className="font-normal">{new Date(userDetails.createdAt).toLocaleString()}</span></p>
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
