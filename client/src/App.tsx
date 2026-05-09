import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { useScrollToSection } from "./hooks/useScrollToSection";
import CustomCursor from "./components/CustomCursor";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import CoursesSection from "./components/CoursesSection";
import ResourcesSection from "./components/ResourcesSection";
import QuizSection from "./components/QuizSection";
import ChatbotSection from "./components/ChatbotSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

function Router() {
  // Landing page with all premium sections
  return (
    <Switch>
      <Route path={"/"} component={LandingPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function LandingPage() {
  useScrollToSection();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      <Hero />
      <CoursesSection />
      <ResourcesSection />
      <QuizSection />
      <ChatbotSection />
      <AboutSection />
      <Footer />
    </div>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <CustomCursor />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
