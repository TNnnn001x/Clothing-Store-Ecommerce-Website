import './Shop.css'
import NavBar from '../Utility/Navbar'
import FilterNavBar from './FilterNavBar'

const ShopNavBar = () => {
    return (
        <>
            <div className="fixed max-h-full w-full z-40">
                <NavBar position="relative" />
                <FilterNavBar />
            </div>
        </>
    )
}

export default ShopNavBar