import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../../store';
import { fetchAllShopData, selectAllProducts } from '../../store/ShopSlice';
import './ProductSlider.css'

interface productVar {
    ProdID: number;
    ProdName: string;
    Price: number;
    DiscountPrice: number;
    ProdQuan: number;
    ProdPicture: string;
    ProdDetail: string;
    ProdPopular: number;
    FilterCateID: number;
    Prod_DelStatus: number;
}

const ProductSlider = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const AllProducts = useSelector(selectAllProducts);
    
    const [Category, setCategory] = useState<productVar[][]>([]);
    const [CurrPage, setCurrPage] = useState(0);
    const [checkDir, setcheckDir] = useState<"next" | "prev" | "none">("none");

    useEffect(() => {
        dispatch(fetchAllShopData());
    }, [dispatch])

    useEffect(() => {
        if (AllProducts.length === 0 || !id) return;

        const currProdIdx = AllProducts.findIndex(d => d.ProdID === parseInt(id));

        const RandNumRepo: number[] = [];
        const limitRandom = AllProducts.length;

        for (let i = 0; i < 9; i++) {
            let RandNum = Math.floor(Math.random() * limitRandom);
            while (RandNumRepo.includes(RandNum) || RandNum === currProdIdx) {
                RandNum = Math.floor(Math.random() * limitRandom);
            }
            RandNumRepo.push(RandNum);
        }

        const RandomProd = RandNumRepo.map(i => AllProducts[i]);

        const SplitCate: productVar[][] = [];
        for (let i = 0; i < RandomProd.length; i += 4) {
            SplitCate.push(RandomProd.slice(i, i + 4));
        }

        setCategory(SplitCate);
        setCurrPage(0);
    }, [AllProducts, id]);

    const SlidePages = (Dir: "next" | "prev" | "none", numSlidePage: number) => {
        setCategory(prev => {
            const updated = [...prev];
            for (let i = 0; i < numSlidePage; i++) {
                if (Dir === "next") {
                    const CurrSlide = updated.shift();
                    if (CurrSlide) updated.push(CurrSlide);
                }
                else if (Dir === "prev") {
                    const CurrSlide = updated.pop();
                    if (CurrSlide) updated.unshift(CurrSlide);
                }
            }

            return updated
        })
    }

    const NextPrevPages = (num: number) => {
        const checkPageLimit = CurrPage + num;
        if (checkPageLimit > Category.length - 1) {
            setCurrPage(0)
        }
        else if (checkPageLimit < 0) {
            setCurrPage(Category.length - 1);
        }
        else {
            setCurrPage(checkPageLimit);
        }

        const dir: "next" | "prev" = num > 0 ? "next" : "prev";
        setcheckDir(dir);

        SlidePages(dir, Math.abs(num));

        setTimeout(() => {
            setcheckDir("none");
        }, 1000)
    }

    const GoToPages = (num: number) => {
        const diffPage = num - CurrPage;
        if (diffPage === 0) return;

        setCurrPage(num);

        const dir: "next" | "prev" = diffPage > 0 ? "next" : "prev";
        setcheckDir(dir);

        SlidePages(dir, Math.abs(diffPage));

        setTimeout(() => {
            setcheckDir("none");
        }, 1000)
    }

    return (
        <>
            <section className="flex justify-center mb-16">
                <div className={`container MoreProduct_container relative mt-16 ${checkDir === "next" ? "next" : (checkDir === "prev" ? "prev" : "")}`}>
                    <div className="flex justify-between pl-4 lg:pl-18 2xl:pl-22 pr-20">
                        <span className="text-3xl md:text-4xl font-semibold pt-1">More products</span>
                    </div>

                    <div
                        className="MoreProduct relative h-[32rem] md:h-72 lg:h-80 xl:h-96 w-full flex justify-center mt-6 md:mt-2 2xl:mt-8 overflow-x-clip">
                        {Category.map((cate, index) => (
                            <div key={`category${index}`} className="grid_items absolute grid grid-cols-2 md:grid-cols-4 w-full h-full 
                                            place-items-center gap-4 md:gap-28 lg:gap-0 px-2 md:px-14 transition-transform duration-1000">
                                {cate.map(data => (
                                    <div key={data.ProdID}
                                        className="relative w-[10.5rem] md:w-44 lg:w-52 xl:w-64 2xl:w-80 h-64 lg:h-72 xl:h-80 2xl:h-96 shadow-2xl">
                                        <Link to={`/ProductDetail/${data.ProdID}`}>
                                            <div className="relative w-full h-[78%] 2xl:h-[80%]">
                                                <img src={data.ProdPicture ? data.ProdPicture : "/no-image.png"}
                                                    alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="relative w-full h-[22%] 2xl:h-[20%] bg-white pt-0.5 2xl:pt-2 pl-2 lg:pl-3">
                                                <h2 className="text-base md:text-lg truncate">{data.ProdName}</h2>
                                                <h2 className="text-base md:text-lg">{data.Price}</h2>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="relative flex justify-center items-center gap-3 pt-8">
                        <button onClick={() => NextPrevPages(-1)}
                            className="arrow_left w-10 md:w-12 h-10 md:h-12 bg-black rounded-full place-items-center cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#fff"
                                    d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645" />
                            </svg>
                        </button>
                        {Category.map((_, index) => (
                            <div key={`dot${index}`} className={`relative w-3 md:w-4 h-3 md:h-4 rounded-full ${CurrPage === index ? "bg-blue-700" : "bg-gray-400"} cursor-pointer`}
                                onClick={() => { GoToPages(index) }}>
                            </div>
                        ))}
                        <button onClick={() => NextPrevPages(1)}
                            className="arrow_right w-10 md:w-12 h-10 md:h-12 bg-black rounded-full place-items-center cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#fff"
                                    d="M5.536 21.886a1 1 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductSlider