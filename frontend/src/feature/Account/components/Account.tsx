// Account.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "@/firebase/AuthProvider";
import OrderList from "./OrderList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from "react-router-dom";
import { doSignOut } from "@/firebase/auth";
import { fetchUserDetails, updateUserDetails } from "../api/userDataApi";

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showAccount, setShowAccount] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({ name: "", email: "" });

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      const userId = currentUser.uid;
      const fetchUserData = async () => {
        try {
          const userData = await fetchUserDetails(userId);
          setUserDetails(userData);
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
          });
        } catch (error: any) {
          console.error(error.message);
        }
      };

      fetchUserData();
    }
  }, [currentUser, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      try {
        await updateUserDetails(currentUser.uid, formData);
        setUserDetails((prevDetails: any) => ({
          ...prevDetails,
          name: formData.name,
          email: formData.email,
        }));
        setEditMode(false);
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-5 pt-14 md:mt-12 ">
      <div className="col-span-1 shadow-xl md:mt-5 md:text-center md:bg-transparent ">
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
      <div className="col-span-4 text-center md:text-left mb-9">
        {showAccount ? (
          <div className="pt-14">
            <Card className="mx-3 md:w-[650px]">
              <CardHeader>
                <CardTitle>My Account</CardTitle>
              </CardHeader>
              <CardContent>
                {userDetails ? (
                  <div className="space-y-4 text-left md:space-y-10">
                    {editMode ? (
                      <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                          <label className="block mb-2 text-sm font-bold">
                            Name:
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 text-sm font-bold">
                            Email:
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>
                        <div className="flex justify-end space-x-4">
                          <Button type="button" onClick={() => setEditMode(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">
                            Save
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <p className="mt-4 font-bold">
                          Name: <span className="font-normal"> {currentUser?.displayName ? currentUser.displayName : currentUser?.email?.split('@')[0]}</span>
                        </p>
                        <p className="font-bold">
                          Email: <span className="font-normal">{userDetails.email}</span>
                        </p>
                        <p className="font-bold">
                          User ID: <span className="font-normal">{userDetails.userId}</span>
                        </p>
                        <p className="font-bold">
                          Created At: <span className="font-normal">{new Date(userDetails.createdAt).toLocaleString()}</span>
                        </p>
                        <Button onClick={() => setEditMode(true)} className="mt-4">
                          Edit
                        </Button>
                      </div>
                    )}
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
