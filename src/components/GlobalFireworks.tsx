import React, { useEffect, useRef } from "react";
import { Fireworks } from "fireworks-js";
import type { FireworksOptions } from "fireworks-js/dist/types/options";

// Define a default firework theme
const defaultTheme = { name: "default", hueMin: 0, hueMax: 360 }; // Full spectrum

const GlobalFireworks: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const fireworksRef = useRef<Fireworks | null>(null);

	// Initialize fireworks
	useEffect(() => {
		if (!containerRef.current) return;

		// Configure fireworks options with enhanced settings
		const options: FireworksOptions = {
			hue: {
				min: defaultTheme.hueMin,
				max: defaultTheme.hueMax,
			},
			delay: {
				min: 15,
				max: 30,
			},
			rocketsPoint: {
				min: 40,
				max: 60,
			},
			opacity: 0.7,
			speed: 1.2,
			acceleration: 1.05,
			friction: 0.97,
			gravity: 1.5,
			particles: 80, // Reduced for better performance
			trace: 4, // Longer trails
			explosion: 8, // Bigger explosions
			autoresize: true,
			brightness: {
				min: 50,
				max: 90, // Brighter fireworks
				decay: {
					min: 0.01,
					max: 0.02,
				},
			},
			boundaries: {
				visible: false,
			},
			sound: {
				enabled: false,
			},
			mouse: {
				click: true,
				move: false,
				max: 5, // More fireworks on click
			},
		};

		// Initialize fireworks
		fireworksRef.current = new Fireworks(containerRef.current, options);
		fireworksRef.current.start();

		// Launch initial fireworks when page loads
		setTimeout(() => {
			for (let i = 0; i < 3; i++) {
				const x = Math.random() * window.innerWidth;
				fireworksRef.current?.launch(1, { x, y: window.innerHeight });
			}
		}, 500);

		// Auto-launch fireworks at random intervals with varying patterns (less frequently)
		const autoLaunchInterval = setInterval(() => {
			// Reduced chance of fireworks (20% chance) for better performance
			if (Math.random() > 0.8) {
				// Random position across the width
				const x = Math.random() * window.innerWidth;
				const y = window.innerHeight;

				// Launch only one firework at a time for better performance
				const count = 1;

				// Launch the fireworks
				fireworksRef.current?.launch(count, { x, y });
			}
		}, 4000); // Less frequent fireworks for better performance

		// Add special pattern launches very occasionally
		const patternLaunchInterval = setInterval(() => {
			if (Math.random() > 0.95) {
				// Reduced to 5% chance for better performance
				// Create a simpler pattern of fireworks
				const pattern = Math.floor(Math.random() * 2); // Only 2 patterns for better performance

				switch (pattern) {
					case 0: // Simplified line pattern
						for (let i = 0; i < 3; i++) {
							// Reduced from 5 to 3
							setTimeout(() => {
								const x =
									window.innerWidth * 0.2 +
									window.innerWidth * 0.6 * (i / 2);
								fireworksRef.current?.launch(1, {
									x,
									y: window.innerHeight,
								});
							}, i * 300); // Increased delay
						}
						break;

					case 1: // Simplified burst pattern
						for (let i = 0; i < 3; i++) {
							// Reduced from 5 to 3
							const angle = (i / 3) * Math.PI * 2;
							const distance = window.innerWidth * 0.2;
							const x =
								window.innerWidth / 2 +
								Math.cos(angle) * distance;
							fireworksRef.current?.launch(1, {
								x,
								y: window.innerHeight,
							});
						}
						break;
				}
			}
		}, 10000); // Less frequent for better performance

		return () => {
			clearInterval(autoLaunchInterval);
			clearInterval(patternLaunchInterval);
			fireworksRef.current?.stop();
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className='fixed inset-0 z-0 pointer-events-none'
			style={{ background: "transparent" }}
		/>
	);
};

export default GlobalFireworks;
