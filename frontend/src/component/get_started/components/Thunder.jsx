import {motion, AnimatePresence} from 'framer-motion'

const Thunder = () => {
    return (
        <AnimatePresence>
            {/* Screen Flash */}
            <motion.div
                key="Flash"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0, 0.6, 0] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                className="absolute inset-0 bg-yellow-400/30 z-40 pointer-events-none"
            />
            
            {/* Massive Lightning Bolt */}
            <div className="absolute inset-0 z-30 flex justify-center pointer-events-none">
                <svg className="h-full w-64 text-yellow-200 drop-shadow-[0_0_20px_rgba(253,224,71,0.8)]">
                    <motion.path
                        d="M 100 0 L 80 200 L 140 250 L 70 550 L 150 600 L 100 1000"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="15"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.4, repeatDelay: 0.1 }}
                        style={{ filter: 'drop-shadow(0 0 15px #facc15)' }}
                        key="Thunder"
                    />
                </svg>
            </div>
        </AnimatePresence>
    )
}

export default Thunder