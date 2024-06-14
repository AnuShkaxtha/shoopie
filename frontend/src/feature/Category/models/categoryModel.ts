
export interface SubCategoryAttributes {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SubCategory {
  id: number;
  attributes: SubCategoryAttributes;
}

export interface CategoryAttributes {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sub_categories: {
    data: SubCategory[];
  };
}

export interface Category {
  id: number;
  attributes: CategoryAttributes;
}

export interface ApiResponse {
  data: Category;
}
