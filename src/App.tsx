import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamificationProvider, {
	ScoreDisplay,
} from "@/components/GamificationSystem";
import AchievementsButton from "@/components/AchievementsButton";
import EnhancedBackground from "@/components/EnhancedBackground";
import EnhancedTsParticles from "@/components/EnhancedTsParticles";
import WhimsicalStars from "@/components/WhimsicalStars";
import GlobalFireworks from "@/components/GlobalFireworks";
import Index from "./pages/Index";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<GamificationProvider>
				<Toaster />
				<Sonner />
				<EnhancedBackground />
				<EnhancedTsParticles />
				<WhimsicalStars />
				<ScoreDisplay />
				<AchievementsButton />
				<GlobalFireworks />
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Index />} />
						<Route path='/features' element={<Features />} />
						<Route path='/how-it-works' element={<HowItWorks />} />
						<Route path='/pricing' element={<Pricing />} />
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
						<Route path='*' element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</GamificationProvider>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
