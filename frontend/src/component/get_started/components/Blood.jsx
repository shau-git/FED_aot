import {forwardRef ,useEffect, useState, useRef} from 'react'

const Blood = ({paths, drips}, ref) => {
	const canvasRef = useRef(null);

	// --- Animation Loop ---
	const render = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// 1. Draw Persistent Scratches (The Wounds) 
		// These control how lines connect and how line ends look.
		
		ctx.lineJoin = 'round'; // Controls how two lines connect at corners. 
		ctx.lineCap = 'round'; //Line Endings 
		paths.current.forEach(path => {
			if (path.length < 3) return; // With 1 point - CAN'T draw a line

			ctx.beginPath();
			ctx.strokeStyle = '#450a0a'; // Very dark dried blood
			ctx.lineWidth = 10;  //border thickness
			ctx.moveTo(path[0].x, path[0].y);
			path.forEach(p => ctx.lineTo(p.x, p.y));
			ctx.stroke();

			ctx.beginPath();
			ctx.strokeStyle = '#991b1b'; // Fresh blood center
			ctx.lineWidth = 4;
			ctx.moveTo(path[0].x, path[0].y);
			path.forEach(p => ctx.lineTo(p.x, p.y));
			ctx.stroke();
		});

		// 2. Draw Blood Splash
		drips.current.forEach((drip, index) => {
			drip.x += drip.vx;
			drip.y += drip.vy;
			drip.vy += 0.25; // Gravity
			drip.life -= 0.015;

			ctx.fillStyle = '#b91c1c';
			ctx.globalAlpha = drip.life;
			
			// Draw a "tear-drop" shape for the drip
			ctx.beginPath();
			ctx.arc(drip.x, drip.y, drip.size, 0, Math.PI * 2);
			ctx.fill();

			if (drip.life <= 0) drips.current.splice(index, 1);
		});
		ctx.globalAlpha = 1;

		requestAnimationFrame(render);
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		render();
	}, []);

	


    return (
      <canvas 
	  	ref={canvasRef} 
		className="absolute inset-0 z-100 pointer-events-none" 
		
	/>
    )
}

export default Blood