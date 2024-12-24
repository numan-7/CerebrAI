import { Github, Database, Code2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="py-4">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Code2 className="h-4 w-4" />
              Developed by 
              <span className="text-primary font-medium">Numan</span> 
                & 
              <span className="text-primary font-medium">Tony</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => window.open('https://github.com/numan-7/CerebrAI', '_blank')}
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => window.open('https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset/data', '_blank')}
            >
              <Database className="h-4 w-4" />
              Dataset
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

