import { motion, useDragControls } from "framer-motion";
import { useRef } from "react";

const FloatingBubble = () => {
  // 1. Create a ref for the area the bubble can move in
  const constraintsRef = useRef(null);

  return (
    <>
		{/* This div acts as the boundary (the entire screen) */}
		<div 
			ref={constraintsRef} 
			className="fixed inset-0 pointer-events-none z-60" 
		/>

		<motion.div
			drag
			// 2. Constrain the movement to the screen ref
			dragConstraints={constraintsRef}
			dragElastic={0.2}
			// 3. Optional: Make it snap to sides or bounce
			dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
			whileTap={{ scale: 0.9 }}
			whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 10px 8px  rgba(139, 90, 60, 0.7)" // Lighter blue glow
                }}
			style={{
				// Format: [x-offset] [y-offset] [blur] [spread] [color]
				boxShadow: "0px 0px 20px 5px #294023"
			}}
			className="fixed bottom-1 right-1 w-16 h-16  border-2  bg-[#294023] border-[#294023]
					rounded-full  cursor-grab active:cursor-grabbing 
					pointer-events-auto flex items-center justify-center z-70"
		>
			{/* Your icon or image here */}
			<img 
			src="/assets/images/icons/wingOfFreedom.png" 
			className="w-[30px] h-10 pointer-events-none" 
			alt="icon" 
			/>
		</motion.div>
	</>);
};

export default FloatingBubble