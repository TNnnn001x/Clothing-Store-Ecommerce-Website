// RegisterContent.tsx
import './regstyle.css';
import { BlackLogo } from "../../assets/SignUp/MainPic";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../store';
import { setAccount } from '../../store/NavbarSlice';
import { useLocation, useNavigate } from 'react-router-dom';

interface AccountType {
  AccID: number;
  Username: string;
  Role: string;
  AvatarPic: string;
}

interface LoginResponse {
    access_token: string;
    user: AccountType; 
}

const RegisterContent = () => { 
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const fromPath = location.state?.from || '/';

  const [accountName, setAccountName] = useState<string>('');
  const [Password, setPassword] = useState<string>('');

  const [LoginStatus, setLoginStatus] = useState({
    success: false,
    error: false,
    message: '',
  });

  const HandleSubmit = async () => {
    try {
      const response = await axios.post<LoginResponse>("http://localhost:3000/auth/login", {
        username: accountName,
        password: Password,
      });

      const { access_token, user } = response.data;
      
      localStorage.setItem('accessToken', access_token);

      const CheckAccount = user;

      setLoginStatus({
        success: true,
        error: false,
        message: "Successful Login!",
      });

      dispatch(setAccount(CheckAccount));
      navigate(fromPath, {replace: true});

    } catch (error) {
      let errorMessage = "Incorrect Username or Password";
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        errorMessage = error.response.data.message || errorMessage;
      }

      setLoginStatus({
        success: false,
        error: true,
        message: errorMessage,
      });
    }

    setTimeout(() => {
      setLoginStatus({ success: false, error: false, message: "" });
    }, 1000);
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-300 p-4">
        <div className="glass-container p-8 rounded-lg shadow-xl text-black w-full max-w-md">
          <h1 className="text-xl font-mono mb-6 text-center">LOGIN TO TKMLABS STORE</h1>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-1 text-black">ชื่อผู้ใช้ (Username)</label>
            <input
              type="text"
              id="username"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-black">รหัสผ่าน (Password)</label>
            <input
              type="password"
              id="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
            />
          </div>
          <button
            className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            onClick={() => HandleSubmit()}>
            Log in
          </button>
          <div className="mt-4 mb-6">
            <label className="block text-center text-sm font-medium mx-auto w-full mb-1">
              หากยังไม่มี Username และ Password กรุณา <Link to="/SignUp" className="text-blue-600 text-decoration-line: underline">Sign up</Link>
            </label>
          </div>
          <div className="flex items-center justify-center w-full mx-auto mb-2">
            <img src={BlackLogo} className="w-12 h-12 mr-2" alt="TKMLABS logo" />
            <label className="block text-sm font-medium">
              © DEVELOPED BY TKMLABS
            </label>
          </div>
        </div>
      </div>

      {LoginStatus.success && (
        <div className="w-screen h-screen bg-black/40 z-50 fixed top-0 left-0 flex justify-center items-center">
          <div className='w-96 h-96 bg-gray-200 shadow-2xl p-6 flex flex-col justify-center items-center rounded-4xl'>
            <div className='flex flex-col justify-center items-center gap-10'>
              <svg className="w-24 h-24"
                xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48">
                <path fill="#1ae318" fillRule="evenodd" stroke="#1ae318" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m4 24l5-5l10 10L39 9l5 5l-25 25z" clipRule="evenodd"></path>
              </svg>
              <p className='text-2xl text-center'>{LoginStatus.message}</p>
            </div>
          </div>
        </div>
      )}

      {LoginStatus.error && (
        <div className="w-screen h-screen bg-black/40 z-50 fixed top-0 left-0 flex justify-center items-center">
          <div className='w-96 h-96 bg-gray-200 shadow-2xl p-6 flex flex-col justify-center items-center rounded-4xl'>
            <div className='w-full h-full flex flex-col justify-center items-center gap-10'>
              <svg className="w-24 h-24"
                xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48"><path fill="#d21111" fillRule="evenodd" stroke="#d21111" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m6 11l5-5l13 13L37 6l5 5l-13 13l13 13l-5 5l-13-13l-13 13l-5-5l13-13z" clipRule="evenodd"></path></svg>
              <h2 className='text-2xl text-center'>{LoginStatus.message}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterContent;