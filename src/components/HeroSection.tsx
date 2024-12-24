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
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          <span className="paint-stroke">AI-Powered</span> Brain Tumor Detection
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6">
          Upload your MRI scan and get instant results with our cutting-edge AI technology.
        </p>
        <Button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white" onClick={scrollToTryItNow}>
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="lg:w-1/2 mt-8 lg:mt-0">
        <img 
          src="/brain.jpg" 
          alt="Brain MRI Scan" 
          className="rounded-lg shadow-lg w-full max-w-md mx-auto"
        />
      </div>
    </div>
  )
}

