import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByCategory } from '@/entities/Product/shoppingSlice';
import { RootState, AppDispatch } from '@/app/store/store';
import Item from '../../../entities/Item/Item';
import { fetchCategoryById } from '../api/specificCategoryApi';
import { ApiResponse, Category as CategoryInterface} from '../models/categoryModel';



const Category: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [category, setCategory] = useState<CategoryInterface>();
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

  //fetching specific category 
  const fetchCategory = async (id: string) => {
    try {
      const categoryJson: ApiResponse = await fetchCategoryById(id);
      setCategory(categoryJson.data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5 lg:mt-[130px] mt-[100px]">
      {/* <div className={`col-span-1 px-2 ml-2 md:mt-6 lg:mt-10 lg:ml-6 hidden md:block`}>
        <Filter />
      </div> */}
      {/* <div className="col-span-1 md:col-span-3 lg:col-span-4"> */}
      <div className="col-span-5">
        <div className="mx-auto w-[89%] md:my-6 lg:my-9">
          {category ? (
            <div className='text-center'>
              <h1 className='font-bold text-[20px] uppercase'>{category.attributes.name}</h1>
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
