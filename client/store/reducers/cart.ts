import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ProductStoreType } from 'types';
import axios from "axios";
import { toast } from "react-toastify";

if (typeof window !== 'undefined') {
  var userToken = localStorage.getItem('userToken')
}
var ORIGINAPIURL = process.env.NEXT_PUBLIC_API_URL
export const getProductCart = createAsyncThunk("cart/list", async (userID) => {
  try{
  const APIURL = ORIGINAPIURL+"/api/cart/"+userID;
  const res = await axios.get(APIURL,{
    headers:{
      "x-access-token": JSON.parse(userToken)
    }
  });
  return res.data;
  }catch(err){
    console.log("err--------",err)
  }
});

export const setCount = createAsyncThunk("cart/setCount", async (data) => {
  try{
    var payload = {
      userId: data.userId,
      quantity: data.quantity,
    }
    const APIURL = ORIGINAPIURL + "/api/cart/"+data.productID;
    const res = await axios.put(APIURL,payload,{
      headers:{
        "x-access-token": JSON.parse(userToken)
      }
    })
  toast.success("Product quantity updated successfully!");
  return res.data;
  }catch(err){
    toast.error("Error in updating product quantity!");
    console.log("err--------",err)
  }
});

export const removeProduct = createAsyncThunk("cart/removeProduct", async (data) => {
  try{
    var payload = {
      userId: data.userId,
    }
    const APIURL = ORIGINAPIURL + "/api/cart/"+data.productID;
    const headers = {
      "x-access-token": JSON.parse(userToken)
    }
    const res = await axios.delete(APIURL, { headers, data: payload })
    toast.success("Product removed from cart successfully!");
  return res.data;
  }catch(err){
    toast.error("Error in removing product from cart!");
    console.log("err--------",err)
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isLoading: false,
    cartItems: []
  },
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductCart.pending, (state, action) => {
        state.isLoading = true;
        state.cartItems= [];
      })
      .addCase(getProductCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems= action.payload;
      })
      .addCase(getProductCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems= [];
      })
      .addCase(setCount.pending, (state, action) => {
        state.isLoading = true;
        state.cartItems= [];
      })
      .addCase(setCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems= action.payload;
      })
      .addCase(setCount.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems= [];
      })
      .addCase(removeProduct.pending, (state, action) => {
        state.isLoading = true;
        state.cartItems= [];
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems= action.payload;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems= [];
      })
  },
})

export default cartSlice.reducer