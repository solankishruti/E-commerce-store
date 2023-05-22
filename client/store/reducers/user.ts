import { remove } from 'lodash';
import axios from "axios";
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from "react-toastify";


type ProductType = {
  id: string;
  name: string;
  thumb: string;
  price: string;
  count: number;
  color: string;
  size: string;
}

type ToggleFavType = {
  id: string;
}

interface UserSliceTypes {
  user: any;
  favProducts: any;
}

const initialState = {
  user: {
    name: '',
  },
  favProducts: [],
} as UserSliceTypes

var ORIGINAPIURL = process.env.NEXT_PUBLIC_API_URL

export const userLogin = createAsyncThunk("user/login", async (userData) => {
  const APIURL = ORIGINAPIURL + "/api/auth/signin";
  const res = await axios.post(APIURL,userData);
  return res.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState:{
    loggedInUser: [],
    isLoading: false,
  },
  reducers: {
    toggleFavProduct(state, action: PayloadAction<ToggleFavType>) {
      const index = state.favProducts.includes(action.payload.id);

      if(!index) {
        state.favProducts.push(action.payload.id);

        return;
      }

      remove(state.favProducts, id => id === action.payload.id);
    },
    setUserLogged(state, action: PayloadAction<ProductType>) {
      const index = state.favProducts.includes(action.payload.id);

      if(!index) {
        state.favProducts.push(action.payload.id);

        return {
          ...state,
          favProducts: state.favProducts
        };
      }

      remove(state.favProducts, id => id === action.payload.id);
      
      return {
        ...state,
        favProducts: state.favProducts
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false;
        state.loggedInUser= action.payload;
        localStorage.setItem('userToken', JSON.stringify(action.payload.accessToken));
        localStorage.setItem('userID', JSON.stringify(action.payload.id));
        toast.success("Product added to cart successfully!");
        document.location.href = '/';
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = true;
      })
  },
})

export const { toggleFavProduct, setUserLogged } = userSlice.actions
export default userSlice.reducer