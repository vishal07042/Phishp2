import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
	id: number;
	x: number;
	y: number;
	size: number;
	color: string;
	alpha: number;
	vx: number;
	vy: number;
}

const ParticlesBackground = () => {
	const [particles, setParticles] = useState<Particle[]>([]);

	useEffect(() => {
		// Create initial particles - increased count for galaxy effect
		const particleCount = Math.min(window.innerWidth / 15, 60); // Increased count

		// Space/galaxy themed colors - more blues and purples with some bright stars
		const colors = [
			"#9333ea", // Bright purple
			"#6366f1", // Indigo
			"#4f46e5", // Deep blue
			"#3b82f6", // Blue
			"#2563eb", // Royal blue
			"#a855f7", // Purple
			"#d8b4fe", // Light purple
			"#ffffff", // White (stars)
		];

		// Create different sized particles for depth effect
		const initialParticles = Array.from(
			{ length: particleCount },
			(_, i) => {
				// Determine if this will be a "star" (larger, brighter particle)
				const isStar = Math.random() < 0.2; // 20% chance of being a star

				return {
					id: i,
					x: Math.random() * window.innerWidth,
					y: Math.random() * window.innerHeight,
					// Increased size range - stars are bigger
					size: isStar
						? Math.random() * 6 + 3
						: Math.random() * 4 + 1.5,
					color: isStar
						? "#ffffff"
						: colors[Math.floor(Math.random() * colors.length)],
					// Stars are brighter
					alpha: isStar
						? Math.random() * 0.3 + 0.7
						: Math.random() * 0.5 + 0.2,
					// Slower movement for larger particles
					vx: (Math.random() - 0.5) * (isStar ? 0.1 : 0.3),
					vy: (Math.random() - 0.5) * (isStar ? 0.1 : 0.3),
				};
			}
		);

		setParticles(initialParticles);

		// Animation loop
		const animationFrame = requestAnimationFrame(animateParticles);

		function animateParticles() {
			setParticles((prevParticles) =>
				prevParticles.map((particle) => {
					// Update positions
					let newX = particle.x + particle.vx;
					let newY = particle.y + particle.vy;

					// Bounce off edges
					if (newX < 0 || newX > window.innerWidth) {
						particle.vx *= -1;
						newX = particle.x + particle.vx;
					}

					if (newY < 0 || newY > window.innerHeight) {
						particle.vy *= -1;
						newY = particle.y + particle.vy;
					}

					return {
						...particle,
						x: newX,
						y: newY,
					};
				})
			);

			requestAnimationFrame(animateParticles);
		}

		// Handle window resize
		const handleResize = () => {
			setParticles((prevParticles) =>
				prevParticles.map((particle) => ({
					...particle,
					x: Math.min(particle.x, window.innerWidth),
					y: Math.min(particle.y, window.innerHeight),
				}))
			);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			cancelAnimationFrame(animationFrame);
		};
	}, []);

	return (
		<div className='fixed inset-0 z-0 pointer-events-none overflow-hidden'>
			{particles.map((particle) => (
				<motion.div
					key={particle.id}
					className='absolute rounded-full'
					style={{
						width: particle.size,
						height: particle.size,
						backgroundColor: particle.color,
						opacity: particle.alpha,
						x: particle.x,
						y: particle.y,
						// Enhanced glow effect for space theme
						boxShadow: `0 0 ${particle.size * 3}px ${
							particle.color
						}`,
						// Add a subtle pulse animation to some particles
						animation:
							Math.random() > 0.7
								? "twinkle 4s infinite ease-in-out"
								: "none",
					}}
					animate={{
						x: particle.x,
						y: particle.y,
						transition: { duration: 0.1, ease: "linear" },
					}}
				/>
			))}

			{/* Add a few nebula-like blurred areas for galaxy effect */}
			<div
				className='nebula'
				style={{
					width: "300px",
					height: "300px",
					left: "10%",
					top: "20%",
					background:
						"radial-gradient(circle, rgba(147,51,234,0.2) 0%, rgba(0,0,0,0) 70%)",
				}}
			></div>
			<div
				className='nebula'
				style={{
					width: "400px",
					height: "400px",
					right: "15%",
					bottom: "30%",
					background:
						"radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(0,0,0,0) 70%)",
				}}
			></div>
			<div
				className='nebula'
				style={{
					width: "250px",
					height: "250px",
					right: "30%",
					top: "15%",
					background:
						"radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%)",
				}}
			></div>
		</div>
	);
};

export default ParticlesBackground;
