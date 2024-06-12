// Import React and required components
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";
import ItemDetails from "../pages/itemDetails/ItemDetails";
import { Navbar } from "../shared/ui/Navbar";
import Footer from "../shared/ui/Footer";
import "./App.css";
import Cart from "../pages/CartDetail/Cart";
import Login from "../pages/Auth/Login";
import { AuthProvider } from "../entities/auth/AuthProvider";
import Register from "../pages/Auth/Register";
import Account from "../pages/Account/Account";
import OrderList from "@/pages/Account/OrderList";
import Sample from "@/pages/sample/Sample";
import Category from "@/pages/Category/Category";
import SubCategory from "@/pages/Category/SubCategory";

const ScrollToTop = () => {
  //  returns current location of object
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Define App component
function App(): JSX.Element {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <ScrollToTop />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/item/:itemId" element={<ItemDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<Account />} />
              <Route path="/orders" element={<OrderList />} />
              <Route path="/sample" element={<Sample />} />
              <Route path="/category" element={<Category />} />
              <Route path="/categorys/:categoryId/sub-category" element={<SubCategory />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
