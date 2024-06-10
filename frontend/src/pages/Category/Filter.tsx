import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  toggleTrendFilter,
  togglePriceFilter,
} from "@/app/store/shoppingSlice";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RootState } from "@/app/store/store";

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const {
    filterTrends,
    priceRanges,
    // allItem,
  } = useSelector((state: RootState) => state.shopping);

  

  const handleCheckboxChange = (trend: keyof typeof filterTrends) => {
    dispatch(toggleTrendFilter(trend));
  };
  

  const handlePriceRangeChange = (range: keyof typeof priceRanges) => {
    dispatch(togglePriceFilter(range));
  };

  return (
    <div>
      <h1>FILTER</h1>
      <Separator className="my-4 bg-gray-400" />
      
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

export default Filter;
