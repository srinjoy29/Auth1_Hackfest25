import Image from "next/image";
import Navbar from "@/components/landingpage/Navbar";
import Hero from "@/components/landingpage/Hero";
import Features from "@/components/landingpage/Features";
import Pricing from "@/components/landingpage/Pricing";
import Testimonials from "@/components/landingpage/Testimonials";
import WorkFlow from "@/components/landingpage/Work-flow";
import Footer from "@/components/landingpage/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center sm:items-start px-8 py-16 sm:px-20 gap-16">
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <WorkFlow />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
