import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { DeliveryStatusType } from "../Components/DeliveryPage/DeliveryPage";

export interface Shipment {
    ShipmentID: number;
    Orders: { OrderID: number | undefined };
    ShipmentStatus: DeliveryStatusType;
    ShipmentDate: Date;
}

export interface Order {
    OrderID?: number | undefined;
    Receivers?: {
        RecID: number;
        RecName: string;
        RecLname: string;
        RecPhone: string;
        RecAddr: string;
    };
    CustID: number;
    OrderDate: string | Date;
    OrderStatus: string;
    PaymentID: number;
    ShipmentMethod: string;
    SubTotalPrice: number;
    ShipmentFee: number;
    TotalPrice: number;
    OrderDetails?: OrderDetail[];
}

interface OrderDetail {
    Orders: { OrderID: number | undefined };
    Products: {
        ProdID: number;
        ProdName?: string;
        Price?: number;
        ProdPicture?: string;
        ProdDetail?: string;
    };
    Quantity: number;
}

interface ShipmentState {
    Orders: Order[];
    Shipments: Shipment[];
    loading: boolean;
    error: string | null;
}

const initialState: ShipmentState = {
    Orders: [],
    Shipments: [],
    loading: false,
    error: null,
};

const API_URL = "http://localhost:3000/";

// ---- Thunks ----

// 1. Fetch Customer by accountId
export const fetchCustomer = createAsyncThunk(
    "shipment/fetchCustomer",
    async (accountId: number, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}customer/byAccount/${accountId}`);
            return response.data; // expect { CustID: number, ... }
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data ?? err.message);
        }
    }
);

// 2. Fetch Orders by custID
export const fetchOrdersByCustomer = createAsyncThunk<Order[]>(
    "shipment/fetchOrdersByCustomer",
    async (custID, thunkAPI) => {
        try {
            const response = await axios.get<Order[]>(`${API_URL}order/byCustomer/${custID}`);
            return response.data ?? [];
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data ?? err.message);
        }
    }
);

// 3. Fetch OrderDetails by orderID
export const fetchOrderDetails = createAsyncThunk(
    "shipment/fetchOrderDetails",
    async (orderID: number, thunkAPI) => {
        try {
            const response = await axios.get<OrderDetail[]>(`${API_URL}orderdetail/byOrder/${orderID}`);
            return { orderID, details: response.data ?? [] };
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data ?? err.message);
        }
    }
);

// 4. Fetch Shipment by orderID
export const fetchShipmentByOrder = createAsyncThunk(
    "shipment/fetchShipmentByOrder",
    async (orderID: number, thunkAPI) => {
        try {
            const response = await axios.get<Shipment>(`${API_URL}shipment/byOrder/${orderID}`);
            return response.data; // คืน Shipment ตาม interface
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data ?? err.message);
        }
    }
);

// ---- Slice ----
const shipmentSlice = createSlice({
    name: "shipment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Orders loading
            .addCase(fetchOrdersByCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrdersByCustomer.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.Orders = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrdersByCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // OrderDetails
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                const { orderID, details } = action.payload;
                const order = state.Orders.find(o => o.OrderID === orderID);
                if (order) order.OrderDetails = details;
            })

            // Shipments
            .addCase(fetchShipmentByOrder.fulfilled, (state, action: PayloadAction<Shipment>) => {
                const shipment = action.payload;
                // แยกเก็บ Shipment แยกจาก Orders
                const exists = state.Shipments.find(s => s.ShipmentID === shipment.ShipmentID);
                if (!exists) state.Shipments.push(shipment);
            });
    }
});

export default shipmentSlice.reducer;
