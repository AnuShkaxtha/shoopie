import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Item from '../itemDetails/Item';

const Check: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get('category');
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (category) {
      fetchItems(category);
    }
  }, [category]);

  const fetchItems = async (categoryId: string) => {
    try {
      const response = await fetch(`http://localhost:1337/api/items?filters[category]=${categoryId}&populate=image`, { method: 'GET' });
      const itemsJson = await response.json();
      setItems(itemsJson.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  
  return (
    
    <div className="col-span-1 mt-[160px] md:col-span-3 lg:col-span-4">
      <div className="mx-auto w-[89%] md:my-6 lg:my-9 ">

        <div className="my-4 text-center">
          <h2 className="text-xl font-bold"><p>{category}</p></h2>

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

      </div>
      </div>
      );
};

      export default Check;