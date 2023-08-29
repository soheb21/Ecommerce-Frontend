import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder, fetchOrders, updateOrderStatus } from "./orderAPI";

const initialState = {
  orders: [],
  value: 0,
  status: "idle",
  currentOrder: null,
  totolOrders: 0
};

export const addOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (data) => {
    const response = await addOrder(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchOrdersAsync = createAsyncThunk(
  "order/getOrder",
  async (pagination) => {
    const response = await fetchOrders(pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateOrderStatusAsync = createAsyncThunk(
  "order/updateOrderStatus",
  async (updateStatus) => {
    const response = await updateOrderStatus(updateStatus);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const counterSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totolOrders = action.payload.totalOrders

      })
      .addCase(updateOrderStatusAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(order => order.id === action.payload.orders.id)
        state.orders[index] = action.payload;
      })
  },
});

export const { resetOrder } = counterSlice.actions

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default counterSlice.reducer;
