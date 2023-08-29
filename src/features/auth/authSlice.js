import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUser } from "../userInfo/userAPI";
import { checkAuth, craeteUser, logginUser, signOut } from "./authAPI";


const initialState = {
  user: null,
  status: "idle",
  error: null,
  userCheck:false, //ab reload hoga tho hona chaiye wahi routes se shuru hoga.
};

export const createUserAsync = createAsyncThunk(
  "createUser/user",
  async (userData) => {
    const response = await craeteUser(userData)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const logginUserAsync = createAsyncThunk(
  "createUser/logginUSer",
  async (loggedInfo, { rejectWithValue }) => {
    try {
      const response = await logginUser(loggedInfo)
      return response.data;
    } catch (error) {
      // console.log(error)
      return rejectWithValue(error)
    }
  }
);
export const checkAuthAsync = createAsyncThunk(
  "createUser/checkAuth",
  async () => {
    try {
      const response = await checkAuth()
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);
export const sigOutAsync = createAsyncThunk(
  "createUser/signOut",
  async () => {
    const response = await signOut();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addUserAddressInfoAsync = createAsyncThunk(
  "createUser/AddressInfo",
  async (address) => {
    const response = await updateUser(address)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(logginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(logginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.userCheck=true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
        state.userCheck=true;
      })
      .addCase(addUserAddressInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUserAddressInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(sigOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sigOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = null;
      })
  },
});

export const { increment } = counterSlice.actions;

export const selectUsers = (state) => state.auth.user;
export const selectError = (state) => state.auth.error;
export const selectUserCheck=(state)=>state.auth.userCheck;


export default counterSlice.reducer;
