import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

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

interface Allproduct {
    AllProducts: productVar[];
}

const ProductContext = createContext<Allproduct | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode}) => {
    const [AllProducts, setAllProducts] = useState<productVar[]>([]);

    useEffect(() => {
        axios.get<productVar[]>("http://localhost:3000/product")
            .then(res => setAllProducts(res.data))
            .catch(err => console.error(err))
    }, [])

    return(
        <ProductContext.Provider value={{AllProducts}}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => {
    const prodDetCtx = useContext(ProductContext);
    if(!prodDetCtx) throw new Error("useProductDetailContext ไม่ได้อยู่ในกรอบ ProductDetailProvider");
    return prodDetCtx
}