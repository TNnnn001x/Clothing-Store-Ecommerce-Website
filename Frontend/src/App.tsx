import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Shop from './Pages/Shop'
import Favourite from './Pages/Favourite'
import ProductDetail from './Pages/ProductDetail'
import ResetScroll from './Components/Utility/ResetScroll'
import Register from './Pages/Register'
import SignUp from './Pages/SignUp'
import { Cart } from './Pages/Cart'
import CheckOutPage from './Components/CheckOutPage/CheckOutPage'
import Profile from './Pages/Profile'
import Delivery from './Pages/Delivery'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from './store'
import { useEffect } from 'react'
import axios from 'axios'
import { setAccount } from './store/NavbarSlice'

const useAuthCheck = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if(token){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get('http://localhost:3000/auth/status')
      .then(res => {
        const userData = res.data;

        dispatch(setAccount(userData));
      })
      .catch(err => {
        console.error("Token is expired: ", err);
        localStorage.removeItem('accessToken');
      })
    }
  }, [dispatch]);
}

function App() {
  useAuthCheck();

  return (
    <BrowserRouter>
      <ResetScroll />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Shop />} />
        <Route path="/Favourite" element={<Favourite />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
