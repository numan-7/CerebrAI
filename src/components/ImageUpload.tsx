import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Upload } from 'lucide-react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const uploadSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'Image is required')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      'Max file size is 5MB'
    )
    .refine(
      (files) => ['image/jpeg', 'image/png', 'image/gif'].includes(files?.[0]?.type),
      'Only .jpg, .png, and .gif formats are supported'
    ),
})

type UploadFormValues = z.infer<typeof uploadSchema>

type ImageUploadProps = {
  setResult: React.Dispatch<React.SetStateAction<{ hasTumor: boolean; confidence: number } | null>>
}

export function ImageUpload({ setResult }: ImageUploadProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
  })

  const onSubmit = async (data: UploadFormValues) => {
    setIsAnalyzing(true)
    try {
      // Simulate API call to ML model
      await new Promise(resolve => setTimeout(resolve, 2000))
      const hasTumor = Math.random() > 0.5
      const confidence = Math.random() * 100
      setResult({ hasTumor, confidence })
      toast({
        title: "Analysis Complete",
        description: "Your brain scan has been analyzed.",
      })
    } catch (error) {
      console.error('Analysis error:', error)
      toast({
        title: "Error",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-gray-700">Upload Brain Scan</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 mb-3 text-fuchsia-500" />
                      <p className="mb-2 text-sm text-gray-700"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">JPEG, PNG or GIF (MAX. 5MB)</p>
                    </div>
                    <Input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={(e) => onChange(e.target.files)}
                      {...rest}
                    />
                  </label>
                </div>
              </FormControl>
              <FormDescription className="text-gray-600">
                Upload a high-quality brain MRI scan for the most accurate results.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={isAnalyzing} 
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Scan'}
        </Button>
      </form>
    </Form>
  )
}

