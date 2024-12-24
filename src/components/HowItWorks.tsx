import { Upload, Search, FileCheck } from 'lucide-react'

const steps = [
  { 
    title: 'Upload Your Scan', 
    description: "Simply take a picture of your MRI scan or upload the file from your device. It's quick and easy!",
    icon: Upload
  },
  { 
    title: 'AI Does Its Magic', 
    description: 'Our smart AI looks at your scan, just like a doctor would, but super fast!',
    icon: Search
  },
  { 
    title: 'Get Clear Results', 
    description: "In moments, you'll see easy-to-understand results. It's like having a friendly expert explain your scan.",
    icon: FileCheck
  },
]

export function HowItWorksSection() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="bg-fuchsia-100 rounded-full p-3 mb-4">
              <step.icon className="h-6 w-6 text-fuchsia-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
            <p className="text-gray-600 text-center">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}