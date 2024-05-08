import axios from 'axios';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: ``,
  },
});

export const fetchCodeFrequency = async (owner: string, repoName: string) => {
  try {
    const response = await githubApi.get<[number, number, number][]>(
      `/repos/${owner}/${repoName}/stats/code_frequency`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching code frequency:', error);
    throw error;
  }
};

export const fetchContributorsStats = async (owner: string, repoName: string) => {
  try {
    const response = await githubApi.get(`/repos/${owner}/${repoName}/stats/contributors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contributors stats:', error);
    throw error;
  }
};

export const fetchProfile = async (username: string) => {
  try {
    const response =  await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('User not found!');
  }
};

export const fetchRepos = async (reposUrl: string) => {
  try {
    const response = await githubApi.get(reposUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};
