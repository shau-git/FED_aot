import { motion } from "framer-motion";

const WaveringVisualizer = () => {
    // Create an array of 4 bars
    const bars = Array.from({ length: 4 });

    const waverVariants = {
        // 'initial' state of the bar
        initial: { 
            height: 4, 
            opacity: 0.8 
        },
        // 'animate' state with keyframes
        animate: (i) => ({
            height: [4, 14, 6, 18, 11, 2], // Keyframes for the wavering effect
            opacity: 1,
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2, // Stagger effect using the index
            },
        }),
    };

    return (
        <div className="flex items-end gap-0.5 h-8 px-2 py-1 rounded-md w-fit backdrop-blur-sm">
            {bars.map((_, i) => (
                <motion.div
                    key={i}
                    custom={i} // Pass index to variants for the delay
                    variants={waverVariants}
                    initial="initial"
                    animate="animate"
                    className="w-0.5 bg-green-500"
                    style={{ originY: 1 }} // Grows from bottom to top
                />
            ))}
        </div>
    );
};

export default WaveringVisualizer