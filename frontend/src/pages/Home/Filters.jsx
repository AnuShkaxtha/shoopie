import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  setSearchInput,
  toggleTrendFilter,
  togglePriceFilter,
} from "@/app/store/shoppingSlice";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Item from "../itemDetails/Item";

const Filter = () => {
  const dispatch = useDispatch();
  const {
    searchInput,
    filterTrends,
    priceRanges,
    allItem,
  } = useSelector((state) => state.shopping);

  const handleSearchInputChange = (event) => {
    dispatch(setSearchInput(event.target.value));
  };

  const handleCheckboxChange = (trend) => {
    dispatch(toggleTrendFilter(trend));
  };

  const handlePriceRangeChange = (range) => {
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
              checked={filterTrends[trend]}
              onChange={() => handleCheckboxChange(trend)}
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
              checked={priceRanges[range]}
              onChange={() => handlePriceRangeChange(range)}
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

export default Filter;
