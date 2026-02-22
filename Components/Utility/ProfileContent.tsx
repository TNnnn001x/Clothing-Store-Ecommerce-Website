// src/Components/Utility/DeliveryContent.tsx
// (เวอร์ชันเปลี่ยน "ที่อยู่" เป็น textarea 3 บรรทัด)

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type AppDispatch, type RootState } from '../../store';
import { selectAccount, setAccount } from '../../store/NavbarSlice';
import { fetchCustomer, fetchReceiver } from '../../store/checkOutSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AvatarUrl = [
    { id: 1, avatarPic: "https://res.cloudinary.com/doiuwkhai/image/upload/v1761915085/2_dnshoy.png" },
    { id: 2, avatarPic: "https://res.cloudinary.com/doiuwkhai/image/upload/v1761915085/5_bf1o09.png" },
    { id: 3, avatarPic: "https://res.cloudinary.com/doiuwkhai/image/upload/v1761915085/3_fmpqg9.png" },
    { id: 4, avatarPic: "https://res.cloudinary.com/doiuwkhai/image/upload/v1761915085/4_dpyurx.png" },
]

const ProfileDataField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <label style={{
            fontSize: '0.85rem',
            color: '#888',
            textTransform: 'uppercase',
            marginBottom: '4px',
            display: 'block',
        }}>
            {label}
        </label>
        <input
            type="text"
            value={value}
            readOnly
            style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '1rem',
                color: '#333',
                backgroundColor: '#f9f9f9',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxSizing: 'border-box',
            }}
        />
    </div>
);

const ProfileContent: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const Account = useSelector(selectAccount);

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectAvatar, setselectAvatar] = useState<string>(AvatarUrl[0].avatarPic);
    const [currIdxAvatar, setCurrIdxAvatar] = useState<number>(0);

    const { customer, receivers, loading } = useSelector((state: RootState) => state.checkout);

    useEffect(() => {
        if (Account?.AccID) {
            dispatch(fetchCustomer(Account.AccID));
        }
    }, [dispatch, Account?.AccID]);

    useEffect(() => {
        if (customer?.CustID) {
            dispatch(fetchReceiver(customer.CustID));
        }
    }, [dispatch, customer?.CustID]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>กำลังโหลดข้อมูล...</div>;
    }

    const firstReceiver = receivers && receivers.length > 0 ? receivers[0] : null;

    if (!customer || !firstReceiver || !Account) {
        return <div style={{ textAlign: 'center', padding: '50px', color: '#ff4d4f' }}>
            ไม่พบข้อมูลบัญชีหรือที่อยู่จัดส่ง
        </div>;
    }

    const HandleAvatar = (i: number) => {
        setselectAvatar(AvatarUrl[i].avatarPic);
        setCurrIdxAvatar(i);
    }

    const AcceptEdit = async () => {
        const res = await axios.put(`http://localhost:3000/account/${Account.AccID}`, {
            "AvatarPic": selectAvatar,
        })
        dispatch(setAccount(res.data))
        setIsEdit(false);
        alert("แก้ไขสำเร็จ!");
    }

    const CancelEdit = () => {
        setIsEdit(false);
        setselectAvatar(AvatarUrl[0].avatarPic)
    }

    return (
        <div className='relative w-full h-full'>
            <div
                style={{
                    backgroundColor: '#f4f7f6',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '30px',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        maxWidth: '900px',
                        width: '100%',
                        backgroundColor: '#fff',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        padding: '40px',
                    }}
                >
                    <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
                        ข้อมูลบัญชี
                    </h2>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '40px',
                            alignItems: 'flex-start',
                        }}
                    >
                        <div
                            style={{
                                flex: '0 0 150px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '15px',
                            }}
                        >
                            <img
                                src={Account.AvatarPic}
                                alt="Profile"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '4px solid #f0f0f0',
                                }}
                            />
                            <button
                                className='hover:bg-black! hover:text-white! hover:scale-110 transition-all duration-500'
                                onClick={() => setIsEdit(true)}
                                style={{
                                    backgroundColor: '#f0f0f0',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '8px 16px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: '#555',
                                    cursor: 'pointer',
                                    width: '100%',
                                }}
                            >
                                แก้ไขรูปภาพ
                            </button>
                        </div>
                        <div
                            style={{
                                flex: '1',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '25px',
                            }}
                        >
                            <div style={{ gridColumn: '1 / -1' }}>
                                <ProfileDataField label="Username" value={Account.Username} />
                            </div>
                            <ProfileDataField label="ชื่อจริง" value={customer.CustName ?? ''} />
                            <ProfileDataField label="นามสกุล" value={customer.CustLname ?? ''} />
                            <ProfileDataField label="เบอร์โทร" value={customer.CustPhone ?? ''} />
                            <ProfileDataField label="Email" value={customer.CustEmail ?? ''} />
                            <div style={{ gridColumn: '1 / -1' }}>
                                <div>
                                    <label style={{
                                        fontSize: '0.85rem',
                                        color: '#888',
                                        textTransform: 'uppercase',
                                        marginBottom: '4px',
                                        display: 'block',
                                    }}>
                                        ที่อยู่
                                    </label>
                                    <textarea
                                        value={receivers[0].RecAddr}
                                        readOnly
                                        rows={3}
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            fontSize: '1rem',
                                            color: '#333',
                                            backgroundColor: '#f9f9f9',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            boxSizing: 'border-box',
                                            fontFamily: 'sans-serif',
                                            resize: 'none',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isEdit && (
                <div className='absolute top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-40'>
                    <div className='w-[32rem] h-72 bg-white shadow-2xl flex flex-col items-center rounded-4xl z-50'>
                        <h2 className='font-medium text-xl text-gray-700 mt-4'>เลือกรูปโปรไฟล์: </h2>
                        <div className='w-full h-0.5 bg-black mt-2.5'></div>
                        <div className='flex justify-center items-center gap-8 mt-8'>
                            {AvatarUrl.map((data, index) => (
                                <div key={index}
                                    className='relative w-20 h-20 rounded-full cursor-pointer hover:scale-110 hover:shadow-md hover:shadow-black'
                                    onClick={() => HandleAvatar(index)}>
                                    <div className={`${currIdxAvatar === index ? "block" : "hidden"} absolute w-7 h-7 right-0 translate-y-[-15%] translate-x-[15%] rounded-full bg-lime-500`}>
                                        <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48"><path fill="#fff" fillRule="evenodd" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m4 24l5-5l10 10L39 9l5 5l-25 25z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <img src={data.avatarPic} className='w-full h-full object-cover rounded-full' />
                                </div>
                            ))}
                        </div>
                        <div className='w-full h-10 space-x-4 flex justify-end pr-10 mt-12'>
                            <button 
                                onClick={AcceptEdit}
                                className='w-24 h-full bg-gradient-to-r from-black/60 via-black/40 to-black/20 rounded-2xl hover:scale-110 shadow-sm shadow-black'>ยืนยัน</button>
                            <button 
                                onClick={CancelEdit}
                                className='w-24 h-full bg-gradient-to-r from-black/60 via-black/40 to-black/20 rounded-2xl hover:scale-110 shadow-sm shadow-black'>ยกเลิก</button>
                        </div>
                    </div>
                </div>
            )}
        </div>


    );
};

export default ProfileContent;