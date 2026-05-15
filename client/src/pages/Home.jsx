import { useSelector } from "react-redux"
import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import { motion } from "motion/react"
import { HiSparkles } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModel from "../components/AuthModel";
import { BsRobot } from "react-icons/bs";
import { BsMicFill } from "react-icons/bs";
import { BsClockFill } from "react-icons/bs";
import { BsBarChart } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import evalImg from "../assets/images/ai-ans.png";
import hrImg from "../assets/images/HR.png";
import techImg from "../assets/images/tech.png";
import confidenceImg from "../assets/images/confi.png";
import creditImg from "../assets/images/credit.png";
import resumeImg from "../assets/images/resume.png";
import pdfImg from "../assets/images/pdf.png";
import analyticsImg from "../assets/images/history.png";


function Home() {
  const { userData } = useSelector((state) => state.user)
  const { showAuth, setShowAuth } = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar />

      <div className="flex-1 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
              <HiSparkles size={16}
                className="bg-green-50 text-green-600"
              />
              AI Powered Smart Interview Platform

            </div>
          </div>

          <div className="text-center mb-16 sm:mb-28">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto px-4">
              Practice Interview with
              <span className="relative inline-block mt-2 sm:mt-0">
                <span className="bg-green-100 text-green-600 px-3 sm:px-5 py-1 rounded-full whitespace-nowrap">
                  AI Intelligence
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-gray-500 mt-6 max-w-2xl mx-auto text-base sm:text-lg px-6">
              Role-based mock interviews with smart follow-ups,
              adaptive difficulty and real-time performance
              evaluation.
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 px-6">
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/interview")
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className="bg-black text-white px-8 sm:px-10 py-3 rounded-full hover:opacity-90 transition shadow-md w-full sm:w-auto font-semibold">
                Start Interview
              </motion.button>
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/history")
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className="border border-gray-300 px-8 sm:px-10 py-3 rounded-full hover:bg-gray-100 transition w-full sm:w-auto font-semibold bg-white">
                View History
              </motion.button>
            </div>
          </div>

          <div
            className="flex flex-col md:flex-row justify-center items-center gap-12 sm:gap-10 mb-20 sm:mb-28 px-4">
            {
              [
                {
                  icon: <BsRobot size={24} />,
                  step: "STEP 1",
                  title: "Role & Experience Selection",
                  desc: "AI adjusts difficulty based on selected job role."
                },
                {
                  icon: <BsMicFill size={24} />,
                  step: "STEP 2",
                  title: "Smart Voice Interview",
                  desc: "Dynamic follow-up questions based on your answers."
                },
                {
                  icon: <BsClockFill size={24} />,
                  step: "STEP 3",
                  title: "Timer Based Simulation",
                  desc: "Real interview pressure with time tracking."
                }
              ].map((item, index) => (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 + index * 0.2 }}
                  whileHover={{ rotate: 0, scale: 1.06 }}
                  className={
                    `
                 relative bg-white rounded-3xl border-2 border-green-100
      hover:border-green-500 p-8 sm:p-10 w-full sm:w-80 shadow-md
      hover:shadow-2xl
      transition-all duration-300
      ${index === 0 ? "md:rotate-[-4deg]" : ""}
      ${index === 1 ? "md:rotate-[3deg] md:-mt-6 shadow-xl" : ""}
      ${index === 2 ? "md:rotate-[-3deg]" : ""}`
                  }>

                  <div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-green-500 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                    {item.icon}

                  </div>
                  <div className="pt-8 sm:pt-10 text-center">
                    <div className="text-xs text-green-600 font-bold mb-2 tracking-wider">{item.step}</div>
                    <h3 className="font-bold mb-3 text-lg text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>

                  </div>

                </motion.div>
              ))
            }
          </div>

          <div className="mb-20 sm:mb-32 px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16'
            >
              Advanced AI{" "}
              <span className='text-green-600'>Capabilities</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {
                [
                  {
                    image: evalImg,
                    icon: <BsBarChart size={20} />,
                    title: "AI Answer Evaluation",
                    desc: "Scores communication, technical accuracy and confidence."
                  },

                  {
                    image: resumeImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Resume Based Interview",
                    desc: "Project-specific questions based on uploaded resume."
                  },

                  {
                    image: pdfImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Downloadable PDF Report",
                    desc: "Detailed strengths, weaknesses and insights."
                  },
                  {
                    image: analyticsImg,
                    icon: <BsBarChart size={20} />,
                    title: "History and Analytics",
                    desc: "Track progress with performance graph and topic analysis."
                  }
                ].map((item, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                      <div className="w-full sm:w-1/2 flex justify-center">
                        <img src={item.image} alt={item.title}
                          className="w-full h-auto object-contain max-h-48 sm:max-h-64"
                        ></img>
                      </div>
                      <div className="w-full sm:w-1/2 text-center sm:text-left">
                        <div className="bg-green-50 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto sm:mx-0">
                          {item.icon}
                        </div>
                        <h3 className="font-bold mb-3 text-lg sm:text-xl text-gray-800">{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              }
            </div>
          </div>

          <div className="mb-20 sm:mb-32 px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16'
            >
              Multiple Interview{" "}
              <span className='text-green-600'>Modes</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {
                [
                  {
                    img: hrImg,
                    title: "HR Interview Mode",
                    desc: "Behavioral and communication based evaluation."
                  },

                  {
                    img: techImg,
                    title: "Technical Mode",
                    desc: "Deep technical questioning based on selected role."
                  },

                  {
                    img: confidenceImg,
                    title: "Confidence Detection",
                    desc: "Basic tone and voice analysis insi..."
                  },

                  {
                    img: creditImg,
                    title: "Credits System",
                    desc: "Unlock Premium interview sessions easily."
                  }
                ].map((mode, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
                      <div className="w-full sm:w-1/2">
                        <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-800">
                          {mode.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed font-medium">
                          {mode.desc}
                        </p>
                      </div>
                      <div className="w-full sm:w-1/2 flex justify-center sm:justify-end">
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                        ></img>
                      </div>
                    </div>
                  </motion.div>
                ))
              }
            </div>
          </div>


        </div>
        {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        <Footer />
      </div>



    </div>
  )
}

export default Home
