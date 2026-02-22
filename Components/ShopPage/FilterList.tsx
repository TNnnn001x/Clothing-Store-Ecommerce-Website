import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../../store';
import {
    selectListCate, selectCloneListType, selectCloneListStyle, selectCloneListBrand, selectSelectedFilters,
    setSelectedCate, setSelectedType, setSelectedStyle, setSelectedBrand,
    fetchAllShopData, updateFilteredData, updateTypeList, updateStyleList, updateBrandList,
    setCateTrace, setTypeTrace, setStyleTrace, setBrandTrace
} from '../../store/ShopSlice';
import './Shop.css'

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

const FilterList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const listCate = useSelector(selectListCate);
    const listType = useSelector(selectCloneListType);
    const listStyle = useSelector(selectCloneListStyle);
    const listBrand = useSelector(selectCloneListBrand);
    const { SelectedCate, SelectedType, SelectedStyle, SelectedBrand } = useSelector(selectSelectedFilters);

    const [cateCheckIdx, setcateCheckIdx] = useState(0);
    const [typeCheckIdx, settypeCheckIdx] = useState(-1);
    const [styleCheckIdx, setstyleCheckIdx] = useState(-1);
    const [brandCheckIdx, setbrandCheckIdx] = useState(-1);

    useEffect(() => {
        dispatch(fetchAllShopData());
    }, [dispatch])

    useEffect(() => {
        dispatch(updateFilteredData());

        const CateName = listCate[cateCheckIdx]?.CateName;
        const TypeName = typeCheckIdx === -1 ? "" : `/${listType[typeCheckIdx]?.TypeName}`;
        const StyleName = styleCheckIdx === -1 ? "" : `/${listStyle[styleCheckIdx]?.StyleName}`;
        const BrandName = brandCheckIdx === -1 ? "" : `/${listBrand[brandCheckIdx]?.BrandName}`;

        dispatch(setCateTrace(CateName));
        dispatch(setTypeTrace(TypeName));
        dispatch(setStyleTrace(StyleName));
        dispatch(setBrandTrace(BrandName));
    }, [SelectedCate, SelectedType, SelectedStyle, SelectedBrand, dispatch])

    useEffect(() => {
        settypeCheckIdx(-1);
        setstyleCheckIdx(-1);
        setbrandCheckIdx(-1);
        dispatch(updateTypeList());
    }, [SelectedCate])

    useEffect(() => {
        setstyleCheckIdx(-1);
        setbrandCheckIdx(-1);
        dispatch(updateStyleList());
    }, [SelectedType, listType])

    useEffect(() => {
        setbrandCheckIdx(-1);
        dispatch(updateBrandList())
    }, [SelectedStyle, listStyle])

    const handleCateCheckbox = (data: CategoryVar, i: number) => {
        dispatch(setSelectedCate(data));
        setcateCheckIdx(i);
    }

    const handleTypeCheckbox = (data: TypeVar | "all", i: number) => {
        dispatch(setSelectedType(data));
        settypeCheckIdx(i);
    }

    const handleStyleCheckbox = (data: StyleVar | "all", i: number) => {
        dispatch(setSelectedStyle(data));
        setstyleCheckIdx(i);
    }

    const handleBrandCheckbox = (data: BrandVar | "all", i: number) => {
        dispatch(setSelectedBrand(data));
        setbrandCheckIdx(i);
    }

    return (
        <>
            <div
                className="w-full max-h-max flex flex-col md:flex-row divide-x-0 divide-y-2 md:divide-x-2 md:divide-y-0 text-lg ml-2 lg:ml-6 xl:ml-8 mt-4">
                <div className="w-96 max-h-full md:w-48 md:h-72">
                    <div className="md:text-center">
                        <span className="text-xl md:text-2xl font-medium">Category</span>
                    </div>
                    <ul className="grid grid-cols-3 md:block gap-y-1 mt-1 md:mt-2 pl-2 pr-2 lg:pl-4 lg:pr-0">
                        {
                            listCate.map((c, idx) => (
                                <li key={c.CateID}>
                                    <input type="checkbox"
                                        checked={cateCheckIdx === idx}
                                        onChange={() => handleCateCheckbox(c, idx)} />
                                    <span className="ml-1.5">{c.CateName}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="w-96 max-h-full md:w-48 md:h-72">
                    <div className="md:text-center">
                        <span className="text-xl md:text-2xl font-medium">Type</span>
                    </div>
                    <ul className="grid grid-cols-3 md:block gap-y-1 mt-1 md:mt-2 pl-2 pr-2 lg:pl-4 lg:pr-0">
                        <li>
                            <input type="checkbox"
                                checked={typeCheckIdx === -1}
                                onChange={() => handleTypeCheckbox("all", -1)} />
                            <span className="ml-1.5">All</span>
                        </li>
                        {
                            listType.map((t, idx) => (
                                <li key={t.TypeID}>
                                    <input type="checkbox"
                                        checked={typeCheckIdx === idx}
                                        onChange={() => handleTypeCheckbox(t, idx)} />
                                    <span className="ml-1.5">{t.TypeName}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="w-96 max-h-full md:w-48 md:h-72">
                    <div className="md:text-center">
                        <span className="text-xl md:text-2xl font-medium">Style</span>
                    </div>
                    <ul className="grid grid-cols-3 md:block gap-y-1 mt-1 md:mt-2 pl-2 pr-2 lg:pl-4 lg:pr-0">
                        <li>
                            <input type="checkbox"
                                checked={styleCheckIdx === -1}
                                onChange={() => handleStyleCheckbox("all", -1)} />
                            <span className="ml-1.5">All</span>
                        </li>
                        {
                            listStyle.map((s, idx) => (
                                <li key={s.StyleID}>
                                    <input type="checkbox"
                                        checked={styleCheckIdx === idx}
                                        onChange={() => handleStyleCheckbox(s, idx)} />
                                    <span className="ml-1.5">{s.StyleName}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="w-96 max-h-full md:w-48 md:h-72">
                    <div className="md:text-center">
                        <span className="text-xl md:text-2xl font-medium">Brand</span>
                    </div>
                    <ul className="grid grid-cols-3 md:block gap-y-1 mt-1 md:mt-2 pl-2 pr-2 lg:pl-4 lg:pr-0">
                        <li>
                            <input type="checkbox"
                                checked={brandCheckIdx === -1}
                                onChange={() => handleBrandCheckbox("all", -1)} />
                            <span className="ml-1.5">All</span>
                        </li>
                        {
                            listBrand.map((b, idx) => (
                                <li key={b.BrandID}>
                                    <input type="checkbox"
                                        checked={brandCheckIdx === idx}
                                        onChange={() => handleBrandCheckbox(b, idx)} />
                                    <span className="ml-1.5">{b.BrandName}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default FilterList