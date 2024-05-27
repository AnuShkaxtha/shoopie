import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  increaseCount,
  decreaseCount,
  clearCart,
  removeSingleItems,
  setCart,
} from "@/app/store/index";
import { Plus, Minus } from "lucide-react";
import { useAuth } from "@/entities/auth/AuthProvider";
import { loadCartItemsFromStorage } from "@/app/store/index";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "@/entities/firebase/auth";

const Cart = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [loading, setLoading] = useState(false); // Track loading state for API request
  const cart = useSelector((state) => state.cart.cart);

  // authentication
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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
    cart.forEach((item) => {
      price += item.price * item.qnty;
      quantity += item.qnty;
    });
    setTotalPrice(price);
    setTotalQuantity(quantity);

    // Save cart to local storage whenever the cart changes
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.uid}`, JSON.stringify(cart));
    }
  }, [cart, currentUser]);

  //functions to handle items in cart
  const handleIncrement = (itemId) => {
    dispatch(increaseCount({ id: itemId }));
  };

  const handleSingleDecrement = (itemId) => {
    dispatch(decreaseCount({ id: itemId }));
  };

  const handleRemove = (itemId) => {
    dispatch(removeSingleItems({ id: itemId }));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  // Function to handle checkout
  // Function to handle checkout
  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Extract product details from the cart
      const products = cart.map((item) => ({
        productName: item.name,
        productId: item.id,
        quantity: item.qnty,
        // Add any additional product details required by your Strapi API
      }));

      // Prepare the order data
      const orderData = {
        products,
        email: currentUser.email,
        price: totalPrice,
      };

      // Make API request to Strapi endpoint
      const response = await fetch("http://localhost:1337/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ data: orderData }),
      });
      const responseData = await response.json();

      // Logging response data
      console.log("Response:", responseData);
      // Check if request was successful
      if (response.ok) {
        console.log("Order placed successfully!");
        // Clear the cart after placing the order
        dispatch(clearCart());
      } else {
        console.error("Error placing order:", response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "70px",
        padding: "50px 0",
      }}
    >
      <Card className="w-[650px]">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Cart Calculation ({cart.length})</CardTitle>
            {cart.length > 0 && (
              <Button onClick={handleClear}>Empty Cart</Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {cart.length <= 0 ? (
            <div>Cart Empty</div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item) => {
                  const imageUrl = `http://localhost:1337${item.image.data.attributes.url}`;
                  return (
                    <div key={item.id} className="pb-4 mb-4 border-b">
                      <div className="flex items-center justify-start ml-5">
                        {/* image */}
                        <div >
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className="w-[150px] mr-4 h-25"
                          />
                        </div>

                        <div className="mb-8 ml-4">
                          <p className="mb-3 text-lg font-bold">{item.name}</p>
                          <p className="mb-0.5 text-sm">Price: ${item.price}</p>
                          <p className="mb-0.5 text-sm">
                            Quantity: {item.qnty}
                          </p>
                          <p className="mb-0.5 text-sm">
                            Total: ${item.price * item.qnty}
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
                              <Minus size={18} />
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
