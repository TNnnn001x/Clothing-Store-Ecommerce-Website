import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store";
import { selectCartTotals, selectCartItems, fetchUserCart } from "../../store/cartSlice";
import { submitCheckout, fetchCustomer, fetchReceiver } from "../../store/checkOutSlice";
import { selectAccount, type AccountType } from "../../store/NavbarSlice";
import type { CartDetails } from "../../store/cartSlice";
import type { Receiver } from "../../store/checkOutSlice";

const CheckOutPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const Account = useSelector(selectAccount);

    //****************กำหนด AccID เองไม่ได้ดึง******************** */
    const [accountId, setAccountId] = useState<AccountType>();
    //*********************************************** */

    const cartItems = useSelector(selectCartItems) as CartDetails[];
    const { totalPrice: cartTotalFromSlice } = useSelector(selectCartTotals);

    const customer = useSelector((state: any) => state.checkout.customer);
    const receivers = useSelector((state: any) => state.checkout?.receivers) as Receiver[];

    // กำหนด selectedReceiver เป็นแบบนี้
    const [selectedReceiver, setSelectedReceiver] = useState<{
        RecID?: number; // RecID จะมีเฉพาะผู้รับเก่า
        firstName: string;
        lastName: string;
        phone: string;
        address: string;
    } | null>(null);

    const [shippingMethod, setShippingMethod] = useState<string>("free");
    const [paymentID, setPaymentID] = useState<string>("1");
    const [isMoreReceiver, setIsMoreReceiver] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if(Account){
            setAccountId(Account);
        }
    }, [])

    // Load initial data
    useEffect(() => {
        // console.log("Dispatch fetchCustomer for accountId:", accountId);
        if (accountId) {
            dispatch(fetchUserCart(accountId.AccID));

            // เพิ่มเงื่อนไข !customer เพื่อไม่ dispatch ซ้ำ
            if (!customer) {
                dispatch(fetchCustomer(accountId.AccID));
            }
        }
    }, [accountId, dispatch, customer]);

    // Fetch receivers after customer loaded
    useEffect(() => {
        if (customer?.CustID) {
            dispatch(fetchReceiver(customer.CustID));
        }
    }, [customer?.CustID, dispatch]);

    // Preselect first receiver if any
    useEffect(() => {
        if (!selectedReceiver && receivers?.length > 0) {
            // เลือก receiver ตัวแรกที่ยังใช้งานได้
            const r = receivers[0];

            //จุดนี้ทำให้ RecID ได้ RecID จากข้อมูลที่มีอยู่ในตาราง
            setSelectedReceiver({
                RecID: r.RecID,
                firstName: r.RecName,
                lastName: r.RecLname,
                phone: r.RecPhone,
                address: r.RecAddr,
            });
        }
    }, [receivers, selectedReceiver]);

    // useEffect(() => {
    //     console.log("Customer updated:", customer);
    // }, [customer]);

    const subTotal = useMemo(() => {
        if (!cartItems || cartItems.length === 0) return 0;
        return cartItems.reduce((s, itm) => s + (itm.Quantity ?? 0) * (itm.Products?.Price ?? 0), 0);
    }, [cartItems]);

    const shipmentFee = shippingMethod === "express" ? 100 : 0;
    const total = subTotal + shipmentFee;

    const handleSelectReceiver = (r: Receiver) => {
        setSelectedReceiver({
            RecID: r.RecID, // มี RecID เพราะเป็นผู้รับเก่า
            firstName: r.RecName,
            lastName: r.RecLname,
            phone: r.RecPhone,
            address: r.RecAddr,
        });
        setIsMoreReceiver(false);
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        // 1️⃣ เช็ค customer
        if (!customer?.CustID) {
            console.error("Customer is not loaded:", customer);
            alert("กรุณาเข้าสู่ระบบหรือรอให้ข้อมูลผู้ใช้โหลดเสร็จ");
            return;
        }

        // 2️⃣ เช็ค selectedReceiver
        if (!selectedReceiver) {
            console.error("No receiver selected!");
            alert("กรุณาเลือกผู้รับสินค้า");
            return;
        }

        if (!selectedReceiver.firstName || !selectedReceiver.phone || !selectedReceiver.address) {
            console.error("Receiver incomplete:", selectedReceiver);
            alert("กรุณากรอกข้อมูลผู้รับให้ครบถ้วน");
            return;
        }

        // 3️⃣ สร้าง payload
        const receiverPayload = {
            ...(isMoreReceiver ? {} : { RecID: selectedReceiver.RecID }),
            RecName: selectedReceiver.firstName,
            RecLname: selectedReceiver.lastName,
            RecPhone: selectedReceiver.phone,
            RecAddr: selectedReceiver.address,
            CustID: customer.CustID,
            Rec_DelStatus: 0,
        };

        console.log("Submitting checkout with payload:", {
            customer,
            receiverPayload,
            cartItems,
            shippingMethod,
            paymentID
        });

        // 4️⃣ เช็ค CustID ก่อนส่งจริง
        if (!receiverPayload.CustID) {
            console.error("CustID is undefined, abort submit!");
            alert("ไม่สามารถสร้างผู้รับสินค้าได้: CustID ไม่มีค่า");
            return;
        }


        try {
            const result = await dispatch(
                submitCheckout({
                    cartItems,
                    customer,
                    receiver: receiverPayload,
                    shippingMethod,
                    paymentID,
                })
            ).unwrap();

            navigate(`/`);
            alert('สั่งซื้อสินค้าสำเร็จ')
        } catch (err: any) {
            console.error("Checkout failed:", err);
            alert(err?.message ?? "การสั่งซื้อผิดพลาด กรุณาลองใหม่");
        }
    };

    return (
        <div className="w-full bg-gray-50 flex flex-col items-center py-10">
            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm w-full max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold mb-6">CheckOut Page</h2>

                    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        {/* Receiver Inputs */}
                        <div>
                            <label className="block text-sm mb-1">ชื่อ*</label>
                            <input
                                type="text"
                                disabled={!isMoreReceiver}
                                value={selectedReceiver?.firstName || ""}
                                onChange={(e) => setSelectedReceiver({
                                    ...(selectedReceiver ?? { firstName: "", lastName: "", phone: "", address: "" }),
                                    firstName: e.target.value,
                                })}
                                className={`w-full border rounded-lg p-3 focus:outline-none ${isMoreReceiver
                                    ? "border-gray-300 focus:border-black"
                                    : "bg-gray-100 border-gray-200 cursor-not-allowed"
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">นามสกุล*</label>
                            <input
                                type="text"
                                disabled={!isMoreReceiver}
                                value={selectedReceiver?.lastName || ""}
                                onChange={(e) => setSelectedReceiver({
                                    ...(selectedReceiver ?? { firstName: "", lastName: "", phone: "", address: "" }),
                                    lastName: e.target.value,
                                })}
                                className={`w-full border rounded-lg p-3 focus:outline-none ${isMoreReceiver
                                    ? "border-gray-300 focus:border-black"
                                    : "bg-gray-100 border-gray-200 cursor-not-allowed"
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">เบอร์โทร*</label>
                            <input
                                type="text"
                                disabled={!isMoreReceiver}
                                value={selectedReceiver?.phone || ""}
                                onChange={(e) => setSelectedReceiver({
                                    ...(selectedReceiver ?? { firstName: "", lastName: "", phone: "", address: "" }),
                                    phone: e.target.value,
                                })}
                                className={`w-full border rounded-lg p-3 focus:outline-none ${isMoreReceiver
                                    ? "border-gray-300 focus:border-black"
                                    : "bg-gray-100 border-gray-200 cursor-not-allowed"
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">ที่อยู่*</label>
                            <input
                                type="text"
                                disabled={!isMoreReceiver}
                                value={selectedReceiver?.address || ""}
                                onChange={(e) => setSelectedReceiver({
                                    ...(selectedReceiver ?? { firstName: "", lastName: "", phone: "", address: "" }),
                                    address: e.target.value,
                                })}
                                className={`w-full border rounded-lg p-3 focus:outline-none ${isMoreReceiver
                                    ? "border-gray-300 focus:border-black"
                                    : "bg-gray-100 border-gray-200 cursor-not-allowed"
                                    }`}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="addReceiver"
                                checked={isMoreReceiver}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setIsMoreReceiver(checked);

                                    if (checked && selectedReceiver) {
                                        // ลบ RecID ออก เพื่อให้ backend สร้างใหม่
                                        setSelectedReceiver({
                                            firstName: selectedReceiver.firstName,
                                            lastName: selectedReceiver.lastName,
                                            phone: selectedReceiver.phone,
                                            address: selectedReceiver.address,
                                        });
                                    }
                                }}
                                className="w-4 h-4 accent-black"
                            />
                            <label htmlFor="addReceiver" className="text-sm">เพิ่มผู้รับสินค้า</label>

                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-500 p-2 text-white text-sm rounded-lg font-medium hover:cursor-pointer hover:bg-blue-600 transition"
                            >
                                เลือกผู้รับสินค้าที่มีอยู่
                            </button>
                        </div>

                        <hr className="my-6" />

                        {/* Shipping */}
                        <div>
                            <h3 className="font-medium mb-2">การจัดส่ง</h3>
                            <select
                                value={shippingMethod}
                                onChange={(e) => setShippingMethod(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-black"
                            >
                                <option value="free">🚚 จัดส่งฟรีภายใน 1 วันทำการ</option>
                                <option value="express">⚡ จัดส่งด่วน (ภายในวันเดียว) +฿100</option>
                            </select>
                        </div>

                        <hr className="my-6" />

                        {/* Payment */}
                        <div>
                            <h3 className="font-medium mb-3">วิธีการชำระเงิน</h3>
                            <select
                                value={paymentID}
                                onChange={(e) => setPaymentID(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-black mb-4"
                            >
                                <option value="1">💳 บัตรเครดิต / เดบิต</option>
                                <option value="2">🅿️ PayPal</option>
                                <option value="3">💰 TrueMoney Wallet</option>
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!customer?.CustID || cartItems.length === 0}
                            className={`mt-8 w-full py-3 rounded-lg font-semibold transition 
                ${!customer?.CustID ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-gray-800 text-white"}`}
                        >
                            ยืนยันคำสั่งซื้อ
                        </button>
                    </form>
                </div>

                {/* Right Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm min-w-sm">
                    <h2 className="text-lg font-semibold mb-4">สรุปรายการคำสั่งซื้อ</h2>
                    <div className="border-b border-gray-200 pb-4 mb-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span>ยอดรวมสินค้า</span>
                            <span>฿{subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>ค่าจัดส่ง</span>
                            <span>{shipmentFee === 0 ? "ฟรี" : `฿${shipmentFee.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between font-medium mt-3">
                            <span>ยอดรวมทั้งหมด</span>
                            <span>฿{total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                        {cartItems.map((item) => (
                            <div key={item.ProdID} className="flex justify-between items-center text-sm border-b pb-1">
                                <div className="flex items-center gap-3">
                                    <div className="imgFrame w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.Products?.ProdPicture || "/placeholder.png"}
                                            alt={item.Products?.ProdName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium">{item.Products?.ProdName || "สินค้า"}</p>
                                        <p className="text-gray-500">{item.Quantity} × ฿{item.Products?.Price}</p>
                                    </div>
                                </div>
                                <div className="font-medium">
                                    ฿{((item.Products?.Price ?? 0) * item.Quantity).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                            <h3 className="text-lg font-semibold mb-4">เลือกผู้รับสินค้า</h3>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {receivers.length > 0 ? (
                                    receivers.map((receiver) => (
                                        <div
                                            key={receiver.RecID}
                                            onClick={() => handleSelectReceiver(receiver)}
                                            className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer transition"
                                        >
                                            <p className="font-medium">{receiver.RecName} {receiver.RecLname}</p>
                                            <p className="text-sm text-gray-600">{receiver.RecPhone}</p>
                                            <p className="text-sm text-gray-600">{receiver.RecAddr}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">ยังไม่มีผู้รับสินค้าในบัญชีนี้</p>
                                )}
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-5 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-300 transition"
                            >
                                ปิด
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckOutPage;
