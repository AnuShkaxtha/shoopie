const API_URL = "https://strapi-backend-ddn2.onrender.com/api";

export const fetchAllOrders = async () => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
  
    const data = await response.json();
    return data;
  };

  export const fetchAllUsers = async () => {
    const response = await fetch(`${API_URL}/user-logins`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
  
    const data = await response.json();
    return data;
  };

  // Function to update order status

  export const updateOrderStatus= async (orderId: string, newStatus: string): Promise<any> => {
    try {
      const payload = {
        data: {
          status: newStatus,
          
        }
      };
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error updating order status: ${errorMessage}`);
      }
      if (response.ok) {
        console.log("Updated");
      }
  
      const result = await response.json();
      return result.data;
    } catch (error: any) {
      console.error("Error updating order status:", error);
      throw error; // Re-throw the error to handle it in your component
    }
  };
  
  