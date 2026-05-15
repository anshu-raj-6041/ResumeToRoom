// import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'
// import Footer from '../components/Footer'

function InterviewHistory() {

    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {

            try {
                const result = await axios.get(
                    ServerUrl + "/api/interview/get-interview",
                    { withCredentials: true }
                )
                console.log(result.data);


                setInterviews(result.data)

            } catch (error) {
                console.log(error)
            }
        }
        getMyInterviews();

    }, [])


    return (
        <div className='min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 py-8 sm:py-12'>
            <div className='w-[95vw] sm:w-[90vw] lg:w-[70vw] max-w-6xl mx-auto px-2 sm:px-0'>

                <div className='mb-8 sm:mb-12 w-full flex items-start gap-3 sm:gap-4'>
                    <button
                        onClick={() => navigate("/")}
                        className='mt-1 p-2.5 sm:p-3 rounded-xl sm:rounded-full bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all text-gray-600'>
                        <FaArrowLeft size={18} />
                    </button>

                    <div>
                        <h1 className='text-2xl sm:text-3xl font-black text-gray-800 tracking-tight'>
                            Interview History
                        </h1>
                        <p className='text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 font-medium'>
                            Track your past interviews and performance
                        </p>
                    </div>

                </div>


                {interviews.length === 0 ? (
                    <div className='bg-white p-12 sm:p-20 rounded-3xl shadow-sm border border-gray-100 text-center'>
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaArrowLeft className="text-gray-300 -rotate-45" />
                        </div>
                        <p className='text-gray-500 font-bold'>
                            No Interview found. Start your first interview.
                        </p>
                    </div>
                ) : (
                    <div className='grid gap-4 sm:gap-6'>
                        {interviews.map((item, index) => (

                            <div
                                key={index}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className='bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer border border-gray-100 group'
                            >
                                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                            <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                                                {item.role}
                                            </h3>
                                        </div>

                                        <p className="text-xs sm:text-sm text-gray-500 font-semibold ml-4">
                                            {item.experience} • <span className="text-emerald-600/70">{item.mode}</span>
                                        </p>

                                        <p className="text-[10px] text-gray-400 mt-3 font-bold uppercase tracking-widest ml-4">
                                            {new Date(item.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>

                                    </div>

                                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
                                        {/* STATUS BADGE */}
                                        <span
                                            className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${item.status === "completed"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                : "bg-amber-50 text-amber-700 border border-amber-100"
                                                }`}
                                        >
                                            {item.status}
                                        </span>

                                        <div className="text-right">
                                            <p className="text-xl sm:text-2xl font-black text-emerald-600 leading-none">
                                                {item.finalScore || 0}<span className="text-xs text-gray-400">/10</span>
                                            </p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mt-1">
                                                Overall Score
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default InterviewHistory
