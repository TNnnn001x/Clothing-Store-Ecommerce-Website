import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type RootState } from "./index";
import { createSelector } from "@reduxjs/toolkit";

export interface Product {
    ProdID: number;
    ProdName: string;
    Price: number;
    DiscountPrice: number;
    ProdQuan: number;
    ProdPicture: string;
    ProdDetail: string;
    ProdPopular: number;
    Filter?: { //เผื่อไม่ใส่ Brand
        FilterCateID: number;
        Brand?: {
            BrandID: number;
            BrandName: string;
        }
    }
}

export interface CartDetails {
    CartDetailID: number;
    CartID: number;
    ProdID: number;
    Size: string;
    Quantity: number;
    Products: Product; //  จาก backend
}


interface CartDetailsState {
    items: CartDetails[]
    status: "loading" | "success" | "error";
}


const initialState: CartDetailsState = {
    items: [],
    status: 'loading'
}

//BASE URL สำหรับ API

const API_URL = "http://localhost:3000/"

//Async Thunks API calls
export const fetchUserCart = createAsyncThunk('cart/fetchUserCart', async (accID: number) => {
    const cartRes = await axios.get(`${API_URL}cart/account/${accID}`);
    const cartID = cartRes.data.CartID;

    const cartDetailsRes = await axios.get(`${API_URL}cartdetail/cartdetailitems/${cartID}`);
    return cartDetailsRes.data as CartDetails[];
});
export const updateQuantity = createAsyncThunk('cart/updateQuantity',
    async ({ cartDetailID, quantity }: { cartDetailID: number, quantity: number }) => {

        const response = await axios.put(`${API_URL}cartdetail/${cartDetailID}`, { Quantity: quantity });
        return response.data as CartDetails;
    }
)
export const removeCartItem = createAsyncThunk('cart/removeCartItem',
    async (cartDetailID: number) => {
        await axios.delete(`${API_URL}cartdetail/${cartDetailID}`)
        return cartDetailID
    }

)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart(state) {
            state.items = []
        },
    },
    extraReducers: (builder) => {
        builder
            //Fetch Cart
            .addCase(fetchUserCart.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUserCart.fulfilled, (state, action: PayloadAction<CartDetails[]>) => {
                state.status = 'success'
                state.items = action.payload

            })
            .addCase(fetchUserCart.rejected, (state, action) => {
                state.status = 'error'
                console.error(action.error.message)
            })
            //updateQuanitiy
            .addCase(updateQuantity.fulfilled, (state, action: PayloadAction<CartDetails>) => {
                const updatedItem = action.payload
                const index = state.items.findIndex(item => item.CartDetailID === updatedItem.CartDetailID);
                if (index !== -1) {
                    state.items[index] = {
                        ...state.items[index],
                        Quantity: updatedItem.Quantity

                    }
                }
            })
            //removeCartItem
            .addCase(removeCartItem.fulfilled, (state, action: PayloadAction<number>) => {
                state.items = state.items.filter(item => item.CartDetailID !== action.payload)
            })

    }
})

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items
export const selectCartStatus = (state: RootState) => state.cart.status
export const selectCartTotals = createSelector(
    (state: RootState) => state.cart.items,
    (items) => {
        const totalItems = items.reduce((sum, item) => sum + item.Quantity, 0);
        const totalPrice = items.reduce((sum, item) => sum + item.Quantity * item.Products.Price, 0);
        return { totalItems, totalPrice };
    }
);
