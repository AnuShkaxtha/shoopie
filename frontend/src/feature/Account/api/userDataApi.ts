import { Order } from "@/feature/Account/models/Order";
const API_URL = "https://strapi-backend-ddn2.onrender.com/api";

// function to fetch user information using userID
export const fetchUserDetails = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/user-logins?filters[userId][$eq]=${userId}`);
    const result = await response.json();
    // checking if user exist
    if (result.data && result.data.length > 0) {
      return result.data[0].attributes;
    } else {
      throw new Error("No user data found.");
    }
  } catch (error: any) {
    throw new Error("Error fetching user details: " + error.message);
  }
};

// function to update user information 
export const updateUserDetails = async (userId: string, userDetails: { name: string; email: string }) => {
  try {
    // Fetch the user entry ID to update
    const response = await fetch(`${API_URL}/user-logins?filters[userId][$eq]=${userId}`);
    const result = await response.json();
    if (result.data && result.data.length > 0) {
      const userEntryId = result.data[0].id;
      
      // Update user details
      const updateResponse = await fetch(`${API_URL}/user-logins/${userEntryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: userDetails }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update user details.");
      }

      const updatedResult = await updateResponse.json();
      return updatedResult.data.attributes;
    } else {
      throw new Error("User not found for updating.");
    }
  } catch (error: any) {
    throw new Error("Error updating user details: " + error.message);
  }
};

// function to fetch user orders
export const fetchOrders = async (email: string): Promise<Order[]> => {
  const response = await fetch(`${API_URL}/orders?filters[email][$eq]=${email}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.data;
};


