import LogIn from "../Routes/LogIn";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Help from "../Components/Help";
import SignIn from "../Routes/SignIn";
import SinglePage from "../Components/SinglePage";
import ProductPage from "../Routes/ProductPage";
import Homepage from "./Homepage";
import Cart from "../Components/Cart";
import Checkout from "../Components/Checkout";
import PaymentMethod from "../Components/PaymentMethod";
import Search from "../Components/Search";
import CardDetail from "../Routes/CardDetail";
import OTP from "./OTP";
import ProtectedRoute from "../Components/ProtectedRoute";
import HomeAdmin from "./HomeAdmin";
import HomeAdminProducts from "./HomeAdminProducts";
import AddProduct from "./AddProduct";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/addProduct" element={<AddProduct/>}></Route>
      <Route path="/adminProduct" element={<HomeAdminProducts/>}></Route>
      <Route path="/adminUser" element={<HomeAdmin/>}></Route>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/products/:id" element={<SinglePage />}></Route>
      <Route path="/help" element={<Help />}></Route>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/paymentMethod"
        element={
          <ProtectedRoute>
            <PaymentMethod />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/products" element={<ProductPage />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route
        path="/fillcarddetail"
        element={
          <ProtectedRoute>
            <CardDetail />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/otp"
        element={
          <ProtectedRoute>
            <OTP />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};

export default AllRoutes;
