import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, setItems } from "@/app/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Item from "../itemDetails/Item";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  clearFilters,
  setSearchInput,
  toggleTrendFilter,
  togglePriceFilter,
} from "@/app/store/shoppingSlice";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Filter from "./Filters";

const ShoppingList = () => {
  const dispatch = useDispatch();
  // State from shopping slice
  const {
    items: shoppingItems,
    searchInput,
    filterTrends,
    priceRanges,
    allItem,
  } = useSelector((state) => state.shopping);
  // manage current tab value
  const [value, setValue] = useState("all"); //default:all
  // manage guide section visibility
  const [showGuide, setShowGuide] = useState(false);

  //getting list of items from redux store
  const items = useSelector((state) => state.cart.items);

  // fetching items from strapi api
  // async function getItems() {
  //   const items = await fetch(
  //     "http://localhost:1337/api/items?populate=image",
  //     {
  //       method: "GET",
  //     }
  //   );
  //   const itemsJson = await items.json();
  //   dispatch(setItems(itemsJson.data));
  // }

  useEffect(() => {
   dispatch(fetchItems())
  }, [dispatch]);

  // function to change tab value
  const handleChange = (eve, newValue) => {
    setValue(newValue);
  };


 

  // filtering items based on trends, price and search input
  const filterItemsByTrends = () => {
    let filteredItems = items;

    if (!allItem) {
      // retrive object of filterTrends and filter 
      const selectedTrends = Object.keys(filterTrends).filter(
        (trend) => filterTrends[trend]
      );

      if (selectedTrends.length > 0) {
        filteredItems = filteredItems.filter((item) =>
          selectedTrends.includes(item.attributes.trend)
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
  const filteredItems = filterItemsByTrends();

  // check if filter has been applied
  const hasFiltersApplied = () => {
    return (
      searchInput.length > 0 ||
      // check is any of the object is true
      Object.values(filterTrends).some((value) => value) ||
      Object.values(priceRanges).some((value) => value)
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5" id="shop">
      {/* Menu Icon */}
      

       {/* GUIDE SECTION */}
       <div className={`col-span-1 px-2 ml-2 md:mt-6 lg:mt-10 lg:ml-6 hidden md:block`}>
        <Filter/>
      </div>


      {/* ITEM SECTION */}
      <div className="col-span-1 md:col-span-3 lg:col-span-4">
        <div className="mx-auto w-[89%] md:my-6 lg:my-9 ">
          {hasFiltersApplied() && (
            <div className="my-4">
              <h2 className="text-xl font-bold">Search Results</h2>
              {filteredItems.length === 0 ? (
                <div className="mt-5 mb-20 text-center">
                  <p className="mt-2 text-gray-500">No items found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filterItemsByTrends().map((item) => (
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

          <h1 className="mt-8 text-3xl font-extrabold text-center">
            Our Featured Products
          </h1>
          {/* PRODUCTS */}
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
                      (item) => item.attributes.trend === "newArrivals"
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
                      (item) => item.attributes.trend === "bestSellers"
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
                    .filter((item) => item.attributes.trend === "topRated")
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

