import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { fetchCategoriesApi } from '../../api/categoryApi';
import { Category } from '../../models/categoryTypes';

// Main component
export const SubNav: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await fetchCategoriesApi();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className='hidden md:block lg:block'>
      <div className="h-[50px] pt-3">
        <Separator className="w-full bg-black" />
        <NavigationMenu className="w-full mt-1">
          <NavigationMenuList className="flex">
            {categories.map((category) => (
              <NavigationMenuItem key={category.id}>
                <Link to={`/category?category=${category.id}`}>
                  <NavigationMenuTrigger className="text-[13px] ">
                    {category.attributes.name}
                  </NavigationMenuTrigger>
                </Link>
                <NavigationMenuContent>
                  {category.attributes.sub_categories.data.length > 0 ? (
                     <ul className="grid w-[400px] gap-3 p-4 grid-cols-2  text-[13px]">
                     {category.attributes.sub_categories.data.map((subCategory) => (
                       <li key={subCategory.id} className="block p-3 space-y-1 leading-none no-underline transition-colors rounded-md outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                         <Link to={`/categorys/${category.id}/sub-category?subCategory=${subCategory.id}`}>
                           {subCategory.attributes.name}
                         </Link>
                       </li>
                     ))}
                   </ul>
                  ) : (
                    <p>No subcategories available</p>
                  )}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
