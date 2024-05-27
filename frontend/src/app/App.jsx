// Import React and required components
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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


// Define App component
function App() {
  return (
    <AuthProvider>

    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Pass itemId as a prop to ItemDetails component */}
        <Route path="/item/:itemId" element={<ItemDetails />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/account" element={<Account/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;

//div<Item  items.map(item.any())>
