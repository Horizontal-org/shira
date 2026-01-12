import toast from "react-hot-toast";

export const handleCopyUrlAndNotify = async (hash: string) => {
  try {
    await handleCopyUrl(hash)
    toast.success('The public quiz link has been copied to your clipboard.', { duration: 3000 })
  } catch (error) {
    console.error('Failed to copy URL:', error);
  }
}

export const handleCopyUrl = async (hash: string) => {
  const quizUrl = `${process.env.REACT_APP_PUBLIC_URL}/quiz/${hash}`;
  await navigator.clipboard.writeText(quizUrl);
}