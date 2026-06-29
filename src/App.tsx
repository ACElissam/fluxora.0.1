import React, { useState, useEffect, useRef } from "react";
import { 
  Globe, 
  ChevronDown, 
  ArrowRight, 
  Menu, 
  X, 
  CheckCircle2,
  Sparkles,
  BookOpen,
  Zap,
  Cpu,
  Layers,
  Database
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Client Avatar Data with high-quality portrait URLs
const AVATARS = [
  {
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    name: "Sarah Jenkins",
    role: "Director of Design"
  },
  {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    name: "Marcus Aurelius",
    role: "Product Lead"
  },
  {
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    name: "Elena Rostova",
    role: "CTO, Veloce"
  }
];

// Feature items for the dropdown menu
const FEATURES = [
  { name: "Digital Experiences", desc: "Shaped by real human behavior.", icon: Cpu },
  { name: "Global Delivery", desc: "Fast, secure CDN and edge network.", icon: Globe },
  { name: "Custom Architectures", desc: "Crafted specifically for your scale.", icon: Layers },
  { name: "Intuitive Analytics", desc: "Insights that matter for conversions.", icon: Zap },
];

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "finance">("home");
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (vantaEffect.current) return;
    Promise.all([
      import("three"),
      import("vanta/dist/vanta.globe.min"),
    ]).then(([THREE, VANTA]) => {
      vantaEffect.current = VANTA.default({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xff953f,
        color2: 0xffffff,
        backgroundColor: 0x141315,
        size: 1.0,
      });
    });
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsWaitlistOpen(false);
        setIsSubmitted(false);
        setEmailInput("");
      }, 2500);
    }
  };

  return (
    <div id="fluxora-container" className="min-h-screen bg-transparent flex flex-col justify-between selection:bg-[#E33E18] selection:text-white relative overflow-hidden font-sans">
      
      {/* Vanta.js GLOBE Background */}
      <div
        ref={vantaRef}
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -20, pointerEvents: 'none' }}
      />

      {/* Subtle Background Artistry (Aesthetic ambient glows to elevate quality) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-radial from-[#FCEEE7]/30 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-radial from-[#E33E18]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* HEADER SECTION */}
      <header id="fluxora-header" className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-6 flex items-center justify-between relative z-50">
        {currentView === "home" ? (
          <>
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onClick={() => setCurrentView("home")}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="grid grid-cols-2 gap-[2px] w-6 h-6 transition-transform group-hover:rotate-12 duration-300">
                <div className="bg-[#E33E18] rounded-tl-[6px]" />
                <div className="bg-[#E96B4F] rounded-tr-[6px]" />
                <div className="bg-[#E96B4F] rounded-bl-[6px]" />
                <div className="bg-[#E33E18] rounded-br-[6px]" />
              </div>
              <span className="font-sans font-bold text-2xl tracking-tight text-white/90 transition-colors group-hover:text-[#E33E18]">
                Fluxora
              </span>
            </motion.div>

            {/* Desktop Navigation Pill Bar with Glassmorphism */}
            <motion.nav 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="hidden md:flex items-center gap-7 px-6 py-2.5 bg-white/10 backdrop-blur-[12px] border border-white/20 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative"
              style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderColor: "rgba(255, 255, 255, 0.18)"
              }}
            >
              {/* Features Dropdown Button — Liquid Glass */}
              <div 
                className="relative"
                onMouseEnter={() => setIsFeaturesOpen(true)}
                onMouseLeave={() => setIsFeaturesOpen(false)}
              >
                <button 
                  className={`liquid-glass-features-trigger ${isFeaturesOpen ? 'liquid-glass-features-trigger--open' : ''}`}
                >
                  Features 
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${isFeaturesOpen ? 'rotate-180 text-[#E33E18]' : ''}`} />
                </button>

                {/* Dropdown Menu Overlay — Liquid Glass */}
                <AnimatePresence>
                  {isFeaturesOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.8 }}
                      className="liquid-glass-dropdown absolute left-1/2 -translate-x-1/2 top-full mt-3 w-80 p-4 grid gap-1.5 z-50"
                    >
                      <div className="px-2.5 py-1.5 text-[10px] font-bold text-white/50 tracking-[0.12em] uppercase">Our Capabilities</div>
                      {FEATURES.map((feat, i) => (
                        <a 
                          key={i} 
                          href="#" 
                          className="liquid-glass-feature"
                        >
                          <div className="liquid-glass-icon">
                            <feat.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white/90">{feat.name}</p>
                            <p className="text-xs text-gray-400 leading-snug">{feat.desc}</p>
                          </div>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => setCurrentView("home")}
                className="liquid-glass-btn"
              >
                How It Works
              </button>
              
              <button 
                onClick={() => setCurrentView("home")}
                className="liquid-glass-btn"
              >
                About
              </button>

              <button 
                onClick={() => setCurrentView("finance")}
                className="liquid-glass-btn liquid-glass-btn--accent"
              >
                Product
              </button>

              <button 
                onClick={() => setCurrentView("home")}
                className="liquid-glass-btn"
              >
                Blogs
              </button>
            </motion.nav>

            {/* Right Call-To-Action Button */}
            <div className="hidden md:block">
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onClick={() => setIsWaitlistOpen(true)}
                className="liquid-glass-btn liquid-glass-btn--cta"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="liquid-glass-btn p-2">
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Back to Home with icon */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setCurrentView("home")}
              className="liquid-glass-btn flex items-center gap-2 text-xs font-semibold"
              style={{ borderRadius: '9999px' }}
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Back to Home</span>
            </motion.button>
            <div />
          </>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {currentView === "home" && isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-4 flex flex-col gap-3 relative z-40"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(12px)",
              borderColor: "rgba(255, 255, 255, 0.18)"
            }}
          >
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setCurrentView("finance"); }}
              className="text-left py-2 font-medium text-white/90 border-b border-white/10 flex justify-between items-center"
            >
              Features <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setCurrentView("home"); }}
              className="text-left py-2 font-medium text-white/90 border-b border-white/10"
            >
              How It Works
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setCurrentView("home"); }}
              className="text-left py-2 font-medium text-white/90 border-b border-white/10"
            >
              About
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setCurrentView("finance"); }}
              className="text-left py-2 font-medium text-[#E33E18] border-b border-white/10"
            >
              Product
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setCurrentView("home"); }}
              className="text-left py-2 font-medium text-white/90 border-b border-white/10"
            >
              Blogs
            </button>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setCurrentView("finance");
              }}
              className="liquid-glass-btn liquid-glass-btn--mobile-cta mt-2"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO MAIN BODY */}
      <main id="fluxora-hero-body" className="flex-1 flex flex-col justify-center max-w-[1400px] mx-auto w-full px-6 md:px-12 pt-8 pb-12 lg:pt-16 lg:pb-20 relative z-30">
        <AnimatePresence mode="wait">
          {currentView === "home" ? (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full flex flex-col justify-between"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Main Hero Content (Left and Center) */}
                <div className="lg:col-span-12">
                  
                  {/* Globe Badge / Indicator */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex items-start gap-3 text-gray-400 mb-8"
                  >
                    <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 shadow-[0_2px_6px_rgba(0,0,0,0.1)] flex items-center justify-center">
                      <Globe className="w-3.5 h-3.5 text-gray-300 animate-spin-slow" />
                    </div>
                    <div className="text-xs leading-tight">
                      <p className="text-gray-500 font-normal">Hub support peoples from</p>
                      <p className="text-gray-200 font-medium">all over the world</p>
                    </div>
                  </motion.div>

                  {/* Giant Title */}
                  <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] font-sans font-medium text-white/90 leading-[1.05] tracking-tighter mb-8 max-w-5xl">
                    <motion.span 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                      className="block"
                    >
                      Technology
                    </motion.span>
                    
                    <motion.span 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                      className="block"
                    >
                      Crafted for <span className="text-[#E33E18] font-semibold">All</span>
                    </motion.span>
                    
                    <motion.span 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                      className="block"
                    >
                      Not <span className="font-serif italic font-normal text-[#E96B4F]">Machines</span>
                    </motion.span>
                  </h1>

                  {/* Hero Subheadline */}
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-gray-400 text-lg sm:text-xl md:text-2xl max-w-2xl font-normal leading-relaxed mb-10"
                  >
                    We create clear, intuitive, and accessible digital experiences shaped by real human behavior.
                  </motion.p>

                  {/* Actions Row (CTA + Overlapping Avatars) */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap items-center gap-6 md:gap-10 mb-12"
                  >
                    {/* Main Pill Gradient Button — Liquid Glass */}
                    <button 
                      onClick={() => setCurrentView("finance")}
                      className="liquid-glass-btn liquid-glass-btn--pill group"
                    >
                      <span className="text-white font-semibold text-base">Get started</span>
                      <div className="liquid-glass-pill-arrow">
                        <ArrowRight className="w-4 h-4 text-[#E33E18]" />
                      </div>
                    </button>

                    {/* Overlapping Avatars & Social Proof */}
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3.5">
                        {AVATARS.map((avatar, i) => (
                          <div 
                            key={i} 
                            className="relative group cursor-help"
                            title={`${avatar.name} - ${avatar.role}`}
                          >
                            <img 
                              className="w-10 h-10 rounded-full border-2 border-white/60 object-cover shadow-sm transition-transform duration-200 hover:scale-110 hover:z-10" 
                              src={avatar.url} 
                              alt={avatar.name} 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white/90 leading-tight">800+ Happy Clients</p>
                        <p className="text-[11px] text-gray-500 font-medium leading-none mt-1">Over 5 years</p>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>

              {/* BOTTOM METRICS & PARTNERS GRID */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 mt-8 w-full border-t border-white/10 pt-12">
                
                {/* Metrics Cards Group (Left) */}
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  className="grid grid-cols-2 gap-4 w-full lg:w-auto max-w-md"
                >
                  {/* Metric Card 1 (Light Warm Salmon) */}
                  <div className="bg-white/8 backdrop-blur-md p-6 rounded-[2rem] border border-white/15 relative flex flex-col justify-between h-[155px] shadow-sm hover:shadow-md transition-shadow duration-300 group">
                    <span className="absolute top-4 right-5 text-[#E33E18] text-3xl font-light font-serif animate-pulse">*</span>
                    <h3 className="text-4xl lg:text-5xl font-semibold text-[#E33E18] tracking-tight transition-transform duration-300 group-hover:scale-105 origin-left">
                      150+
                    </h3>
                    <div className="mt-auto">
                      <span className="block text-[10px] text-[#E33E18]/80 font-mono font-medium tracking-wider mb-1">2025</span>
                      <p className="text-sm font-semibold text-gray-200 leading-tight">Projects delivered</p>
                    </div>
                  </div>

                  {/* Metric Card 2 (Solid Deep Orange-Red) */}
                  <div className="bg-[#E33E18] p-6 rounded-[2rem] relative flex flex-col justify-between h-[155px] shadow-md hover:shadow-lg transition-all duration-300 group">
                    <span className="absolute top-4 right-5 text-white/80 text-3xl font-light font-serif animate-pulse">*</span>
                    <h3 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight transition-transform duration-300 group-hover:scale-105 origin-left">
                      98%
                    </h3>
                    <div className="mt-auto">
                      <span className="block text-[10px] text-white/75 font-mono font-medium tracking-wider mb-1">2025</span>
                      <p className="text-sm font-semibold text-white leading-tight">Client satisfaction</p>
                    </div>
                  </div>
                </motion.div>

                {/* Partner Brands (Right) */}
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="flex flex-col items-start lg:items-end gap-5 w-full lg:w-auto"
                >
                  <span className="text-[11px] font-bold text-gray-500 tracking-widest uppercase leading-none lg:text-right">
                    Our Partners
                  </span>
                  
                  {/* Logos horizontal lineup */}
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-5 text-gray-300 font-semibold text-sm">
                    
                    {/* Partner 1: BookStore */}
                    <div className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer group">
                      <BookOpen className="w-4 h-4 text-gray-200 group-hover:text-[#E33E18] transition-colors" />
                      <span className="tracking-tight font-sans">BookStore</span>
                    </div>

                    {/* Partner 2: Zantic */}
                    <div className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer group">
                      <div className="flex -space-x-1">
                        <ChevronDown className="w-3.5 h-3.5 rotate-90 text-gray-200 group-hover:text-[#E33E18] transition-colors" />
                        <ChevronDown className="w-3.5 h-3.5 rotate-90 text-gray-200 group-hover:text-[#E33E18] transition-colors" />
                      </div>
                      <span className="tracking-tight font-sans">zantic</span>
                    </div>

                    {/* Partner 3: Crona */}
                    <div className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer group">
                      <div className="w-3.5 h-3.5 rotate-45 border-2 border-gray-200 group-hover:border-[#E33E18] transition-colors flex items-center justify-center">
                        <div className="w-1 h-1 bg-gray-200 group-hover:bg-[#E33E18] transition-colors rounded-full" />
                      </div>
                      <span className="tracking-tight font-sans">Crona</span>
                    </div>

                    {/* Partner 4: Mercury */}
                    <div className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer group">
                      <div className="flex flex-col -space-y-1 justify-center items-center">
                        <div className="w-3.5 h-1 bg-gray-200 group-hover:bg-[#E33E18] transition-colors rounded-full" />
                        <div className="w-2 h-1 bg-gray-200 group-hover:bg-[#E33E18] transition-colors rounded-full" />
                      </div>
                      <span className="tracking-tight font-sans">Mercury</span>
                    </div>

                    {/* Partner 5: Wager */}
                    <div className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer group">
                      <div className="w-3 h-3 rounded-full border-2 border-gray-200 group-hover:border-[#E33E18] transition-colors flex items-center justify-center">
                        <div className="w-1 h-1 bg-gray-200 group-hover:bg-[#E33E18] transition-colors rounded-full" />
                      </div>
                      <span className="tracking-tight font-sans">Wager</span>
                    </div>

                  </div>
                </motion.div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="finance-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full flex flex-col justify-between"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Finance Hero Content */}
                <div className="lg:col-span-12">
                  
                  {/* Interactive Back Button & Badge Row */}
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    {/* Web3 Solutions Badge */}
                    <div 
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-sm"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        borderColor: "rgba(255, 255, 255, 0.18)"
                      }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E33E18]" />
                      <span className="text-[10px] sm:text-xs font-semibold text-gray-200 tracking-wider uppercase">
                        Innovative Web3 Solutions
                      </span>
                    </div>
                  </div>

                  {/* Giant Title: Revolutionizing finance with Web3 technology */}
                  <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] font-sans font-medium text-white/90 leading-[1.05] tracking-tighter mb-8 max-w-6xl">
                    <motion.span 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                      className="block"
                    >
                      Revolutionizing <span className="font-serif italic font-normal text-[#E96B4F]">finance</span>
                    </motion.span>
                    
                    <motion.span 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                      className="block"
                    >
                      with <span className="text-[#E33E18] font-semibold">Web3</span> technology
                    </motion.span>
                  </h1>

                  {/* Hero Subheadline */}
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-gray-400 text-lg sm:text-xl md:text-2xl max-w-2xl font-normal leading-relaxed mb-10"
                  >
                    Experience the future of finance with our innovative Web3 fintech startup.
                  </motion.p>

                  {/* Actions Row (Overlapping Avatars) */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-wrap items-center gap-6 md:gap-10 mb-12"
                  >
                    {/* Overlapping Avatars (1.2k+ trusted) */}
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3.5">
                        {AVATARS.map((avatar, i) => (
                          <div 
                            key={i} 
                            className="relative group cursor-help"
                            title={`${avatar.name} - ${avatar.role}`}
                          >
                            <img 
                              className="w-10 h-10 rounded-full border-2 border-white/60 object-cover shadow-sm transition-transform duration-200 hover:scale-110 hover:z-10" 
                              src={avatar.url} 
                              alt={avatar.name} 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white/90 leading-tight">Trusted already by 1.2k+</p>
                        <p className="text-[11px] text-gray-500 font-medium leading-none mt-1">Verified on chain</p>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>

              {/* THREE METRIC BOXES AND PARTNER LOGOS */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 mt-8 w-full border-t border-white/10 pt-12">
                
                {/* 3 Metrics Cards Group (Left) */}
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto max-w-4xl"
                >
                  {/* Card 1: Global User Base (+2M) */}
                  <div className="bg-white/8 backdrop-blur-md p-6 rounded-[2rem] border border-white/15 relative flex flex-col justify-between h-[155px] min-w-[200px] shadow-sm hover:shadow-md transition-all duration-300 group">
                    <span className="absolute top-4 right-5 text-[#E33E18] text-3xl font-light font-serif animate-pulse">*</span>
                    <h3 className="text-4xl lg:text-5xl font-semibold text-[#E33E18] tracking-tight transition-transform duration-300 group-hover:scale-105 origin-left">
                      +2M
                    </h3>
                    <div className="mt-auto">
                      <span className="block text-[10px] text-[#E33E18]/80 font-mono font-medium tracking-wider mb-1">Global User Base</span>
                      <p className="text-sm font-semibold text-gray-200 leading-tight">Active daily nodes</p>
                    </div>
                  </div>

                  {/* Card 2: Transaction Volume (+$1B) */}
                  <div className="bg-[#E33E18] p-6 rounded-[2rem] relative flex flex-col justify-between h-[155px] min-w-[200px] shadow-md hover:shadow-lg transition-all duration-300 group">
                    <span className="absolute top-4 right-5 text-white/80 text-3xl font-light font-serif animate-pulse">*</span>
                    <h3 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight transition-transform duration-300 group-hover:scale-105 origin-left">
                      +$1B
                    </h3>
                    <div className="mt-auto">
                      <span className="block text-[10px] text-white/75 font-mono font-medium tracking-wider mb-1">Transaction Volume</span>
                      <p className="text-sm font-semibold text-white leading-tight">Total on-chain volume</p>
                    </div>
                  </div>

                  {/* Card 3: High-Speed Processing (99%) */}
                  <div 
                    className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/20 relative flex flex-col justify-between h-[155px] min-w-[200px] shadow-sm hover:shadow-md transition-all duration-300 group"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      backdropFilter: "blur(12px)",
                      borderColor: "rgba(255, 255, 255, 0.18)"
                    }}
                  >
                    <span className="absolute top-4 right-5 text-gray-400 text-3xl font-light font-serif animate-pulse">*</span>
                    <h3 className="text-4xl lg:text-5xl font-semibold text-white/90 tracking-tight transition-transform duration-300 group-hover:scale-105 origin-left">
                      99%
                    </h3>
                    <div className="mt-auto">
                      <span className="block text-[10px] text-gray-400 font-mono font-medium tracking-wider mb-1">High-Speed Processing</span>
                      <p className="text-sm font-semibold text-gray-200 leading-tight">Faster Transactions</p>
                    </div>
                  </div>
                </motion.div>

                {/* Partner Brands (Right) */}
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  className="flex flex-col items-start lg:items-end gap-5 w-full lg:w-auto"
                >
                  <span className="text-[11px] font-bold text-gray-500 tracking-widest uppercase leading-none lg:text-right">
                    Our Partners
                  </span>
                  
                  {/* Logos horizontal lineup */}
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-5 text-gray-300 font-semibold text-sm">
                    
                    {/* Partner 1: BookStore */}
                    <div className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer group">
                      <BookOpen className="w-4 h-4 text-gray-200 group-hover:text-[#E33E18] transition-colors" />
                      <span className="tracking-tight font-sans">BookStore</span>
                    </div>

                    {/* Partner 2: Zantic */}
                    <div className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer group">
                      <div className="flex -space-x-1">
                        <ChevronDown className="w-3.5 h-3.5 rotate-90 text-gray-200 group-hover:text-[#E33E18] transition-colors" />
                        <ChevronDown className="w-3.5 h-3.5 rotate-90 text-gray-200 group-hover:text-[#E33E18] transition-colors" />
                      </div>
                      <span className="tracking-tight font-sans">zantic</span>
                    </div>

                    {/* Partner 3: Crona */}
                    <div className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer group">
                      <div className="w-3.5 h-3.5 rotate-45 border-2 border-gray-200 group-hover:border-[#E33E18] transition-colors flex items-center justify-center">
                        <div className="w-1 h-1 bg-gray-200 group-hover:bg-[#E33E18] transition-colors rounded-full" />
                      </div>
                      <span className="tracking-tight font-sans">Crona</span>
                    </div>

                    {/* Partner 4: Mercury */}
                    <div className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer group">
                      <div className="flex flex-col -space-y-1 justify-center items-center">
                        <div className="w-3.5 h-1 bg-gray-200 group-hover:bg-[#E33E18] transition-colors rounded-full" />
                        <div className="w-2 h-1 bg-gray-200 group-hover:bg-[#E33E18] transition-colors rounded-full" />
                      </div>
                      <span className="tracking-tight font-sans">Mercury</span>
                    </div>

                    {/* Partner 5: Wager */}
                    <div className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer group">
                      <div className="w-3 h-3 rounded-full border-2 border-gray-200 group-hover:border-[#E33E18] transition-colors flex items-center justify-center">
                        <div className="w-1 h-1 bg-gray-200 group-hover:bg-[#E33E18] transition-colors rounded-full" />
                      </div>
                      <span className="tracking-tight font-sans">Wager</span>
                    </div>

                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER EXTRA CREDITS (Subtle, professional and humble) */}
      <footer className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-6 text-center text-xs text-gray-500 font-normal">
        © {new Date().getFullYear()} Fluxora Inc. All rights reserved. Crafted with precision.
      </footer>

      {/* DIALOG MODAL: GET STARTED / WAITLIST */}
      <AnimatePresence>
        {isWaitlistOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden"
            >
              <button 
                onClick={() => setIsWaitlistOpen(false)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[#E33E18] mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Join Fluxora Priority Access</span>
              </div>

              <h3 className="text-2xl font-bold text-[#1D1B18] tracking-tight mb-2">
                Let's get you started.
              </h3>
              
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Enter your email address to join our exclusive queue. Our team is provisioning slots for the new digital experience engine.
              </p>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FAF0EB] flex items-center justify-center text-[#E33E18] mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-[#1D1B18]">You are on the list!</p>
                  <p className="text-xs text-gray-400 mt-1">We'll reach out within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email address" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#E33E18] focus:bg-white transition-all text-[#1D1B18]"
                  />
                  <button 
                    type="submit"
                    className="w-full py-3 bg-[#E33E18] hover:bg-[#c93413] text-white font-semibold rounded-xl text-sm transition-colors shadow-md shadow-[#E33E18]/10"
                  >
                    Request Invitation
                  </button>
                </form>
              )}

              <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Worldwide access
                </span>
                <span>Slot #1,{Math.floor(Math.random() * 800) + 200} pending</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
