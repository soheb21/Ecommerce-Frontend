import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchAllBrands, fetchAllCategories, fetchOneData, fetchProductsByFilters, searchFetch, updateProductForm } from "./productAPI";

const initialState = {
  products: [],
  brands: [],
  category: [],
  selectedProduct: null,
  status: "idle",
  totalItems: 0
};



export const fetchAllCategoriesAsync = createAsyncThunk("category/fetchAllCategory", async () => {
  const response = await fetchAllCategories();
  return response.data;
})
export const fetchAllBrandsAsync = createAsyncThunk("brands/fetchAllBrands", async () => {
  const response = await fetchAllBrands();
  return response.data;
})
export const fetchProductsBySearchAsync = createAsyncThunk(
  "product/fetchProductsBySearchAsync",
  async (searchData) => {
    const response = await searchFetch(searchData)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFiltersAsync",
  async ({ filter, sort, pagination,admin}) => {
    const response = await fetchProductsByFilters(filter, sort, pagination,admin);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchAllProductByIdAsync = createAsyncThunk("product/id", async (id) => {
  const response = await fetchOneData(id)
  return response.data
})
export const updateProductFormAsync = createAsyncThunk("product/updateProductForm", async (update) => {
  const response = await updateProductForm(update)
  return response.data
})

export const createProductAsync = createAsyncThunk("product/createNewProduct", async (data) => {
  const response = await createProduct(data)
  return response.data
})
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductsBySearchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsBySearchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(updateProductFormAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductFormAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })

  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectAllcategory = (state) => state.product.category;
export const selectAllBrands = (state) => state.product.brands;
export const selectProductById = (state) => state.product.selectedProduct;


export default productSlice.reducer;
