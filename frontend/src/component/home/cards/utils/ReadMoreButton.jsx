import {motion} from "framer-motion"

const ReadMoreButton = ({handleClick, char=false}) => {
    const slide = {
        initial: {
            x: '-110%',
            opacity: 0
        },
        hover: {
            x: 1,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        }
    }

    return (
        <div className={`flex items-center justify-end ${!char && "mt-3"}`}>
            <motion.button
                className="relative px-5 py-3 text-gray-300 font-semibold text-lg overflow-hidden cursor-pointer bg-[rgba(167,200,233,0.55)]"
                
                whileHover="hover"
                initial="initial"
                onClick={handleClick}
            >
            {/* Overlay that slides in from left to right bg-[rgba(16,204,211,0.6)]*/}
            <motion.div
                className="absolute inset-0 bg-orange-500 active:bg-orange-300"
                variants={slide}
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                exit={{
                    x: '100%',
                    transition: {
                    duration: 0.3,
                    ease: 'easeInOut'
                    }
                }}
                />
                
                {/* Button text */}
                <span className="relative z-10">Read More</span>
            </motion.button>
        </div>
    )
}

export default ReadMoreButton