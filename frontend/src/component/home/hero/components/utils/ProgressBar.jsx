import {motion} from "framer-motion"

const ProgressBar = ({images, imageIndex}) => {
    return (
        <div className="absolute top-4 left-0 right-0 z-30 px-8 flex gap-1">
            {images.map((_, idx) => (
            <div
                key={idx}
                className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm"
            >
                <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: idx < imageIndex ? '100%' : '0%' }}
                    animate={{ width: idx < imageIndex ? '100%' : idx === imageIndex ? '100%' : '0%' }}
                    transition={{ duration: idx === imageIndex ? 0.3 : 0 }}
                />
            </div>
            ))}
        </div>
    )
}

export default ProgressBar