import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ConfusionMatrix() {
  return (
    <Card className="bg-white shadow-md border-gray-200">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-2xl font-bold text-gray-800">Confusion Matrix</CardTitle>
        <CardDescription className="text-gray-600">Model prediction accuracy breakdown</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-fuchsia-100 p-4 rounded">
            <p className="font-bold text-fuchsia-800">True Negative</p>
            <p className="text-2xl font-bold text-fuchsia-600">85%</p>
          </div>
          <div className="bg-fuchsia-50 p-4 rounded">
            <p className="font-bold text-fuchsia-800">False Positive</p>
            <p className="text-2xl font-bold text-fuchsia-700">5%</p>
          </div>
          <div className="bg-fuchsia-50 p-4 rounded">
            <p className="font-bold text-fuchsia-800">False Negative</p>
            <p className="text-2xl font-bold text-fuchsia-700">3%</p>
          </div>
          <div className="bg-fuchsia-100 p-4 rounded">
            <p className="font-bold text-fuchsia-800">True Positive</p>
            <p className="text-2xl font-bold text-fuchsia-600">7%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

