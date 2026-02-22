import NavBar from '../Components/Utility/Navbar'
import FavouriteProduct from '../Components/FavouritePage/FavouriteProduct'
import Footer from '../Components/Utility/Footer'
import { ProductProvider } from '../Components/Utility/ProductContext'

const Favourite = () => {
  return (
    <>
      <ProductProvider>
        <NavBar position="fixed" />
        <FavouriteProduct />
        <Footer />
      </ProductProvider>
    </>
  )
}

export default Favourite