import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  setSearchInput,
  toggleTrendFilter,
  togglePriceFilter,
} from "@/entities/Product/shoppingSlice";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RootState } from "@/app/store/store";
import { Link } from 'react-router-dom';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area'; // Import ScrollArea from shadcn ui
import { fetchCategoriesApi } from "../../Home/api/categoryApi";
import { Category } from "@/feature/Home/models/categoryTypes";

const HomeFilter: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();
  const {
    searchInput,
    filterTrends,
    priceRanges,
  } = useSelector((state: RootState) => state.shopping);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(event.target.value));
  };

  const handleCheckboxChange = (trend: keyof typeof filterTrends) => {
    dispatch(toggleTrendFilter(trend));
  };

  const handlePriceRangeChange = (range: keyof typeof priceRanges) => {
    dispatch(togglePriceFilter(range));
  };

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
    <div className="h-full">
      {/* SEARCH */}
      <div className="lg:mt-4">
        <Input
          type="text"
          placeholder="Search by item name"
          value={searchInput}
          onChange={handleSearchInputChange}
          className="py-1 border border-gray-300 rounded-md"
        />
      </div>
      <Separator className="my-4 bg-gray-400" />
      {/* CATEGORY */}
      <div className="block h-full pt-3 md:hidden lg:hidden">
        <p className="uppercase text-[14px] font-bold">Category</p>
        <Accordion type='multiple' className="w-full mt-1">
          {categories.map((category) => (
            <AccordionItem key={category.id} value={category.attributes.name}>
              <AccordionTrigger className="text-[12px] lg:text-[12px]">
                {category.attributes.name}
              </AccordionTrigger>
              <AccordionContent>
                {category.attributes.sub_categories.data.length > 0 ? (
                  <ul className="grid w-[auto] gap-2 grid-cols-2 text-[13px]">
                    {category.attributes.sub_categories.data.map((subCategory) => (
                      <li key={subCategory.id} className="block py-3 pl-2 space-y-1 leading-none no-underline transition-colors rounded-md outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link to={`/categorys/${category.id}/sub-category?subCategory=${subCategory.id}`}>
                          {subCategory.attributes.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No subcategories available</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Separator className="my-4 bg-gray-400" />
      {/* TREND */}
      <div className="text-[14px] mt-3">
        <p className="pb-2 uppercase text-[14px] font-bold">Trends</p>
        <label className="flex items-center pt-1">
          <input
            type="checkbox"
            className="mr-2 form-checkbox"
            disabled
            checked
          />
          <p>All</p>
        </label>
        {Object.keys(filterTrends).map((trend) => (
          <label className="flex items-center pt-1" key={trend}>
            <input
              type="checkbox"
              className="mr-2 form-checkbox"
              checked={filterTrends[trend as keyof typeof filterTrends]}
              onChange={() => handleCheckboxChange(trend as keyof typeof filterTrends)}
            />
            <span>{trend}</span>
          </label>
        ))}
      </div>
      <Separator className="my-4 bg-gray-400" />
      {/* PRICE */}
      <div className="text-[14px] mt-3">
        <p className="mb-2 uppercase text-[14px] font-bold">Price Range</p>
        {Object.keys(priceRanges).map((range) => (
          <label className="flex items-center pt-1 mb-1" key={range}>
            <input
              type="checkbox"
              className="mr-2 form-checkbox"
              checked={priceRanges[range as keyof typeof priceRanges]}
              onChange={() => handlePriceRangeChange(range as keyof typeof priceRanges)}
            />
            <span>{range}</span>
          </label>
        ))}
      </div>
      <Button
        className="mt-4 text-gray-700 bg-gray-200 rounded-md mb-9 hover:bg-gray-300 focus:outline-none"
        onClick={() => dispatch(clearFilters())}
      >
        Clear Filters
      </Button>
    </div>
  );
};

const Filter: React.FC = () => {
  return (
    <ScrollArea className="h-full">
      <HomeFilter />
    </ScrollArea>
  );
};

export default Filter;
