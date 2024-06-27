// userDataApi.ts
import { Order } from "../models/Order";
const API_URL = "https://strapi-backend-ddn2.onrender.com/api";

//api to fetch user details
export const fetchUserDetails = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/user-logins?filters[userId][$eq]=${userId}`);
    const result = await response.json();
    if (result.data && result.data.length > 0) {
      return result.data[0].attributes;
    } else {
      throw new Error("No user data found.");
    }
  } catch (error:any) {
    throw new Error("Error fetching user details: " + error.message);
  }
};

// api to fetch user orders
export const fetchOrders = async (email: string): Promise<Order[]> => {
  const response = await fetch(`${API_URL}/orders?filters[email][$eq]=${email}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.data;
};