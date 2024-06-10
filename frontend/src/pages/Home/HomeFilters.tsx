import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  setSearchInput,
  toggleTrendFilter,
  togglePriceFilter,
  toggleCategoryFilter,
} from "@/app/store/shoppingSlice";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RootState } from "@/app/store/store";

const HomeFilter: React.FC = () => {
  const dispatch = useDispatch();
  const {
    searchInput,
    filterTrends,
    priceRanges,
    filterCategory,
    // allItem,
  } = useSelector((state: RootState) => state.shopping);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(event.target.value));
  };

  const handleCheckboxChange = (trend: keyof typeof filterTrends) => {
    dispatch(toggleTrendFilter(trend));
  };
  const handleCategoryChange = (category: keyof typeof filterCategory) => {
    dispatch(toggleCategoryFilter(category));
  };

  const handlePriceRangeChange = (range: keyof typeof priceRanges) => {
    dispatch(togglePriceFilter(range));
  };

  return (
    <div>
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
      {/* category */}
      <div className="text-[14px] mt-3">
        <p className="pb-2">category</p>
        {/* Assuming 'all' is a default trend and cannot be unchecked */}
        <label className="flex items-center pt-1">
          <input
            type="checkbox"
            className="mr-2 form-checkbox"
            disabled
            checked
          />
          <p>All</p>
        </label>
        {Object.keys(filterCategory).map((category) => (
          <label className="flex items-center pt-1" key={category}>
            <input
              type="checkbox"
              className="mr-2 form-checkbox"
              checked={filterCategory[category as keyof typeof filterCategory]}
             onChange={() => handleCategoryChange(category as keyof typeof filterCategory)}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>
      <Separator className="my-4 bg-gray-400" />
      {/* TREND */}
      <div className="text-[14px] mt-3">
        <p className="pb-2">Trends</p>
        {/* Assuming 'all' is a default trend and cannot be unchecked */}
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
        <p className="mb-2">Price Range</p>
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
        className="mt-4 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
        onClick={() => dispatch(clearFilters())}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default HomeFilter;
