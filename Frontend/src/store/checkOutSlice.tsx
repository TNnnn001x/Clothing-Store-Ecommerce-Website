import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// === NOTE: adjust RootState import to your project's RootState path if you want typed selectors
// import type { RootState } from "../../store";

import type { CartDetails } from "./cartSlice";

// --- Interfaces (cleaned & consistent) ---
interface OrderDetail {
    Orders: { OrderID: number | undefined };
    Products: { ProdID: number };
    Quantity: number;

}

interface Order {
    OrderID?: number;
    RecID: number;
    CustID: number;
    OrderDate: string | Date;
    OrderStatus: string;
    PaymentID: number;
    ShipmentMethod: string;
    SubTotalPrice: number;
    ShipmentFee: number;
    TotalPrice: number;
}

export interface Customer {
    CustID: number;
    CustName?: string;
    CustLname?: string;
    CustEmail?: string;
    CustPhone?: string;
    AccID?: number;
}

export interface Receiver {
    RecID?: number;
    RecName: string;
    RecLname: string;
    RecPhone: string;
    RecAddr: string;
    CustID?: number;
    Rec_DelStatus?: number;
}

interface Receipt {
    ReceiptID?: number;
    OrderID: number;
    PaymentDate: string | Date;
}

interface Shipment {
    ShipmentID?: number;
    OrderID: number;
    ShipmentStatus: string;
    ShipmentDate: string | Date;
}

interface CheckOutState {
    orders: Order[];
    orderDetails: OrderDetail[];
    receipts: Receipt[];
    shipments: Shipment[];
    payments: Payment[];
    receivers: Receiver[];
    customer?: Customer | null;
    loading: boolean;
    error?: string | null;
}

interface Payment {
    PaymentID: number
    PaymentMethod: string
}


const initialState: CheckOutState = {
    orders: [],
    orderDetails: [],
    receipts: [],
    shipments: [],
    payments: [],
    receivers: [],
    customer: null,
    loading: false,
    error: null,
};

const API_URL = "http://localhost:3000/";

// --- Thunks ---

// fetchCustomer by accountId (assumes backend endpoint exists)
export const fetchCustomer = createAsyncThunk(
    "checkout/fetchCustomer",
    async (accountId: number, thunkAPI) => {
        try {
            const response = await axios.get(
                `${API_URL}customer/byAccount/${accountId}`
            );
            // console.log("API response:", response.data); 
            // ตรวจสอบอีกที
            // response.data คือ customer object เลย return ตรง ๆ
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// fetchReceiver(s) by customerId
export const fetchReceiver = createAsyncThunk(
    "checkout/fetchReceiver",
    async (custID: number, thunkAPI) => {
        try {
            const res = await axios.get<Receiver[]>(`${API_URL}receiver/customer/${custID}`);
            return res.data ?? []; // คืน [] ถ้า undefined
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err?.response?.data ?? err.message);
        }
    }
);
// ดึง Payment
export const fetchPayment = createAsyncThunk("payment/fetchPayment",
    async () => {
        const res = await axios.get<Payment[]>(`${API_URL}payment`);
        return res.data;
    }
)


export const submitCheckout = createAsyncThunk(
    'checkout/submitCheckout',
    async (payload: {
        cartItems: CartDetails[];
        customer: Customer | null;
        receiver: Receiver;
        shippingMethod: string;
        paymentID: string;
    }) => {
        if (!payload.customer) throw new Error("Customer not selected");

        // 1) ตรวจสอบหรือสร้าง Receiver
        let recID: number;
        let receiverData: Receiver;

        if (payload.receiver.RecID) {
            // ใช้ receiver ที่มีอยู่
            console.log('Receiver own')
            recID = payload.receiver.RecID;
            receiverData = payload.receiver;
        } else {
            // สร้าง receiver ใหม่
            console.log('Receiver new')
            const receiverRes = await axios.post<Receiver>(`${API_URL}receiver`, {
                'RecName': payload.receiver.RecName,
                'RecLname': payload.receiver.RecLname,
                'RecPhone': payload.receiver.RecPhone,
                'RecAddr': payload.receiver.RecAddr,
                "Customers": { CustID: payload.customer.CustID },// ต้องแน่ใจว่าไม่ undefined
                'Rec_DelStatus': payload.receiver.Rec_DelStatus ?? 0,


            });

            // runtime check
            if (!receiverRes.data.RecID) {
                throw new Error("Receiver ID missing from backend response");
            }

            // assertion ว่า RecID มีค่า
            recID = receiverRes.data.RecID;
            receiverData = receiverRes.data as Receiver & { RecID: number }; 
        }

        // 2) สร้าง Order
        console.log('subTotal')
        const subTotal = payload.cartItems.reduce(
            (sum, item) => sum + (item.Products?.Price ?? 0) * item.Quantity,
            0
        );
        const shipmentFee = payload.shippingMethod === 'express' ? 100 : 0;
        console.log(payload.customer.CustID, payload.receiver.RecID, subTotal, shipmentFee, subTotal + shipmentFee)
        console.log('Order')
        const orderRes = await axios.post<Order>(`${API_URL}order`, {
            'Customers': { CustID: payload.customer.CustID },
            'Receivers': { RecID: recID },
            'OrderDate': new Date(),
            'OrderStatus': 'pending',
            'Payments': { PaymentID: payload.paymentID },
            'ShipmentMethod': payload.shippingMethod,
            'SubTotalPrice': subTotal,
            'ShipmentFee': shipmentFee,
            'TotalPrice': subTotal + shipmentFee
        });
        const orderID = orderRes.data.OrderID;

        // 3) สร้าง OrderDetail
        console.log('OrderDetail')
        const orderDetailsPayload: OrderDetail[] = payload.cartItems.map(item => ({
            'Orders': { OrderID: orderID },
            'Products': { ProdID: item.ProdID },
            'Quantity': item.Quantity,

        }));
        const orderDetailsRes = await axios.post<OrderDetail[]>(`${API_URL}orderdetail`, orderDetailsPayload);

        // 4) ลด stock
        console.log('Reduce Stock')
        await Promise.all(
            payload.cartItems.map(item =>
                axios.put(`${API_URL}product/${item.ProdID}`, {
                    ProdQuan: item.Products?.ProdQuan - item.Quantity
                })
            )
        );

        // 5) สร้าง Receipt
        console.log('Receipt')
        const receiptRes = await axios.post<Receipt>(`${API_URL}receipt`, {
            'Orders': { OrderID: orderID },
            'PaymentDate': new Date()
        });

        // 6) สร้าง Shipment
        console.log('Shipment')
        const shipmentRes = await axios.post<Shipment>(`${API_URL}shipment`, {
            'ShipmentStatus': 'pending',
            'ShipmentDate': new Date(),
            'Orders': { OrderID: orderID }
        });

        await axios.delete(`${API_URL}cartdetail/clear/${payload.cartItems[0].CartID}`);

        return {
            receiver: receiverData,
            order: orderRes.data,
            orderDetails: orderDetailsRes.data,
            receipt: receiptRes.data,
            shipment: shipmentRes.data
        };
    }
);



const checkOutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        // optional reducers if you want to set customer manually
        setCustomer(state, action: PayloadAction<Customer>) {
            state.customer = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchCustomer ดึงข้อมูล Customer
            .addCase(fetchCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomer.fulfilled, (state, action: PayloadAction<Customer | null>) => {
                // console.log("fetchCustomer fulfilled payload:", action.payload);
                state.loading = false;
                state.customer = action.payload;
                state.error = null;
            })
            .addCase(fetchCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) ?? action.error.message ?? "Failed to load customer";
            })

            // fetchReceiver
            .addCase(fetchReceiver.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReceiver.fulfilled, (state, action: PayloadAction<Receiver[]>) => {
                state.loading = false;
                // filter แค่ receiver ที่ยังใช้งานได้ (Rec_DelStatus = 0)
                state.receivers = action.payload.filter(r => r.Rec_DelStatus === 0);
                console.log(state.receivers)
                state.error = null;
            })
            .addCase(fetchReceiver.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) ?? action.error.message ?? "Failed to load receivers";
            })
            .addCase(fetchPayment.fulfilled, (state, action: PayloadAction<Payment[]>) => {
                state.payments = action.payload
            })

            // submitCheckout กดชำระเงินน่ะ
            .addCase(submitCheckout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitCheckout.fulfilled, (state, action) => {
                state.loading = false;
                const { receiver, order, orderDetails, receipt, shipment } = action.payload;
                if (receiver) state.receivers.push(receiver);
                if (order) state.orders.push(order);
                if (orderDetails && orderDetails.length) state.orderDetails.push(...orderDetails);
                if (receipt) state.receipts.push(receipt);
                if (shipment) state.shipments.push(shipment);
            })
            .addCase(submitCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) ?? action.error.message ?? "Checkout failed";
            });
    },
});

export const { setCustomer } = checkOutSlice.actions;
export default checkOutSlice.reducer;
