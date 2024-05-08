import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import RepoList from "./RepoList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const authToken = "";

const RepoPage: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");

  const fetchRepos = useCallback(async () => {
    let date;
    switch (selectedPeriod) {
      case "1":
        date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "2":
        date = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
        break;
      default:
        date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc&page=${page}`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );
      setRepos(response.data.items);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  }, [page, selectedPeriod]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <br />
      <br />
      <div>
        <div className="container max-w-screen-lg mx-auto px-4 mt-16 mb-8">
          <div className="mb-4 flex justify-center md:flex-start lg:justify-start">
            <label htmlFor="period" className="text-center text-xl font-bold mr-2">
              Select Period:
            </label>
            <select
              id="period"
              value={selectedPeriod}
              onChange={handlePeriodChange}
              className="border border-gray-300 rounded -p-1 focus:outline-none bg-[#D5F3EC66]"
            >
              <option value="">Last 30 Days</option>
              <option value="1">1 Week</option>
              <option value="2">2 Weeks</option>
            </select>
          </div>
          <br />
          <div className="flex justify-between items-center mb-4">
            <button
              className="flex items-center bg-transparent border border-transparent rounded  p-2  hover:text-lg font-bold focus:outline-none "
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              <ArrowBackIcon />
              Previous Page
            </button>
            <button
              className="flex items-center bg-transparent border border-transparent rounded p-2 focus:outline-none hover:text-lg font-bold"
              onClick={handleNextPage}
            >
              Next Page
              <ArrowForwardIcon />
            </button>
          </div>
          <RepoList repos={repos} />
        </div>
      </div>
    </>
  );
};

export default RepoPage;
