import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Bot, Zap, Trophy, BarChart3, Shield, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCursor from "@/components/AnimatedCursor";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useGamification } from "@/components/GamificationSystem";

const Features = () => {
	const { addPoints, unlockAchievement } = useGamification();
	const [visitedFeatures, setVisitedFeatures] = useState<Set<number>>(
		new Set()
	);

	// Parallax scroll effect
	const { scrollY } = useScroll();
	const y1 = useTransform(scrollY, [0, 500], [0, -50]);
	const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

	useEffect(() => {
		// Launch confetti when page loads
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});

		// Award points for visiting the features page
		addPoints(5, "Exploring features!");

		// Check for explorer achievement when user visits all main pages
		// This would be more sophisticated in a real app with proper tracking
		setTimeout(() => {
			unlockAchievement("explorer");
		}, 2000);
	}, []);

	// Track which features the user has viewed
	const handleFeatureView = (index: number) => {
		if (!visitedFeatures.has(index)) {
			const newVisitedFeatures = new Set(visitedFeatures);
			newVisitedFeatures.add(index);
			setVisitedFeatures(newVisitedFeatures);

			// Award points for viewing each feature
			addPoints(2, `Learned about ${features[index].title}`);

			// If user has viewed all features, give bonus points
			if (newVisitedFeatures.size === features.length) {
				addPoints(10, "Explored all features!");
				confetti({
					particleCount: 50,
					spread: 70,
					origin: { y: 0.6 },
				});
			}
		}
	};

	const features = [
		{
			title: "AI-Powered Simulations",
			description:
				"Our AI creates personalized phishing attempts based on your company's actual communication style.",
			icon: <Bot className='h-8 w-8 text-purple-500' />,
			details: [
				"Learns from your organization's email patterns",
				"Adapts difficulty based on user performance",
				"Creates realistic scenarios tailored to your industry",
			],
		},
		{
			title: "Real-time Feedback",
			description:
				"Immediate feedback when users interact with simulated phishing attempts.",
			icon: <Zap className='h-8 w-8 text-blue-500' />,
			details: [
				"Instant explanations of phishing indicators",
				"Educational tips after each interaction",
				"Visual highlighting of suspicious elements",
			],
		},
		{
			title: "Gamified Learning",
			description:
				"Points, badges, and leaderboards make security training engaging and competitive.",
			icon: <Trophy className='h-8 w-8 text-yellow-500' />,
			details: [
				"Achievement system with unlockable badges",
				"Team competitions and challenges",
				"Progress tracking and level-up system",
			],
		},
		{
			title: "Analytics Dashboard",
			description:
				"Comprehensive reporting on team performance and security awareness improvement.",
			icon: <BarChart3 className='h-8 w-8 text-green-500' />,
			details: [
				"Individual and team performance metrics",
				"Vulnerability trend analysis",
				"Customizable reports for stakeholders",
			],
		},
	];

	return (
		<div className='min-h-screen flex flex-col'>
			<AnimatedCursor />
			<Navbar />

			<main className='flex-grow pt-24 pb-16 relative'>
				<section className='py-20 px-4 relative z-10'>
					<div className='container mx-auto'>
						<motion.div
							style={{ y: y1, opacity }}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className='text-center mb-16'
						>
							<motion.h1
								className='text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 neon-glow'
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
								}}
							>
								Powerful Features
							</motion.h1>
							<p className='text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto'>
								Our phishing simulation platform comes packed
								with everything you need to build a
								security-first culture.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{features.map((feature, index) => (
								<AnimatedCard
									key={index}
									title={
										<div className='flex items-center'>
											{feature.icon}
											<span className='ml-3'>
												{feature.title}
											</span>
										</div>
									}
									description={feature.description}
									hoverEffect='glow'
									glowColor={
										index === 0
											? "rgba(147, 51, 234, 0.5)"
											: index === 1
											? "rgba(59, 130, 246, 0.5)"
											: index === 2
											? "rgba(234, 179, 8, 0.5)"
											: "rgba(34, 197, 94, 0.5)"
									}
									delay={index * 0.1}
									className='border border-white/10 bg-black/50'
									onViewportEnter={() =>
										handleFeatureView(index)
									}
								>
									<div className='mt-4'>
										<ul className='space-y-2'>
											{feature.details.map(
												(detail, detailIndex) => (
													<motion.li
														key={detailIndex}
														className='flex items-start'
														initial={{
															opacity: 0,
															x: -10,
														}}
														whileInView={{
															opacity: 1,
															x: 0,
														}}
														transition={{
															delay:
																0.3 +
																detailIndex *
																	0.1,
														}}
														viewport={{
															once: true,
														}}
													>
														<CheckCircle className='h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5' />
														<span className='text-gray-300'>
															{detail}
														</span>
													</motion.li>
												)
											)}
										</ul>
									</div>
								</AnimatedCard>
							))}
						</div>

						<motion.div
							className='mt-16 text-center'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							viewport={{ once: true }}
						>
							<AnimatedButton
								size='lg'
								className='bg-gradient-to-r from-purple-600 to-blue-600 border-none text-white'
								hoverScale={1.05}
								glowColor='rgba(147, 51, 234, 0.7)'
								rewardPoints={5}
								rewardReason='Interested in our security features!'
							>
								<Shield className='mr-2 h-5 w-5' />
								Get Started with Security Training
							</AnimatedButton>
						</motion.div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
};

export default Features;
