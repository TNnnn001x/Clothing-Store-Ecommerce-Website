// import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../../store';
import { fetchAllShopData, selectAllProducts } from '../../store/ShopSlice';
import { selectSearchProduct } from '../../store/NavbarSlice';
import { Link } from 'react-router-dom';

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

function SuggestionCard({ prod }: { prod: productVar }) {
    return (
        <Link to={`/ProductDetail/${prod.ProdID}`}>               
            <div className="w-full md:w-64 lg:w-full h-32 md:h-64 bg-gray-300 rounded-md flex items-center justify-center">
                <img src={prod.ProdPicture} alt="Product" className='w-full h-full object-cover' />
            </div>
            <div className="mt-2">
                <p className="font-semibold">{prod.ProdName}</p>
                <p className="text-gray-600">${prod.Price}</p>
            </div>
        </Link>
    );
}

function SearchOverlay() {
    const dispatch = useDispatch<AppDispatch>();
    const AllProduct = useSelector(selectAllProducts);
    const SearchProduct = useSelector(selectSearchProduct);

    const [SplitSearchProd, setSplitSearchProd] = useState<productVar[][]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchAllShopData());
    }, [dispatch])

    useEffect(() => {
        if (AllProduct.length === 0) return;

        const filterProd = AllProduct.filter(d => d.ProdName.toLowerCase().includes(SearchProduct.toLowerCase()));

        const RandNumRepo: number[] = [];
        const limitRandom = filterProd.length;

        for (let i = 0; i < Math.min(12, filterProd.length); i++) {
            let RandNum = Math.floor(Math.random() * limitRandom);
            while (RandNumRepo.includes(RandNum)) {
                RandNum = Math.floor(Math.random() * limitRandom);
            }
            RandNumRepo.push(RandNum);
        }

        const RandomProd = RandNumRepo.map(i => filterProd[i]);

        const SplitCate: productVar[][] = [];
        for (let i = 0; i < RandomProd.length; i += 4) {
            SplitCate.push(RandomProd.slice(i, i + 4));
        }

        setSplitSearchProd(SplitCate);
        setCurrentPage(1);

    }, [AllProduct, SearchProduct]);

    useEffect(() => {
        setTotalPages(SplitSearchProd.length)
    }, [SplitSearchProd])

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const goToPrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div
            id="searchOverlayPanel"
            className="fixed top-15 left-0 w-full h-auto max-h-[85vh] 
                       z-40 bg-white shadow-lg rounded-b-lg
                       overflow-y-auto p-6 z-50"
        >
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-black mb-4">
                    Suggestions
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SplitSearchProd[currentPage - 1] && SplitSearchProd[currentPage - 1].map((data, index) => (
                        <SuggestionCard key={index} prod={data} />
                    ))}
                </div>

                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="w-6 h-6 text-gray-400 hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Previous suggestions"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>

                    <div className="flex justify-center items-center gap-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => goToPage(index + 1)}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${currentPage === (index + 1) ? 'bg-blue-500' : 'bg-gray-400 hover:bg-gray-500'
                                    }`}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="w-6 h-6 text-gray-400 hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Next suggestions"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </div >
    );
}

export default SearchOverlay;