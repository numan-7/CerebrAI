import { useState } from 'react'
import { ImageUpload } from './ImageUpload'
import { Results } from './Results'

export function TryItNowSection() {
  const [result, setResult] = useState<{ hasTumor: boolean; confidence: number } | null>(null)

  return (
    <div id="try-it-now" className="mt-16 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Try It Now</h2>
        <ImageUpload setResult={setResult} />
        {result && <Results result={result} />}
      </div>
    </div>
  )
}

