import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  const scrollToTryItNow = () => {
    const tryItNowSection = document.getElementById('try-it-now');
    if (tryItNowSection) {
      tryItNowSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between py-12 space-y-8 lg:space-y-0">
      <div className="lg:w-1/2">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span className="gradient-text">AI-Powered</span> Brain Tumor Detection
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Upload your MRI scan and get instant results with our cutting-edge AI technology.
        </p>
        <Button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white" onClick={scrollToTryItNow}>
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="lg:w-1/2 mt-8 lg:mt-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl opacity-30"></div>
          <img 
            src="/brain.jpg" 
            alt="Brain MRI Scan" 
            className="relative rounded-lg shadow-2xl w-full max-w-md mx-auto blob"
          />
        </div>
      </div>
    </div>
  )
}

