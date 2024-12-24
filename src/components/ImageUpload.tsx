import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Upload, X } from 'lucide-react'
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
      (files) => ['image/jpeg', 'image/png'].includes(files?.[0]?.type),
      'Only .jpg and .png formats are supported'
    ),
})

type UploadFormValues = z.infer<typeof uploadSchema>

type ImageUploadProps = {
  setResult: React.Dispatch<React.SetStateAction<{ hasTumor: boolean; confidence: number } | null>>
}

export function ImageUpload({ setResult }: ImageUploadProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleFileChange = useCallback((file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('file', [file] as unknown as FileList);
    } else {
      setPreviewUrl(null);
      form.setValue('file', undefined);
    }
  }, [form]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  }, [handleFileChange]);

  const deleteImage = useCallback(() => {
    handleFileChange(null);
  }, [handleFileChange]);

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
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 transition-all duration-300 ease-in-out">
                  <div 
                    className={`flex items-center justify-center w-full ${previewUrl ? 'md:w-2/3' : 'md:w-full'} h-64 border-2 ${
                      isDragging ? 'border-primary' : 'border-gray-300'
                    } border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">JPEG or PNG (MAX. 5MB)</p>
                      </div>
                      <Input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          handleFileChange(file || null);
                        }}
                        {...rest}
                      />
                    </label>
                  </div>
                  {previewUrl && (
                    <div className="relative w-full md:w-1/3 h-64 transition-all duration-300 ease-in-out opacity-100">
                      <img 
                        src={previewUrl} 
                        alt="Uploaded brain scan" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={deleteImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="text-gray-600">
                Upload a high-quality brain MRI scan (JPEG or PNG, max 5MB) for the most accurate results.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={isAnalyzing || !previewUrl} 
          className="w-full bg-primary text-white hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Scan'}
        </Button>
      </form>
    </Form>
  )
}