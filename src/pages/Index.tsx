import React, { useEffect } from "react";
import AnimatedCursor from "@/components/AnimatedCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import DemoSection from "@/components/DemoSection";
import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import confetti from "canvas-confetti";

// Add some global styles
import "../styles/global.css";

const Index = () => {
	// Launch confetti on page load
	useEffect(() => {
		const timer = setTimeout(() => {
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	// Smooth scroll behavior for anchor links
	useEffect(() => {
		const handleAnchorClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				target.tagName === "A" &&
				target.getAttribute("href")?.startsWith("#")
			) {
				e.preventDefault();
				const id = target.getAttribute("href")?.replace("#", "");
				const element = document.getElementById(id || "");
				if (element) {
					element.scrollIntoView({
						behavior: "smooth",
					});
				}
			}
		};

		document.addEventListener("click", handleAnchorClick);
		return () => document.removeEventListener("click", handleAnchorClick);
	}, []);

	return (
		<div className='min-h-screen flex flex-col'>
			<AnimatedCursor />
			<Navbar />

			<main className='flex-grow relative z-10'>
				<HeroSection />

				<div id='features'>
					<ProblemSection />
				</div>

				<div id='how-it-works'>
					<SolutionSection />
				</div>

				<DemoSection />

				<TestimonialSection />

				<CallToAction />
			</main>

			<Footer />
		</div>
	);
};

export default Index;
