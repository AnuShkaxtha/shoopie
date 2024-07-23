import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "@/entities/Cart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Item from "../../../entities/Item/Item";
import { FilterTrends, PriceRanges } from "@/entities/Product/model/productModel";
import { RootState } from "@/app/store/store";
import Filter from "../../Filtering/components/HomeFilters";
import { filterItems } from "@/feature/Filtering/components/filterFun";

const ShoppingList: React.FC = () => {
  const dispatch = useDispatch(); //Hook to dispatch actions.
  const { searchInput, filterTrends, priceRanges, allItem, } = useSelector((state: RootState) => state.shopping); //Hook to select parts of the state from the Redux store.
  const [value, setValue] = useState<string>("all"); //manage the current tab selection. efault set to all
  const items = useSelector((state: RootState) => state.cart.items); // takes state of cart items 
   // fetch items when component mounts
  useEffect(() => {
    dispatch(fetchItems() as any);
  }, [dispatch]);
  // function to change tab value    
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  // function to filtering items 
  

  const filteredItems = filterItems(items, filterTrends, priceRanges, searchInput, allItem);

  const hasFiltersApplied = () => {
    return (
      searchInput.length > 0 ||
      Object.values(filterTrends).some((value) => value) ||
      Object.values(priceRanges).some((value) => value)
    );
  };

  const renderFilteredItems = (filterValue: string) => {
    let displayedItems = items;

    if (filterValue !== "all") {
      displayedItems = displayedItems.filter(
        (item) => item.attributes.trend === filterValue
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayedItems.map((item) => (
          <Item
            key={`${item.attributes.name}-${item.id}`}
            item={item}
            id={item.id}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5" id="shop">
      <div className={`col-span-1 px-2 ml-2 md:mt-6 lg:mt-10 lg:ml-6 hidden md:block`}>
        <Filter />
      </div>

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
                  {filteredItems.map((item) => (
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
          <div>
            <Tabs value={value} onValueChange={handleChange} className="my-6">
              <TabsList className="flex flex-wrap justify-center lg:justify-center h-[5.5rem] lg:h-[2.5rem] md:h-[3.5rem]">
                <TabsTrigger value="all">ALL</TabsTrigger>
                <TabsTrigger value="newArrivals">NEW ARRIVALS</TabsTrigger>
                <TabsTrigger value="bestSellers">BEST SELLERS</TabsTrigger>
                <TabsTrigger value="topRated">TOP RATED</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                {renderFilteredItems("all")}
              </TabsContent>
              <TabsContent value="newArrivals">
                {renderFilteredItems("newArrivals")}
              </TabsContent>
              <TabsContent value="bestSellers">
                {renderFilteredItems("bestSellers")}
              </TabsContent>
              <TabsContent value="topRated">
                {renderFilteredItems("topRated")}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
