// Questions ki API fetch krenge
// role ya experience ke basis pe interview ko conduct krwayenge
import axios from "axios";
import { ServerUrl } from "../App.jsx";
import { motion } from "motion/react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import AuthModel from "./AuthModel.jsx";
import { FaBriefcase, FaUserTie } from "react-icons/fa";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";



function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);

    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");

    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const handleUploadResume = async () => {
        if (!userData) {
            setShowAuth(true);
            return;
        }

        if (!resumeFile || analyzing) {
            return;
        }
        setAnalyzing(true);

        const formdata = new FormData()
        formdata.append("resume", resumeFile)
        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })

            console.log(result.data);

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);

            setAnalyzing(false);



        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                setShowAuth(true);
            } else {
                console.log(error);
            }
            setAnalyzing(false);
        }
    }


    const handleStart = async () => {
        if (!userData) {
            setShowAuth(true);
            return;
        }

        setLoading(true)

        try {
            const result = await axios.post(
                ServerUrl + "/api/interview/generate-questions",
                { role, experience, mode, resumeText, projects, skills },
                { withCredentials: true }
            )

            console.log("Interview started successfully:", result.data)

            if (userData) {
                dispatch(setUserData({
                    ...userData,
                    credits: result.data.creditsLeft
                }))
            }

            setLoading(false)
            onStart(result.data)

        } catch (error) {
            console.error("Error starting interview:", error)
            setLoading(false)
        }
    }



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-8 sm:py-12"
        >
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex flex-col md:grid md:grid-cols-3 overflow-hidden">
                <motion.div
                    initial={{ x: window.innerWidth < 768 ? 0 : -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="relative bg-gradient-to-br from-green-50 to-green-200 p-8 sm:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                        Start Your AI Interview
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-8 sm:mb-10 leading-relaxed font-medium">
                        Practice real interview scenarios powered by AI.
                        Improve communication, technical skills, and confidence.
                    </p>

                    <div className="space-y-4 sm:space-y-5">
                        {
                            [
                                {
                                    icon: <FaUserTie className="text-green-600 text-lg sm:text-xl" />,
                                    text: "Choose Role & Experience",
                                },
                                {
                                    icon: <FaMicrophoneAlt className="text-green-600 text-lg sm:text-xl" />,
                                    text: "Smart Voice Interview",
                                },
                                {
                                    icon: <FaChartLine className="text-green-600 text-lg sm:text-xl" />,
                                    text: "Performance Analytics",
                                },
                            ].map((item, index) => (
                                <motion.div key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + index * 0.15 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center space-x-3 sm:space-x-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm cursor-pointer border border-green-50"
                                >
                                    <div className="bg-green-50 p-2 rounded-lg">
                                        {item.icon}
                                    </div>
                                    <span className="text-gray-700 font-semibold text-sm sm:text-base">{item.text}</span>
                                </motion.div>
                            ))

                        }

                    </div>



                </motion.div>

                {/* right box */}
                <motion.div className="p-8 sm:p-12 flex flex-col justify-center bg-white">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-2">
                        <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                        Interview SetUp
                    </h2>

                    <div className="space-y-5 sm:space-y-6">
                        <div className="relative">
                            <FaUserTie className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
                            <input type="text" placeholder="Enter Role"
                                className="w-full pl-12 pr-4 py-3.5 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition font-medium text-sm sm:text-base"
                                onChange={(e) => setRole(e.target.value)} value={role}
                            />


                        </div>

                        <div className="relative">
                            <FaBriefcase className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
                            <input type="text" placeholder="Experience (e.g. 2 years)"
                                className="w-full pl-12 pr-4 py-3.5 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition font-medium text-sm sm:text-base"
                                onChange={(e) => setExperience(e.target.value)} value={experience}
                            />



                        </div>

                        <div className="relative">
                            <select value={mode}
                                onChange={(e) => setMode(e.target.value)}
                                className="w-full py-3.5 sm:py-4 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition font-semibold text-sm sm:text-base appearance-none bg-white cursor-pointer"
                            >
                                <option value="Technical">Technical Interview</option>
                                <option value="HR">HR Interview</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className="border-2 border-dashed border-gray-200
        rounded-xl p-6 sm:p-8 text-center cursor-pointer
        hover:border-green-500 hover:bg-green-50/50 transition-all group">
                                <FaFileUpload className="text-3xl sm:text-4xl mx-auto text-gray-300 group-hover:text-green-600
            mb-3 transition-colors" />
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    id='resumeUpload'
                                    className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])} />

                                <p className="text-gray-500 font-bold text-sm sm:text-base">
                                    {resumeFile ? (
                                        <span className="text-green-600">{resumeFile.name}</span>
                                    ) : "Click to upload resume (PDF)"}
                                </p>

                                {resumeFile && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={(e) => { e.stopPropagation(); handleUploadResume() }}

                                        className="mt-4 bg-gray-900 text-white px-5 py-2
        rounded-lg hover:bg-gray-800 transition font-bold text-sm">
                                        {analyzing ? "Analyzing..." : "Analyze Resume"}

                                    </motion.button>)}



                            </motion.div>
                        )}

                        {analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gray-50 border border-gray-100 rounded-xl p-5
        space-y-4 max-h-[280px] overflow-y-auto scrollbar-hide shadow-inner">
                                <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                                    Resume Analysis Result
                                </h3>

                                {projects.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                            Projects: </p>
                                        <ul className="space-y-1.5">
                                            {projects.map((p, i) => (
                                                <li key={i} className="text-sm text-gray-600 font-medium flex items-start gap-2">
                                                    <span className="text-green-500 mt-1">•</span>
                                                    {p}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {skills.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                            Skills: </p>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((s, i) => (
                                                <span key={i}
                                                    className="bg-white border border-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                                                >{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </motion.div>
                        )}

                        <motion.button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full disabled:bg-gray-400 bg-green-600 hover:bg-green-700
    text-white py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition
    duration-300 shadow-lg shadow-green-100 disabled:shadow-none">
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Starting...
                                </div>
                            ) : "Start Interview"}

                        </motion.button>

                    </div>

                </motion.div>

                {/* image section */}
                <motion.div
                    initial={{ x: window.innerWidth < 768 ? 0 : 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="relative hidden md:flex items-center justify-center bg-white p-8 sm:p-12">
                    <div className="absolute inset-0 bg-green-50 opacity-30"></div>
                    <div className="relative z-10 text-center">
                        <div className="w-48 h-48 lg:w-64 lg:h-64 bg-green-100 rounded-full flex items-center justify-center mb-8 mx-auto shadow-inner">
                            <FaMicrophoneAlt className="text-6xl lg:text-8xl text-green-600 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 tracking-tight">Ready to Shine?</h3>
                        <p className="text-gray-500 font-medium leading-relaxed">Your AI interviewer is waiting to help you practice and improve.</p>
                    </div>
                </motion.div>
            </div>
            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </motion.div>
    )
}

export default Step1SetUp
