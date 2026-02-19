import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface ImageUploadResponse {
  id: string;
  url: string;
  originalFilename: string;
}

interface UseImageUploadOptions {
  maxSizeInMB?: number
  allowedTypes?: string[]
  uploadFunction?: (file: File) => Promise<ImageUploadResponse>
}

const defaultUploadImage = async (file: File, quizId: string, questionId: string = null): Promise<ImageUploadResponse> => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    let url = `${process.env.REACT_APP_API_URL}/question-image/upload?quizId=${quizId}`
    if (questionId) {
      url = url + `&questionId${questionId}`
    }

    const res = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return {
      id: res.data.imageId,
      url: res.data.url,
      originalFilename: file.name
    }
  } catch (e) {
    console.log("🚀 ~ defaultUploadImage ~ e:", e)
    throw new Error(e)
  }
}

export const useImageUpload = (
  options: UseImageUploadOptions = {}
) => {
  const {
    maxSizeInMB = 5,
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    uploadFunction = defaultUploadImage
  } = options

  const { quizId, questionId = null } = useParams()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isUploading, setIsUploading] = useState(false)

  const validateFile = useCallback((file: File): string | null => {
    if (!allowedTypes.some(type => file.type.startsWith(type.split('/')[0]))) {
      return 'Please select an image file'
    }

    if (file.size > maxSizeInMB * 1024 * 1024) {
      return `Image size should be less than ${maxSizeInMB}MB`
    }

    return null
  }, [allowedTypes, maxSizeInMB])

  const handleImageUpload = useCallback(() => {
    if (isUploading) return
    fileInputRef.current?.click()
  }, [isUploading])


  const onImageSelect = async (event: React.ChangeEvent<HTMLInputElement>): Promise<ImageUploadResponse | null> => {
    const file = event.target.files?.[0]
    if (!file) return

    const validationError = validateFile(file)
    if (validationError) {
      alert(validationError)
      return
    }

    setIsUploading(true)
    try {
      return await uploadFunction(file, quizId, questionId)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
      return null
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  return {
    fileInputRef,
    handleImageUpload,
    onImageSelect,
    validateFile,
    isUploading
  }
}