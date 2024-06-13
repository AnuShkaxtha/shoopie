// api/cartApi.ts
const BASE_URL = "http://localhost:1337/api/items";

export const fetchItemsApi = async () => {
  const response = await fetch(`${BASE_URL}?populate=*&pagination[pageSize]=1000`, { method: "GET" });
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  const itemsJson = await response.json();
  return itemsJson.data;
};

export const fetchItemByIdApi = async (itemId: number) => {
  const response = await fetch(`${BASE_URL}/${itemId}?populate=*&pagination[pageSize]=1000`, { method: "GET" });
  if (!response.ok) {
    throw new Error("Failed to fetch item by id");
  }
  const itemJson = await response.json();
  return itemJson.data;
};


