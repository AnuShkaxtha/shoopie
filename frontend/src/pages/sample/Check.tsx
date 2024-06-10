interface SubCategoryAttributes {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  interface SubCategory {
    id: number;
    attributes: SubCategoryAttributes;
  }
  
  interface CategoryAttributes {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    sub_categories: {
      data: SubCategory[];
    };
  }
  
  interface Category {
    id: number;
    attributes: CategoryAttributes;
  }
  
  interface ApiResponse {
    data: Category[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }

  import React, { useState, useEffect } from 'react';

const Check: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
      fetchCategories();
    }, []);
  
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/categories?populate=sub_categories", { method: "GET" });
        const itemsJson: ApiResponse = await response.json();
        setCategories(itemsJson.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    return (
      <div className='mt-[200px]'>
        <h1>Categories and Subcategories</h1>
        {categories.map(category => (
          <div key={category.id}>
            <h2 className='text-xl font-bold'>{category.attributes.name}</h2>
            {category.attributes.sub_categories.data.length > 0 ? (
              <ul>
                {category.attributes.sub_categories.data.map(subCategory => (
                  <li key={subCategory.id}>{subCategory.attributes.name}</li>
                ))}
              </ul>
            ) : (
              <p>No subcategories available</p>
            )}
          </div>
        ))}
      </div>
    );
  }

export default Check;

  