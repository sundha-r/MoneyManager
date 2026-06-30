import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingNavbar from "../components/LandingNavbar";
import LandingHero from "../components/LandingHero";
import LandingShowcase from "../components/LandingShowcase";
import LandingAbout from "../components/LandingAbout";
import LandingContact from "../components/LandingContact";
import LandingFooter from "../components/LandingFooter";

const Landing = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-purple-500/30 relative overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/10 dark:bg-purple-900/10 rounded-full filter blur-3xl pointer-events-none -z-10 animate-pulse duration-10000" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-300/10 dark:bg-blue-900/10 rounded-full filter blur-3xl pointer-events-none -z-10" />

      {/* Floating Header/Navbar */}
      <LandingNavbar 
        isScrolled={isScrolled} 
        scrollToSection={scrollToSection} 
        navigate={navigate} 
      />

      {/* Hero Section */}
      <LandingHero 
        scrollToSection={scrollToSection} 
        navigate={navigate} 
      />

      {/* Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <LandingShowcase />
      </div>

      {/* About Section */}
      <LandingAbout />

      {/* Contact Section */}
      <LandingContact />

      {/* Footer Section */}
      <LandingFooter />

    </div>
  );
};

export default Landing;
