import {useState, useRef, useEffect} from 'react'
import {motion, AnimatePresence} from "framer-motion"

import {data, Blood, Thunder, Audio, SelectImage, Introduction, Button} from "./get_started_config"
import {useIsMobile} from "../home/homeConfig"
import { RiKnifeLine } from "react-icons/ri";

//flex justify-center items-center  //max-h-[90vh]    src="./src/assets/images/images/Eren_1.png"

const GetStarted = ({setCurrentPage}) => {

	const [isCursorActive, setIsCursorActive] = useState(false);
	const [slice, setSlice] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0);
	const [imageIndex, setImageIndex] = useState(0)
	const transformSoundRef = useRef(null);
	const containerRef = useRef(null);

	const [transforming, setTransforming] = useState(false); 
	const paths = useRef([]); // The persistent scratches
	const currentPath = useRef([]);
	const drips = useRef([]);   // The oozing blood

	const isDragging = useRef(false);

	const isMobile = useIsMobile()
	
	const changeCurrentIndex = () => {
        if(activeIndex < 4) {
            setActiveIndex(prev => prev + 1)
        } else {
            setActiveIndex(0)
        } 
		setImageIndex(0)
    }

	const createDrip = (x, y) => {
		for(let i = 0 ; i < 4; i++) {
			drips.current.push({
				x,
				y,
				vx: (Math.random() - 0.5) * 12,  
				vy: (Math.random() - 0.5) * 12, 
				speed: Math.random() * 2 + 1, // Slow crawl down
				size: Math.random() * 5 + 2,
				life: 1.0,
        	});
		}
        
    };

	// start dragging (scratch)
    const handlePointerDown = (e) => {
		if(!slice) return 
        isDragging.current = true
		setIsCursorActive(true); // Trigger cursor change

		let initailPoint;

		if(e._reactName === "onTouchStart") {
			initailPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY }
		} else {
			initailPoint = { x: e.clientX, y: e.clientY }; //clientX - tells you the horizontal position of the mouse cursor relative to the browser's visible viewport
		}

        currentPath.current = [initailPoint];
    };


	// during dragging (scratch)
    const handlePointerMove = (e) => {
		
        if (!isDragging.current || !slice) return;

		let newPoint;

		if(e._reactName === "onTouchMove") {
			newPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY }
		} else {
			newPoint = { x: e.clientX, y: e.clientY }; 
		}

        currentPath.current.push(newPoint);
        paths.current = [currentPath.current] 
 
        // Create drips along the path
        if (Math.random() > 0.7) { // Only spawn drips occasionally for a cleaner look
        createDrip(newPoint.x, newPoint.y);
        }
    };

	// finish dragging (scratch)
    const handlePointerUp = () => {
        if (!isDragging.current || !slice) return;
        isDragging.current = false;
		setIsCursorActive(false); // Revert cursor

        // ✅ FIX: Only trigger if path has multiple points (actual drawing)
        if (currentPath.current.length > 2) {
            triggerTransformation();
        }
        
        currentPath.current = [];
    };

	// triger the lightning and sound effect
    const triggerTransformation = () => {
        paths.current = []; 
        drips.current = [];
        setTransforming(true);
		// ✅ Play audio

		if (transformSoundRef.current) {
			transformSoundRef.current.currentTime = 0;
			transformSoundRef.current.play();
		}

        setTimeout(() => {
            setTransforming(false);
            changeCurrentIndex()
        }, 3000);
    };

	// Prevent scrolling when slice is active
	useEffect(() => {
		if (slice) {
			// Prevent scrolling
			document.body.style.overflow = 'hidden';
			document.body.style.position = 'fixed';
			document.body.style.width = '100%';
		} else {
			// Re-enable scrolling
			document.body.style.overflow = '';
			document.body.style.position = '';
			document.body.style.width = '';
		}

		// Cleanup on unmount
		return () => {
			document.body.style.overflow = '';
			document.body.style.position = '';
			document.body.style.width = '';
		};
	}, [slice]);


	const characterImages = data[activeIndex]["img"]

	return (
		<div
			className={`overflow-x-hidden relative inset-0 bg-[url(./src/assets/images/wallpapers/GetStarted.jpg)] 
				min-h-screen bg-no-repeat bg-center bg-cover  flex items-center justify-center w-full  ${slice ? 'overflow-hidden fixed inset-0 select-none' : 'overflow-y-scroll'}
			`}
			style={{
				cursor: isCursorActive
					? `url(${new URL('./assets/images/cursor/sword_cursor.png', import.meta.url).href}), crosshair`
					: `url(${new URL('./assets/images/cursor/eren__cursor.png', import.meta.url).href}), auto`
			}}
			ref={containerRef }
			onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
			onMouseDown={handlePointerDown}
			onMouseMove={handlePointerMove}
			onMouseUp={handlePointerUp}
			
		>	
			<div className="fixed inset-0 bg-black/70"/>

			{/* audio tag for the lightning */}
			<audio ref={transformSoundRef} src="./src/assets/audio/GetStarted/transformation_snk.mp3" preload="auto" />

			{/* Persistent Canvas for Scratches and Drips */}
			<Blood {...{paths, drips }}/>

			{/*Thunder animation */}
			{transforming && (<Thunder />)}

			{/*Content */}
			<motion.div
				className={`
					mx-auto  max-w-6xl 
					w-full  p-5  text-white  
					relative `}
				initial={{ scale: 0.8, y: 50 }}
				animate={{ scale: 1, y: 0 }}
				exit={{ scale: 0.8, y: 50 }}
				onClick={(e) => e.stopPropagation()}
			>		
				{/* Main Content Area (Image + Text) */}
				<div className="flex flex-col md:flex-row items-center justify-between flex-1 gap-10 relative">
					
					{/* 2. Hero Image Section (Animated) */}
					<div className="relative w-full md:flex-1 flex justify-center items-center min-h-[500px] md:h-[60vh]">
						<div 
							className={`pointer-events-auto cursor-pointer z-100 active:bg-red-500/50 hover:bg-red-400/50 w-13 h-13 absolute top-0 right-0 rounded-full flex items-center justify-center ${slice?"bg-red-800" : " "}`} 
							onClick={(e) => {
								e.stopPropagation(); 
								setSlice(prev => !prev);
							}}
							onMouseDown={(e) => e.stopPropagation()} 
							onTouchStart={(e) => e.stopPropagation()} 
							
						>
							<RiKnifeLine className=""/>
						</div>
						<AnimatePresence mode="wait">
							<motion.img
								key={imageIndex}
								src={`./src/assets/images/Eren/${characterImages[imageIndex]}`}
								className="h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 1.1 }}
								transition={{ duration: 0.5 }}
							/>
						</AnimatePresence>
						
					</div>
					
					{isMobile && <SelectImage {...{characterImages,imageIndex,setImageIndex}}/>}

					{/* Get Started button & Audio Action Area */}
					<div className='w-full md:flex-1 flex flex-col items-start text-white font-serif'>
					
						<Introduction {...{data: data[activeIndex]}}/>
						{/* Audio Group + Get Started Button */}
						<div className="flex flex-col items-start gap-6">
							<Audio {...{data: data[activeIndex]}}/>
							<Button setCurrentPage={setCurrentPage}/>
						</div>
						
					</div>
				</div> 
				
				{/* Bottom Selection Bar - Fixed at the baseline */}
				{!isMobile && <SelectImage {...{characterImages,imageIndex,setImageIndex}}/>}
			</motion.div>
		</div>
	)
}

export default GetStarted