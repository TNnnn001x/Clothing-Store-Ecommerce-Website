import * as React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import deleteIcon from '../../assets/Cart/CartAssets/CartDeleteBtn.svg';
import './CartAssets/CartPage.css';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { fetchUserCart, updateQuantity, removeCartItem, selectCartItems, selectCartStatus, selectCartTotals } from '../../store/cartSlice';
import { selectAccount, selectCartDet, setCartDet, setRingingCart } from '../../store/NavbarSlice';

interface TotalCart {
    totalPrice: number
    totalItems: number
}

const CartPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const CartDet = useSelector(selectCartDet);
    const cartItems = useSelector(selectCartItems)
    const cartStatus = useSelector(selectCartStatus)
    const totalCart = useSelector(selectCartTotals)
    const Account = useSelector(selectAccount);

    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

    useEffect(() => {
        if(Account){
            dispatch(fetchUserCart(Account.AccID))
        }
    }, [dispatch, Account])

    const handlerQuantity = (cartDetailID: number, change: number) => {
        const item = cartItems.find(item => item.CartDetailID === cartDetailID)
        if (!item) return
        const newQuantity = Math.max(1, item.Quantity + change);
        dispatch(updateQuantity({ cartDetailID, quantity: newQuantity }))
    }

    const removeItem = (cartDetailID: number) => {
        const el = document.getElementById(`cart-item-${cartDetailID}`);
        if (!el) return;

        el.classList.add("removing");
        setTimeout(() => {
            dispatch(removeCartItem(cartDetailID));

            const data = CartDet.filter(d => d.CartDetailID !== cartDetailID);
            dispatch(setCartDet(data));
            dispatch(setRingingCart(true));
            setTimeout(() => {
                dispatch(setRingingCart(false));
            }, 300)

        }, 300); // เวลาให้ animation เล่นจบ
    };

    const handleCheckout = () => {
        // ไปหน้าชำระเงิน
        navigate('/checkout');
    };

    if (cartStatus === 'loading') return <div className="text-2xl text-gray-200">Loading Cart....</div>
    if (!totalCart) {
        return <div className="text-2xl text-gray-200">Loading Total Cart...</div>;
    }
    if (cartStatus === 'error') return <div className="text-2xl text-red-600">Error Cannot loading Cart</div>

    return (<>
        <div className="cart-banner relative flex items-center bg-black text-white text-4xl font-bold p-4 h-[100px] mt-15 bg-linear-to-r from-black/80 to-white/80">
            <div className='cart-logo w-[100px] aspect-square'>
                <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"
                    className="w-full h-full object-cover">
                    <circle cx="176" cy="416" r="32" fill="#fffdfd" />
                    <circle cx="400" cy="416" r="32" fill="#fffdfd" />
                    <path fill="#fffdfd"
                        d="M456.8 120.78a23.92 23.92 0 0 0-18.56-8.78H133.89l-6.13-34.78A16 16 0 0 0 112 64H48a16 16 0 0 0 0 32h50.58l45.66 258.78A16 16 0 0 0 160 368h256a16 16 0 0 0 0-32H173.42l-5.64-32h241.66A24.07 24.07 0 0 0 433 284.71l28.8-144a24 24 0 0 0-5-19.93" />
                </svg>

            </div>
            Shopping Cart
        </div>
        <div className="cart-container flex justify-center pt-[20px] mb-20">
            <div className="cart-view relative flex flex-col items-center justify-center w-full xl:flex-row xl:items-start">
                <div className="cart-content w-full max-w-[800px] border-b-2 border-gray-300 xl:border-0">
                    {/* cart-title */}
                    <h1 className="cart-itemsTitle text-[2rem] text-center font-bold my-2 xl:text-start">Cart</h1>
                    <div className="secondSumDetail flex justify-center space-x-4 w-full xl:hidden border-b-2 border-gray-300 pb-10 xl:pb-0 xl:border-0">
                        <h2 className="totalPrice text-lg text-blue-500 font-bold">{totalCart.totalItems} รายการ |</h2>
                        <h2 className="quantity text-lg text-black font-bold">{totalCart.totalPrice.toLocaleString()} บาท</h2>


                    </div>

                    <div className="cart-itemList">
                        {cartItems.map((item) => {
                            return (
                                <div key={item.CartDetailID} id={`cart-item-${item.CartDetailID}`} className="cart-item flex gap-5 py-[24px] px-4 border-b-2 border-gray-300 mt-12 overflow-hidden  " >
                                    <div className="cart-itemShow flex flex-col w-[200px] ">
                                        <div className="cart-itemPic max-w-[200px] max-h-[200px] bg-purple-400 overflow-hidden">
                                            <img src={item.Products.ProdPicture} alt="itemPic" className="w-full h-full object-cover" />
                                        </div>

                                        <div className="cart-itemButton flex justify-between mt-2 gap-2">
                                            {/* delete button */}
                                            <button onClick={() => { removeItem(item.CartDetailID) }} className="rounded-xl bg-white border-3 p-2 border-gray-300 w-[50px] h-[50px] hover:bg-red-300 hover:border-red-800 hover:cursor-pointer hover:scale-110 transition-all ease-in ">
                                                <img src={deleteIcon} alt="deleteBtn" className="h-full w-full object-fit" />
                                            </button>
                                            {/* Add/Reduce button */}
                                            <div className="quantityButton flex items-center bg-white border-3 border-gray-300 rounded-xl overflow-hidden ">
                                                <button onClick={() => { handlerQuantity(item.CartDetailID, -1) }}
                                                    className="w-[40px]  h-full rounded-lg hover:bg-gray-200 hover:cursor-pointer hover:scale-110"
                                                    disabled={item.Quantity <= 1}>
                                                    <svg className="h-full w-full p-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M5 13v-1h13v1z" /></svg>
                                                </button>
                                                <div className="quantity min-w-[40px] text-center">{item.Quantity}</div>
                                                <button onClick={() => { handlerQuantity(item.CartDetailID, 1) }}
                                                    className={`w-[40px] h-full rounded-lg hover:scale-110 ${item.Quantity >= item.Products.ProdQuan ? "bg-gray-400 cursor-not-allowed" : "hover:bg-gray-200 hover:cursor-pointer"}`}
                                                    disabled={item.Quantity >= item.Products.ProdQuan}>
                                                    <svg className="h-full w-full p-1 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M11.5 12.5H6v-1h5.5V6h1v5.5H18v1h-5.5V18h-1z" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="itemDetail space-y-4 w-full">
                                        <div className="flex justify-between">
                                            <h1 className="brand text-lg font-bold">{item.Products.Filter?.Brand?.BrandName || "Unknown Brand"}</h1>
                                            <h1 className="price text-lg font-bold">{item.Products.Price.toLocaleString()} บาท</h1>
                                        </div>

                                        <p className="prodName text-lg">{item.Products.ProdName}</p>
                                        <p className="size text-lg">size : {item.Size}</p>
                                    </div>


                                </div>)
                        })}

                    </div>

                </div>
                {/* Static Summary */}
                <div className="cartSum max-w-[400px] w-full mx-10 hidden xl:block">
                    <h1 className="cart-SumTitle hidden text-[2rem] font-bold mt-2 mb-10 xl:block ">Summary</h1>
                    <div className="firstSumDetail space-y-4">
                        {/* Summary List */}
                        <div className="itemlist px-4 space-y-10 max-h-[400px] overflow-auto">
                            {cartItems.map((item, index) => {
                                return (<div key={index} className="flex justify-between">
                                    <div className="item-detail">
                                        <h1 className="brand text-lg font-bold">{item.Products.Filter?.Brand?.BrandName || "Unknown Brand"}</h1>
                                        <h1 className=" text-md text-black max-w-[250px] overflow-hidden">{item.Products.ProdName}</h1>
                                        <h1 className=" text-md text-black max-w-[250px] overflow-hidden">size: {item.Size} <span className="text-gray-400">x{item.Quantity}</span></h1>


                                    </div>

                                    <h2 className="quantity text-md text-black overflow-hidden ml-10 ">{item.Products.Price.toLocaleString()} บาท</h2>
                                </div>)
                            })}
                        </div>
                        {/* Summary Total */}
                        <div className="summary pt-10 border-t-2 border-gray-300 space-y-4">
                            <div className="totalPrice flex justify-between">
                                <h1 className=" text-lg text-black">ยอดรวมสินค้าในรถเข็น</h1>

                                <h2 className="quantity text-lg text-black font-bold">{totalCart.totalPrice.toLocaleString()} บาท</h2>
                            </div>
                            <div className="quantity flex justify-between">
                                <h1 className="text-lg text-black">จำนวนสินค้า</h1>
                                <h2 className="totalPrice text-lg text-blue-500 font-bold">{totalCart.totalItems} รายการ </h2>
                            </div>
                            {/* Checkout Button */}
                            <button onClick={handleCheckout} className={`checkoutButton w-full rounded-full ${totalCart.totalItems === 0 ? "bg-gray-400 text-gray-300" : "bg-blue-500 text-white hover:cursor-pointer hover:scale-110 "} font-bold p-6 text-xl  transition-all ease-in `}>ชำระเงินสินค้า</button>


                        </div>


                    </div>
                </div>
                {/* Floating Summary */}
                <div className="fixed flex flex-col  items-center  bottom-0 left-50% w-full max-w-2xl bg-white shadow-lg z-99 xl:hidden">
                    <button disabled={totalCart.totalItems === 0}
                        onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                        className={` w-full h-[6rem] rounded-lg p-4 ${totalCart.totalItems === 0 ? "bg-gray-400 text-gray-300" : "bg-blue-500 text-white "} font-bold text-2xl flex  ${isSummaryOpen ? "gap-10" : " hover:scale-110"} justify-center items-center transition-all hover:cursor-pointer `}
                    >
                        <span>{isSummaryOpen ? `ปิด` : "ชำระเงิน"}</span>

                    </button>

                    {/* Collapsible Panel */}
                    <div
                        className={`transition-all w-full duration-300 overflow-hidden  ${isSummaryOpen ? "max-h-[500px]" : "max-h-0"}`}
                    >
                        <div className="p-4 space-y-4">
                            <div className="itemlist max-h-[250px] overflow-auto">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex justify-between mb-2">
                                        <div>
                                            <h1 className="text-sm font-bold">{item.Products.Filter?.Brand?.BrandName || "Unknown Brand"}</h1>
                                            <h1 className="text-sm font-bold">{item.Products.ProdName}</h1>
                                            <h2 className="text-sm text-gray-500">size: {item.Size} x{item.Quantity}</h2>
                                        </div>
                                        <h2 className="text-sm">{(item.Products.Price * item.Quantity).toLocaleString()} บาท</h2>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-md">
                                    <span>รวม</span>
                                    <span className="font-bold">{totalCart.totalPrice.toLocaleString()} บาท</span>
                                </div>
                                <div className="flex justify-between text-md">
                                    <span>จำนวนสินค้า</span>
                                    <span className="text-blue-500 font-bold">{totalCart.totalItems} รายการ</span>
                                </div>
                            </div>

                            <button onClick={handleCheckout} className="w-full rounded-full bg-blue-500 text-white font-bold py-3 text-lg hover:scale-105 transition">
                                ดำเนินการชำระเงิน
                            </button>
                        </div>
                    </div>
                </div>




            </div>

        </div>
    </>)
}

export default CartPage;