import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

interface AccountType {
    AccID: number;
    Username: string;
}

interface FavouriteType {
    FavID: number;
    AccID: number;
}

interface FavouriteDetailType {
    FavDetailID: number;
    FavID: number;
    ProdID: number;
}

interface CartType {
    CartID: number;
    AccID: number;
}

interface CartDetailType {
    CartDetailID: number;
    CartID: number;
    ProdID: number;
    Size: string;
    Quantity: number;
}

interface CartProps {
    Account: AccountType | undefined;
    Favourite: FavouriteType | undefined;
    FavouriteDet: FavouriteDetailType[];
    Cart: CartType | undefined;
    CartDet: CartDetailType[];
    setAccount: React.Dispatch<React.SetStateAction<AccountType>>;
    setFavouriteDet: React.Dispatch<React.SetStateAction<FavouriteDetailType[]>>;
    setCartDet: React.Dispatch<React.SetStateAction<CartDetailType[]>>;
    RingingCart: boolean;
    RingingFav: boolean;
    setRingingCart: React.Dispatch<React.SetStateAction<boolean>>;
    setRingingFav: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestAcc = { AccID: 1, Username: "hello" }


const NavbarContext = createContext<CartProps | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [Cart, setCart] = useState<CartType>();

    const [CartDet, setCartDet] = useState<CartDetailType[]>([]);

    const [Favourite, setFavourite] = useState<FavouriteType>();

    const [FavouriteDet, setFavouriteDet] = useState<FavouriteDetailType[]>([]);

    const [Account, setAccount] = useState<AccountType>(TestAcc);

    const [RingingCart, setRingingCart] = useState<boolean>(false);
    const [RingingFav, setRingingFav] = useState<boolean>(false);

    useEffect(() => {
        if(!Account) return;
        axios.get<CartType[]>("http://localhost:3000/cart")
            .then(res => setCart(res.data.find(d => d.AccID === Account.AccID)))
            .catch(err => console.error(err))

        axios.get<FavouriteType[]>("http://localhost:3000/favourite")
            .then(res => setFavourite(res.data.find(d => d.AccID === Account.AccID)))
            .catch(err => console.error(err))

    }, [])

    useEffect(() => {
        if (!Cart) return;
        axios.get<CartDetailType[]>("http://localhost:3000/cartdetail")
            .then(res => setCartDet(res.data.filter(d => d.CartID === Cart.CartID)))
            .catch(err => console.error(err))
    }, [Cart])

    useEffect(() => {
        if (!Favourite) return;
        axios.get<FavouriteDetailType[]>("http://localhost:3000/favouritedetail")
            .then(res => setFavouriteDet(res.data.filter(d => d.FavID === Favourite.FavID)))
            .catch(err => console.error(err))
    }, [Favourite])

    return (
        <NavbarContext.Provider value={{
            Account,
            Favourite,
            FavouriteDet,
            Cart,
            CartDet,
            setAccount,
            setFavouriteDet,
            setCartDet,
            RingingCart,
            RingingFav,
            setRingingCart,
            setRingingFav,
        }}>
            {children}
        </NavbarContext.Provider>
    )
}

export const useNavbarContext = () => {
    const NavbarCtx = useContext(NavbarContext);
    if (!NavbarCtx) throw new Error("useNavbarContext ไม่ได้อยู่ในกรอบ NavbarProvider");
    return NavbarCtx;
}