import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ModelPerformance() {
  return (
    <Card className="bg-white shadow-md border-gray-200">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-2xl font-bold text-gray-800">Model Performance</CardTitle>
        <CardDescription className="text-gray-600">Key metrics of our AI model</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Accuracy</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Progress value={92} className="w-full" />
              <span className="text-sm font-medium text-gray-700">92%</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Sensitivity</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Progress value={95} className="w-full" />
              <span className="text-sm font-medium text-gray-700">95%</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Specificity</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Progress value={89} className="w-full" />
              <span className="text-sm font-medium text-gray-700">89%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

