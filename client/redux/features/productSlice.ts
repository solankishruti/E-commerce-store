import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

if (typeof window !== 'undefined') {
  var userToken = localStorage.getItem('userToken')
}
var ORIGINAPIURL = process.env.NEXT_PUBLIC_API_URL

export const getProductThunk = createAsyncThunk("prducts/list", async () => {
  const APIURL = ORIGINAPIURL + "/api/products";
  const res = await axios.get(APIURL,{
    headers:{
      "x-access-token": JSON.parse(userToken)
    }
  });
  return res.data;
});
// const userToken = localStorage.getItem(userToken)
export const addProductCart = createAsyncThunk("cart/add", async (data) => {
  const APIURL = ORIGINAPIURL + "/api/cart";
  const res = await axios.post(APIURL,data,{
    headers:{
      "x-access-token": JSON.parse(userToken)
    }
  }).then((response) => {
      if(response.status === 200){
        toast.success("Product added to cart successfully!");
      }else{
        toast.error("Error in adding product to cart!");
      }  
    })
    .catch((error) => {
      toast.error("Error in adding product to cart!");
      console.log(error);
    });
  
  return res.data;
});


export const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    products: [],
    cart: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products= action.payload;
      })
      .addCase(getProductThunk.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addProductCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addProductCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(addProductCart.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default productSlice.reducer;
