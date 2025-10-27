export const handleCopyUrlAndNotify = async (hash: string) => {
  try {
    await handleCopyUrl(hash)    
  } catch (error) {
    console.error('Failed to copy URL:', error);
  }
}

export const handleCopyUrl = async (hash: string) => {
  const quizUrl = `${process.env.REACT_APP_PUBLIC_URL}/quiz/${hash}`;
  await navigator.clipboard.writeText(quizUrl);
}