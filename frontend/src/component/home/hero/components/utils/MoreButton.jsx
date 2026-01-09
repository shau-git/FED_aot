import {useState} from 'react'
import {motion} from "framer-motion"

const MoreButton = ({currentSeason, handleDisplay, showAlert, toggleVisible,  visible}) => {
    const seasons = [
        "Season 1",
        "Season 2",
        "Season 3",
        "Season 4",
        "The Final Season",
        "More"
    ]
    const displayVariants = {
        hidden: {opacity: 0 , y:-10},
        visible: {opacity: 1, y: 0}
    }

    // function when user click the more button at the hero section
    const toggle = (season) => {
        handleDisplay(season)
        showAlert()
    }
//bg-[rgba(255,255,255,0.38)] 
    return (
        <div className="absolute top-4 left-6 py-3 z-20">
            <div className="relative inline-block cursor-pointer">                                                                              
                <button
                    onClick={toggleVisible}
                    className="cursor-pointer hover:text-stone-500 w-[120px] h-[25px] flex items-start"
                >
                    {currentSeason}
                </button>

                {visible && <motion.div 
                    variants={displayVariants}

                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition= {{ duration: 0.2}}
                    className="bg-amber-800"
                >
                    {
                        seasons.map((season, i) => (
                            <div 
                                key = {i}
                                className="
                                px-3
                                transition-all duration-200
                                hover:bg-gradient-to-r
                                hover:from-[#5F6F1E]
                                hover:via-[#7E8F2A]
                                hover:to-[#B6A93A]
                                "
                                onClick={() => toggle(season)}
                            >
                                {season}
                            </div>
                        ))
                    }
                </motion.div>}
            </div>
        </div>
    )
}
//(210,196,174)
export default MoreButton