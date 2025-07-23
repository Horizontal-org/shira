import { useCallback, useRef, useState } from 'react'
import { NodeSelection } from 'prosemirror-state'
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


  const onImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validationError = validateFile(file)
    if (validationError) {
      alert(validationError)
      return
    }

    setIsUploading(true)
    try {
      const uploadResponse = await uploadFunction(file, quizId, questionId)
      setIsUploading(false)
      event.target.value = ''
      return uploadResponse   
      // editor.chain().focus().setImage({ 
      //   src: uploadResponse.presignedUrl,
      //   'data-image-id': uploadResponse.id,
      //   'data-original-filename': uploadResponse.originalFilename,
      //   alt: uploadResponse.originalFilename
      // }).run()
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    }
  }

  // const isImageSelected = useCallback(() => {
  //   if (!editor) return false
  //   return editor.state.selection instanceof NodeSelection && 
  //          editor.state.selection.node?.type.name === 'image'
  // }, [editor])

  // const selectedImageHasExplanation = useCallback(() => {
  //   if (!editor || !isImageSelected()) return false
    
  //   const { selection } = editor.state
  //   return selection instanceof NodeSelection &&
  //          selection.node?.attrs['data-explanation']
  // }, [editor, isImageSelected])


  // const getSelectedImageAttrs = useCallback(() => {
  //   if (!editor || !isImageSelected()) return null
    
  //   const { selection } = editor.state
  //   if (selection instanceof NodeSelection) {
  //     return selection.node.attrs
  //   }
  //   return null
  // }, [editor, isImageSelected])

  // const updateSelectedImage = useCallback((attrs: Record<string, any>) => {
  //   if (!editor || !isImageSelected()) return false

  //   editor.chain().focus().updateAttributes('image', attrs).run()
  //   return true
  // }, [editor, isImageSelected])

  return {
    fileInputRef,
    handleImageUpload,
    onImageSelect,
    // isImageSelected: isImageSelected(),
    // selectedImageHasExplanation: selectedImageHasExplanation(),
    // getSelectedImageAttrs,
    // updateSelectedImage,
    validateFile,
    isUploading
  }
}