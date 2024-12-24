import { Button } from "@/components/ui/button"
import { Brain } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-fuchsia-500 stroke-[1.5]" />
          <span className="text-xl font-light text-gray-800">CerebrAI</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Button variant="ghost" className="text-gray-600 hover:text-fuchsia-600" asChild><Link to="/">Home</Link></Button></li>
            <li><Button variant="ghost" className="text-gray-600 hover:text-fuchsia-600" asChild><Link to="/how">About Our AI</Link></Button></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}