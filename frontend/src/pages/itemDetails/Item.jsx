import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Plus, Minus } from "lucide-react";
import { addToCart, removeSingleItems } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/entities/auth/AuthProvider";

const Item = ({ item, width, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);  //counting cart items
  const [isHovered, setIsHovered] = useState(false);

  const { currentUser } = useAuth();
  const { category, price, name, image } = item.attributes;
  const imageUrl = image?.data?.attributes?.formats?.medium?.url;

  // function to handle ass to cart 
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
    <div style={{ width }}>
      <Card
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        className="relative"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imageUrl && (
          <img
            alt={name}
            src={`http://localhost:1337${imageUrl}`}
            className="cursor-pointer"
            onClick={() => navigate(`/item/${id}`)}
            style={{ width: "300px", height: "400px" }}
          />
        )}

        {isHovered && (
          <div className="absolute left-0 w-full p-4 bottom-2">
            <div className="flex justify-between">
              <div className="flex items-center bg-gray-100 rounded">
                <Button
                  className="focus:outline-none"
                  onClick={handleSingleDecrement}
                >
                  <Minus />
                </Button>
                <span className="px-2 text-black">{count}</span>
                <Button
                  className="focus:outline-none"
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
        <p className="">Price: $ {price}</p>
      </div>
    </div>
  );
};

export default Item;
