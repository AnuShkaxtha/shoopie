// export const fetchAllOrders = async (token: string) => {
//     const response = await fetch('http://localhost:1337/api/orders', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         // 'Authorization': `Bearer ${token}`,
//       },
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to fetch orders');
//     }
  
//     const data = await response.json();
//     return data;
//   };
  
export const fetchAllOrders = async () => {
    const response = await fetch('http://localhost:1337/api/orders', {
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