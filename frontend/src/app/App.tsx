// Import React and required components
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/HomePage";
import ItemDetails from "../feature/itemDetails/ItemDetails";
import { Navbar } from "../shared/ui/Navbar";
import Footer from "../shared/ui/Footer";
import "./App.css";
import { AuthProvider } from "@/firebase/AuthProvider";
import { Account} from "@/feature/Account";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import CartPage from "@/pages/CartPage";
import CategoryPage from "@/pages/CategoryPage";
import SubCategoryPage from "@/pages/SubCategoryPage";

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
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<Account />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/categorys/:categoryId/sub-category" element={<SubCategoryPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
