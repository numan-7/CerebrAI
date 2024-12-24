import { ModelPerformance } from '../components/ModelPerformance'
import { ConfusionMatrix } from '../components/ConfusionMatrix'

export function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">How CerebrAI Works</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our AI Model</h2>
          <p className="text-gray-600">
            CerebrAI uses a state-of-the-art Convolutional Neural Network (CNN) trained on thousands of brain MRI scans. 
            Our model is designed to detect various types of brain tumors with high accuracy.
          </p>
        </section>
        <ModelPerformance />
        <ConfusionMatrix />
      </div>
    </div>
  )
}

