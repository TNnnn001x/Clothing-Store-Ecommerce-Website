import { configureStore } from "@reduxjs/toolkit";
import ShopReducer from './ShopSlice';
import NavbarReducer from './NavbarSlice';
import cartReducer from "./cartSlice";
import checkOutReducer from "./checkOutSlice";
import shipmentReducer from "./DeliverySlice"

const store = configureStore({
    reducer: {
        shop: ShopReducer,
        navbar: NavbarReducer,
        cart: cartReducer,
        checkout: checkOutReducer,
        shipment: shipmentReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;