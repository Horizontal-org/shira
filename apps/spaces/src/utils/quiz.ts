import toast from "react-hot-toast";

export const handleCopyUrlAndNotify = async (hash: string, successMessage?: string) => {
  try {
    await handleCopyUrl(hash);
    toast.success(successMessage, { duration: 3000 });
  } catch (error) {
    console.error('Failed to copy URL:', error);
  }
}

export const handleCopyUrl = async (hash: string) => {
  const quizUrl = `${import.meta.env.VITE_PUBLIC_URL}/quiz/${hash}`;
  await navigator.clipboard.writeText(quizUrl);
}