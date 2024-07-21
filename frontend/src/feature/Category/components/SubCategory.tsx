import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsBySubCategory } from '@/entities/Product/shoppingSlice'; // Assuming you have a fetchItemsBySubCategory action
import { RootState, AppDispatch } from '@/app/store/store';
import Item from '@/entities/Item/Item';
import { SubCategory as SubCategoryInterface } from '../models/categoryModel';
import { fetchSubCategoryById } from '../api/specificCategoryApi';




const SubCategory: React.FC = () => {
  const location = useLocation();
  console.log(location)
  const pathnameSegments = location.pathname.split('/'); // Split the pathname into segments
  const categoryId = pathnameSegments[2];

console.log(categoryId);

  const dispatch = useDispatch<AppDispatch>();
  const [subCategory, setSubCategory] = useState<SubCategoryInterface | null>(null);

  const items = useSelector((state: RootState) => state.shopping.items);

  const searchParams = new URLSearchParams(location.search);

  const subCategoryId = searchParams.get('subCategory');

  console.log(subCategoryId) // null 

  useEffect(() => {
    const fetchSubCategoryData = async () => {
      if (subCategoryId) {
        try {
          const subCategoryData = await fetchSubCategoryById(subCategoryId);
          setSubCategory(subCategoryData);
          dispatch(fetchItemsBySubCategory(categoryId, subCategoryId));
        } catch (error) {
          console.error('Error fetching subcategory:', error);
        }
      }
    };
    fetchSubCategoryData();
  }, [categoryId, subCategoryId, dispatch]);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5 lg:mt-[130px] mt-[100px] md:mt-[130px]">
      {/* <div className={`col-span-1 px-2 ml-2 md:mt-6 lg:mt-10 lg:ml-6 hidden md:block`}>
        <Filter />
      </div> */}
      {/* <div className="col-span-1 md:col-span-3 lg:col-span-4"> */}
      <div className="col-span-5">
        <div className="mx-auto w-[89%] md:my-6 lg:my-9">
          {subCategory ? (
            
            <div className='text-center'>
              <h1 className='font-bold text-[20px] uppercase'>{subCategory?.attributes.name}</h1>
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

export default SubCategory;
