import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle, FaCoins } from 'react-icons/fa'
import { Navigate, useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
// import Footer from '../components/Footer'


function Pricing() {

  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");

  const plans = [
    {
      id: "free",
      name: "Free Plan",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
      buttonText: "Current Plan"
    },

    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
      buttonText: "Get Started"
    },

    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
      buttonText: "Upgrade Now"
    },
  ];




  return (
    <div className='min-h-screen bg-[#f8fafc] py-12 px-6 relative overflow-hidden'>
      {/* Background Decorative Elements - Subtle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-emerald-50/40 to-transparent pointer-events-none"></div>

      <div className='max-w-6xl mx-auto mb-10 relative'>
        <div className="flex items-center gap-6 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className='p-2.5 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-600 hover:text-emerald-600 transition-all'
          >
            <FaArrowLeft size={18} />
          </motion.button>
          <div className="h-px flex-1 bg-gray-200/50 hidden sm:block"></div>
        </div>

        <div className="text-center space-y-2">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight"
          >
            Choose Your <span className="text-emerald-600">Plan</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-xl mx-auto text-base font-medium"
          >
            Simple credit packs for your interview preparation.
          </motion.p>
        </div>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative items-stretch'>
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.id

          return (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative flex flex-col rounded-[1.5rem] p-7 transition-all duration-300 border-2 cursor-pointer
                ${isSelected
                  ? "border-emerald-500 shadow-xl bg-white z-10"
                  : "border-transparent bg-white shadow-lg shadow-gray-200/40 hover:border-gray-200"
                }
              `}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                  {plan.badge}
                </div>
              )}

              {/* Default Tag */}
              {plan.default && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                  Current
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-xs font-medium line-clamp-2">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-gray-900">
                  {plan.price}
                </span>
                <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">
                  / pack
                </span>
              </div>

              <div className="bg-emerald-50/40 rounded-xl p-3 mb-6 border border-emerald-100/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-sm shadow-emerald-200">
                    <FaCoins size={16} />
                  </div>
                  <div>
                    <p className="text-lg font-black text-emerald-700 leading-none">
                      {plan.credits}
                    </p>
                    <p className="text-[9px] font-bold text-emerald-600/60 uppercase tracking-widest">
                      Interview Credits
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5 group">
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0
                      ${isSelected ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-600"}
                    `}>
                      <FaCheckCircle size={10} />
                    </div>
                    <span className="text-gray-600 text-xs font-semibold group-hover:text-gray-900 transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-[0.1em] transition-all duration-200
                  ${isSelected
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                  }
                  ${plan.default ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
                `}
                disabled={plan.default}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          )
        })}
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Pricing
