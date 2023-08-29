import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from "./userAPI";


const initialState = {
  userOrders: [],
  status: "idle",
  error: null,
  userInfo: null,
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "userInfo/order",
  async () => {
    const response = await fetchLoggedInUserOrders()
    return response.data;
  }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  "userInfo/UserDetails",
  async () => {
    const response = await fetchLoggedInUser()
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  "userInfo/UpdateUser",
  async (userId) => {
    const response = await updateUser(userId)
    return response.data;
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
          // this info can be different or more from logged-in User info
        state.userInfo = action.payload;
      })


  },
});

export const { increment } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;



export default userSlice.reducer;
