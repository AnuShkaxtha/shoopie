import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "@/app/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Item from "../itemDetails/Item";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  clearFilters,
  setSearchInput,
  toggleCategoryFilter,
  togglePriceFilter,
} from "@/app/store/shoppingSlice";

const ShoppingList = () => {
  const dispatch = useDispatch();
  // State from shopping slice
  const {
    items: shoppingItems,
    searchInput,
    filterCategories,
    priceRanges,
    allItem,
  } = useSelector((state) => state.shopping);
  // manage current tab value
  const [value, setValue] = useState("all"); //default:all

  //getting list of items from redux store
  const items = useSelector((state) => state.cart.items);

  // fetching items from strapi api
  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, [dispatch]);

  // function to change tab value
  const handleChange = (eve, newValue) => {
    setValue(newValue);
  };

  // function to change state of price range
  const handlePriceRangeChange = (range) => {
    dispatch(togglePriceFilter(range));
  };

  // search item
  const handleSearchInputChange = (event) => {
    dispatch(setSearchInput(event.target.value));
  };

  // update search input chnage
  const handleCheckboxChange = (category) => {
    dispatch(toggleCategoryFilter(category));
  };

  // filtering items based on category, price and search input
  const filterItemsByCategory = () => {
    let filteredItems = items;

    if (!allItem) {
      // retrive object of filterCategory and filter 
      const selectedCategories = Object.keys(filterCategories).filter(
        (category) => filterCategories[category]
      );

      if (selectedCategories.length > 0) {
        filteredItems = filteredItems.filter((item) =>
          selectedCategories.includes(item.attributes.category)
        );
      }
    }

    const selectedPriceRanges = Object.keys(priceRanges).filter(
      (range) => priceRanges[range]
    );

    if (selectedPriceRanges.length > 0) {
      filteredItems = filteredItems.filter((item) => {
        const price = item.attributes.price;
        return selectedPriceRanges.some((range) => {
          if (range === "range0_300") return price >= 0 && price <= 300;
          if (range === "range300_600") return price > 300 && price <= 600;
          if (range === "range600_1000") return price > 600 && price <= 1000;
          if (range === "range1000_4000") return price > 1000 && price <= 4000;
          return false;
        });
      });
    }

    return filteredItems.filter((item) =>
      item.attributes.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  // fitered items
  const filteredItems = filterItemsByCategory();

  // check if filter has been applied
  const hasFiltersApplied = () => {
    return (
      searchInput.length > 0 ||
      // check is any of the object is true
      Object.values(filterCategories).some((value) => value) ||
      Object.values(priceRanges).some((value) => value)
    );
  };

  return (
    <div className="grid grid-cols-5 gap-4" id="shop">
      {/* GUIDE SECTION */}
      <div className="col-span-1 px-2 mt-10 ml-6">
        {/* SEARCH */}
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Search by item name"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="py-1 border border-gray-300 rounded-md "
          />
        </div>
        <Separator className="my-4 bg-gray-400" />
        {/* CATEGORY */}
        <div className="text-[14px] mt-3 ">
          <p className="pb-2">Search by Category </p>

          <label className="flex items-center pt-1">
            <input
              type="checkbox"
              className="mr-2 form-checkbox"
              onChange={() => dispatch(clearFilters())}
            />
            <p>All</p>
          </label>
          <label className="flex items-center pt-1">
            <input
              type="checkbox"
              className="mr-2 form-checkbox"
              checked={filterCategories.newArrivals}
              onChange={() => handleCheckboxChange("newArrivals")}
            />
            <span>New Arrivals</span>
          </label>
          <label className="flex items-center pt-1">
            <input
              type="checkbox"
              className="mr-2 form-checkbox"
              checked={filterCategories.bestSellers}
              onChange={() => handleCheckboxChange("bestSellers")}
            />
            <span>Best Sellers</span>
          </label>
          <label className="flex items-center pt-1">
            <input
              type="checkbox"
              className="mr-2 form-checkbox"
              checked={filterCategories.topRated}
              onChange={() => handleCheckboxChange("topRated")}
            />
            <span>Top Rated</span>
          </label>
        </div>
        <Separator className="my-4 bg-gray-400" />
        {/* PRICE */}
        <div className="text-[14px] mt-3">
          <p className="mb-2">Price Range</p>
          <label className="flex items-center pt-1 mb-1">
            <input
              type="checkbox"
              className="mr-2 form-checkbox"
              checked={priceRanges.range0_300}
              onChange={() => handlePriceRangeChange("range0_300")}
            />
            <span>0-300</span>
          </label>
          <label className="flex items-center pt-1 mb-1">
            <input
              type="checkbox"
              className="mr-2 form-checkbox"
              checked={priceRanges.range300_600}
              onChange={() => handlePriceRangeChange("range300_600")}
            />
            <span>300-600</span>
          </label>
          <label className="flex items-center pt-1 mb-1">
            <input
              type="checkbox"
              className="mr-2 form-checkbox"
              checked={priceRanges.range600_1000}
              onChange={() => handlePriceRangeChange("range600_1000")}
            />
            <span>600-1000</span>
          </label>
          <label className="flex items-center pt-1 mb-1">
            <input
              type="checkbox"
              className="mr-2 form-checkbox"
              checked={priceRanges.range1000_4000}
              onChange={() => handlePriceRangeChange("range1000_4000")}
            />
            <span>1000-4000</span>
          </label>
        </div>
        {/* Button to clear all above filter */}
        <button
          className="px-4 py-2 mt-4 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          onClick={() => dispatch(clearFilters())}
        >
          Clear Filters
        </button>
      </div>

      {/* ITEM SECTION */}
      <div className="col-span-4">
        <div className="mx-auto w-[89%] my-8 mt-14">
          {hasFiltersApplied() && (
            <div className="my-4">
              <h2 className="text-xl font-bold">Search Results</h2>
              {filteredItems.length === 0 ? (
                <div className="mt-5 mb-20 text-center">
                  <p className="mt-2 text-gray-500">No items found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filterItemsByCategory().map((item) => (
                    <Item
                      key={`${item.attributes.name}-${item.id}`}
                      item={item}
                      id={item.id}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <h1 className="text-3xl font-extrabold text-center">
            Our Featured Products
          </h1>

          <div>
            <Tabs value={value} onValueChange={handleChange} className="my-6">
              <TabsList className="flex justify-center">
                <TabsTrigger value="all">ALL</TabsTrigger>
                <TabsTrigger value="newArrivals">NEW ARRIVALS</TabsTrigger>
                <TabsTrigger value="bestSellers">BEST SELLERS</TabsTrigger>
                <TabsTrigger value="topRated">TOP RATED</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <Item
                      key={`${item.attributes.name}-${item.id}`}
                      item={item}
                      id={item.id}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="newArrivals">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items
                    .filter(
                      (item) => item.attributes.category === "newArrivals"
                    )
                    .map((item) => (
                      <Item
                        key={`${item.attributes.name}-${item.id}`}
                        item={item}
                        id={item.id}
                      />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="bestSellers">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items
                    .filter(
                      (item) => item.attributes.category === "bestSellers"
                    )
                    .map((item) => (
                      <Item
                        key={`${item.attributes.name}-${item.id}`}
                        item={item}
                        id={item.id}
                      />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="topRated">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items
                    .filter((item) => item.attributes.category === "topRated")
                    .map((item) => (
                      <Item
                        key={`${item.attributes.name}-${item.id}`}
                        item={item}
                        id={item.id}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
