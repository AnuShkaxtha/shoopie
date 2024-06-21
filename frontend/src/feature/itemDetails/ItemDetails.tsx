import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchItems, fetchItemById } from "@/entities/Cart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus, Heart } from "lucide-react";
import Item from "../../entities/Item/Item";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/firebase/AuthProvider";
import { Separator } from "@/components/ui/separator";
interface ItemDetailsProps { }

const ItemDetails: React.FC<ItemDetailsProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("description");
  const [count, setCount] = useState<number>(1);
  const { itemId } = useParams();
  const item = useSelector((state: any) => state.cart.item);
  const items = useSelector((state: any) => state.cart.items);
  const { currentUser } = useAuth();

  const handleChange = (newValue: string) => {
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
    dispatch(fetchItems() as any);
    dispatch(fetchItemById(Number(itemId)) as any);
  }, [dispatch, itemId]);

  console.log(item?.attributes)

  return (
    <div className="w-[90%] mx-auto mb-20 mt-20 md:mt-40 lg:mt-40  ">
      <div className="grid grid-cols-2 gap-10 ">
        <div className="col-span-2 mt-4 lg:mb-10 lg:col-span-1 md:col-span-1 max-w-[520px]">
          {item && (
            <img
              alt={item?.attributes?.name}
              src={`${item?.attributes?.image?.data?.attributes?.url}`}
              className="object-contain w-full h-auto max-h-[520px]"
            />
          )}
        </div>
        <div className="col-span-2 mt-4 mb-10 lg:col-span-1 md:col-span-1">
          <div className="flex justify-between mb-3 lg:mb-9">
            
              <div><Link to={"/"}><span>Home</span> </Link>/ <span>{item?.attributes?.category?.data?.attributes?.name}</span></div>
            
          </div>
          
          <p className="mb-1 text-2xl font-bold">{item?.attributes?.brand}</p>
          <p className="mb-4 text-xl font-bold">{item?.attributes?.name}</p>
          <p className="mb-6 text-xl">$ {item?.attributes?.price}</p>

          <Separator className="mt-2 bg-gray-500 "/>

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
          <p>TRENDS: " {item?.attributes?.trend} "</p>
          <Separator className="mt-2 bg-gray-500 "/>
          <div className="mt-3">
            {item?.attributes?.shortDescription?.map((paragraph: any, index: number) => (
              <p key={index}>
                {paragraph.children.map((child: any, idx: number) => (
                  <span key={idx}>{child.text}</span>
                ))}
              </p>
            ))}
          </div>
        </div>
        
      </div>

      <div className="mt-3 mb-8">
        <Tabs value={value} onValueChange={handleChange}>
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <div className="pl-2">
              {item?.attributes?.longDescription?.map((element: any, index: number) => {
                if (element.type === 'heading') {
                  return (
                    <div className="font-bold text-[18px]" key={index}>
                      {element.children.map((child: any, idx: number) => (
                        <span key={idx}>{child.text}</span>
                      ))}
                    </div>
                  );
                } else if (element.type === 'paragraph') {
                  return (
                    <div key={index}>
                      {element.children.map((child: any, idx: number) => (
                        <span key={idx}>{child.text}</span>
                      ))}
                    </div>
                  );
                } else {
                  return null;
                }
              })}

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
          {items.slice(0, 4).map((relatedItem: any, index: number) => (
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
