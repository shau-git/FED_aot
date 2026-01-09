import {motion} from 'framer-motion'

const LikesCardButton = ({ active, handleClick}) => {
    const loading = false
    const key = "likes"

    return (
        <motion.div
            onClick={() => handleClick("likes")}
            disabled={loading}
            className={`relative w-[290px] py-2 px-4 group cursor-pointer
            `}
        >
            <p 
                className={`text-xl md:text-2xl uppercase tracking-widest font-semibold ${active === key ? "text-orange-400": "text-white/50 group-hover:text-white/80"} transition-colors`}
            >
                {key}
            </p>
        </motion.div>
    )
}

export default LikesCardButton