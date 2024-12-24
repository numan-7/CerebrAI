import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertTriangle } from 'lucide-react'

type ResultsProps = {
  result: {
    hasTumor: boolean
    confidence: number
  }
}

export function Results({ result }: ResultsProps) {
  const { hasTumor, confidence } = result

  return (
    <Alert className={`mt-6 ${hasTumor ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
      {hasTumor ? (
        <AlertTriangle className="h-5 w-5 text-red-600" />
      ) : (
        <CheckCircle2 className="h-5 w-5 text-green-600" />
      )}
      <AlertTitle className={`text-lg font-semibold ${hasTumor ? 'text-red-800' : 'text-green-800'}`}>
        {hasTumor ? 'Potential Tumor Detected' : 'No Tumor Detected'}
      </AlertTitle>
      <AlertDescription className={`mt-2 ${hasTumor ? 'text-red-700' : 'text-green-700'}`}>
        <p>Confidence: {confidence.toFixed(2)}%</p>
        {hasTumor && (
          <p className="mt-2 font-medium">
            Please consult with a medical professional for a thorough evaluation.
          </p>
        )}
      </AlertDescription>
    </Alert>
  )
}

