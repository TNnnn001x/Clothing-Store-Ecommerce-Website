import Navbar from "../Components/Utility/Navbar.tsx";
import HeadBanner from "../Components/HomePage/HeadBanner.tsx";
import Introduce from "../Components/HomePage/Introduce.tsx";
import MiddleBanner from "../Components/HomePage/MiddleBanner.tsx";
import Category from "../Components/HomePage/Category.tsx";
import Footer from "../Components/Utility/Footer.tsx";

const Home = () => {
    return (
        <>
            <Navbar position="fixed" />
            <HeadBanner />
            <Introduce />
            <MiddleBanner />
            <Category />
            <Footer />
        </>
    )
}

export default Home