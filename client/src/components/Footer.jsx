import { BsRobot } from "react-icons/bs";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";

function Footer() {
    return (
        <footer className='bg-[#f8fafc] flex justify-center px-4 pb-12 py-8 pt-12 border-t border-gray-100'>
            <div className="w-full max-w-6xl bg-white rounded-[32px] shadow-xl shadow-gray-200/50 
                border border-gray-100 py-12 px-6 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-100/50">
                
                {/* Logo Section */}
                <div className="flex justify-center items-center gap-3 mb-6 group">
                    <div className="bg-gray-900 text-white p-2.5 rounded-xl transition-transform duration-500 group-hover:rotate-[360deg]">
                        <BsRobot size={20} />
                    </div>
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                        ResumeToRoom
                    </h2>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
                    Elevating your career journey through AI-powered mock interviews. 
                    Practice with confidence, receive deep insights, and master your technical 
                    and behavioral skills.
                </p>

                {/* Social Links */}
                <div className="flex justify-center items-center gap-6 mb-10">
                    {[
                        { icon: <FaGithub />, href: "#", label: "GitHub" },
                        { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
                        { icon: <FaTwitter />, href: "#", label: "Twitter" }
                    ].map((social, index) => (
                        <a 
                            key={index}
                            href={social.href}
                            className="text-gray-400 hover:text-emerald-600 transition-colors duration-300 text-xl"
                            aria-label={social.label}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mx-auto mb-8"></div>

                {/* Bottom Info */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
                    <span>&copy; {new Date().getFullYear()} ResumeToRoom</span>
                    <span className="hidden md:block text-gray-200">|</span>
                    <span className="flex items-center gap-1.5">
                        Made with <FaHeart className="text-rose-400 animate-pulse" /> in India
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
