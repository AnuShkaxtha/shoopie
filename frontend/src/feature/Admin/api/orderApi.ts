
export const fetchAllOrders = async () => {
    const response = await fetch('https://strapi-backend-ddn2.onrender.com/api/orders', {
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