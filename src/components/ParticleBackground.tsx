import React, { useRef, useEffect } from "react";

const ParticleBackground = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const particles: {
			x: number;
			y: number;
			size: number;
			speedX: number;
			speedY: number;
		}[] = [];

		const createParticles = () => {
			// Increase particle count for more dense galaxy effect
			const particleCount = Math.floor(window.innerWidth / 15);

			for (let i = 0; i < particleCount; i++) {
				// Determine if this will be a "star" (larger, brighter particle)
				const isStar = Math.random() < 0.15; // 15% chance of being a star

				particles.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					// Increased size range - stars are bigger
					size: isStar
						? Math.random() * 5 + 2.5
						: Math.random() * 3.5 + 1.5,
					// Slower movement for larger particles
					speedX: (Math.random() - 0.5) * (isStar ? 0.2 : 0.5),
					speedY: (Math.random() - 0.5) * (isStar ? 0.2 : 0.5),
				});
			}
		};

		const animate = () => {
			// Use a semi-transparent clear for trail effect
			ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			particles.forEach((particle, index) => {
				particle.x += particle.speedX;
				particle.y += particle.speedY;

				if (particle.x > canvas.width) particle.x = 0;
				else if (particle.x < 0) particle.x = canvas.width;

				if (particle.y > canvas.height) particle.y = 0;
				else if (particle.y < 0) particle.y = canvas.height;

				// Space-themed colors - purples, blues and whites
				const colors = [
					"rgba(147, 51, 234, 0.4)", // Purple
					"rgba(79, 70, 229, 0.4)", // Indigo
					"rgba(59, 130, 246, 0.4)", // Blue
					"rgba(255, 255, 255, 0.6)", // White (stars)
				];

				// Larger particles are brighter (stars)
				const colorIndex =
					particle.size > 4 ? 3 : Math.floor(Math.random() * 3);
				ctx.fillStyle = colors[colorIndex];

				// Draw the particle
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				ctx.fill();

				// Add glow effect for larger particles (stars)
				if (particle.size > 4) {
					const glow = ctx.createRadialGradient(
						particle.x,
						particle.y,
						0,
						particle.x,
						particle.y,
						particle.size * 3
					);
					glow.addColorStop(0, "rgba(255, 255, 255, 0.3)");
					glow.addColorStop(1, "rgba(255, 255, 255, 0)");

					ctx.fillStyle = glow;
					ctx.beginPath();
					ctx.arc(
						particle.x,
						particle.y,
						particle.size * 3,
						0,
						Math.PI * 2
					);
					ctx.fill();
				}

				// Connect particles that are close
				particles.forEach((otherParticle, otherIndex) => {
					if (index !== otherIndex) {
						const dx = particle.x - otherParticle.x;
						const dy = particle.y - otherParticle.y;
						const distance = Math.sqrt(dx * dx + dy * dy);

						// Increase connection distance for more web-like effect
						if (distance < 150) {
							// Space-themed connection colors
							const connectionColors = [
								`rgba(147, 51, 234, ${0.15 - distance / 1500})`, // Purple
								`rgba(79, 70, 229, ${0.15 - distance / 1500})`, // Indigo
								`rgba(59, 130, 246, ${0.15 - distance / 1500})`, // Blue
							];

							ctx.beginPath();
							ctx.strokeStyle =
								connectionColors[
									Math.floor(
										Math.random() * connectionColors.length
									)
								];
							ctx.lineWidth = 0.8; // Slightly thicker lines
							ctx.moveTo(particle.x, particle.y);
							ctx.lineTo(otherParticle.x, otherParticle.y);
							ctx.stroke();
						}
					}
				});
			});

			requestAnimationFrame(animate);
		};

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			particles.length = 0;
			createParticles();
		};

		window.addEventListener("resize", handleResize);

		createParticles();
		animate();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className='fixed top-0 left-0 w-full h-full pointer-events-none z-0'
		/>
	);
};

export default ParticleBackground;
