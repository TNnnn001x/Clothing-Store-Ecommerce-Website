import NavBar from "../Components/Utility/Navbar";
import Footer from "../Components/Utility/Footer";
import CheckOutPage from "../Components/CheckOutPage/CheckOutPage";

export function Cart() {
    return (
        <>
            <NavBar position='fixed' />
            <CheckOutPage />
            <Footer />
        </>

    )
}