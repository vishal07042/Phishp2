import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useGamification } from "@/components/GamificationSystem";

const HeroSection = () => {
	const { addPoints } = useGamification();
	const [hasInteracted, setHasInteracted] = useState(false);

	// Parallax scroll effect
	const { scrollY } = useScroll();
	const y1 = useTransform(scrollY, [0, 500], [0, -100]);
	const y2 = useTransform(scrollY, [0, 500], [0, -50]);
	const opacity = useTransform(scrollY, [0, 300], [1, 0]);

	// Handle interaction with the hero section
	const handleInteraction = () => {
		if (!hasInteracted) {
			addPoints(15, "Exploring the site!");
			setHasInteracted(true);
		}
	};

	return (
		<section
			className='relative min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 overflow-hidden'
			onClick={handleInteraction}
		>
			{/* Floating space elements */}
			<motion.div
				className='absolute w-20 h-20 rounded-full bg-purple-600/20 blur-xl'
				style={{ x: -100, y: -100, opacity: 0.6 }}
				animate={{
					x: [-100, -80, -100],
					y: [-100, -120, -100],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			<motion.div
				className='absolute w-32 h-32 rounded-full bg-blue-600/20 blur-xl'
				style={{ right: -80, bottom: -80, opacity: 0.6 }}
				animate={{
					x: [-20, 20, -20],
					y: [-20, 20, -20],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			<motion.div
				style={{ y: y1, opacity }}
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='text-center max-w-4xl mx-auto z-10'
			>
				<motion.h1
					className='text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 neon-glow'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.8 }}
				>
					<motion.span
						animate={{
							backgroundPosition: [
								"0% 50%",
								"100% 50%",
								"0% 50%",
							],
						}}
						transition={{ duration: 10, repeat: Infinity }}
						style={{
							backgroundSize: "200% auto",
							WebkitBackgroundClip: "text",
							backgroundClip: "text",
							display: "inline-block",
						}}
					>
						Train Minds, Not Just Systems
					</motion.span>
				</motion.h1>

				<motion.p
					className='text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.8 }}
				>
					Phishing Fire Drill is a gamified cybersecurity training
					platform that prepares your team for real-world threats
					through interactive simulations.
				</motion.p>

				<motion.div
					className='flex flex-col sm:flex-row gap-4 justify-center items-center'
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.6, duration: 0.5 }}
				>
					<AnimatedButton
						size='lg'
						className='bg-gradient-to-r from-purple-600 to-blue-600 border-none text-white'
						hoverScale={1.05}
						glowColor='rgba(147, 51, 234, 0.7)'
						pulseEffect={true}
						rewardPoints={10}
						rewardReason='Starting your security journey!'
					>
						<Shield className='mr-2 h-5 w-5' />
						Start Free Trial
						<ArrowRight className='ml-2 w-4 h-4 transition-transform group-hover:translate-x-1' />
					</AnimatedButton>

					<AnimatedButton
						size='lg'
						variant='outline'
						className='border-purple-500 text-purple-500'
						hoverScale={1.05}
						rewardPoints={5}
						rewardReason='Learning more about security!'
					>
						<Zap className='mr-2 h-5 w-5' />
						Watch Demo
					</AnimatedButton>
				</motion.div>

				{/* Feature badges */}
				<motion.div
					className='flex flex-wrap justify-center gap-3 mt-8'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 0.5 }}
				>
					{[
						"AI-Powered",
						"Gamified",
						"Real-time Feedback",
						"Analytics",
					].map((feature, index) => (
						<motion.span
							key={feature}
							className='bg-gradient-to-r from-purple-900/50 to-blue-900/50 px-3 py-1 rounded-full text-sm font-medium border border-purple-800/50'
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.9 + index * 0.1 }}
							whileHover={{
								scale: 1.05,
								boxShadow: "0 0 10px rgba(147, 51, 234, 0.5)",
							}}
						>
							{feature}
						</motion.span>
					))}
				</motion.div>
			</motion.div>

			{/* Enhanced floating email animation */}
			<motion.div
				style={{ y: y2 }}
				className='absolute w-72 h-72 rounded-xl overflow-hidden'
				animate={{
					y: [0, -15, 0],
					rotate: [0, 5, 0, -5, 0],
					opacity: 1,
					scale: 1,
				}}
				transition={{
					repeat: Infinity,
					duration: 6,
					ease: "easeInOut",
				}}
				initial={{ opacity: 0, scale: 0.8 }}
				whileHover={{ scale: 1.05 }}
			>
				{/* Email interface mockup */}
				<div className='w-full h-full bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-xl p-3 shadow-2xl'>
					<div className='bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-t-lg p-2 flex items-center border-b border-purple-500/20'>
						<div className='w-3 h-3 rounded-full bg-red-500 mr-2'></div>
						<div className='w-3 h-3 rounded-full bg-yellow-500 mr-2'></div>
						<div className='w-3 h-3 rounded-full bg-green-500 mr-2'></div>
						<div className='text-xs text-gray-400 ml-2'>
							Suspicious Email
						</div>
					</div>
					{/* <div className="mx-14">
						<div className='p-6  '>
							<div className='flex justify-between items-center mb-3'>
								<div className='text-xs text-gray-400'>
									From:{" "}
									<span className='text-red-400'>
										ceo-urgent@g00gle-security.com
									</span>
								</div>
								<div className='h-4 w-4 text-yellow-500'>
									⚠️
								</div>
							</div>

							<div className='text-sm font-medium mb-2 text-white'>
								Urgent: Security Alert - Action Required
							</div>

							<div className='text-xs text-gray-300 mb-4'>
								Dear Employee, We've detected unusual activity
								on your account. Please verify your credentials
								immediately by clicking the link below...
							</div>

							<motion.button
								className='w-full bg-blue-600/80 text-white text-xs py-1 rounded'
								whileHover={{
									scale: 1.03,
									backgroundColor: "rgba(37, 99, 235, 0.9)",
								}}
								whileTap={{ scale: 0.98 }}
							>
								Verify Account
							</motion.button>

							<motion.div
								className='mt-4 flex justify-between'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1.2, duration: 0.5 }}
							>
								<motion.button
									className='bg-green-600/80 text-white text-xs py-1 px-3 rounded'
									whileHover={{ scale: 1.05 }}
								>
									Safe
								</motion.button>

								<motion.button
									className='bg-red-600/80 text-white text-xs py-1 px-3 rounded'
									whileHover={{ scale: 1.05 }}
								>
									Phishing
								</motion.button>
							</motion.div>
						</div>
					</div> */}
				</div>
			</motion.div>
		</section>
	);
};

export default HeroSection;
