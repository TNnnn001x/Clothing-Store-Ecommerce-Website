import Detail from "../Components/ProductDetailPage/Detail"
import Footer from "../Components/Utility/Footer"
import NavBar from "../Components/Utility/Navbar"
import ProductSlider from "../Components/Utility/ProductSlider"

const ProductDetail = () => {
  return (
    <>
      <NavBar position="fixed" />
      <Detail />
      <ProductSlider />
      <Footer />
    </>
  )
}

export default ProductDetail