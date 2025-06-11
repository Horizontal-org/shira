import { useCallback, useRef } from 'react'
import { NodeSelection } from 'prosemirror-state'

interface UseImageUploadOptions {
  maxSizeInMB?: number
  allowedTypes?: string[]
  uploadFunction?: (file: File) => Promise<string>
}

const defaultUploadImage = async (file: File): Promise<string> => {
  
  // replace this with the logic for uploading to a bucket
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.readAsDataURL(file)
  })
}

export const useImageUpload = (
  editor: any, 
  options: UseImageUploadOptions = {}
) => {
  const {
    maxSizeInMB = 5, // talk with Juan and Raph about max size
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    uploadFunction = defaultUploadImage
  } = options

  const fileInputRef = useRef<HTMLInputElement>(null)

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
    fileInputRef.current?.click()
  }, [])

  const onImageSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !editor) return

    const validationError = validateFile(file)
    if (validationError) {
      alert(validationError)
      return
    }

    try {
      const imageUrl = await uploadFunction(file)
      editor.chain().focus().setImage({ src: imageUrl }).run()
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    } finally {
      event.target.value = ''
    }
  }, [editor, validateFile, uploadFunction])

  const isImageSelected = useCallback(() => {
    if (!editor) return false
    return editor.state.selection instanceof NodeSelection && 
           editor.state.selection.node?.type.name === 'image'
  }, [editor])

  const selectedImageHasExplanation = useCallback(() => {
    if (!editor || !isImageSelected()) return false
    
    const { selection } = editor.state
    return selection instanceof NodeSelection &&
           selection.node?.attrs['data-explanation']
  }, [editor, isImageSelected])


  const getSelectedImageAttrs = useCallback(() => {
    if (!editor || !isImageSelected()) return null
    
    const { selection } = editor.state
    if (selection instanceof NodeSelection) {
      return selection.node.attrs
    }
    return null
  }, [editor, isImageSelected])

  const updateSelectedImage = useCallback((attrs: Record<string, any>) => {
    if (!editor || !isImageSelected()) return false

    editor.chain().focus().updateAttributes('image', attrs).run()
    return true
  }, [editor, isImageSelected])

  return {
    fileInputRef,
    handleImageUpload,
    onImageSelect,
    isImageSelected: isImageSelected(),
    selectedImageHasExplanation: selectedImageHasExplanation(),
    getSelectedImageAttrs,
    updateSelectedImage,
    validateFile
  }
}