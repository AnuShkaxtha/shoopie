// categoryApi.ts

import { ApiResponse } from "../models/categoryModel";

const API_URL = 'http://localhost:1337/api';

export const fetchCategoryById = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}?populate=sub_categories`, { method: 'GET' });
    const categoryJson: ApiResponse = await response.json();
    return categoryJson;
  } catch (error:any) {
    throw new Error('Error fetching category: ' + error.message);
  }
};

export const fetchSubCategoryById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/sub-categories/${id}`, { method: 'GET' });
      const subCategoryJson = await response.json();
      return subCategoryJson.data;
    } catch (error:any) {
      throw new Error('Error fetching subcategory: ' + error.message);
    }
  };