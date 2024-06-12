import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByCategory } from '@/app/store/shoppingSlice';
import { RootState, AppDispatch } from '@/app/store/store';
import Item from '../itemDetails/Item';
import Filter from './Filter';

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
  data: Category;
}

const Category: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [category, setCategory] = useState<Category | null>(null);
  const items = useSelector((state: RootState) => state.shopping.items);

  //console.log(items)
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get('category');

  useEffect(() => {
    if (categoryId) {
      fetchCategory(categoryId);
      dispatch(fetchItemsByCategory(categoryId));
    }
  }, [categoryId, dispatch]);

  const fetchCategory = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:1337/api/categories/${id}?populate=sub_categories`, { method: "GET" });
      const itemJson: ApiResponse = await response.json();
      setCategory(itemJson.data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5 mt-[130px]">
      <div className={`col-span-1 px-2 ml-2 md:mt-6 lg:mt-10 lg:ml-6 hidden md:block`}>
        <Filter />
      </div>
      <div className="col-span-1 md:col-span-3 lg:col-span-4">

        <div className="mx-auto w-[89%] md:my-6 lg:my-9">
          {category ? (
            <div>
              <h1 className='font-bold text-[20px]'>{category.attributes.name}</h1>
              <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (

                  <Item
                    key={`${item.attributes.name}-${item.id}`}
                    item={item}
                    id={item.id}
                  />
                ))}
              </div>

            </div>
          ) : (
            <p>Loading...</p>
          )}


        </div>

      </div>
    </div>
  );
};

export default Category;
