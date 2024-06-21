import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  increaseCount,
  decreaseCount,
  clearCart,
  removeSingleItems,
  setCart,
} from "@/entities/Cart/index";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useAuth } from "@/firebase/AuthProvider";
import { loadCartItemsFromStorage } from "@/entities/Cart/index";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [loading, setLoading] = useState(false); // Track loading state for API request
  const cart = useSelector((state: any) => state.cart.cart);
  const [orderSuccess, setOrderSuccess] = useState(false); // Track order success
  // Authentication
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  console.log(currentUser)

  // Load cart items from local storage on component mount
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      const savedCart = loadCartItemsFromStorage(currentUser.uid);
      if (savedCart.length > 0) {
        dispatch(setCart(savedCart));
      }
    }
  }, [dispatch, currentUser, navigate]);

  // Update total price and quantity whenever the cart changes
  useEffect(() => {
    let price = 0;
    let quantity = 0;
    cart.forEach((item: any) => {
      price += item.attributes.price * item.qnty;
      quantity += item.qnty;
    });
    setTotalPrice(price);
    setTotalQuantity(quantity);

    // Save cart to local storage whenever the cart changes
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.uid}`, JSON.stringify(cart));
    }
  }, [cart, currentUser]);

  // Functions to handle items in cart
  const handleIncrement = (itemId: number) => {
    dispatch(increaseCount({ id: itemId }));
  };

  const handleSingleDecrement = (itemId: number) => {
    dispatch(decreaseCount({ id: itemId }));
  };

  const handleRemove = (itemId: number) => {
    dispatch(removeSingleItems({ id: itemId }));
  };

  // clearing entire cart 
  const handleClear = () => {
    dispatch(clearCart());
  };

  // Function to handle checkout
  const handleCheckout = async () => {
    setLoading(true);
    setOrderSuccess(false);
    try {
      // Extracting product details from the cart
      const products = cart.map((item: any) => ({
        productName: item.attributes.name,
        productId: item.id,
        quantity: item.qnty,
      }));
      // Prepare the order data
      const orderData = {
        products,
        email: currentUser?.email || '', // Use optional chaining to safely access email property
        price: totalPrice,
      };


      // Make API request to Strapi endpoint
      const response = await fetch("https://strapi-backend-ddn2.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // converting orderData from js object to json string for backend
        body: JSON.stringify({ data: orderData }),
      });
      //const responseData = await response.json();


      if (response.ok) {
        console.log("Order placed successfully!");
        setOrderSuccess(true);
        // Clear the cart after placing the order
        dispatch(clearCart());
      } else {
        console.error("Error placing order:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error placing order:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-[70px] py-[50px] lg:pt-28 md:pt-28">
      <Card className="w-[650px] lg:w-[950px]">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Cart Calculation ({cart.length})</CardTitle>
            {cart.length > 0 && (
              <Button onClick={handleClear}>Empty Cart</Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {orderSuccess && (
            <div className="mb-4 text-green-500">
              Order placed successfully!
            </div>
          )}
          {cart.length <= 0 ? (
            <div className="flex flex-col items-center justify-center mt-7">
              <p className="text-lg">Your cart is Empty </p>
              <div className="my-7">
                <ShoppingCart size={40} />
              </div>
              <Button onClick={() => navigate("/")}>Continue Shooping </Button>
            </div>

          ) : (
            <>
              {/* ITEMS */}
              <div className="space-y-4">
                {cart.map((item: any) => {
                  const imageUrl = item.attributes.image.data ? `${item.attributes.image.data.attributes.url}` : '';

                  return (
                    <div key={item.id} className="pb-4 mb-4 border-b">
                      <div className="flex items-center justify-start ml-5">
                        <div>
                          {imageUrl && (
                            <img
                              src={imageUrl}
                              alt={item.attributes.name}
                              className="w-[150px] lg:w-[200px] mr-4 h-25"
                            />
                          )}
                        </div>
                        <div className="mb-8 ml-4">
                          <p className="mb-3 text-lg font-bold lg:text-xl">{item.attributes.name}</p>
                          <p className="mb-0.5 text-sm lg:text-lg ">Price: ${item.attributes.price}</p>
                          <p className="mb-0.5 text-sm lg:text-lg">
                            Quantity: {item.qnty}
                          </p>
                          <p className="mb-0.5 text-sm lg:text-lg">
                            Total: ${item.attributes.price * item.qnty}
                          </p>
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              onClick={
                                item.qnty <= 1
                                  ? () => handleRemove(item.id)
                                  : () => handleSingleDecrement(item.id)
                              }
                            >
                              <Minus size={18}  />
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={() => handleIncrement(item.id)}
                            >
                              <Plus size={18} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* TOTAL */}
              <div className="flex justify-end mt-4 text-[15px]">
                <div className="text-right">
                  <p className="mb-2">
                    Total Quantity:{" "}
                    <span className="font-bold">{totalQuantity}</span>
                  </p>
                  <p className="mb-3">
                    Total Price:{" "}
                    <span className="font-bold">${totalPrice}</span>
                  </p>
                </div>
              </div>
              {/* CHECKOUT */}
              <div className="flex justify-end">
                <Button onClick={handleCheckout} disabled={loading}>
                  {loading ? "Placing Order..." : "Proceed To Checkout"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
