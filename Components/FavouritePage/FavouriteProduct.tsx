import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type AppDispatch } from '../../store';
import { fetchAllShopData, selectAllProducts } from '../../store/ShopSlice';
import { fetchAllNavbarData, selectFavDet, setFavouriteDet } from '../../store/NavbarSlice';
import axios from 'axios';
import './Favourite.css'

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

const FavouriteProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const FavouriteDet = useSelector(selectFavDet);
    const AllProducts = useSelector(selectAllProducts);

    const [products, setproducts] = useState<productVar[] | undefined>([]);

    useEffect(() => {
        dispatch(fetchAllShopData());
        dispatch(fetchAllNavbarData());
    }, [dispatch])

    useEffect(() => {
        const ArrFavNum = FavouriteDet.map(d => d.ProdID);
        const FavProductList = AllProducts.filter(d => ArrFavNum.includes(d.ProdID));

        setproducts(FavProductList);
    }, [AllProducts, FavouriteDet])

    const DeleteFav = async (prodID: number) => {
        const GetFav = FavouriteDet.find(d => d.ProdID === prodID);

        await axios.delete(`http://localhost:3000/favouritedetail/${GetFav?.FavDetailID}`)

        const data = FavouriteDet.filter(d => d.FavDetailID !== GetFav?.FavDetailID);
        dispatch(setFavouriteDet(data));
    }

    return (
        <>
            {/* Favourite  */}
            <section className="flex justify-center mb-16">
                <div className="container relative mt-16 md:mt-20">
                    <div className="relative flex justify-center md:justify-normal gap-2 pt-3 md:pl-6 lg:pl-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" className="w-10 h-10 object-cover">
                            <path fill="#f44336"
                                d="M93.99 8.97c-21.91 0-29.96 22.39-29.96 22.39s-7.94-22.39-30-22.39c-16.58 0-35.48 13.14-28.5 43.01s58.56 67.08 58.56 67.08s51.39-37.21 58.38-67.08c6.98-29.87-10.56-43.01-28.48-43.01" />
                            <path fill="#c33"
                                d="M30.65 11.2c17.2 0 25.74 18.49 28.5 25.98c.39 1.07 1.88 1.1 2.33.06L64 31.35C60.45 20.01 50.69 8.97 34.03 8.97c-6.9 0-14.19 2.28-19.86 7.09c5.01-3.29 10.88-4.86 16.48-4.86m63.34-2.23c-5.29 0-10.11 1.15-13.87 3.47c2.64-1.02 5.91-1.24 9.15-1.24c16.21 0 30.72 12.29 24.17 40.7c-5.62 24.39-38.46 53.98-48.49 65.27c-.64.72-.86 1.88-.86 1.88s51.39-37.21 58.38-67.08c6.98-29.86-10.53-43-28.48-43" />
                            <path fill="#ff8a80"
                                d="M17.04 24.82c3.75-4.68 10.45-8.55 16.13-4.09c3.07 2.41 1.73 7.35-1.02 9.43c-4 3.04-7.48 4.87-9.92 9.63c-1.46 2.86-2.34 5.99-2.79 9.18c-.18 1.26-1.83 1.57-2.45.46c-4.22-7.48-5.42-17.78.05-24.61m60.12 9.84c-1.76 0-3-1.7-2.36-3.34c1.19-3.02 2.73-5.94 4.58-8.54c2.74-3.84 7.95-6.08 11.25-3.75c3.38 2.38 2.94 7.14.57 9.44c-5.09 4.93-11.51 6.19-14.04 6.19" />
                        </svg>
                        <span className="text-3xl md:text-4xl font-bold">Favourite</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" className="w-10 h-10 object-cover">
                            <path fill="#f44336"
                                d="M93.99 8.97c-21.91 0-29.96 22.39-29.96 22.39s-7.94-22.39-30-22.39c-16.58 0-35.48 13.14-28.5 43.01s58.56 67.08 58.56 67.08s51.39-37.21 58.38-67.08c6.98-29.87-10.56-43.01-28.48-43.01" />
                            <path fill="#c33"
                                d="M30.65 11.2c17.2 0 25.74 18.49 28.5 25.98c.39 1.07 1.88 1.1 2.33.06L64 31.35C60.45 20.01 50.69 8.97 34.03 8.97c-6.9 0-14.19 2.28-19.86 7.09c5.01-3.29 10.88-4.86 16.48-4.86m63.34-2.23c-5.29 0-10.11 1.15-13.87 3.47c2.64-1.02 5.91-1.24 9.15-1.24c16.21 0 30.72 12.29 24.17 40.7c-5.62 24.39-38.46 53.98-48.49 65.27c-.64.72-.86 1.88-.86 1.88s51.39-37.21 58.38-67.08c6.98-29.86-10.53-43-28.48-43" />
                            <path fill="#ff8a80"
                                d="M17.04 24.82c3.75-4.68 10.45-8.55 16.13-4.09c3.07 2.41 1.73 7.35-1.02 9.43c-4 3.04-7.48 4.87-9.92 9.63c-1.46 2.86-2.34 5.99-2.79 9.18c-.18 1.26-1.83 1.57-2.45.46c-4.22-7.48-5.42-17.78.05-24.61m60.12 9.84c-1.76 0-3-1.7-2.36-3.34c1.19-3.02 2.73-5.94 4.58-8.54c2.74-3.84 7.95-6.08 11.25-3.75c3.38 2.38 2.94 7.14.57 9.44c-5.09 4.93-11.51 6.19-14.04 6.19" />
                        </svg>
                    </div>

                    <div
                        className="relative w-full min-h-0 mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 place-items-center gap-y-6 md:gap-y-12 gap-x-4 px-4 xl:px-8">
                        {products?.map(prod => (
                            <div key={prod.ProdID} className="group product relative min-w-full flex md:block h-40 md:h-[22rem] lg:h-80 xl:h-96 2xl:h-[28rem] xl:rounded-4xl">
                                <button
                                    className='absolute flex justify-center items-center h-7 w-7 md:h-10 md:w-10 top-0 right-0 
                                             bg-black rounded-full translate-x-[25%] translate-y-[-25%]'
                                    onClick={() => DeleteFav(prod.ProdID)}>
                                    <svg className="w-[70%] h-[70%] object-cover" xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m8 8l32 32M8 40L40 8"></path></svg>
                                </button>
                                <Link to={`/ProductDetail/${prod.ProdID}`} className="w-full h-full flex md:block">
                                    <div className="w-[40%] md:w-full h-full md:h-[79%] bg-gray-300 xl:rounded-t-4xl">
                                        <img className="w-full h-full object-cover xl:rounded-t-4xl" src={prod.ProdPicture} alt="" />
                                    </div>
                                    <div className="w-[60%] md:w-full h-full md:h-[21%] flex flex-col pl-3 pt-1 md:pl-4.5 xl:pt-2 xl:pl-4 gap-0.5 lg:gap-1">
                                        <span className="md:text-lg lg:text-xl font-bold">{prod.ProdName}</span>
                                        <span className="md:text-lg lg:text-xl">{prod.Price}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default FavouriteProduct