import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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

interface CategoryVar {
    CateID: number;
    CateName: string;
}

interface TypeVar {
    TypeID: number;
    TypeName: string;
}

interface StyleVar {
    StyleID: number;
    StyleName: string;
}

interface BrandVar {
    BrandID: number;
    BrandName: string;
}

interface FilterCateVar {
    FilterCateID: number;
    CateID: number;
    TypeID: number;
    StyleID: number;
    BrandID: number;
}

interface ShopContextType {
    CloneProduct: productVar[];
    ListCate: CategoryVar[];
    CloneListType: TypeVar[];
    CloneListStyle: StyleVar[];
    CloneListBrand: BrandVar[];
    SelectedCate: CategoryVar | undefined;
    SelectedType: TypeVar | "all";
    SelectedStyle: StyleVar | "all";
    setSelectedCate: React.Dispatch<React.SetStateAction<CategoryVar | undefined>>;
    setSelectedType: React.Dispatch<React.SetStateAction<TypeVar | "all">>;
    setSelectedStyle: React.Dispatch<React.SetStateAction<StyleVar | "all">>;
    setSelectedBrand: React.Dispatch<React.SetStateAction<BrandVar | "all">>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
    const [productList, setproductList] = useState<productVar[]>([]);
    const [CloneProduct, setCloneProduct] = useState<productVar[]>([]);

    const [ListCate, setListCate] = useState<CategoryVar[]>([]);

    const [ListType, setListType] = useState<TypeVar[]>([]);
    const [CloneListType, setCloneListType] = useState<TypeVar[]>([]);

    const [ListStyle, setListStyle] = useState<StyleVar[]>([]);
    const [CloneListStyle, setCloneListStyle] = useState<StyleVar[]>([]);

    const [ListBrand, setListBrand] = useState<BrandVar[]>([]);
    const [CloneListBrand, setCloneListBrand] = useState<BrandVar[]>([]);

    const [ListFilterCate, setListFilterCate] = useState<FilterCateVar[]>([]);

    const [SelectedCate, setSelectedCate] = useState<CategoryVar>();
    const [SelectedType, setSelectedType] = useState<TypeVar | "all">("all");
    const [SelectedStyle, setSelectedStyle] = useState<StyleVar | "all">("all");
    const [SelectedBrand, setSelectedBrand] = useState<BrandVar | "all">("all");

    useEffect(() => {
        axios.get<productVar[]>("http://localhost:3000/product")
            .then((res) => {setproductList(res.data)
                    setCloneProduct(res.data);
            })
            .catch((err) => console.error(err))

        axios.get<CategoryVar[]>("http://localhost:3000/category")
            .then((res) => {setListCate(res.data)
                setSelectedCate(res.data[0])
            })
            .catch((err) => console.error(err))

        axios.get<TypeVar[]>("http://localhost:3000/type")
            .then((res) => {setListType(res.data)
                setSelectedType(res.data[0])
            })
            .catch((err) => console.error(err))

        axios.get<StyleVar[]>("http://localhost:3000/style")
            .then((res) => {setListStyle(res.data)
                setSelectedStyle(res.data[0])
            })
            .catch((err) => console.error(err))

        axios.get<BrandVar[]>("http://localhost:3000/brand")
            .then((res) => setListBrand(res.data))
            .catch((err) => console.error(err))

        axios.get<FilterCateVar[]>("http://localhost:3000/filtercategory")
            .then((res) => setListFilterCate(res.data))
            .catch((err) => console.error(err))
    }, [])

    useEffect(() => {

        let FilterCate: FilterCateVar[] = [];

        FilterCate = ListFilterCate.filter(data => {
            const matchCate = data.CateID === SelectedCate?.CateID;
            const matchType = SelectedType === "all" || data.TypeID === SelectedType.TypeID;
            const matchStyle = SelectedStyle === "all" || data.StyleID === SelectedStyle.StyleID;
            const matchBrand = SelectedBrand === "all" || data.BrandID === SelectedBrand.BrandID;

            return matchCate && matchType && matchStyle && matchBrand;
        });

        const FilterCateIDs = new Set(FilterCate.map(d => d.FilterCateID));
        const FilterProduct = productList.filter(data => FilterCateIDs.has(data.FilterCateID));

        setCloneProduct(FilterProduct);

    }, [SelectedCate, SelectedType, SelectedStyle, SelectedBrand])

    useEffect(() => {
        setSelectedType("all");

        const typeId = [...new Set(ListFilterCate
            .filter(data => data.CateID === SelectedCate?.CateID)
            .map(d => d.TypeID)
        )];

        const filType = ListType.filter(t => typeId.includes(t.TypeID));

        setCloneListType(filType);
    }, [SelectedCate])

    useEffect(() => {
        setSelectedStyle("all");

        if (SelectedType === "all") {
            const styleId = [...new Set(
                ListFilterCate
                    .filter(data =>
                        data.CateID === SelectedCate?.CateID
                    )
                    .map(d => d.StyleID)
            )];
            const filStyle = ListStyle.filter(s => styleId.includes(s.StyleID));

            setCloneListStyle(filStyle);
        }
        else {
            const styleId = [...new Set(
                ListFilterCate
                    .filter(data =>
                        data.CateID === SelectedCate?.CateID &&
                        data.TypeID === SelectedType?.TypeID
                    )
                    .map(d => d.StyleID)
            )];
            const filStyle = ListStyle.filter(s => styleId.includes(s.StyleID));

            setCloneListStyle(filStyle);
        }
    }, [SelectedType, CloneListType])


    useEffect(() => {
        setSelectedBrand("all");

        if (SelectedType === "all") {
            if (SelectedStyle === "all") {
                const brandId = [...new Set(
                    ListFilterCate
                        .filter(data =>
                            data.CateID === SelectedCate?.CateID
                        )
                        .map(d => d.BrandID)
                )];

                const filBrand = ListBrand.filter(b => brandId.includes(b.BrandID));

                setCloneListBrand(filBrand);
            }
            else {
                const brandId = [...new Set(
                    ListFilterCate
                        .filter(data =>
                            data.CateID === SelectedCate?.CateID &&
                            data.StyleID === SelectedStyle?.StyleID
                        )
                        .map(d => d.BrandID)
                )];

                const filBrand = ListBrand.filter(b => brandId.includes(b.BrandID));

                setCloneListBrand(filBrand);
            }
        }
        else {
            if (SelectedStyle === "all") {
                const brandId = [...new Set(
                    ListFilterCate
                        .filter(data =>
                            data.CateID === SelectedCate?.CateID &&
                            data.TypeID === SelectedType?.TypeID
                        )
                        .map(d => d.BrandID)
                )];

                const filBrand = ListBrand.filter(b => brandId.includes(b.BrandID));

                setCloneListBrand(filBrand);
            }
            else {
                const brandId = [...new Set(
                    ListFilterCate
                        .filter(data =>
                            data.CateID === SelectedCate?.CateID &&
                            data.TypeID === SelectedType?.TypeID &&
                            data.StyleID === SelectedStyle?.StyleID
                        )
                        .map(d => d.BrandID)
                )];

                const filBrand = ListBrand.filter(b => brandId.includes(b.BrandID));

                setCloneListBrand(filBrand);
            }
        }
    }, [SelectedStyle, CloneListStyle]);

    return (
        <ShopContext.Provider value={{
            CloneProduct,
            ListCate,
            CloneListType,
            CloneListStyle,
            CloneListBrand,
            SelectedCate,
            SelectedType,
            SelectedStyle,
            setSelectedCate,
            setSelectedType,
            setSelectedStyle,
            setSelectedBrand,
        }}>
            {children}
        </ShopContext.Provider>
    )
}

export const useShopContext = () => {
    const shopCtx = useContext(ShopContext);
    if (!shopCtx) throw new Error("useShopContext ไม่ได้อยู่ในกรอบ ShopProvider");
    return shopCtx;
} 
