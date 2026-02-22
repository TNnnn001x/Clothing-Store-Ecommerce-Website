import { FaceBook, Instagram, Youtube, BlackLogoName } from '../../assets/Home/UtilityAssets'
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return (
        <>
            {/* Footer */}
            <section>
                <footer className="container min-w-full bg-gray-300 pt-10">
                    <hr className="pt-8" />
                    <div className="flex flex-col lg:flex-row lg:justify-center pl-4 gap-8 lg:gap-36">
                        <ul className="absolute lg:relative right-0 lg:left-0 flex lg:block flex-col pr-8 lg:pr-0">
                            <h1 className="font-bold text-lg">Follow Us</h1>
                            <div className="flex flex-col items-center">
                                <li className="w-8 h-8 mt-4">
                                    {/* ใช้ 'to' แทน 'href' */}
                                    <Link
                                        to="https://www.facebook.com/share/17R9revvc4/?mibextid=wwXIfr"
                                        aria-label="Facebook"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src={FaceBook} alt="Facebook" />
                                    </Link>
                                </li>
                                <li className="w-8 h-8 mt-4">
                                    <Link
                                        to="https://www.instagram.com/mos_tanap?igsh=MXAybzB2aDNsbnBpdQ=="
                                        aria-label="Instagram"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src={Instagram} alt="Instagram" />
                                    </Link>
                                </li>
                                <li className="w-8 h-8 mt-5">
                                    <a href="#" aria-label="YouTube">
                                        <img src={Youtube} alt="Youtube" />
                                    </a>
                                </li>
                            </div>
                        </ul>
                        <ul className="footer_hover">
                            <h1 className="font-bold text-lg">Section</h1>
                            <li className="mt-3 max-w-max">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="mt-3 max-w-max">
                                <Link to="/">New Arrivals</Link>
                                </li>
                            <li className="mt-3 max-w-max">
                                <Link to="/product">Trends</Link>
                                </li>
                        </ul>
                        <ul className="footer_hover">
                            <h1 className="font-bold text-lg">Account</h1>
                            <li className="mt-3 max-w-max">
                                <Link to="/SignUp">Sign up</Link>
                                </li>
                            <li className="mt-3 max-w-max">
                                <Link to="/Register">Sign in</Link>
                                </li>
                            <li className="mt-3 max-w-max">
                                <Link to="/Profile">Account</Link>
                                </li>
                        </ul>
                        <ul>
                            <h1 className="font-bold text-lg">Contact</h1>
                            <li className="mt-3">Phone: +66 12 345 6789</li>
                            <li className="mt-3">Mail: tkmlabs@email.com</li>
                        </ul>
                    </div>
                    <div className="relative flex justify-end mr-4">
                        <img src={BlackLogoName} alt="Logo" className="relative w-[60px] h-[60px]" />
                    </div>
                    <hr />
                    <p className="text-sm font-semibold pl-2 xl:pl-4">COPYRIGHT © BY TKM</p>
                </footer>

            </section>
        </>
    )
}

export default Footer