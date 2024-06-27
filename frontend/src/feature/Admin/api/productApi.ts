const API_URL = "https://strapi-backend-ddn2.onrender.com/api";

export const addProduct = async (productData: any) => {
  try {
    const payload = {
      data: {
        ...productData,
        
      }
    };

    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to add product.");
    }
    if (response.ok) {
      console.log("added");
    }

    const result = await response.json();
    return result.data;
  } catch (error: any) {
    console.error("Error adding product:", error.message);
    throw error; // Re-throw the error to handle it in your component
  }
};

