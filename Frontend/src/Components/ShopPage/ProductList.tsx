import { useEffect } from 'react';
import { type AppDispatch } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { selectCloneProduct, selectLoading, selectError, fetchAllShopData, 
         selectCateTrace, selectTypeTrace, selectStyleTrace, selectBrandTrace,
 } from '../../store/ShopSlice';
import ProductItem from './ProductItem';
import './Shop.css'

const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const products = useSelector(selectCloneProduct);
    const CTrace = useSelector(selectCateTrace);
    const TTrace = useSelector(selectTypeTrace);
    const STrace = useSelector(selectStyleTrace);
    const BTrace = useSelector(selectBrandTrace);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchAllShopData());
    }, [dispatch])

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error}</div>;
    // const { CloneProduct } = useShopContext();
    return (
        <>
            {/* main shop  */}
            <section className="flex justify-center mb-16">
                <div className="container relative mt-32 md:mt-40">
                    <div className="relative md:hidden pt-3 pl-3">
                        <span className="text-lg font-bold">{CTrace}{TTrace}{STrace}{BTrace}({products.length})</span>
                    </div>

                    <div
                        className="relative w-full min-h-0 mt-6 md:mt-10 grid grid-cols-2 lg:grid-cols-3 place-items-center gap-y-12 gap-x-4 xl:px-8">
                        {
                            products.map(prod => (
                                <ProductItem key= {prod.ProdID} product={prod} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductList