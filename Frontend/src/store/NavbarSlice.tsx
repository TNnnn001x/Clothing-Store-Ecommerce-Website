import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { type RootState } from './index';

export interface AccountType {
    AccID: number;
    Username: string;
    AvatarPic: string;
}

interface FavouriteType {
    FavID: number;
    AccID: number;
}

interface FavouriteDetailType {
    FavDetailID: number;
    FavID: number;
    ProdID: number;
}

interface CartType {
    CartID: number;
    AccID: number;
}

interface CartDetailType {
    CartDetailID: number;
    CartID: number;
    ProdID: number;
    Size: string;
    Quantity: number;
}

interface NavbarState {
    Account: AccountType | undefined;

    Favourite: FavouriteType | undefined;
    FavouriteDet: FavouriteDetailType[];

    Cart: CartType | undefined;
    CartDet: CartDetailType[];

    searchProduct: string;
    RingingCart: boolean;
    RingingFav: boolean;
    loadingNavbar: boolean;
    errorNavbar: string | null;
}

const initialState: NavbarState = {
    Account: undefined,

    Favourite: undefined,
    FavouriteDet: [],

    Cart: undefined,
    CartDet: [],

    searchProduct: "",
    RingingCart: false,
    RingingFav: false,
    loadingNavbar: false,
    errorNavbar: null,
}

export const fetchAllNavbarData = createAsyncThunk("navbar/fetchAllNavbarData", async (_, { rejectWithValue, getState }) => {
    const rootState = getState() as RootState;
    const navbarState = rootState.navbar;
    const currAccount = navbarState.Account;

    if (!currAccount) return rejectWithValue("กรุณาเข้าสู่ระบบ");

    try {
        const [
            CartRes,
            FavRes,
            CartDetRes,
            FavDetRes,
        ] = await Promise.all([
            axios.get<CartType[]>("http://localhost:3000/cart"),
            axios.get<FavouriteType[]>("http://localhost:3000/favourite"),
            axios.get<CartDetailType[]>("http://localhost:3000/cartdetail"),
            axios.get<FavouriteDetailType[]>("http://localhost:3000/favouritedetail")
        ]);

        const FiltCart = CartRes.data.find(d => d.AccID === currAccount.AccID);
        const FiltFav = FavRes.data.find(d => d.AccID === currAccount.AccID);

        const FiltCartDet = FiltCart ? CartDetRes.data.filter(d => d.CartID === FiltCart.CartID) : [];
        const FiltFavDet = FiltFav ? FavDetRes.data.filter(d => d.FavID === FiltFav.FavID) : [];

        return {
            Cart: FiltCart,
            Favourite: FiltFav,
            CartDet: FiltCartDet,
            FavouriteDet: FiltFavDet,
        }
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("เกิดข้อผิดพลาด");
    }
});

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<AccountType | undefined>) => {
            state.Account = action.payload;
        },
        setCartDet: (state, action: PayloadAction<CartDetailType[]>) => {
            state.CartDet = action.payload;
        },
        setFavouriteDet: (state, action: PayloadAction<FavouriteDetailType[]>) => {
            state.FavouriteDet = action.payload;
        },
        setRingingCart: (state, action: PayloadAction<boolean>) => {
            state.RingingCart = action.payload;
        },
        setRingingFav: (state, action: PayloadAction<boolean>) => {
            state.RingingFav = action.payload;
        },
        setSearchProduct: (state, action: PayloadAction<string>) => {
            state.searchProduct = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllNavbarData.pending, (state) => {
                state.loadingNavbar = true;
                state.errorNavbar = null;
            })
            .addCase(fetchAllNavbarData.fulfilled, (state, action) => {
                state.loadingNavbar = false;

                const { Cart, Favourite, CartDet, FavouriteDet } = action.payload;

                state.Cart = Cart;
                state.Favourite = Favourite;
                state.CartDet = CartDet;
                state.FavouriteDet = FavouriteDet;
            })
            .addCase(fetchAllNavbarData.rejected, (state, action) => {
                state.loadingNavbar = false;
                state.errorNavbar = action.payload as string;
            })
    },
})

export const {
    setAccount,
    setCartDet,
    setFavouriteDet,
    setRingingCart,
    setRingingFav,
    setSearchProduct,
} = navbarSlice.actions;

export const selectAccount = (state: RootState) => state.navbar.Account;
export const selectCart = (state: RootState) => state.navbar.Cart;
export const selectCartDet = (state: RootState) => state.navbar.CartDet;
export const selectFav = (state: RootState) => state.navbar.Favourite;
export const selectFavDet = (state: RootState) => state.navbar.FavouriteDet;
export const selectRingingCart = (state: RootState) => state.navbar.RingingCart;
export const selectRingingFav = (state: RootState) => state.navbar.RingingFav;
export const selectSearchProduct = (state: RootState) => state.navbar.searchProduct;

export default navbarSlice.reducer;