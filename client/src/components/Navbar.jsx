import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from "react-icons/io5";
import axios from 'axios';
import { ServerUrl } from '../App.jsx';
import { setUserData } from '../redux/userSlice.js';
import AuthModel from "../components/AuthModel";
// const [showAuth, setShowAuth] = useState(false);


function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false);
    const [showUserPopup, setShowUserPopup] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")

        }
        catch (error) {
            console.log(error);


        }
    }


    return (
        <div className='bg-[#f3f3f3] flex justify-center px-2 sm:px-4 pt-4 sm:pt-6'>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='w-full max-w-6xl bg-white rounded-[20px] sm:rounded-[24px] shadow-sm border border-gray-200 px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center relative'>
                <div className='flex items-center gap-2 sm:gap-3 cursor-pointer' onClick={() => navigate("/")}>
                    <div className='bg-black text-white p-1.5 sm:p-2 rounded-lg'>
                        <BsRobot className="text-[16px] sm:text-[18px]" />

                    </div>
                    <h1 className='font-semibold hidden sm:block text-base sm:text-lg'>ResumeToRoom</h1>
                </div>

                <div className='flex items-center gap-3 sm:gap-6 relative'>
                    <div className='relative'>
                        <button onClick={() => {
                            if (!userData) {
                                setShowAuth(true)
                                return;
                            }
                            setShowCreditPopup(!showCreditPopup);
                            setShowUserPopup(false)
                        }}
                            className='flex items-center gap-1.5 sm:gap-2 bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-md hover:bg-gray-200 transition'>
                            <BsCoin className="text-amber-500 text-[16px] sm:text-[20px]" />
                            <span className="font-bold">{userData?.credits || 0}</span>

                        </button>
                        {showCreditPopup && (
                            <div className='absolute right-0 sm:right-[-50px] mt-3 w-56 sm:w-64 bg-white shadow-xl border border-gray-200 rounded-2xl p-4 sm:p-5 z-50'>
                                <p className='text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4'>
                                    Need more credits to continue interviews?
                                </p>
                                <button onClick={() => { navigate("/pricing"); setShowCreditPopup(false); }}
                                    className='w-full bg-black text-white py-2 rounded-xl text-xs sm:text-sm font-bold'>
                                    Buy more Credits
                                </button>
                            </div>
                        )}
                    </div>

                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true)
                                    return;
                                }
                                setShowUserPopup(!showUserPopup);
                                setShowCreditPopup(false)
                            }}
                            className='w-8 h-8 sm:w-9 sm:h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold overflow-hidden'>
                            {userData ? (
                                userData.profilePic ? (
                                    <img src={userData.profilePic} alt={userData.name} className="w-full h-full object-cover" />
                                ) : userData.name.slice(0, 1).toUpperCase()
                            ) : <FaUserAstronaut size={14} />}


                        </button>

                        {showUserPopup && (
                            <div className='absolute right-0 mt-3 w-44 sm:w-48 bg-white shadow-xl border border-gray-200 rounded-2xl p-3 sm:p-4 z-50'>
                                <p className='text-sm sm:text-md text-emerald-600 font-bold mb-1 truncate'>{userData?.name}</p>

                                <button
                                    onClick={() => { navigate("/history"); setShowUserPopup(false); }}
                                    className='w-full text-left text-xs sm:text-sm py-2 hover:bg-gray-50 px-2 rounded-lg transition-colors text-gray-600 font-medium'>
                                    Interview History
                                </button>
                                <div className="h-px bg-gray-100 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className='w-full text-left text-xs sm:text-sm py-2 px-2 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2 text-red-500 font-medium'>
                                    <IoLogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>


                </div>

            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

        </div>
    )
}

export default Navbar
