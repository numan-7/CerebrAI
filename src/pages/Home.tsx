import { HeroSection } from '../components/HeroSection'
import { HowItWorksSection } from '../components/HowItWorks'
import { TryItNowSection } from '../components/TryItNowSection'

export function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <HeroSection />
      <HowItWorksSection />
      <TryItNowSection />
    </div>
  )
}