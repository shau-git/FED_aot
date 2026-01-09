import {useState, useEffect} from 'react'
import { IoIosArrowForward , IoIosArrowBack } from "react-icons/io";
import { FaExpandAlt } from "react-icons/fa";
import {Arrow, locationImg, ProgressBar, DisplayImage, OpenModal} from "../../../homeConfig"

const LocationAdd = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)
    const [imageIndexOpen, setImageIndexOpen] = useState(imageIndex)
    const [direction, setDirection] = useState(0)

    useEffect(() => {
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
            return () => {
                document.body.style.overflow = 'unset';
            };
        }, [isOpen]);

    const handlePrevClick = () => {
        setDirection(-1);
        if(isOpen) {
            setImageIndexOpen( prev => 
                (prev + locationImg.length - 1) % locationImg.length
            )
        } else {
            setImageIndex( prev => 
                (prev + locationImg.length - 1) % locationImg.length
            )
        }
    }

    // to handle action for clicking the button for showing next bg image
    const handleNextClick = () => {
        setDirection(1);
        if(isOpen) {
            setImageIndexOpen( prev => 
                (prev + locationImg.length + 1) % locationImg.length
            )
        } else {
            setImageIndex( prev =>
                (prev + locationImg.length + 1) % locationImg.length
            )
        }
    }

    const setOpen = () => {
        setIsOpen(true)
        setImageIndexOpen(imageIndex)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const renderContent = () => {
        return (
           <div className="z-100 flex flex-col items-center justify-center w-full h-full max-w-7xl mx-auto">
                <div className="flex items-center justify-center w-full gap-4 md:gap-10">
                    
                    {/* LEFT ARROW (Outside) */}
                    <div className="hidden md:block">
                        <Arrow Icon={IoIosArrowBack} handleClick={handlePrevClick} dir="static"/>
                    </div>

                    {/* IMAGE CONTAINER (No outer yellow box) */}
                    <div className="relative w-full aspect-video md:h-[70vh] rounded-xl overflow-hidden shadow-2xl">
                        <DisplayImage p={{
                            imageIndex,
                            direction,
                            imageUrl: "./src/assets/images/locations/",
                            imageName: locationImg[imageIndexOpen],
                            bgPosition: "center",
                        }}/>
                        
                        {/* Mobile Arrows (Still inside for thumb reach) */}
                        <div className="md:hidden">
                            <Arrow Icon={IoIosArrowBack} handleClick={handlePrevClick} dir="left-2" />                   
                            <Arrow Icon={IoIosArrowForward} handleClick={handleNextClick} dir="right-2" />
                        </div>
                    </div>

                    {/* RIGHT ARROW (Outside) */}
                    <div className="hidden md:block">
                        <Arrow Icon={IoIosArrowForward} handleClick={handleNextClick} dir="static"/>
                    </div>
                </div>

                {/* IMAGE NUMBER (Outside & Below) */}
                <div className="mt-8 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/60 text-sm font-mono tracking-tighter">
                    {String(imageIndexOpen + 1).padStart(2, '0')} <span className="mx-2 text-white/20">|</span> {locationImg.length}
                </div>
            </div>
        )
    }
    
    return (
        <div className="relative w-[370px] h-80">
            <div 
                className="
                    relative
                    overflow-hidden
                    border-2 border-yellow-500
                    shadow-[0_30px_60px_rgba(0,0,0,0.25)] 
                    bg-contain
                    w-full h-full rounded-2xl"
                    >
                
                <DisplayImage p={{
                    imageIndex,
                    direction,
                    imageUrl: "./src/assets/images/locations/",
                    imageName: locationImg[imageIndex],
                    bgPosition: "center",
                    handleAction: setOpen
                }}/>
                {/*section to diplay the progress bar */}
                <ProgressBar images={locationImg} imageIndex={imageIndex}/>
                
                {/*section to display the button for user to click next or previous image .*/}
                <Arrow Icon={IoIosArrowBack} handleClick={handlePrevClick} dir="left-2"/>                   
                <Arrow Icon={IoIosArrowForward} handleClick={handleNextClick} dir="right-0.5"/>
                
                <div 
                    className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-700/90 absolute bottom-3 right-3 cursor-pointer"
                    onClick={setOpen}
                >
                    <FaExpandAlt/>
                </div>

               <OpenModal p={{isOpen,renderContent, render:"location", onClose}}/>
                
            </div>
        </div>
    )
}

export default LocationAdd