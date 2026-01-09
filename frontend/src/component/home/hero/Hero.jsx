import {useState, memo} from 'react'
import { IoIosArrowForward , IoIosArrowBack } from "react-icons/io";
import {Arrow, RandomQuote, heroImages, MoreButton, ProgressBar, DisplayImage} from "../homeConfig"

const Hero = ({showAlert}) => {
    const [imageIndex, setImageIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const [currentSeason, setCurrentSeason] = useState("More")
    const [visible, setVisible] = useState(false)

    // when user click the more button
    const toggleVisible = () => {
        setVisible((prev) => !prev)
    }

    // allow user to close the more button when clicking the image div
    const closeVisible = () => {
        if(visible === true) {
            setVisible(false)
        }
    }

    // to handle action for clicking the button for showing previous bg image
    const handlePrevClick = () => {
        setDirection(-1);
        setImageIndex( prev => 
            (prev + heroImages[currentSeason].length - 1) % heroImages[currentSeason].length
        )
    }

    // to handle action for clicking the button for showing next bg image
    const handleNextClick = () => {
        setDirection(1);
        setImageIndex( prev =>
            (prev + heroImages[currentSeason].length + 1) % heroImages[currentSeason].length
        )
    }

    // to change the bg image season, use in <MoreButton /> and is for the display after clicking the button
    const handleDisplay = (season) => {
        setImageIndex(0)
        setCurrentSeason(season)
    }
    
    return (
        <main className="relative" style={{ cursor: "url('./src/assets/images/cursor/Armin__cursor.png'), auto" }}>

            {/* section for user to change the season of the bg image*/}
            <MoreButton currentSeason={currentSeason} handleDisplay={handleDisplay} showAlert={showAlert} toggleVisible={toggleVisible} visible={visible}/>
            

            {/*section to diplay the progress bar */}
            <ProgressBar images={heroImages[currentSeason]} imageIndex={imageIndex}/>

            {/*section to diplay the hero image min-h-[800px]*/}
            <section className="relative h-[calc(100vh-55px)] w-full flex items-end mb-20">
                <div className="absolute inset-0">

                    <DisplayImage p={{
                        imageIndex, 
                        direction, 
                        imageUrl: "./src/assets/images/hero/", 
                        imageName: heroImages[currentSeason][imageIndex],
                        bgPosition: heroImages[currentSeason][imageIndex].split('/')[1] === "ToBeContinued.png" ? 'center bottom' : 'center',
                        handleAction: closeVisible,
                        usage: 'hero'
                        }} />
                </div>
                
                {/*section to display the button for user to click next or previous image .*/}
                <Arrow Icon={IoIosArrowBack} handleClick={handlePrevClick} dir="left-4"/>                   
                <Arrow Icon={IoIosArrowForward} handleClick={handleNextClick} dir="right-2"/>

                {/*section for random quote */}
                <RandomQuote/>
                
            </section>
        </main>
    )
}

export default memo(Hero)