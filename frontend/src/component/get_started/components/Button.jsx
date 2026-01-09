import {motion} from "framer-motion"
import { FaChevronRight } from "react-icons/fa6";

const Button = ({setCurrentPage}) => {
    return (
        <motion.button
            className="cursor-pointer group relative px-10 py-5 bg-gradient-to-r from-amber-900 to-amber-950 rounded-full text-white font-serif text-lg tracking-wide overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {setCurrentPage("Home")}}
        >
            <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10 flex items-center gap-3">
            Get Started
            <FaChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 rounded-full blur-xl bg-amber-600/30 group-hover:bg-amber-500/50 transition-all duration-300" />
        </motion.button>
    )
}

export default Button