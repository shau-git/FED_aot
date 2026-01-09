import {motion} from 'framer-motion'

const Arrow = ({Icon, handleClick, dir}) => {
    const buttonVariants = {
        hover: {
            backgroundColor: "rgba(255,255,255,0.6)",
        },
        tap: {
            backgroundColor: "rgba(255,255,255,0.1)"
        }
    }
    /* 
        Note: top-1/2 places the element's top edge at 50% of the parent height — you still need to shift the element up by half its own height so its center aligns with the parent's center. -translate-y-1/2 applies transform: translateY(-50%) which does that.
    */
    return (
        <div className={`absolute ${dir} top-1/2 -translate-y-1/2 z-40`}>
            <motion.button 
                onClick = {handleClick}
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                className="cursor-pointer rounded-full bg-[rgba(255,255,255,0.38)] w-8 h-8 flex items-center justify-center sm:w-10 sm:h-10 mr-2 ">                  
                <Icon className=" w-4.5 h-4.5 sm:w-6 sm:h-6"/>
            </motion.button>
        </div>
    )
}

export default Arrow