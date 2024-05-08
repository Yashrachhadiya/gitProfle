import React, { useState } from "react";
import { fetchRepos , fetchProfile } from "../Services/githubApi";


const GithubProfileFinder: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [profileData, setProfileData] = useState<any>(null);
  const [repoData, setRepoData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState<boolean>(false);

  const fetchUserProfile = async () => {
    try {
      const userData = await fetchProfile(username);
      setProfileData(userData);
      setError(null);
      setSearched(true);
      fetchUserRepos(userData.repos_url);
    } catch (error) {
      setProfileData(null);
      setError(error.message);
    }
  };

  const fetchUserRepos = async (reposUrl: string) => {
    try {
      const reposData = await fetchRepos(reposUrl);
      setRepoData(reposData);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setError("Error fetching repositories");
    }
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="mt-4 mx-auto text-center">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border border-gray-300 max-w-md rounded mx-auto py-2 px-4 w-full focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={fetchUserProfile}
          className="mt-2 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none"
        >
          Fetch Profile
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>

      {searched && profileData && (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={profileData.avatar_url}
                alt={profileData.login}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {profileData.login}
              </div>
              <p className="mt-2 text-gray-600">{profileData.bio}</p>
              <div className="mt-4">
                <a
                  href={profileData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {searched && repoData && (
        <div className="mt-8 max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-semibold">Repositories</h2>
          <ul className="mt-4">
            {repoData.map((repo: any) => (
              <li key={repo.id} className="mb-4">
                <div className="bg-white shadow-md  hover:shadow-xl rounded-lg overflow-hidden">
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{repo.name}</h3>
                    <p className="text-gray-600">{repo.description}</p>
                  </div>
                  <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
                    <div className="text-sm text-gray-500">
                      Stars: {repo.stargazers_count}
                    </div>
                    <div>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500"
                      >
                        View Repository
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GithubProfileFinder;
