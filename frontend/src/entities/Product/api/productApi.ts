// api/shoppingApi.ts
const BASE_URL = "http://0.0.0.0:1337/api/items";

export const fetchItemsByCategoryApi = async (categoryId: string) => {
  const response = await fetch(`${BASE_URL}?filters[category]=${categoryId}&populate=image&pagination[pageSize]=1000`, { method: 'GET' });
  if (!response.ok) {
    throw new Error("Failed to fetch items by category");
  }
  const itemsJson = await response.json();
  return itemsJson.data; // Adjust based on your API response structure
};

export const fetchItemsBySubCategoryApi = async (categoryId: string, subCategoryId: string) => {
  const response = await fetch(`${BASE_URL}?filters[sub_categories]=${subCategoryId}&filters[category]=${categoryId}&populate=image&pagination[pageSize]=1000`, { method: "GET" });
  if (!response.ok) {
    throw new Error("Failed to fetch items by subcategory");
  }
  const itemsJson = await response.json();
  return itemsJson.data;
};
