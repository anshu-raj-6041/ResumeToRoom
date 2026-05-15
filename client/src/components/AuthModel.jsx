import { useEffect } from "react"
import { useSelector } from "react-redux"
import { FaTimes } from "react-icons/fa";
import Auth from "../pages/Auth";


function AuthModel({ onClose }) {
    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        if (userData) {
            onClose()
        }

    }, [userData, onClose])
    return (
        <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4'>
            <div className="relative w-full max-w-lg bg-white rounded-[32px] overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors z-10">
                    <FaTimes size={20} />

                </button>
                <Auth isModel={true} />
            </div>

        </div>
    )
}

export default AuthModel
