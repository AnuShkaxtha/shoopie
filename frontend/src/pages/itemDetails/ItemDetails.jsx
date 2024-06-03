import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchItems, fetchItemById } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus, Heart } from "lucide-react";
import Item from "./Item";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/entities/auth/AuthProvider";

const ItemDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const { itemId } = useParams();
  const item = useSelector((state) => state.cart.item);
  const items = useSelector((state) => state.cart.items);
  const { currentUser } = useAuth();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleAddToCart = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      dispatch(addToCart({ id: item.id, ...item.attributes, count }));
      setCount(1);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleSingleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchItemById(itemId));
  }, [dispatch, itemId]);

  return (
    <div className="w-[90%] mx-auto my-20 ">
      <div className="grid grid-cols-2 gap-10 ">
        <div className="col-span-2 mt-4 lg:mb-10 lg:col-span-1 md:col-span-1">
          {item && (
            <img
              alt={item?.attributes?.name}
              src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
              className="object-contain w-full h-auto max-h-[520px]"
            />
          )}
        </div>
        <div className="col-span-2 mt-4 mb-10 lg:col-span-1 md:col-span-1">
          <div className="flex justify-between mb-3 lg:mb-16">
            <Link to={"/"}>
              <div>Home / Item</div>
            </Link>
          </div>

          <p className="mb-4 text-2xl font-bold">{item?.attributes?.name}</p>
          <p className="mb-6 text-xl">$ {item?.attributes?.price}</p>

          <div>
            {item?.attributes?.longDescription?.map((paragraph, index) => (
              <p key={index}>
                {paragraph.children.map((child, idx) => (
                  <span key={idx}>{child.text}</span>
                ))}
              </p>
            ))}
          </div>

          <div className="flex items-center mt-3 mb-8">
            <div className="flex items-center p-1 mr-4">
              <Button onClick={handleSingleDecrement}>
                <Minus />
              </Button>
              <p className="px-4">{count}</p>
              <Button onClick={handleIncrement}>
                <Plus />
              </Button>
            </div>
            <Button onClick={handleAddToCart} color="primary">
              Add to Cart
            </Button>
          </div>

          <div className="flex items-center mb-4">
            <Heart className="mr-2" />
            <p>ADD TO WISHLIST</p>
          </div>
          <p>CATEGORIES: " {item?.attributes?.category} "</p>
        </div>
      </div>

      <div className="my-8">
        <Tabs value={value} onValueChange={handleChange}>
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <div>
              {item?.attributes?.longDescription?.map((paragraph, index) => (
                <div key={index}>
                  {paragraph.children.map((child, idx) => (
                    <span key={idx}>{child.text}</span>
                  ))}
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div>Reviews</div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-20">
        <p className="mb-4 text-2xl font-bold">Related Products</p>
        <div className="flex flex-wrap gap-10">
          {items.slice(0, 4).map((relatedItem, index) => (
            <Item
              key={`${relatedItem.attributes.name}-${index}`}
              item={relatedItem}
              id={relatedItem.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
