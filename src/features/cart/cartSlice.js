import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchItemByUserId, resetCart, updateCartFromItem } from './cartAPI';

const initialState = {
    items: [],
    value: 0,
    status: 'idle',
};

export const addtoCartAsync = createAsyncThunk(
    'addToCart/cart',
    async (item) => {
        const response = await addToCart(item);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);
export const fetchItemByUserIdAsync = createAsyncThunk(
    'addToCart/fetchItem',
    async () => {
        const response = await fetchItemByUserId();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);
export const updateCartFromItemAsync = createAsyncThunk(
    'addToCart/updateQTY',
    async (itemId) => {
        const response = await updateCartFromItem(itemId);
        // The value we return becomes the `fulfilled` action payload
        console.log("response",response)
        return response.data;
    }
);
export const deleteItemFromCartAsync = createAsyncThunk(
    'addToCart/deleteItem',
    async (itemId) => {
        const response = await deleteItemFromCart(itemId);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);
export const resetCartAsync = createAsyncThunk(
    'addToCart/resetCart',
    async () => {
        const response = await resetCart();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);


export const counterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addtoCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addtoCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items.push(action.payload);
            })
            .addCase(fetchItemByUserIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload;
            })
            .addCase(updateCartFromItemAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCartFromItemAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id === action.payload.id)
                state.items[index] = action.payload;
            })
            .addCase(deleteItemFromCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id === action.payload.id)
                state.items.splice(index, 1);
            })
            .addCase(resetCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = []
            });

    },
});

export const { increment } = counterSlice.actions;

export const selectItems = (state) => state.cart.items;
export default counterSlice.reducer;
