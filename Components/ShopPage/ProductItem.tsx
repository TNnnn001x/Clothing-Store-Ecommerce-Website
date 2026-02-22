import { Link } from "react-router-dom";

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

interface productItem {
  product: productVar;
}

const ProductItem = ({ product }: productItem) => {
  return (
    <>

      <div className="product relative w-full h-64 md:h-[22rem] lg:h-96 xl:h-[30rem] 2xl:h-[36rem] xl:rounded-4xl">
        <Link to={`/ProductDetail/${product.ProdID}`}>
          <div className="w-full h-[79%] bg-gray-300 xl:rounded-t-4xl">
            <img className="w-full h-full object-cover xl:rounded-t-4xl" src={product.ProdPicture ? product.ProdPicture : "/no-image.png"}></img>
          </div>
          <div className="w-full h-[21%] flex flex-col pt-1 pl-2 md:pt-1 md:pl-4.5 lg:pt-2 xl:pt-3 xl:pl-4 gap-0.5 lg:gap-1 xl:gap-2">
            <span className="text-sm md:text-lg lg:text-xl font-bold truncate">{product.ProdName}</span>
            <span className="text-sm md:text-lg lg:text-xl">${product.Price}</span>
          </div>
        </Link>
      </div >
    </>
  )
}

export default ProductItem