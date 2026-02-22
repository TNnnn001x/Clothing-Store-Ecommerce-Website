import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { type RootState } from './index';

export interface ProductVar {
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

interface ShopState {
    productList: ProductVar[];
    ListCate: CategoryVar[];
    ListType: TypeVar[];
    ListStyle: StyleVar[];
    ListBrand: BrandVar[];
    ListFilterCate: FilterCateVar[];

    SelectedCate: CategoryVar | undefined;
    SelectedType: TypeVar | "all";
    SelectedStyle: StyleVar | "all";
    SelectedBrand: BrandVar | "all";

    CloneProduct: ProductVar[];
    CloneListType: TypeVar[];
    CloneListStyle: StyleVar[];
    CloneListBrand: BrandVar[];

    CateTrace: string | undefined;
    TypeTrace: string;
    StyleTrace: string;
    BrandTrace: string;
    loading: boolean;
    error: string | null;
}

const initialState: ShopState = {
    productList: [],
    ListCate: [],
    ListType: [],
    ListStyle: [],
    ListBrand: [],
    ListFilterCate: [],

    SelectedCate: undefined,
    SelectedType: "all",
    SelectedStyle: "all",
    SelectedBrand: "all",

    CloneProduct: [],
    CloneListType: [],
    CloneListStyle: [],
    CloneListBrand: [],

    CateTrace: "",
    TypeTrace: "",
    StyleTrace: "",
    BrandTrace: "",
    loading: false,
    error: null,
};

export const fetchAllShopData = createAsyncThunk('shop/fetchAllShopData', async (_, { rejectWithValue }) => {
    try {
        const [
            productRes,
            categoryRes,
            typeRes,
            styleRes,
            brandRes,
            filterCateRes,
        ] = await Promise.all([
            axios.get<ProductVar[]>("http://localhost:3000/product"),
            axios.get<CategoryVar[]>("http://localhost:3000/category"),
            axios.get<TypeVar[]>("http://localhost:3000/type"),
            axios.get<StyleVar[]>("http://localhost:3000/style"),
            axios.get<BrandVar[]>("http://localhost:3000/brand"),
            axios.get<FilterCateVar[]>("http://localhost:3000/filtercategory"),
        ]);

        return {
            productList: productRes.data,
            ListCate: categoryRes.data,
            ListType: typeRes.data,
            ListStyle: styleRes.data,
            ListBrand: brandRes.data,
            ListFilterCate: filterCateRes.data,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('เกิดข้อผิดพลาด');
    }
}
);

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setSelectedCate: (state, action: PayloadAction<CategoryVar | undefined>) => {
            state.SelectedCate = action.payload;
        },
        setSelectedType: (state, action: PayloadAction<TypeVar | "all">) => {
            state.SelectedType = action.payload;
        },
        setSelectedStyle: (state, action: PayloadAction<StyleVar | "all">) => {
            state.SelectedStyle = action.payload;
        },
        setSelectedBrand: (state, action: PayloadAction<BrandVar | "all">) => {
            state.SelectedBrand = action.payload;
        },
        setCateTrace: (state, action: PayloadAction<string>) => {
            state.CateTrace = action.payload;
        },
        setTypeTrace: (state, action: PayloadAction<string>) => {
            state.TypeTrace = action.payload;
        },
        setStyleTrace: (state, action: PayloadAction<string>) => {
            state.StyleTrace = action.payload;
        },
        setBrandTrace: (state, action: PayloadAction<string>) => {
            state.BrandTrace = action.payload;
        },

        updateFilteredData: (state) => {
            const selectedCateId = state.SelectedCate?.CateID;
            const selectedTypeId = state.SelectedType !== "all" ? state.SelectedType.TypeID : null;
            const selectedStyleId = state.SelectedStyle !== "all" ? state.SelectedStyle.StyleID : null;
            const selectedBrandId = state.SelectedBrand !== "all" ? state.SelectedBrand.BrandID : null;

            const FilterCate = state.ListFilterCate.filter(data => {
                const matchCate = selectedCateId === undefined || data.CateID === selectedCateId;
                const matchType = selectedTypeId === null || data.TypeID === selectedTypeId;
                const matchStyle = selectedStyleId === null || data.StyleID === selectedStyleId;
                const matchBrand = selectedBrandId === null || data.BrandID === selectedBrandId;

                return matchCate && matchType && matchStyle && matchBrand;
            });

            const FilterCateIDs = new Set(FilterCate.map(d => d.FilterCateID));

            state.CloneProduct = state.productList.filter(data =>
                FilterCateIDs.has(data.FilterCateID)
            );
        },

        updateTypeList: (state) => {
            state.SelectedType = "all";

            const typeId = [...new Set(state.ListFilterCate
                .filter(data => data.CateID === state.SelectedCate?.CateID)
                .map(d => d.TypeID)
            )];

            const filType = state.ListType.filter(t => typeId.includes(t.TypeID));
            state.CloneListType = filType;
        },

        updateStyleList: (state) => {
            state.SelectedStyle = "all";

            if (state.SelectedType === "all") {
                const styleId = [...new Set(
                    state.ListFilterCate
                        .filter(data =>
                            data.CateID === state.SelectedCate?.CateID
                        )
                        .map(d => d.StyleID)
                )];
                
                const filStyle = state.ListStyle.filter(s => styleId.includes(s.StyleID));
                state.CloneListStyle = filStyle;
            }
            else {
                const selectedType = state.SelectedType as TypeVar;

                const styleId = [...new Set(
                    state.ListFilterCate
                        .filter(data =>
                            data.CateID === state.SelectedCate?.CateID &&
                            data.TypeID === selectedType.TypeID
                        )
                        .map(d => d.StyleID)
                )];

                const filStyle = state.ListStyle.filter(s => styleId.includes(s.StyleID));
                state.CloneListStyle = filStyle;
            }
        },

        updateBrandList: (state) => {
            state.SelectedBrand = "all";

            if (state.SelectedType === "all") {
                if (state.SelectedStyle === "all") {
                    const brandId = [...new Set(
                        state.ListFilterCate
                            .filter(data =>
                                data.CateID === state.SelectedCate?.CateID
                            )
                            .map(d => d.BrandID)
                    )];

                    const filBrand = state.ListBrand.filter(b => brandId.includes(b.BrandID));

                    state.CloneListBrand = filBrand;
                }
                else {
                    const selectedStyle = state.SelectedStyle as StyleVar;

                    const brandId = [...new Set(
                        state.ListFilterCate
                            .filter(data =>
                                data.CateID === state.SelectedCate?.CateID &&
                                data.StyleID === selectedStyle.StyleID
                            )
                            .map(d => d.BrandID)
                    )];

                    const filBrand = state.ListBrand.filter(b => brandId.includes(b.BrandID));

                    state.CloneListBrand = filBrand;
                }
            }
            else {
                const selectedType = state.SelectedType as TypeVar;

                if (state.SelectedStyle === "all") {
                    const brandId = [...new Set(
                        state.ListFilterCate
                            .filter(data =>
                                data.CateID === state.SelectedCate?.CateID &&
                                data.TypeID === selectedType.TypeID
                            )
                            .map(d => d.BrandID)
                    )];

                    const filBrand = state.ListBrand.filter(b => brandId.includes(b.BrandID));

                    state.CloneListBrand = filBrand;
                }
                else {
                    const selectedType = state.SelectedType as TypeVar;
                    const selectedStyle = state.SelectedStyle as StyleVar;

                    const brandId = [...new Set(
                        state.ListFilterCate
                            .filter(data =>
                                data.CateID === state.SelectedCate?.CateID &&
                                data.TypeID === selectedType.TypeID &&
                                data.StyleID === selectedStyle.StyleID
                            )
                            .map(d => d.BrandID)
                    )];

                    const filBrand = state.ListBrand.filter(b => brandId.includes(b.BrandID));

                    state.CloneListBrand = filBrand;
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllShopData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllShopData.fulfilled, (state, action) => {
                state.loading = false;
                const { productList, ListCate, ListType, ListStyle, ListBrand, ListFilterCate } = action.payload;

                state.productList = productList;
                state.ListCate = ListCate;
                state.ListType = ListType;
                state.ListStyle = ListStyle;
                state.ListBrand = ListBrand;
                state.ListFilterCate = ListFilterCate;

                state.SelectedCate = ListCate.length > 0 ? ListCate[0] : undefined;

                state.SelectedType = "all";
                state.SelectedStyle = "all";
                state.SelectedBrand = "all";

                state.CateTrace = ListCate[0].CateName;

                if (state.productList.length > 0 && state.ListFilterCate.length > 0) {
                    shopSlice.caseReducers.updateFilteredData(state);
                } else {
                    state.CloneProduct = [];
                    state.CloneListType = [];
                    state.CloneListStyle = [];
                    state.CloneListBrand = [];
                }
            })
            .addCase(fetchAllShopData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setSelectedCate,
    setSelectedType,
    setSelectedStyle,
    setSelectedBrand,
    updateFilteredData,
    updateTypeList,
    updateStyleList,
    updateBrandList,
    setCateTrace,
    setTypeTrace,
    setStyleTrace,
    setBrandTrace,
} = shopSlice.actions;


export const selectShop = (state: RootState) => state.shop;
export const selectAllProducts = (state: RootState) => state.shop.productList;
export const selectCloneProduct = (state: RootState) => state.shop.CloneProduct;
export const selectListCate = (state: RootState) => state.shop.ListCate;
export const selectCloneListType = (state: RootState) => state.shop.CloneListType;
export const selectCloneListStyle = (state: RootState) => state.shop.CloneListStyle;
export const selectCloneListBrand = (state: RootState) => state.shop.CloneListBrand;
export const selectSelectedFilters = (state: RootState) => ({
    SelectedCate: state.shop.SelectedCate,
    SelectedType: state.shop.SelectedType,
    SelectedStyle: state.shop.SelectedStyle,
    SelectedBrand: state.shop.SelectedBrand,
});
export const selectCateTrace = (state: RootState) => state.shop.CateTrace;
export const selectTypeTrace = (state: RootState) => state.shop.TypeTrace;
export const selectStyleTrace = (state: RootState) => state.shop.StyleTrace;
export const selectBrandTrace = (state: RootState) => state.shop.BrandTrace;
export const selectLoading = (state: RootState) => state.shop.loading;
export const selectError = (state: RootState) => state.shop.error;

export default shopSlice.reducer;