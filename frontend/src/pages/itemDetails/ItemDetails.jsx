import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store";
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
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const { currentUser } = useAuth();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  // adding item to cart
  const handleAddToCart = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      dispatch(addToCart({ id: item.id, ...item.attributes, count }));
      setCount(1); // Reset count after adding to cart
    }
  };

  // increment number of items to be added
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // decrement number of items to be added
  const handleSingleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // fetching all items from strapi api
  async function getItems() {
    try {
      const response = await fetch(
        "http://localhost:1337/api/items?populate=image",
        { method: "GET" }
      );
      const itemsJson = await response.json();
      setItems(itemsJson.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  // fetching single items from strapi api whose id = ${itemId}
  async function getItem(itemId) {
    try {
      const res = await fetch(
        `http://localhost:1337/api/items/${itemId}?populate=image`,
        { method: "GET" }
      );
      const itemJson = await res.json();
      setItem(itemJson.data);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  }
  console.log(item);

  useEffect(() => {
    const fetchData = async () => {
      await getItems();
      await getItem(itemId);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   // const selectedItem = items.find((item) => item.attributes.id === itemId);
  //   if (itemId) {
  //     const selectedItem=items.filter(item => item.id === itemId);
  //     setItem(selectedItem);
  //   }
  // }, [itemId, items]);

  return (
    <div className="w-4/5 mx-auto my-20">
      <div className="flex flex-wrap gap-10">
        {/* IMAGES */}
        <div className="flex-1 mb-10">
          {item && (
            <img
              alt={item?.attributes?.name}
              src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
              className="object-contain w-full h-auto max-h-[520px] "
            />
          )}
        </div>
        {/* DETAILS */}
        <div className="flex-1 mb-10">
          <div className="flex justify-between mb-16">
            <Link to={"/"}>
              <div>Home / Item</div>
            </Link>
          </div>

          <p className="mb-4 text-2xl font-bold">{item?.attributes?.name}</p>
          <p className="mb-6 text-xl">$ {item?.attributes?.price}</p>
          {/* <p className="mb-8">{item?.attributes?.longDescription}</p>  */}

          <div>
            {item?.attributes?.longDescription?.map((paragraph, index) => (
              <p key={index}>
                {paragraph.children.map((child, idx) => (
                  <span key={idx}>{child.text}</span>
                ))}
              </p>
            ))}
          </div>

          <div className="flex items-center mt-3 mb-8 ">
            <div className="flex items-center p-1 mr-4 ">
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
      {/* RELATED ITEMS */}
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
