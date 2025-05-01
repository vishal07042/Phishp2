import React, { useCallback } from "react";
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine, Container } from "tsparticles-engine";

interface EnhancedTsParticlesProps {
	id?: string;
	className?: string;
}

const EnhancedTsParticles: React.FC<EnhancedTsParticlesProps> = ({
	id = "tsparticles",
	className = "",
}) => {
	const particlesInit = useCallback(async (engine: Engine) => {
		// Initialize tsparticles
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(
		async (container: Container | undefined) => {
			// Particles loaded
		},
		[]
	);

	return (
		<Particles
			id={id}
			className={`fixed inset-0 z-0 ${className}`}
			init={particlesInit}
			loaded={particlesLoaded}
			options={{
				fullScreen: {
					enable: false,
					zIndex: 0,
				},
				fpsLimit: 120,
				particles: {
					number: {
						value: 150, // Increased number of particles
						density: {
							enable: true,
							value_area: 800,
						},
					},
					color: {
						value: [
							"#9333ea", // Purple
							"#6366f1", // Indigo
							"#3b82f6", // Blue
							"#ec4899", // Pink
							"#10b981", // Emerald
							"#f59e0b", // Amber
							"#ffffff", // White
						],
					},
					shape: {
						type: ["circle", "triangle", "star"],
						stroke: {
							width: 0,
							color: "#000000",
						},
						polygon: {
							nb_sides: 5,
						},
					},
					opacity: {
						value: 0.7,
						random: true,
						anim: {
							enable: true,
							speed: 1,
							opacity_min: 0.1,
							sync: false,
						},
					},
					size: {
						value: 8, // Increased size of particles
						random: true,
						anim: {
							enable: true,
							speed: 2,
							size_min: 0.5, // Increased minimum size
							sync: false,
						},
					},
					line_linked: {
						enable: true,
						distance: 150,
						color: "#ffffff",
						opacity: 0.2,
						width: 1,
					},
					move: {
						enable: true,
						speed: 1,
						direction: "none",
						random: true,
						straight: false,
						out_mode: "out",
						bounce: false,
						attract: {
							enable: true,
							rotateX: 600,
							rotateY: 1200,
						},
					},
					// Add glow effect
					shadow: {
						blur: 5,
						color: {
							value: "#ffffff",
						},
						enable: true,
						offset: {
							x: 0,
							y: 0,
						},
					},
				},
				interactivity: {
					detect_on: "canvas",
					events: {
						onhover: {
							enable: true,
							mode: ["grab", "bubble"],
						},
						onclick: {
							enable: true,
							mode: "push",
						},
						resize: true,
					},
					modes: {
						grab: {
							distance: 140,
							line_linked: {
								opacity: 0.5,
							},
						},
						bubble: {
							distance: 200,
							size: 8,
							duration: 2,
							opacity: 0.8,
							speed: 3,
						},
						repulse: {
							distance: 200,
							duration: 0.4,
						},
						push: {
							particles_nb: 4,
						},
						remove: {
							particles_nb: 2,
						},
					},
				},
				retina_detect: true,
				background: {
					color: "transparent",
					image: "",
					position: "50% 50%",
					repeat: "no-repeat",
					size: "cover",
				},
			}}
		/>
	);
};

export default EnhancedTsParticles;
