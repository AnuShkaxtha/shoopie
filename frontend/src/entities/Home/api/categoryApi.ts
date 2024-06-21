// src/api/categoryApi.ts

const BASE_URL = "https://strapi-backend-ddn2.onrender.com/api/categories";

export const fetchCategoriesApi = async () => {
  const response = await fetch(`${BASE_URL}?populate=sub_categories`, { method: "GET" });
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const itemsJson = await response.json();
  return itemsJson.data;
};
