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
  const quizUrl = `${window.location.origin}/quiz/${hash}`;
  await navigator.clipboard.writeText(quizUrl);
}
