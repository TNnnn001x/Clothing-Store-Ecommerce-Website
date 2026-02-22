import './signupstyle.css';
import { BlackLogo } from "../../assets/SignUp/MainPic";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AvatarUrl = [
  { id: 1, avatarPic: "https://res.cloudinary.com/doiuwkhai/image/upload/v1761915085/2_dnshoy.png" },
  { id: 2, avatarPic: "https://res.cloudinary.com/doiuwkhai/image/upload/v1761915085/5_bf1o09.png" },
  { id: 3, avatarPic: "https://res.cloudinary.com/doiuwkhai/image/upload/v1761915085/3_fmpqg9.png" },
  { id: 4, avatarPic: "https://res.cloudinary.com/doiuwkhai/image/upload/v1761915085/4_dpyurx.png" },
]

const SignUpContent = () => {

  const navigate = useNavigate();
  
  const [selectAvatar, setselectAvatar] = useState<string>(AvatarUrl[0].avatarPic);
  const [currIdxAvatar, setCurrIdxAvatar] = useState<number>(0);

  const [formData, setformData] = useState({
    name: '',
    Lname: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: '',
  })
  const [SignupStatus, setSignupStatus] = useState({
    success: false,
    error: false,
    message: '',
  })

  const ChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setformData(prev => ({
      ...prev,
      [name]: value,
    }))
  };

  const Submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const AddAcc = await axios.post("http://localhost:3000/account", {
        "Username": formData.username,
        "Password": formData.password,
        "Role": "customer",
        "AvatarPic": selectAvatar,
      })

      const getAccID = AddAcc.data.AccID;

      const AddCust = await axios.post("http://localhost:3000/customer", {
        "CustName": formData.name,
        "CustLname": formData.Lname,
        "CustEmail": formData.email,
        "CustPhone": formData.phone,
        "Accounts": { "AccID": parseInt(getAccID) },
      })

      const getCustID = AddCust.data.CustID;

      await axios.post("http://localhost:3000/receiver", {
        "RecName": formData.name,
        "RecLname": formData.Lname,
        "RecPhone": formData.phone,
        "RecAddr": formData.address,
        "Customers": { "CustID": parseInt(getCustID) },
        "Rec_DelStatus": 0,
      })

      await axios.post("http://localhost:3000/cart", {
        "Accounts": { "AccID": parseInt(getAccID) },
      })

      await axios.post("http://localhost:3000/favourite", {
        "Accounts": { "AccID": parseInt(getAccID) },
      })

      setSignupStatus({
        success: true,
        error: false,
        message: "Successfully sign up!!",
      })

      setformData({
        name: '',
        Lname: '',
        email: '',
        phone: '',
        address: '',
        username: '',
        password: '',
      })

      setTimeout(() => {
        navigate('/Register', { replace: true });
      }, 1000)
    }
    catch (err) {
      console.error(err);

      setSignupStatus({
        success: false,
        error: true,
        message: "Please check your form again",
      })
    }

    setTimeout(() => {
      setSignupStatus({
        success: false,
        error: false,
        message: "",
      })
    }, 1000)
  }

  const HandleAvatar = (i: number) => {
    setselectAvatar(AvatarUrl[i].avatarPic);
    setCurrIdxAvatar(i);
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gray-300 lg:flex-row">

      {/* Gradient Blobs (ทำงานเหมือนเดิม) */}
      <div className="color-blob-1"></div>
      <div className="color-blob-2"></div>

      {/* --- ส่วนที่ 1: รูปภาพ --- */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <img
          src={BlackLogo}
          className="h-auto w-56 lg:w-80" // ปรับขนาดโลโก้ให้เหมาะสม
          alt="TKMLABS logo"
        />
      </div>

      {/* --- ส่วนที่ 2: ฟอร์มใน Glassmorphism --- */}
      <div className="flex w-full items-center justify-center p-1 lg:w-1/2">

        {/* Glassmorphism Card */}
        <div className="glass-container z-10 w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">WELCOME TO TKMLABS STORE</h1>
          <form onSubmit={(e) => Submit(e)}>
            <div className="space-y-2">

              {/* แก้ไขโครงสร้าง: นำ Firstname/Lastname เข้าไปใน Grid ให้อยู่บรรทัดเดียวกัน */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium mb-1 text-gray-700">ชื่อจริง (Firstname)</label>
                  <input
                    type="text"
                    id="firstname"
                    name="name"
                    value={formData.name}
                    onChange={(e) => ChangeText(e)}
                    required
                    className="form-input w-full py-1.5 px-3 rounded-md bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Firstname" />
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium mb-1 text-gray-700">นามสกุล (Lastname)</label>
                  <input
                    type="text"
                    id="lastname"
                    name="Lname"
                    value={formData.Lname}
                    onChange={(e) => ChangeText(e)}
                    required
                    className="form-input w-full py-1.5 px-3 rounded-md bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Lastname" />
                </div>
              </div>

              {/* เผื่ออยากใช้แบบนี้ */}
              {/* <div>
              <label htmlFor="firstname" className="block text-sm font-medium mb-1 text-gray-700">ชื่อจริง (Firstname)</label>
              <input
              type="text"
              id="firstname"
              className="form-input w-full py-1.5 px-3 rounded-md bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Firstname" />
              </div>

              <div>
              <label htmlFor="lastname" className="block text-sm font-medium mb-1 text-gray-700">นามสกุล (Lastname)</label>
              <input
              type="text"
              id="lastname"
              className="form-input w-full py-1.5 px-3 rounded-md bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Lastname" />
              </div> */}

              {/* นอก Grid เพื่อแยกบรรทัด */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">อีเมล (Email)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => ChangeText(e)}
                  required
                  className="form-input w-full py-1.5 px-3 rounded-md bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Mail" />
              </div>
              <div>
                <label htmlFor="phonenumber" className="block text-sm font-medium mb-1 text-gray-700">เบอร์โทรศัพท์ (Phone Number)</label>
                <input
                  type="tel"
                  id="phonenumber"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => ChangeText(e)}
                  required
                  className="form-input w-full py-1.5 px-3 rounded-md bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Phone Number" />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1 text-gray-700">ที่อยู่ (Address)</label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => { ChangeText(e) }}
                  required
                  className="form-input resize-none w-full py-1.5 px-3 rounded-md bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Address" />
              </div>

              {/* ภายใน Grid */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1 text-gray-700">ชื่อบัญชีผู้ใช้ (Username)</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={(e) => ChangeText(e)}
                    required
                    className="form-input w-full py-1.5 px-3 rounded-md bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Username" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">รหัสผ่าน (Password)</label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => ChangeText(e)}
                    required
                    className="form-input w-full py-1.5 px-3 rounded-md bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Password" />
                </div>
              </div>
            </div>

            <div className='w-full h-16 flex justify-start items-center mt-4 gap-8'>
              <h2 className='font-medium text-gray-700'>เลือกรูปโปรไฟล์: </h2>
              {AvatarUrl.map((data, index) => (
                <div key={index} 
                  className='relative w-14 h-14 rounded-full cursor-pointer hover:scale-110 hover:shadow-md hover:shadow-black'
                  onClick={() => HandleAvatar(index)}>
                  <div className={`${currIdxAvatar === index? "block" : "hidden"} absolute w-5 h-5 translate-[-15%] rounded-full bg-lime-500`}>
                    <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48"><path fill="#fff" fillRule="evenodd" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m4 24l5-5l10 10L39 9l5 5l-25 25z" clipRule="evenodd"></path></svg>
                  </div>
                  <img src={data.avatarPic} className='w-full h-full object-cover rounded-full' />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 mt-4 shadow-lg hover:shadow-xl">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {SignupStatus.success && (
        <div className="w-screen h-screen bg-black/40 z-50 fixed top-0 left-0 flex justify-center items-center">
          <div className='w-96 h-96 bg-gray-200 shadow-2xl p-6 flex flex-col justify-center items-center rounded-4xl'>
            <div className='flex flex-col justify-center items-center gap-10'>
              <svg className="w-24 h-24"
                xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48">
                <path fill="#1ae318" fillRule="evenodd" stroke="#1ae318" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m4 24l5-5l10 10L39 9l5 5l-25 25z" clipRule="evenodd"></path>
              </svg>
              <p className='text-2xl text-center'>{SignupStatus.message}</p>
            </div>
          </div>
        </div>
      )}

      {SignupStatus.error && (
        <div className="w-screen h-screen bg-black/40 z-50 fixed top-0 left-0 flex justify-center items-center">
          <div className='w-96 h-96 bg-gray-200 shadow-2xl p-6 flex flex-col justify-center items-center rounded-4xl'>
            <div className='w-full h-full flex flex-col justify-center items-center gap-10'>
              <svg className="w-24 h-24"
                xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48"><path fill="#d21111" fillRule="evenodd" stroke="#d21111" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m6 11l5-5l13 13L37 6l5 5l-13 13l13 13l-5 5l-13-13l-13 13l-5-5l13-13z" clipRule="evenodd"></path></svg>
              <h2 className='text-2xl text-center'>{SignupStatus.message}</h2>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}

export default SignUpContent;
