import React, { useEffect, useRef, useState } from "react";
import { Fireworks } from "fireworks-js";
import type { FireworksOptions } from "fireworks-js/dist/types/options";

// Define different firework color themes
const fireworkThemes = [
	{ name: "cosmic", hueMin: 240, hueMax: 290 }, // Blue to Purple
	{ name: "sunset", hueMin: 0, hueMax: 60 }, // Red to Yellow
	{ name: "aurora", hueMin: 80, hueMax: 160 }, // Green to Teal
	{ name: "rainbow", hueMin: 0, hueMax: 360 }, // Full spectrum
	{ name: "galaxy", hueMin: 270, hueMax: 330 }, // Purple to Pink
];

const FireworksBackground: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const fireworksRef = useRef<Fireworks | null>(null);
	const [currentTheme, setCurrentTheme] = useState(fireworkThemes[0]);

	useEffect(() => {
		if (!containerRef.current) return;

		// Configure fireworks options with enhanced settings
		const options: FireworksOptions = {
			hue: {
				min: currentTheme.hueMin,
				max: currentTheme.hueMax,
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
			particles: 120, // More particles for bigger explosions
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

		// Auto-launch fireworks at random intervals with varying patterns
		const autoLaunchInterval = setInterval(() => {
			// Increase chance of fireworks (40% chance)
			if (Math.random() > 0.6) {
				// Random position across the width
				const x = Math.random() * window.innerWidth;
				const y = window.innerHeight;

				// Randomly decide how many fireworks to launch (1-3)
				const count = Math.floor(Math.random() * 3) + 1;

				// Launch the fireworks
				fireworksRef.current?.launch(count, { x, y });

				// Occasionally change the color theme (10% chance when fireworks launch)
				if (Math.random() > 0.9) {
					const newTheme =
						fireworkThemes[
							Math.floor(Math.random() * fireworkThemes.length)
						];
					setCurrentTheme(newTheme);

					// Update the fireworks options with new colors
					if (fireworksRef.current) {
						fireworksRef.current.updateOptions({
							hue: {
								min: newTheme.hueMin,
								max: newTheme.hueMax,
							},
						});
					}
				}
			}
		}, 1500); // More frequent fireworks

		// Add special pattern launches occasionally
		const patternLaunchInterval = setInterval(() => {
			if (Math.random() > 0.85) {
				// 15% chance for pattern
				// Create a pattern of fireworks (like a line, circle, or burst)
				const pattern = Math.floor(Math.random() * 3);

				switch (pattern) {
					case 0: // Line pattern
						for (let i = 0; i < 5; i++) {
							setTimeout(() => {
								const x =
									window.innerWidth * 0.2 +
									window.innerWidth * 0.6 * (i / 4);
								fireworksRef.current?.launch(1, {
									x,
									y: window.innerHeight,
								});
							}, i * 200);
						}
						break;

					case 1: // Burst pattern (all at once)
						for (let i = 0; i < 5; i++) {
							const angle = (i / 5) * Math.PI * 2;
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

					case 2: // Random cluster
						const centerX = Math.random() * window.innerWidth;
						for (let i = 0; i < 3; i++) {
							const offsetX = (Math.random() - 0.5) * 200;
							fireworksRef.current?.launch(1, {
								x: centerX + offsetX,
								y: window.innerHeight,
							});
						}
						break;
				}
			}
		}, 5000);

		return () => {
			clearInterval(autoLaunchInterval);
			clearInterval(patternLaunchInterval);
			fireworksRef.current?.stop();
		};
	}, [currentTheme]);

	return (
		<div
			ref={containerRef}
			className='fixed inset-0 z-0 pointer-events-none'
			style={{ background: "transparent" }}
		/>
	);
};

export default FireworksBackground;
