import NavBar from "../Components/Utility/Navbar";
import Footer from "../Components/Utility/Footer";
import CartPage from "../Components/CartPage/CartPage";

export function Cart() {
    return (
        <>
            <NavBar position='fixed' />
            <CartPage />
            <Footer />
        </>

    )
}