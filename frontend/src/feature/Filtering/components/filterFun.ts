// src/utils/filterUtils.ts
import { FilterTrends, PriceRanges } from "@/entities/Product/model/productModel";
import { Item } from "@/entities/Cart/models/CartTypes";

export const filterItems = (
  items: Item[],
  filterTrends: FilterTrends,
  priceRanges: PriceRanges,
  searchInput: string,
  allItem: boolean
): Item[] => {
  let filteredItems = items;

  // Filter by trends
  if (!allItem) {
    const selectedTrends = Object.keys(filterTrends).filter(
      (trend) => filterTrends[trend as keyof FilterTrends]
    );
    if (selectedTrends.length > 0) {
      filteredItems = filteredItems.filter((item) =>
        selectedTrends.includes(item.attributes.trend)
      );
    }
  }

  // Filter by price ranges
  const selectedPriceRanges = Object.keys(priceRanges).filter(
    (range) => priceRanges[range as keyof PriceRanges]
  );
  if (selectedPriceRanges.length > 0) {
    filteredItems = filteredItems.filter((item) => {
      const price = item.attributes.price;
      return selectedPriceRanges.some((range) => {
        if (range === "$0_500") return price >= 0 && price <= 500;
        if (range === "$500_1000") return price > 500 && price <= 1000;
        if (range === "$1000_2500") return price > 1000 && price <= 2500;
        if (range === "$2500_4000") return price > 2500 && price <= 4000;
        if (range === "$4000_more") return price > 4000;
        return false;
      });
    });
  }

  // Filter by search input
  return filteredItems.filter((item) =>
    item.attributes.name.toLowerCase().includes(searchInput.toLowerCase())
  );
};
