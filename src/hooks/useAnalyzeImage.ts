import { useState } from "react";
import axios from "axios";

export const useAnalyzeImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async (file: File): Promise<{ hasTumor: boolean; confidence: number } | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://127.0.0.1:8000/api/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || "An error occurred while analyzing the image.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { analyzeImage, isLoading, error };
};
