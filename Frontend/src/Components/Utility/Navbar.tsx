import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { WhiteLogoName } from "../../assets/Home/UtilityAssets";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch } from "../../store";
import { fetchAllNavbarData, selectCartDet, selectRingingCart, selectRingingFav, 
         selectAccount, setAccount, selectSearchProduct, setSearchProduct } from "../../store/NavbarSlice";
import './style.css'
import SearchOverlay from "./SearchOverlay";

interface PropsPosition {
    position: string;
}

function NavBar({ position }: PropsPosition) {

    const dispatch = useDispatch<AppDispatch>();
    const CartDet = useSelector(selectCartDet);
    const RingingCart = useSelector(selectRingingCart);
    const RingingFav = useSelector(selectRingingFav);
    const Account = useSelector(selectAccount);
    const SearchProduct = useSelector(selectSearchProduct);

    const [Navbar, setNavbar] = useState(true);
    const [lastScroll, setlastScroll] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isClickAccount, setIsClickAccount] = useState(false);

    useEffect(() => {
        dispatch(fetchAllNavbarData());
    }, [dispatch])

    const handleNav = () => {
        if (isSearchOpen) {
            setNavbar(true);
            return;
        }

        const current = window.scrollY;

        if (current > lastScroll) {
            setNavbar(false)
        }
        else {
            setNavbar(true)
        }

        setlastScroll(current);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleNav);
        return () => window.removeEventListener("scroll", handleNav);
    }, [lastScroll]);

    useEffect(() => {
        // ถ้าเปิดหน้าค้นหา
        if (isSearchOpen) {
            // สั่งให้ body หยุด scroll
            document.body.style.overflow = 'hidden';
        }

        // 'cleanup function' นี้จะทำงานเมื่อ
        // 1. component ถูก unmount
        // 2. หรือเมื่อ isSearchOpen เปลี่ยน (ก่อนที่ effect ใหม่จะรัน)
        return () => {
            // คืนค่าให้ body กลับมา scroll ได้ปกติ
            document.body.style.overflow = 'auto';
        };
    }, [isSearchOpen]); // ⬅️ ให้ hook นี้ขึ้นอยู่กับ state 'isSearchOpen'

    useEffect(() => {
        // ถ้าหน้าค้นหาไม่ได้เปิด, ก็ไม่ต้องทำอะไร
        if (!isSearchOpen && !isClickAccount) {
            return;
        }

        // ฟังก์ชันนี้จะถูกเรียกเมื่อมีการคลิก
        function handleClickOutside(event: MouseEvent) {
            // 1. หา element ของ Navbar
            const navBar = document.getElementById('navBar');
            // 2. หา element ของ Panel
            const searchPanel = document.getElementById('searchOverlayPanel');
            const accountDropdown = document.getElementById('accountDropdown');

            const isClickingInsideAccount = navBar?.contains(event.target as Node) && (event.target as HTMLElement).closest('.account-icon-container');

            // 3. ตรวจสอบว่าคลิก "นอก" ทั้งสองส่วนหรือไม่
            if (
                (isSearchOpen && navBar && !navBar.contains(event.target as Node) && searchPanel && !searchPanel.contains(event.target as Node)) ||

                (isClickAccount && navBar && !isClickingInsideAccount && accountDropdown && !accountDropdown.contains(event.target as Node))
            ) {
                // ถ้าคลิกข้างนอกจริง ให้ปิด Search
                setIsClickAccount(false);
                closeSearch();
            }
        }

        // เพิ่ม event listener เมื่อ component mount หรือ isSearchOpen = true
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup: ลบ event listener ออกเมื่อ unmount หรือ isSearchOpen = false
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen, isClickAccount]);

    const closeSearch = () => {
        setIsSearchOpen(false);
    }
    const openSearch = () => {
        setIsSearchOpen(true);
    }

    const HandleAccountClick = () => {
        setIsClickAccount(prev => !prev);
    }

    const Logout = () => {
        if (!window.confirm("ยืนยืนการออกระบบ?")) return;
        localStorage.removeItem('accessToken');
        dispatch(setAccount(undefined));
        setIsClickAccount(false);

        window.location.reload();
    }

    const ChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchProduct(e.target.value));
    }

    return (
        <>
            {/* <!-- Navigation Bar --> */}
            <nav id="navBar"
                className={`${position} bg-gray-950 h-15 w-screen left-0 top-0 flex justify-between items-center 
                            z-50 transition-transform duration-300 ${Navbar ? "translate-y-0" : "-translate-y-full"}`}>
                {isSearchOpen ? (
                    // ============== ⬇️ SEARCH VIEW (ใน Navbar) ⬇️ ==============
                    <div className="flex items-center w-full max-w-4xl mx-auto px-4 gap-3">
                        <input
                            type="search"
                            placeholder="ค้นหาสินค้าที่คุณต้องการ..."
                            value = {SearchProduct}
                            onChange={(e) => ChangeSearchText(e)}
                            className="w-full h-10 px-5 text-lg text-black bg-white rounded-full outline-none"
                            autoFocus
                        />
                        <button
                            onClick={closeSearch} // ⬅️ ปุ่ม "X" ปิด
                            className="flex-shrink-0 w-10 h-10 p-2 rounded-full text-white hover:bg-gray-700 transition-colors"
                            aria-label="Close search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-full h-full">
                                <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
                            </svg>
                        </button>
                    </div>

                ) : (
                    <>
                        < ul className="flex items-center gap-3 ml-2 lg:gap-8 lg:ml-6">

                            {/* ListBox */}
                            <button className="block md:hidden w-8 h-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    className="w-full h-full object-cover">
                                    <path fill="#fff"
                                        d="M8 9q-.425 0-.712-.288T7 8t.288-.712T8 7h12q.425 0 .713.288T21 8t-.288.713T20 9zm0 4q-.425 0-.712-.288T7 12t.288-.712T8 11h12q.425 0 .713.288T21 12t-.288.713T20 13zm0 4q-.425 0-.712-.288T7 16t.288-.712T8 15h12q.425 0 .713.288T21 16t-.288.713T20 17zM4 9q-.425 0-.712-.288T3 8t.288-.712T4 7t.713.288T5 8t-.288.713T4 9m0 4q-.425 0-.712-.288T3 12t.288-.712T4 11t.713.288T5 12t-.288.713T4 13m0 4q-.425 0-.712-.288T3 16t.288-.712T4 15t.713.288T5 16t-.288.713T4 17" />
                                </svg>
                            </button>

                            {/* Home logo */}
                            <li className="hover:scale-120 transition-all w-10 h-10 md:w-12 md:h-12 bg-transparent">
                                <Link to="/" className="w-12 h-12 bg-transparent flex justify-center items-center">
                                    <img src={WhiteLogoName} className="w-full h-full object-cover" />
                                </Link>
                            </li>

                            <li className="hidden md:block hover:bg-white hover:scale-110 hover:text-black transition-all p-1.75 h-10 bg-transparent text-white"><Link to="/">Arrivals</Link></li>
                            <li className="hidden md:block hover:bg-white hover:scale-110 hover:text-black transition-all p-1.75 h-10 bg-transparent text-white"><Link to="/product">Trends</Link></li>
                            <li className="hidden md:block hover:bg-white hover:scale-110 hover:text-black transition-all p-1.75 h-10 bg-transparent text-white"><Link to="/product">Clothes</Link></li>
                            <li className="hidden md:block hover:bg-white hover:scale-110 hover:text-black transition-all p-1.75 h-10 bg-transparent text-white"><Link to="/product">Accessory</Link></li>
                        </ul>
                        <ul className="flex gap-4 mr-2 md:gap-5 md:mr-6 lg:gap-7 lg:mr-8">

                            {/* 1. Search Icon */}
                            <li className="block xl:hidden">
                                <button onClick={openSearch} className="w-8 h-8 md:w-10 md:h-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-full h-full object-cover"><path fill="#fff" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" /></svg>
                                </button>
                            </li>

                            {/* 2. Expanding Search Input for XL screens */}
                            <li className="hidden xl:block">
                                <input
                                    placeholder="ค้นหาสินค้า"
                                    type="search"
                                    onFocus={openSearch} // ⬅️ 6. onFocus
                                    className={`bg-white rounded-full pl-4 text-black h-9 outline-none w-90`}
                                />
                            </li>

                            {/* Favourite */}
                            <Link to="/Favourite" className={`hover:scale-120 transition-all w-8 h-8 md:w-10 md:h-10 rounded-full
                                                     ${RingingFav ? "duration-300 ease-in-out scale-120" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    className="w-full h-full object-cover">
                                    <path fill="#fffdfd"
                                        d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z" />
                                </svg>
                            </Link>

                            {/* Cart */}
                            <Link to="/Cart" className={`relative hover:scale-120 transition-all w-8 h-8 md:w-10 md:h-10 rounded-full
                                            ${RingingCart ? "duration-300 ease-in-out scale-120" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"
                                    className="w-full h-full object-cover">
                                    <circle cx="176" cy="416" r="32" fill="#fffdfd" />
                                    <circle cx="400" cy="416" r="32" fill="#fffdfd" />
                                    <path fill="#fffdfd"
                                        d="M456.8 120.78a23.92 23.92 0 0 0-18.56-8.78H133.89l-6.13-34.78A16 16 0 0 0 112 64H48a16 16 0 0 0 0 32h50.58l45.66 258.78A16 16 0 0 0 160 368h256a16 16 0 0 0 0-32H173.42l-5.64-32h241.66A24.07 24.07 0 0 0 433 284.71l28.8-144a24 24 0 0 0-5-19.93" />
                                </svg>
                                <div className={`absolute w-4.5 h-4.5 rounded-full bg-lime-500 top-0 right-0 ${CartDet.length === 0 ? "hidden" : "flex"} justify-center items-center`}>
                                    <span className="text-sm">{CartDet.length}</span>
                                </div>
                            </Link>

                            {/* Delivery */}
                            <Link to="/delivery" className="hover:scale-120 transition-all w-8 h-8 md:w-10 md:h-10 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    className="w-full h-full object-cover">
                                    <path fill="#fff"
                                        d="M18 18.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m1.5-9l1.96 2.5H17V9.5m-11 9A1.5 1.5 0 0 1 4.5 17A1.5 1.5 0 0 1 6 15.5A1.5 1.5 0 0 1 7.5 17A1.5 1.5 0 0 1 6 18.5M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h6a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2v-5z" />
                                </svg>
                            </Link>

                            {/* Account */}
                            {Account ? (
                                <li className="relative account-icon-container">
                                    <div className="hover:scale-120 transition-all w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer"
                                        onClick={HandleAccountClick}
                                    >
                                        <img src={Account.AvatarPic} className="w-full h-full object-cover rounded-full" />
                                    </div>

                                    <div id="accountDropdown"
                                        className={`absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl transition-opacity duration-300
                                            ${isClickAccount ? "opacity-100 visible" : "opacity-0 invisible"}
                                            ${position === "fixed" ? "top-full" : "top-full"}`}
                                    >
                                        <div className="px-4 py-2 text-[12px] text-gray-700 border-b">
                                            เข้าสู่ระบบในชื่อ <br /> <span className="text-lg truncate">{Account.Username}</span>
                                        </div>
                                        <Link
                                            to="/Profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsClickAccount(false)}
                                        >
                                            ⚙️ ตั้งค่าบัญชี
                                        </Link>
                                        <button
                                            onClick={Logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            🚪 ออกจากระบบ
                                        </button>
                                    </div>
                                </li>

                            ) : (
                                <Link to="/Register" className="hover:scale-120 transition-all w-8 h-8 md:w-10 md:h-10 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-full h-full object-cover"><g fill="#fffdfd" fillRule="evenodd" clipRule="evenodd"><path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" /><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.99 8.99 0 0 1 12.065 14a8.98 8.98 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.96 8.96 0 0 1-5.672-2.012A6.99 6.99 0 0 1 12.065 16a6.99 6.99 0 0 1 5.689 2.92A8.96 8.96 0 0 1 12 21" /></g>
                                    </svg>
                                </Link>
                            )
                            }
                        </ul>
                    </>
                )}
            </nav >

            {/* เพิ่ม Search Overlay เพื่อให้แสดงข้อมูลการ Search */}
            {isSearchOpen && <SearchOverlay />}

            {/* เพื่มสิ่งที่มองไม่เห็น เหมือนบาเรียไว้ที่พืนที่ว่าง */}
            {isSearchOpen && (
                <div
                    // 1. ทำให้เต็มจอและอยู่เบื้องหลัง (z-40 คือ Panel)
                    className="fixed top-0 left-0 w-full h-full z-30
                               // 2. ทำให้พื้นหลังโปร่งแสง
                               bg-black/50"
                    // คลิกภายนอกกรอบขาวจะปิด Search
                    onClick={closeSearch}
                ></div>
            )}
        </>
    )
}

export default NavBar;