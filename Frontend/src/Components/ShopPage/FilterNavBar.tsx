import { useState, useEffect } from "react";
import { type AppDispatch } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { selectCloneProduct, selectCateTrace, selectTypeTrace, selectStyleTrace, selectBrandTrace,
          fetchAllShopData
 } from "../../store/ShopSlice";
import './Shop.css'
import FilterList from "./FilterList";

const FilterNavBar = () => {

    const dispatch = useDispatch<AppDispatch>();

    const products = useSelector(selectCloneProduct);
    const CTrace = useSelector(selectCateTrace);
    const TTrace = useSelector(selectTypeTrace);
    const STrace = useSelector(selectStyleTrace);
    const BTrace = useSelector(selectBrandTrace);

    useEffect(() => {
        dispatch(fetchAllShopData());
    }, [dispatch])

    const [NavbarFilter, setNavbarFilter] = useState(true);
    const [IsFilterbtnClick, setIsFilterbtn] = useState<"none" | "open" | "close">("none");
    const [lastScroll, setlastScroll] = useState(0);

    const handleNav = () => {

        const current = window.scrollY;

        if (current > lastScroll) {
            setNavbarFilter(false)
        }
        else {
            setNavbarFilter(true)
        }

        setlastScroll(current);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleNav);
        return () => window.removeEventListener("scroll", handleNav);
    }, [lastScroll]);

    const FilterClick = () => {

        if (IsFilterbtnClick !== "none") {
            setIsFilterbtn("close");
            setTimeout(() => {
                setIsFilterbtn("none");
            }, 1000)
        }
        else {
            setIsFilterbtn("open");
        }
    }

    useEffect(() => {
        if (IsFilterbtnClick === "open") {
            document.body.classList.add("overflow-hidden");
        }
        else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [IsFilterbtnClick])

    return (
        <>
            {/* overlay */}
            <div className={`absolute w-screen h-screen bg-gray-950/60 z-10 ${IsFilterbtnClick === "open" ? `top-[${lastScroll}px]` : "hidden"}`}></div>
            <div className={`absolute right-0 w-4 h-screen z-50 ${IsFilterbtnClick === "open" ? `overflow-x-hidden overflow-y-scroll top-[${lastScroll}px]` : "hidden"}`}></div>

            {/* FilterBar */}
            <nav className={`relative w-full h-16 bg-amber-500 transition-transform duration-300 z-30 ${NavbarFilter ? "translate-y-0" : "translate-y-[-100%]"}`}>
                <div className="w-full h-full flex justify-between items-center px-3 md:px-8">
                    <div className="hidden md:block">
                        <span className="text-xl font-medium">{CTrace}{TTrace}{STrace}{BTrace}({products.length})</span>
                    </div>
                    <button onClick={FilterClick}
                        className={`${IsFilterbtnClick === "open" ? "bg-sky-500" : "bg-white"} w-28 h-8 rounded-full flex flex-row-reverse md:flex-row justify-end items-center
                                        hover:ring-2 pl-2 pr-2 shadow-md shadow-black`}>
                        <span className="text-lg">filter</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M22 3H2l8 10v4l4 4v-8z" />
                        </svg>
                    </button>
                </div>
            </nav>

            <div
                className={`relative w-full max-h-max bg-gray-300 px-0 xl:px-4 pt-6 md:pt-2 pb-8 z-20 transition-transform duration-1000
                                ${IsFilterbtnClick === "none" ? "hidden" : (IsFilterbtnClick === "open" ?
                        (NavbarFilter ? "" : "translate-y-[-17%]") : "translate-y-[-120%]")}`}>

                <div className="flex items-center gap-1 pl-2 lg:pl-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M22 3H2l8 10v4l4 4v-8z" />
                    </svg>
                    <span className="text-2xl md:text-3xl">Filter</span>
                </div>

                <hr />

                <FilterList />
            </div>
        </>
    )
}

export default FilterNavBar