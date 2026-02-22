import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type AppDispatch } from '../../store';
import { fetchAllShopData, selectAllProducts } from '../../store/ShopSlice';
import { fetchAllNavbarData, selectCart, selectFav, selectFavDet, selectCartDet,
         setCartDet, setFavouriteDet, setRingingCart, setRingingFav,
} from '../../store/NavbarSlice';
import axios from 'axios';
import './ProductDetail.css'

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

const ShirtSize = [
    { id: 1, size: "S" },
    { id: 2, size: "M" },
    { id: 3, size: "L" },
    { id: 4, size: "XL" },
    { id: 5, size: "2XL" },
    { id: 6, size: "3XL" },
    { id: 7, size: "4XL" },
    { id: 8, size: "5XL" },
]

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const AllProducts = useSelector(selectAllProducts);
    const Cart = useSelector(selectCart);
    const Favourite = useSelector(selectFav);
    const FavouriteDet = useSelector(selectFavDet);
    const CartDet = useSelector(selectCartDet);

    const [Product, setProduct] = useState<productVar>();
    const [CheckFav, setCheckFav] = useState<boolean>();
    const [Buying, setBuying] = useState<boolean>(false);

    const [LockSize, setLockSize] = useState<string>();
    const [currSize, setcurrSize] = useState<number>(-1);
    const [Quan, setQuan] = useState<number>(1);

    useEffect(() => {
        dispatch(fetchAllShopData());
        dispatch(fetchAllNavbarData());
    }, [dispatch])

    useEffect(() => {
        if (!id) return;
        const prod = AllProducts.find(data => data.ProdID === parseInt(id))

        setCheckFav(FavouriteDet.some(d => d.ProdID === parseInt(id)))
        setProduct(prod);
    }, [AllProducts, id])

    const AddToCart = async () => {
        if (!LockSize) return alert("Please select your size");
        if (!id) return;

        try {
            const checkDuplicate = CartDet.find(d => (d.ProdID === parseInt(id) && d.Size === LockSize));

            if (checkDuplicate) {
                const getIdxCartArr = CartDet.findIndex(d => (d.ProdID === parseInt(id) && d.Size === LockSize))

                const res = await axios.put(`http://localhost:3000/cartdetail/${checkDuplicate.CartDetailID}`, {
                    "Carts": { "CartID": Cart?.CartID },
                    "Products": { "ProdID": parseInt(id) },
                    "Size": LockSize,
                    "Quantity": Quan + checkDuplicate.Quantity,
                })

                const data = [...CartDet];
                data[getIdxCartArr] = res.data;

                dispatch(setCartDet(data));
            }
            else {
                const res = await axios.post("http://localhost:3000/cartdetail/", {
                    "Carts": { "CartID": Cart?.CartID },
                    "Products": { "ProdID": parseInt(id) },
                    "Size": LockSize,
                    "Quantity": Quan,
                })

                const data = [...CartDet, res.data];

                dispatch(setCartDet(data));
            }

            setBuying(true);
            dispatch(setRingingCart(true));

            setTimeout(() => {
                dispatch(setRingingCart(false));
            }, 300)

            setTimeout(() => {
                setBuying(false);
            }, 1000)
        }
        catch (err) {
            console.error(err);
        }
    }

    const AddToFavourite = async () => {
        if (!id) return;
        const condCheck = !CheckFav;

        try {
            if (condCheck) {
                const res = await axios.post("http://localhost:3000/favouritedetail/", {
                    "Favourites": { "FavID": Favourite?.FavID },
                    "Products": { "ProdID": parseInt(id) },
                })

                const data = [...FavouriteDet, res.data];

                dispatch(setFavouriteDet(data));
            }
            else {
                const GetFav = FavouriteDet.find(d => d.ProdID === parseInt(id));

                await axios.delete(`http://localhost:3000/favouritedetail/${GetFav?.FavDetailID}`);

                const data = FavouriteDet.filter(d => d.FavDetailID !== GetFav?.FavDetailID);
                dispatch(setFavouriteDet(data));
            }
        }
        catch (err) {
            console.error(err);
        }

        dispatch(setRingingFav(true));

        setTimeout(() => {
            dispatch(setRingingFav(false));
        }, 300)

        setCheckFav(condCheck)
    }

    const SelectSizeBtn = (data: string, i: number) => {
        setLockSize(data);
        setcurrSize(i);
    }

    const QuanBtn = (n: number) => {
        const number = Quan + n;
        const checkNumber = (number === 0 ? 1 : number);

        if (checkNumber <= 9999) {
            setQuan(checkNumber);
        }
    }

    const ChangeQuan = (e: React.ChangeEvent<HTMLInputElement>) => {
        const CloneQuan = (parseInt(e.target.value) <= 0 ? 1 : parseInt(e.target.value));

        if (CloneQuan <= 9999) {
            setQuan(CloneQuan);
        }
    }

    return (
        <>
            <section className="flex justify-center">
                <div
                    className="container relative min-h-full w-full flex flex-col md:flex-row justify-center gap-4 lg:gap-8 xl:gap-14 mt-14 md:mt-24">
                    <div
                        className="relative h-[28rem] lg:h-[32rem] xl:h-[36rem] w-full md:w-[27rem] lg:w-[32rem] xl:w-[36rem] bg-gray-500">
                        <img src={Product?.ProdPicture ? Product.ProdPicture : "/no-image.png"}
                            className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="relative w-full md:w-[40%] flex flex-col gap-4 mt-2 px-4 md:px-0">
                        <span className="text-3xl lg:text-4xl font-bold">{Product?.ProdName}</span>
                        <span className="text-xl lg:text-2xl">${Product?.Price}</span>
                        <span className="text-sm lg:text-base text-gray-700">choose your size</span>
                        <div className="max-w-max md:w-96 grid grid-cols-4 gap-4">
                            {ShirtSize.map((data, idx) => (
                                <button key={data.id}
                                    className="group relative size_btn w-16 lg:w-20 h-8 lg:h-10 rounded-full flex justify-center items-center cursor-pointer"
                                    onClick={() => SelectSizeBtn(data.size, idx)}>
                                    <span className={`${currSize === idx ? "text-white" : "group-hover:text-white"} text-black z-10`}>{data.size}</span>
                                    <div className={`${currSize === idx ? "h-full w-full bg-black" : "h-0 w-0 transition-all duration-500 bg-black group-hover:h-full group-hover:w-full"} absolute rounded-full `}></div>
                                </button>
                            ))}
                        </div>

                        <div className='flex items-center mt-4'>
                            <span className='text-xl'>Quantity: </span>
                            <div className='flex items-center pl-4'>
                                <button
                                    className='absolute w-10 h-10 rounded-2xl bg-gray-700 hover:bg-red-600 shadow-2xl shadow-black'
                                    onClick={() => QuanBtn(-1)}>
                                    <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="#fff" d="M18 11H6a2 2 0 0 0 0 4h12a2 2 0 0 0 0-4"></path></svg>
                                </button>
                                <input type="number" min="1" value={Quan}
                                    className='ml-8 w-28 h-8 white text-center border-2'
                                    onChange={(e) => ChangeQuan(e)} />
                                <button
                                    className='absolute ml-32 w-10 h-10 rounded-2xl bg-gray-700 hover:bg-green-500 shadow-2xl shadow-black'
                                    onClick={() => QuanBtn(1)}>
                                    <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16"><path fill="#fff" d="M9 3a1 1 0 0 0-2 0v4H3a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0V9h4a1 1 0 0 0 0-2H9z"></path></svg>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4 mt-4 mb-6">
                            <button
                                className="cart-btn w-full h-12 rounded-full bg-black text-white hover:scale-105 flex justify-center items-center gap-1"
                                onClick={AddToCart}>
                                <span>{`${Buying ? "Confirm added" : "Add to cart"}`}</span>
                                <svg className={`${Buying ? "hidden" : ""} w-10 h-10 object-cover`} xmlns="http://www.w3.org/2000/svg" width={56} height={56} viewBox="0 0 56 56"><path fill="#fff" d="M45.416 28.73C51.155 28.73 56 23.926 56 18.166c0-5.802-4.783-10.564-10.584-10.564c-5.781 0-10.564 4.762-10.564 10.564S39.635 28.73 45.416 28.73m-28.51 13.287h24.268c.81 0 1.517-.665 1.517-1.56c0-.893-.707-1.559-1.517-1.559H17.26c-1.186 0-1.893-.832-2.1-2.1l-.333-2.183h26.388c2.163 0 3.577-.936 4.305-2.6l.166-.437c-7.694-.02-13.683-5.947-13.683-13.412q0-.936.125-1.872H12.165l-.395-2.64c-.25-1.602-.79-2.413-2.911-2.413h-7.32c-.832 0-1.539.728-1.539 1.56c0 .852.707 1.58 1.539 1.58h7.028l3.328 22.833c.436 2.953 1.996 4.804 5.011 4.804m28.53-16.989c-.727 0-1.372-.499-1.372-1.29v-4.304h-3.972a1.274 1.274 0 0 1-1.268-1.268c0-.707.561-1.29 1.268-1.29h3.972v-4.304c0-.79.645-1.268 1.373-1.268c.727 0 1.35.478 1.35 1.268v4.305h3.973c.707 0 1.29.582 1.29 1.289c0 .686-.583 1.268-1.29 1.268h-3.972v4.305c0 .79-.624 1.29-1.351 1.29M15.18 48.755a3.33 3.33 0 0 0 3.369 3.369a3.34 3.34 0 0 0 3.369-3.37a3.355 3.355 0 0 0-3.37-3.368a3.34 3.34 0 0 0-3.368 3.369m19.422 0c0 1.892 1.518 3.369 3.41 3.369a3.34 3.34 0 0 0 3.37-3.37a3.355 3.355 0 0 0-3.37-3.368c-1.892 0-3.41 1.497-3.41 3.369"></path></svg>
                                <svg className={`${Buying ? "" : "hidden"} w-10 h-10 object-cover`} xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48"><path fill="#fff" fillRule="evenodd" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m4 24l5-5l10 10L39 9l5 5l-25 25z" clipRule="evenodd"></path></svg>
                            </button>
                            <button
                                className={`fav-btn w-full h-12 rounded-full bg-black text-white hover:scale-105 flex justify-center items-center gap-1`}
                                onClick={AddToFavourite}>
                                <span>{`${CheckFav ? "Remove from Favourite" : "Add to Favourite"}`}</span>
                                <svg className={`${CheckFav ? "hidden" : ""} w-10 h-10 object-cover`} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="#fff" d="M17.73 16.5v-3h-3v-1h3v-3h1v3h3v1h-3v3zM11 19.654l-1.156-1.042q-2.28-2.087-3.799-3.593T3.632 12.34q-.896-1.173-1.264-2.146T2 8.225q0-1.908 1.296-3.201T6.5 3.731q1.32 0 2.475.672T11 6.363q.87-1.288 2.025-1.96q1.156-.672 2.475-.672q1.817 0 3.063 1.172q1.245 1.172 1.403 2.878q-.374-.137-.805-.215q-.43-.078-.913-.078q-2.294 0-3.906 1.6T12.731 13q0 1.03.38 1.991q.381.961 1.1 1.728q-.532.483-1.17 1.069t-1.283 1.181z"></path></svg>
                                <svg className={`${CheckFav ? "" : "hidden"} w-10 h-10 object-cover`} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="#fff" d="M21.81 10.89q.16.147.16.348t-.16.366l-3.32 3.313q-.217.224-.555.224t-.575-.224l-1.214-1.207Q16 13.563 16 13.362t.166-.346q.146-.16.347-.16t.347.16l1.065 1.046l3.19-3.171q.147-.16.348-.16t.347.16m-11.37 8.284l-.596-.563q-2.28-2.087-3.799-3.593T3.632 12.34q-.896-1.173-1.264-2.146T2 8.225q0-1.908 1.296-3.201T6.5 3.731q1.32 0 2.475.672T11 6.363q.87-1.288 2.025-1.96q1.156-.672 2.475-.672q1.817 0 3.063 1.172q1.245 1.172 1.403 2.878q-.424-.143-.878-.202t-.913-.06q-2.183 0-3.813 1.52t-1.631 3.942q0 .988.361 1.966q.362.978 1.12 1.772q-.533.483-1.17 1.069t-1.284 1.181l-.223.206q-.237.212-.547.212t-.547-.212"></path></svg>
                            </button>
                        </div>
                        <span className="text-xl font-bold underline">Product description</span>
                        <span className="text-base md:text-xl text-wrap">{Product?.ProdDetail}</span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Detail