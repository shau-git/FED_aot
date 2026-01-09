import { RxCross2 } from "react-icons/rx";
import {motion} from "framer-motion"

const Alert = ({closeAlert}) => {
    const variants = {
        hidden: { y: "-120%", opacity: 0 },
        visible: { y: "0%", opacity: 1 },
        exit: { y: "-120%", opacity: 0 }
    };

    return (
       
        <div className="fixed top-1 left-1/2 -translate-x-1/2 z-50">
            <motion.div 
                className="relative w-[180px] h-[50px] bg-black flex items-center justify-center p-4 border-red-600 border border-sm mt-3 cursor-pointer" 
                variants={variants}
                animate="visible"
                exit="exit"
                initial="hidden"
                transition={{duration: 0.5,  ease: "easeOut" }}
                onClick={closeAlert}
                >
                <span className="w-1 h-5 bg-red-500 mr-1"/>
                <p>SPOILER ALERT</p>
                <RxCross2 className=" w-3 h-3 hover:text-red-800 absolute top-1 right-1" />
            </motion.div>
        </div>
    )
}

export default Alert