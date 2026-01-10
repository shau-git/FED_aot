import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";


const PullDown = ({setCurrentPage}) => {
    const [mode, setMode] = useState("arrow"); // "arrow" | "logo"
    useEffect(() => {
        if (mode !== "logo") return;

        const timer = setTimeout(() => {
            setMode("arrow");
        }, 5000);

        return () => clearTimeout(timer);
    }, [mode]);


    useEffect(() => {
        if (mode !== "logo") return;

        const handleClick = (e) => {
            if (!e.target.closest("#aot-logo")) {
            setMode("arrow");
            }
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [mode]);

    //<img src="./src/assets/images/icons/AOTLogo.png" className="w-60"/>
    return (
        <AnimatePresence>
        {/* 🔽 ARROW */}
        {mode === "arrow" && (
            <motion.div
            key="arrow"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-2 left-1/2 -translate-x-1/2 z-50"
            >
            <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: 80 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                if (info.offset.y > 50) {
                    setMode("logo");
                }
                }}
                className="
                w-15 h-10
              
                
                cursor-grab active:cursor-grabbing
                "
            />
            </motion.div>
        )}

        {/* 🛡️ AOT LOGO */}
        {mode === "logo" && (
            <motion.div
            key="logo"
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -120, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
                fixed top-4 left-1/2 -translate-x-1/2
                z-50 pointer-events-none
            "
            >
            <motion.img
                id="aot-logo"
                src="/assets/images/icons/AOTLogo.png"
                alt="Return"
                onClick={() => setCurrentPage("GetStarted")}
                whileHover={{ scale: 1.05 }}
                className="
                w-45 cursor-pointer
                pointer-events-auto
                drop-shadow-[0_0_12px_rgba(180,255,200,0.35)]
                "
            />
            </motion.div>
        )}
        </AnimatePresence>

    )
}

export default PullDown