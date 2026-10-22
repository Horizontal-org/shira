import axios from 'axios';

export const updateResultsEnabled = async (hasResultsEnabled: boolean) => {
  const { data } = await axios.patch(
    `${process.env.REACT_APP_API_URL}/space/results-enabled`,
    { hasResultsEnabled },
  );

  return data;
};
