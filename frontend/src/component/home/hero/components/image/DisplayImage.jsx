import {motion, AnimatePresence} from 'framer-motion'

const DisplayImage = ({p}) => {
    const {imageIndex, direction, imageUrl, imageName, bgPosition, handleAction, usage} = p
    
    // framer-motion variants for handling the slide in/out animation
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
        }),
        center: {
            x: 0,
        },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%',
        })
    };

    return (
        <>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={imageIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { 
                        type: "tween", 
                        ease: "easeInOut", 
                        duration: 0.4
                        }
                    }}
                    className={`${usage==="hero" ? "bg-cover ": "bg-contain "} absolute inset-0 overflow-hidden`}
                    style={{ 
                        backgroundImage: `url(${imageUrl}${imageName})`,
                        backgroundPosition: "center center",//bgPosition,
                        backgroundRepeat: 'no-repeat' 
                    }}
                    >
                   
                    <div 
                        className={`absolute inset-0 ${usage === "hero"? "bg-linear-to-t from-black via-black/20 to-black/10" : "cursor-pointer"} `}
                        onClick={handleAction}
                    />
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default DisplayImage