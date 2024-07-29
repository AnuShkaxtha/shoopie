// Account.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "@/firebase/AuthProvider";
import OrderList from "./OrderList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "@/firebase/auth";
import { fetchUserDetails} from "../api/userDataApi";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showAccount, setShowAccount] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<any>(null);

  // fetching user data
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      const userId = currentUser.uid;
      const fetchUserData = async () => {
        try {
          const userData = await fetchUserDetails(userId);
          setUserDetails(userData);
        } catch (error: any) {
          console.error(error.message);
        }
      };

      fetchUserData();
    }
  }, [currentUser, navigate]);

  return (
    <div className="grid grid-cols-5 gap-4 mt-6 pt-14 md:mt-12 ">
      {/* SMALL SCREEN */}
      <div className="relative flex justify-end col-span-5 mr-5 lg:hidden md:hidden">
        <Button variant="ghost">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Ellipsis className="w-5 h-5" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-3 ">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button variant="ghost" onClick={() => setShowAccount(true)}>
                    My Account
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button variant="ghost" onClick={() => setShowAccount(false)}>
                    Order Detail
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                
                  <Button
                    className="mt-2 w-full md:w-[100px] mb-1"
                    onClick={() => {
                      doSignOut().then(() => {
                        navigate("/login");
                      });
                    }}
                  >
                    Logout
                  </Button>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Button>
      </div>
      {/* LARGE SCREEN */}
      <div className="hidden w-full col-span-1 shadow-xl md:mt-5 md:text-center md:block lg:block">
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
          <Button
            className="mt-2 w-full md:w-[100px]"
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="col-span-5 text-center md:col-span-4 lg:col-span-4 md:text-left mb-9">
        {showAccount ? (
          <div className="lg:pt-14 md:pt-14">
            <Card className="mx-3">
              <CardHeader>
                <CardTitle>My Account</CardTitle>
              </CardHeader>
              <CardContent>
                {userDetails ? (
                  <div className="space-y-4 text-left md:space-y-10">
                    
                      <div className="space-y-6">
                        <p className="mt-4 font-bold">
                          Name:
                          <span className="font-normal">
                            {currentUser?.displayName
                              ? currentUser.displayName
                              : currentUser?.email?.split("@")[0]}
                          </span>
                        </p>
                        <p className="font-bold">
                          <span className="font-normal">
                            {userDetails.email}
                          </span>
                        </p>
                        <p className="font-bold">
                          User ID:
                          <span className="font-normal">
                            {userDetails.userId}
                          </span>
                        </p>
                        <p className="font-bold">
                          Created At:
                          <span className="font-normal">
                            {new Date(userDetails.createdAt).toLocaleString()}
                          </span>
                        </p>
                      </div>
                    
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
