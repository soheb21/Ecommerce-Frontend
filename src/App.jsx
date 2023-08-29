import React, { useEffect } from "react";

import "./App.css";
import Home from "./page/Home";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import CheckoutPage from "./page/CheckoutPage";
import CartPage from "./page/CartPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemByUserIdAsync } from "./features/cart/cartSlice";
import NotFoundPage from "./page/NotFoundPage";
import Order from "./features/order/Order";
import MyOrderPage from "./page/MyOrderPage";
import { fetchLoggedInUserAsync } from "./features/userInfo/userSlice";
import MyProiflePage from "./page/MyProiflePage";
import LogOut from "./features/auth/components/LogOut";
import ProteectedAdmin from "./features/auth/components/ProteectedAdmin";
import AdminHome from "./page/AdminHome";
import ProductDetailPage from "./page/ProductDetailPage";
import ProductFormPage from "./page/ProductFormPage";
import AdminOrderPage from "./page/AdminOrderPage";
import { checkAuthAsync, selectUserCheck, selectUsers } from "./features/auth/authSlice";
import Stripe_Checkout from "./page/Stripe_Checkout";


const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProteectedAdmin><AdminHome /></ProteectedAdmin>
  },
  {
    path: "/admin/product-form",
    element: <ProteectedAdmin><ProductFormPage /></ProteectedAdmin>
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProteectedAdmin><ProductFormPage /></ProteectedAdmin>
  },
  {
    path: "/admin/orders",
    element: <ProteectedAdmin><AdminOrderPage /></ProteectedAdmin>
  },
  {
    path: "/stripe-checkout",
    element: <Protected><Stripe_Checkout/></Protected>
  },
  {
    path: "/",
    element: <Protected><Home /></Protected>,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><CheckoutPage /></Protected>,
  },
  {
    path: "/product-Detail/:id",
    element: <Protected><ProductDetailPage /></Protected>,
  },
  {
    path: "/admin/product-Detail/:id",
    element: <ProteectedAdmin><ProductDetailPage /></ProteectedAdmin>
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/order-success/:id",
    element: <Order />,
  },
  {
    path: "/orders",
    element: <MyOrderPage />,
  },
  {
    path: "/profile",
    element: <MyProiflePage />,
  },
  {
    path: "/logout",
    element: <LogOut />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUsers)
  const userCheck=useSelector(selectUserCheck);
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [])
  useEffect(() => {
    if (user) {
      dispatch(fetchItemByUserIdAsync())
      dispatch(fetchLoggedInUserAsync());

    }
  }, [dispatch, user])
  return (
    <div className="App">
    { userCheck && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
