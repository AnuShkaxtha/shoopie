import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Plus, Minus } from "lucide-react";
import { addToCart} from "@/app/store";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/entities/auth/AuthProvider";

interface ItemProps {
  item: {
    id: number;
    attributes: {
      category: string;
      price: number;
      name: string;
      image?: {
        data: {
          attributes: {
            formats: {
              medium: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);  //counting cart items
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const { currentUser } = useAuth();
  const { price, name, image } = item.attributes;
  const imageUrl = image?.data?.attributes?.formats?.medium?.url;

  // function to handle add to cart 
  const handleAddToCart = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      dispatch(addToCart({ id: item.id, ...item.attributes, count }));
      setCount(1); // Reset count after adding to cart
    }
  };

  // function to handle item counts
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleSingleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <Card
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        className="relative flex justify-center align-center"
      >
        {imageUrl && (
          <img
            alt={name}
            src={`http://localhost:1337${imageUrl}`}
            className="cursor-pointer w-[300px] h-[400px]"
            onClick={() => navigate(`/item/${item.id}`)}
          />
        )}

        {isHovered && (
          <div className="absolute left-0 w-full p-4 bottom-2">
            <div className="flex justify-between">
              <div className="flex items-center bg-gray-100 rounded">
                <Button
                  onClick={handleSingleDecrement}
                >
                  <Minus />
                </Button>
                <span className="px-2 text-black">{count}</span>
                <Button
                  onClick={handleIncrement}
                >
                  <Plus />
                </Button>
              </div>
              <Button onClick={handleAddToCart} color="primary">
                Add to Cart
              </Button>
            </div>
          </div>
        )}
      </Card>

      <div className="mt-2">
        <p>{name}</p>
        <p >Price: $ {price}</p>
      </div>
    </div>
  );
};

export default Item;
