import { FaRobot } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase.js";
import axios from "axios";
import { ServerUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

function Auth({ isModel = false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const User = response.user;
            const name = User.displayName;
            const email = User.email;
            const result = await axios.post(
                ServerUrl + "/api/auth/google",
                { name, email },
                { withCredentials: true }
            );
            dispatch(setUserData(result.data));
            navigate("/");
        } catch (error) {
            console.log(error);
            dispatch(setUserData(null));
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05 }}
                className="w-full max-w-lg p-6 sm:p-12 rounded-[24px] sm:rounded-[32px] bg-white shadow-2xl border border-gray-200"
            >
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
                    <div className="bg-black text-white p-1.5 sm:p-2 rounded-lg">
                        <FaRobot size={18} />
                    </div>
                    <h2 className="font-bold text-base sm:text-lg">ResumeToRoom</h2>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center leading-tight mb-4 text-gray-900">
                    Continue with
                    <span className="relative inline-block sm:ml-2 mt-2 sm:mt-0">
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                            <HiSparkles size={16} />
                            AI Smart Interview
                        </span>
                    </span>
                </h1>

                <p className="text-gray-500 text-center text-xs sm:text-sm md:text-base leading-relaxed mb-8 font-medium">
                    Experience next-level mock interviews with AI, personalized progress tracking, and deep performance analytics.
                </p>
                <motion.button
                    onClick={handleGoogleAuth}
                    whileHover={{ opacity: 0.9, scale: 1.02 }}
                    whileTap={{ opacity: 1, scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 bg-black text-white rounded-xl sm:rounded-full shadow-lg font-bold text-sm sm:text-base"
                >
                    <FcGoogle size={20} />
                    Continue with Google
                </motion.button>
            </motion.div>
        </div>
    );
}

export default Auth;
