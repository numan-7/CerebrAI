import { Brain, Zap, Layers, BarChartIcon as ChartBar } from 'lucide-react'
import { InfoCard } from '../components/InfoCard'
import { FeatureList } from '../components/FeatureList'

export function OurAi() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Our AI: CerebrAI DenseNet201</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">What is CerebrAI DenseNet201?</h2>
        <p className="text-gray-600 mb-4">
          CerebrAI DenseNet201 is our fine-tuned AI model specifically designed for brain tumor detection. It's based on the powerful DenseNet201 architecture and has been specially trained on thousands of brain MRI scans.
        </p>
        <FeatureList 
          title="Key Features of CerebrAI DenseNet201:"
          features={[
            "201 layers of artificial neurons working together",
            "Fine-tuned specifically for brain tumor detection",
            "Exceptional at recognizing complex patterns in brain MRI scans",
            "Learns from thousands of diverse brain images",
            "Designed to maintain important information throughout its deep structure"
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">How CerebrAI DenseNet201 Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard 
            icon={Layers}
            title="1. Layer-by-Layer Analysis"
            description="The AI examines the brain scan through 201 specialized layers, each looking for specific features."
          />
          <InfoCard 
            icon={Brain}
            title="2. Pattern Recognition"
            description="It identifies patterns associated with different types of brain tissues and potential tumors."
          />
          <InfoCard 
            icon={Zap}
            title="3. Information Preservation"
            description="Unlike other models, CerebrAI DenseNet201 keeps important information flowing through all its layers."
          />
          <InfoCard 
            icon={ChartBar}
            title="4. Final Analysis"
            description="It combines all the information to make a highly accurate prediction about the presence of tumors."
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Fine-Tuning Process</h2>
        <p className="text-gray-600 mb-4">
          We've specialized our CerebrAI DenseNet201 model specifically for brain tumor detection through an extensive fine-tuning process.
        </p>
        <FeatureList 
          title="Fine-Tuning Steps:"
          features={[
            "Started with a pre-trained DenseNet201 model",
            "Fed it thousands of brain MRI scans, both with and without tumors",
            "Adjusted the model's parameters to focus on tumor-specific features",
            "Used techniques like data augmentation to improve performance",
            "Continuously tested and refined the model for optimal accuracy"
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Model Performance</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            After our rigorous fine-tuning process, CerebrAI DenseNet201 achieves impressive results in brain tumor detection:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Accuracy: Approximately 92% accurate in identifying the presence of tumors</li>
            <li>Speed: Can analyze a brain scan in just seconds</li>
            <li>Reliability: Consistent performance across various types of MRI scans</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            While CerebrAI DenseNet201 is highly accurate, it's designed to assist, not replace, medical professionals. Always consult with a doctor for proper diagnosis and treatment.
          </p>
        </div>
      </section>
    </div>
  )
}

