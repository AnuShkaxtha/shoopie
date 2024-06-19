// src/api/ordersApi.ts
import { Order } from "../models/Order";
  
  const API_URL = 'http://0.0.0.0:1337/api/orders';
  
  export const fetchOrders = async (email: string): Promise<Order[]> => {
    const response = await fetch(`${API_URL}?filters[email][$eq]=${email}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.data;
  };
  