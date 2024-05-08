

import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetchCodeFrequency, fetchContributorsStats } from '../Services/githubApi';

interface CommitActivityGraphProps {
  owner: string;
  repoName: string;
}

interface ContributorChange {
  author: {
    login: string;
  };
  weeks: {
    c: number; // commits
    a: number; // additions
    d: number; // deletions
  }[];
}

const CommitActivityGraph: React.FC<CommitActivityGraphProps> = ({ owner, repoName }) => {
  const [totalChanges, setTotalChanges] = useState<[number, number, number][]>([]);
  const [contributorsChanges, setContributorsChanges] = useState<ContributorChange[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('commits');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [totalChangesResponse, contributorsChangesResponse] = await Promise.all([
          fetchCodeFrequency(owner, repoName),
          fetchContributorsStats(owner, repoName),
        ]);
        setTotalChanges(totalChangesResponse);
        setContributorsChanges(contributorsChangesResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [owner, repoName]);

  const options: { [key: string]: string } = {
    commits: 'Commits',
    additions: 'Additions',
    deletions: 'Deletions',
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  let selectedData: number[] = [];
  if (totalChanges && totalChanges.length > 0) {
    selectedData = selectedOption === 'commits' ? totalChanges.map((week) => week[0]) :
      selectedOption === 'additions' ? totalChanges.map((week) => week[1]) :
        totalChanges.map((week) => week[2]);
  }

  const totalChangesOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Total Changes Activity',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Number of Changes',
      },
    },
    series: [
      {
        name: options[selectedOption],
        data: selectedData,
      },
    ],
  };

  const contributorsChangesOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Contributors Changes Activity',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Number of Changes',
      },
    },
    series: Array.isArray(contributorsChanges) ? contributorsChanges.map((contributor) => ({
      name: contributor.author.login,
      data: contributor.weeks.map((week) => {
        switch (selectedOption) {
          case 'commits':
            return week.c;
          case 'additions':
            return week.a;
          case 'deletions':
            return week.d;
          default:
            return 0;
        }
      }),
    })) : [],
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4 md:ml-20">
        <label htmlFor="optionSelect">Select Option:</label>
        <select id="optionSelect" value={selectedOption} onChange={handleChange} className="ml-2 border border-2 bg-[#D5F3FD99] rounded ">
          {Object.entries(options).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
      <br />
      <div className="mb-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          totalChanges.length > 0 && <HighchartsReact highcharts={Highcharts} options={totalChangesOptions} />
        )}
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          contributorsChanges.length > 0 && <HighchartsReact highcharts={Highcharts} options={contributorsChangesOptions} />
        )}
      </div>
    </div>
  );
};

export default CommitActivityGraph;