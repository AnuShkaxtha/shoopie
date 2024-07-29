import  { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Plus, Minus } from "lucide-react";
import { addToCart} from "@/entities/Cart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/firebase/AuthProvider";
import { ItemProps } from "./models/itemModels";

const Item: FC <ItemProps> = ({ item,  id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);  //counting cart items
  const [isHovered, setIsHovered] = useState(false);
  const { currentUser } = useAuth();
  const { brand, price, name, image } = item.attributes;
  const imageUrl = image?.data?.attributes?.url;

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
      <Card onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        className="relative flex justify-center align-center">
        {imageUrl && (
          <img alt={name} src={`${imageUrl}`} className="cursor-pointer w-[300px] h-[400px]"
            onClick={() => navigate(`/item/${id}`)}/>
        )}

        {isHovered && (
          <div className="absolute left-0 w-full p-4 bottom-2">
            <div className="flex justify-between">
              <div className="flex items-center bg-gray-100 rounded">
                <Button onClick={handleSingleDecrement}> <Minus/> </Button>
                <span className="px-2 text-black">{count}</span>
                <Button onClick={handleIncrement}><Plus /></Button>
              </div>
              <Button onClick={handleAddToCart} color="primary">
                Add to Cart
              </Button>
            </div>
          </div>
        )}
      </Card>

      <div className="mt-2 ml-5 text-left">
        <p className="font-bold">{brand} </p>
        <p>{name}</p>
        <p >Price: $ {price}</p>
      </div>
    </div>
  );
};

export default Item;
