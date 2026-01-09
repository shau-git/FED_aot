import {motion} from "framer-motion"
import {useId, useState} from "react"
import {useIsMobile, LikesCardButton} from "../../../homeConfig"
 //{loading ,handleResourceClick, API_LINKS, clearQuery, scrollToTop}
const CardButtons = ({
        loading ,
        handleResourceClick, 
        API_LINKS, 
        clearQuery, 
        scrollToTop, 
        setActiveResource
    }) => {
    const k = useId()

    // for hightligting the card button font so that user know which section they are browsing (charcaters, episode, location etc)
    const [active , setActive] = useState("characters")
    
    // const handleClick = (key) => {
    //     // Check if clicking the same button
    //     if (active === key) {
    //         // Scroll to top if same button clicked
    //         scrollToTop()
    //     } else {
    //         // Switch to different resource
    //         clearQuery()
    //         handleResourceClick(key)
    //         setActive(key)
    //     }
    // }

    const handleClick = (key) => {
        // Check if clicking the same button
        if (active === key) {
            // Scroll to top if same button clicked
            scrollToTop()
        } else {
            // Switch to different resource
            clearQuery()
            if(key === "likes") {
                setActiveResource("likes")
            } else {
                handleResourceClick(key)
            }
            setActive(key)
        }
    }


    const isMobile = useIsMobile()
    return (
    <div className={`flex justify-between items-center text-center ${isMobile && "overflow-x-scroll"}`}>
        {
            Object.keys(API_LINKS).map((key, i) => {
                if(key !== "titans" && key !== "likes") {
                    return (
                        <motion.div
                            key={`${k}-${i}`}
                            onClick={() => handleClick(key)}
                            disabled={loading}
                            className={`relative w-[290px] py-2 px-4 group cursor-pointer
                            `}
                        >
                            <p 
                                className={`text-xl md:text-2xl uppercase tracking-widest font-semibold ${active === key ? "text-orange-400": "text-white/50 group-hover:text-white/80"} transition-colors`}
                            >
                                {key}
                            </p>
                            {key.toLowerCase() !== "organizations" && <span className="absolute right-0 top-0 bottom-0 w-px bg-gray-800"></span>}
                        </motion.div>
                    )
                }
            }
        )}
        <LikesCardButton {...{active, handleClick}}/>
    </div>)
};

export default CardButtons
