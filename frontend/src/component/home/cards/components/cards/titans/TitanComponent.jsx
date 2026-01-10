import {useState, useId} from 'react'
import {motion} from "framer-motion"
import { GoSquareFill } from "react-icons/go";
import {titansImg, fixImage} from "../../../../homeConfig"


const CoverImage = ({coverImage, coverImageDir, isMobile, focus}) => {
    return(
        <motion.div 
            className={`absolute ${coverImageDir}-0 sm:top-1 top-0`}
            initial={{opacity:0}}
            whileInView={{opacity:1}}
            transition={{delay:0.1, duration:0.7}}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="relative sm:w-140 w-screen h-80 p-4 overflow-hidden">
                <motion.div 
                    className="absolute inset-0 bg-cover bg-center brightness-100" 
                    style={{ 
                        backgroundImage: `url(/assets/images/titans/${coverImage})`,
                        backgroundPosition: "center", 
                    }}
                    animate={{ scale: (focus && !isMobile) ? 1.2 : 1 }}
                    transition={{duration: focus ? 1 : 0.3}}
                />
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/30 to-black/15"/>
                <div className="absolute inset-0 bg-linear-to-l from-black via-black/20 to-black/5"/>
            </div>
        </motion.div>
    )
}


const FieldButton = ({changeDisplay, activeTab}) => {
    const key = useId()
    return (
        <div className=" bg-black/20 grid grid-cols-3 grid-rows-1 text-[12px]">
            {
                ["height","abilities","allegiance"].map((e,i) => {
                    return (
                        <div
                            key={`${key}-${i}`} 
                            className={`
                                flex p-0.5 bg-black/20 justify-center
                                items-center relative
                                border border-white cursor-pointer
                                
                                ${activeTab === e ? "bg-white border-black text-black" : "hover:bg-gray-500/50"}
                            `}
                            onClick={() => changeDisplay(e)}
                            >
                            {activeTab === e &&<img src="/assets/images/titans/syringe.png" className="w-7 h-7 absolute -top-2 left-0"/>}
                            {e}
                        </div>
                    )
                })
            }
        </div>
    )
}


const TitanComponent = ({ data, index,  handleClick , isMobile}) => {
    const key = useId()

    // Initially set to 'height'
    const [activeTab, setActiveTab] = useState('height');

    const [focus, setFocus] = useState(false)

    const {name, img} = data

    // to check if current index is even
    const evenIndex = index%2==0? true : false

    // the field value to be displayed when being activated
    let fieldValue = data[activeTab]
    if (!Array.isArray(data[activeTab])) {
        fieldValue = [fieldValue]
    }

    // change the display when clicking the button (Height, Abilities, Allegiance)
    const changeDisplay = (field) => {
        setActiveTab(field)
    }
    
    const mouseOn = () => {
        setFocus(true)
       
    }
    const mouseLeave = () => {
        setFocus(false)
       
    }

    const coverImageDir = (evenIndex||(isMobile&&!evenIndex))?"right":"left"
    const coverImage = titansImg[index]

    return (
        <div className=" pt-10 flex items-center justify-center">
            <div 
                className="relative md:h-80 h-[580px] w-[825px]"
                onMouseEnter={mouseOn} 
                onMouseLeave={mouseLeave}
                >
                {/* titan cover image */}
                
                <CoverImage {...{coverImage, coverImageDir, focus, isMobile}}/>

                <div className={`absolute sm:top-23 top-45 p-3 ${(!evenIndex&&!isMobile)&&"right-0 "}`}>
                    <button className="cursor-pointer items-start gap-7 flex flex-col md:flex-row">
                        
                        {/* titan image for even index*/}
                        {  
                            (evenIndex || (!evenIndex && isMobile)) &&
                            (<motion.div 
                                className="flex items-start"
                                whileInView={!isMobile? {opacity:1, x: 0} : {opacity:1}}
                                initial={!isMobile?{opacity:0, x:-10}: {opacity:1}}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{delay:0.3, duration:0.6}}
                            >
                                <img 
                                    src={fixImage(img)}
                                    className="w-[150px] sm:w-[200px] h-auto"
                                />
                            </motion.div>)

                        }

                        {/* titan data */}
                        <motion.div 
                            className="text-start flex flex-col justify-between md:h-[180px]"
                            whileInView={{opacity:1, x: 0}}
                            initial={!isMobile && (evenIndex?{opacity:0, x:-10}:{opacity:0, x:20})}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={
                                !isMobile && (evenIndex?{
                                    duration:0.6,
                                    delay:0.6
                                } : {
                                   delay: 0.9 ,  duration:0.6
                                })

                            }
                        >
                            
                            {/* titan name */}
                            <div className={`inline-flex items-start justify-self-auto mb-2 ${focus?"text-amber-400":"text-white"}`}>                              
                                <p  className="border-amber-400 border-x-[3px] px-2.5">{name}</p>
                            </div>
                            
                            {/*field */}
                            <div  className="flex flex-col gap-2.5 bg-opacity-0 mt-2 w-[300px]">
                                {/*field value */}
                                <div>
                                    {
                                        fieldValue.map((e, i) => {
                                            return (
                                                <div key={`${key}_${i}`}>
                                                    <div  className={`items-start  inline-flex ${focus? "bg-amber-400 text-black" : "text-amber-400"} pr-0.5`}>
                                                        <GoSquareFill className="shrink-0 w-3 h-3 mt-[0.35em]"/>
                                                        <span className="">{e}</span>
                                                    </div> 
                                                    <br/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                {/*field name */}
                                <FieldButton changeDisplay={changeDisplay} activeTab={activeTab}/>
                                
                            </div>
                        </motion.div>

                        {/* titan image for odd index when is on desktop screen size*/} 
                        {
                            (!evenIndex && !isMobile) &&
                            <motion.div 
                                className="flex items-start"
                                whileInView={{opacity:1, x: 0}}
                                initial={{opacity:0, x:20}}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{delay:0.6, duration:0.6}}
                            >
                                <img 
                                    src={fixImage(img)}
                                    className="w-[150px] sm:w-[200px] h-auto"
                                />
                            </motion.div>
                        }
                        
                        {/*Read More button */}
                        <motion.div 
                            className="relative leading-1.5 md:mt-0 flex flex-col justify-end items-end md:h-[200px]" 
                            onClick={handleClick}
                            whileInView={{opacity:1, x: 0}}
                            initial={!isMobile && (evenIndex?{opacity:0, x:-10}:{opacity:0, x:20})}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={
                                !isMobile && (evenIndex?{
                                    delay: 0.9 , duration:0.6
                                } : {
                                    delay:0.3, duration:0.6
                                })
                            }
                        >
                            <div className="hover:text-red-600">READ MORE</div>
                        </motion.div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TitanComponent
