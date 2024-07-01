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