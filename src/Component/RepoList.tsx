import React, { useState } from "react";
import CommitActivityGraph from "./CommitActivityGraph";

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface RepoListProps {
  repos: Repo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  const [showGraphIds, setShowGraphIds] = useState<number[]>([]);

  const handleToggleGraph = (id: number) => {
    setShowGraphIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((graphId) => graphId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  const isGraphShown = (id: number) => showGraphIds.includes(id);

  return (

    <div className="container max-w-screen-lg mx-auto">
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="glassmorphism flex flex-col mb-8 border p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out"
        >
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            {" "}
            <img
              src={repo.owner.avatar_url}
              className="w-24 h-24 rounded-full mr-4 mb-2 md:mb-0"
              alt="Owner Avatar"
            />{" "}
            <div className="flex flex-grow flex-col md:flex-row md:justify-between">
              <div className="flex flex-col md:flex-row md:items-center">
                {" "}
                <div>
                  <h2 className="text-xl font-bold">{repo.name}</h2>{" "}
                  <p className="text-lg text-gray-600 mb-2">
                    {repo.description}
                  </p>{" "}
                  <div className="flex text-sm text-gray-700">
                    {" "}
                    <p className="mr-4">Stars: {repo.stargazers_count}</p>{" "}
                    <p>Issues: {repo.open_issues_count}</p>{" "}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end mt-4 md:mt-0">
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white focus:outline-none"
                  onClick={() => handleToggleGraph(repo.id)}
                >
                  {isGraphShown(repo.id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          {isGraphShown(repo.id) && (
            <CommitActivityGraph
              owner={repo.owner.login}
              repoName={repo.name}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default RepoList;

