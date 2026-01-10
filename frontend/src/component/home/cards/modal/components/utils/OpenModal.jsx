import { motion, AnimatePresence } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';

const OpenModal = ({p}) => {
    const {isOpen, renderContent, onClose, render="card"} = p
    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ cursor: "url('/assets/images/cursor/Hange_cursor.png'), auto" }}
                >
                    <motion.div
                        layout // Add layout prop to help Framer Motion track the box
                        className={`cursor-default ${render==="card" && "overflow-y-auto bg-linear-to-br from-gray-900 to-black border border-white/25 "} mx-auto  max-w-6xl rounded-3xl  p-6 md:p-10 w-full max-h-[90vh]  text-white  relative`}
                        initial={{ scale: 0.8, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: 50 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="cursor-pointer absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-10"
                        >
                            <RxCross2 className="w-8 h-8" />
                        </button>

                        {/* Content */}
                        {renderContent()}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default OpenModal