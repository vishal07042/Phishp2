import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCursor from "@/components/AnimatedCursor";

const Dashboard = () => {
	useEffect(() => {
		// Launch confetti when page loads
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	}, []);

	const securityStats = [
		{ label: "Security Score", value: "87/100", change: "+12%" },
		{ label: "Phishing Attempts", value: "124", change: "-8%" },
		{ label: "Team Members", value: "32", change: "+3" },
		{ label: "Training Completion", value: "94%", change: "+7%" },
	];

	return (
		<div className='min-h-screen flex flex-col relative z-10'>
			<AnimatedCursor />
			<Navbar />

			<main className='flex-grow pt-24 pb-16'>
				<section className='py-12 px-4'>
					<div className='container mx-auto'>
						<motion.div
							initial={{ opacity: 1, y: 0 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className='mb-12'
						>
							<h1 className='text-3xl md:text-4xl font-bold mb-4'>
								Security Dashboard
							</h1>
							<p className='text-muted-foreground'>
								Your team's security awareness at a glance.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
							{securityStats.map((stat, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 1, y: 0 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: index * 0.1,
									}}
								>
									<Card className='bg-white/5 border border-white/10 overflow-hidden'>
										<CardHeader className='pb-2'>
											<CardTitle className='text-sm font-medium text-muted-foreground'>
												{stat.label}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className='flex justify-between items-baseline'>
												<span className='text-2xl font-bold'>
													{stat.value}
												</span>
												<span
													className={`text-sm ${
														stat.change.startsWith(
															"+"
														)
															? "text-green-500"
															: "text-red-500"
													}`}
												>
													{stat.change}
												</span>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
							<motion.div
								initial={{ opacity: 1, y: 0 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.4 }}
							>
								<Card className='bg-white/5 border border-white/10 overflow-hidden h-full'>
									<CardHeader>
										<CardTitle>Recent Activity</CardTitle>
									</CardHeader>
									<CardContent>
										<div className='space-y-4'>
											{[1, 2, 3, 4].map((_, i) => (
												<div
													key={i}
													className='flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10'
												>
													<div className='flex items-center'>
														<div
															className={`w-2 h-2 rounded-full mr-3 ${
																i % 2 === 0
																	? "bg-green-500"
																	: "bg-red-500"
															}`}
														></div>
														<div>
															<p className='text-sm font-medium'>
																{i % 2 === 0
																	? "Successfully identified phishing attempt"
																	: "Clicked on simulated phishing link"}
															</p>
															<p className='text-xs text-muted-foreground'>
																John Doe •{" "}
																{i + 1} hour
																{i !== 0
																	? "s"
																	: ""}{" "}
																ago
															</p>
														</div>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div
								initial={{ opacity: 1, y: 0 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.5 }}
							>
								<Card className='bg-white/5 border border-white/10 overflow-hidden h-full'>
									<CardHeader>
										<CardTitle>Top Performers</CardTitle>
									</CardHeader>
									<CardContent>
										<div className='space-y-4'>
											{[1, 2, 3, 4].map((i) => (
												<div
													key={i}
													className='flex items-center justify-between'
												>
													<div className='flex items-center space-x-3'>
														<div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-xs font-bold'>
															{i}
														</div>
														<span>Jane Smith</span>
													</div>
													<div>
														<span className='font-bold'>
															{100 - i * 5}%
														</span>
														<span className='text-muted-foreground text-sm ml-2'>
															success rate
														</span>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
};

export default Dashboard;
