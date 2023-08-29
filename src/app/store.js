import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product-list/productSlice"
import authReducer from "../features/auth/authSlice"
import cartReducre from "../features/cart/cartSlice"
import orderReducer from "../features/order/orderSlice"
import userReducer from "../features/userInfo/userSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducre,
    order: orderReducer,
    user: userReducer
  },
});
