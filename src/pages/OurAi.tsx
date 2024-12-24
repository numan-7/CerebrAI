import { Brain, Database, Zap, BarChartIcon as ChartBar } from 'lucide-react'
import { InfoCard } from '../components/InfoCard'
import { ModelPerformance } from '../components/ModelPerformance'

export function OurAi() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">About Our AI: CerebrAI DenseNet201</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is CerebrAI DenseNet201?</h2>
        <p className="text-gray-600 mb-8">
          CerebrAI DenseNet201 is our AI model that helps detect brain tumors in MRI scans. It can identify different types of tumors with 99% accuracy.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard 
            icon={Database}
            title="Training Data"
            description="Trained on over 7,000 real brain MRI scans from the Brain Tumor MRI Dataset, covering different types of tumors and healthy brains."
          />
          <InfoCard 
            icon={Brain}
            title="What It Detects"
            description="Can identify four categories: glioma tumors, meningioma tumors, pituitary tumors, and scans with no tumors."
          />
          <InfoCard 
            icon={Zap}
            title="How It Works"
            description="Uses DenseNet201, a powerful AI system that's been specially trained to understand brain scans and spot patterns that might indicate tumors."
          />
          <InfoCard 
            icon={ChartBar}
            title="Accuracy"
            description="Achieves 99% accuracy across all categories, with perfect detection of normal brains and pituitary tumors from the dataset."
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Performance Results</h2>
        <ModelPerformance />
        <p className="mt-4 text-sm text-gray-500">
          While our AI is highly accurate, it's designed to assist doctors, not replace them. Always consult with medical professionals for proper diagnosis and treatment.
        </p>
      </section>
    </div>
  )
}

