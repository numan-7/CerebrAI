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
        <CardTitle className="text-2xl font-bold text-gray-800">Accuracy by Category</CardTitle>
        <CardDescription className="text-gray-600">Based on testing with real brain MRI scans</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Glioma Tumors</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Progress value={98} className="w-full" />
                <span className="text-sm font-medium text-gray-700">98%</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Meningioma Tumors</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Progress value={98} className="w-full" />
                <span className="text-sm font-medium text-gray-700">98%</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Normal Brain (No Tumor)</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Progress value={100} className="w-full" />
                <span className="text-sm font-medium text-gray-700">100%</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Pituitary Tumors</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Progress value={100} className="w-full" />
                <span className="text-sm font-medium text-gray-700">100%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

