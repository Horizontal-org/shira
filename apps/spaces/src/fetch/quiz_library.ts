export interface LibraryQuizDto {
  title: string;
  createdAt: string;
  author: string;
  description: string;
}

export const getLibraryQuizzes = async (): Promise<LibraryQuizDto[]> => {
  return [
    {
      title: '10 most common phishing attacks in the US (2026)',
      createdAt: '2026-05-04',
      author: 'Shira Team',
      description: '10 questions using the actual top 10 email and social media scams.'
    },
    {
      title: 'Banking scams',
      createdAt: '2026-03-04',
      author: 'Shira Team',
      description: 'Bank-related phishing attacks over email and messaging apps.'
    }
  ];
};
