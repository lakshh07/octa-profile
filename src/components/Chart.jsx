import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";

function Charts({ langData, repoData }) {
  // languages chart
  const topLanguageData = {
    labels: langData.map((lang) => lang.label),
    datasets: [
      {
        data: langData.map((lang) => lang.value),
        backgroundColor: langData.map((lang) => `${lang.color}`),
        borderColor: langData.map((lang) => `${lang.color}`),
        borderWidth: 1,
      },
    ],
  };

  // star per language chart
  const filteredRepos = repoData.filter(
    (repo) => !repo.fork && repo.stargazers_count > 0
  );
  const uniqueLangs = new Set(filteredRepos.map((repo) => repo.language));
  const starslabels = Array.from(uniqueLangs.values()).filter((l) => l);
  const starsdata = starslabels.map((lang) => {
    const repos = filteredRepos.filter((repo) => repo.language === lang);
    const starsArr = repos.map((r) => r.stargazers_count);
    const starSum = starsArr.reduce((a, b) => a + b, 0);
    return starSum;
  });

  const starsPLgData = {
    labels: starslabels,
    datasets: [
      {
        data: starsdata,
        backgroundColor: langData.map((lang) => `${lang.color}`),
        borderColor: langData.map((lang) => `${lang.color}`),
        borderWidth: 1,
      },
    ],
  };

  //most starred chart
  const LIMIT = 5;
  const sortProperty = "stargazers_count";
  const mostStarredRepos = repoData
    .filter((repo) => !repo.fork)
    .sort((a, b) => b[sortProperty] - a[sortProperty])
    .slice(0, LIMIT);
  const starredlabels = mostStarredRepos.map((repo) => repo.name);
  const starreddata = mostStarredRepos.map((repo) => repo[sortProperty]);

  const mstStarredData = {
    labels: starredlabels,
    datasets: [
      {
        data: starreddata,
        backgroundColor: langData.map((lang) => `${lang.color}`),
        borderColor: langData.map((lang) => `${lang.color}`),
        borderWidth: 1,
      },
    ],
  };

  const mstStarredOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 0.2,
        },
      },
    },
  };

  return (
    <Box className="chart-box">
      <Box
        bg="whitesmoke"
        maxW="500px"
        p="2rem"
        rounded="0.25rem"
        boxShadow={
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
        }
      >
        <Heading fontSize="1.75rem" className="chartBoxHeading">
          Top Languages
        </Heading>
        <Box mt={10}>
          <Pie data={topLanguageData} />
        </Box>
      </Box>
      <Box
        bg="whitesmoke"
        maxW="500px"
        p="2rem"
        rounded="0.25rem"
        boxShadow={
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
        }
      >
        <Heading fontSize="1.75rem" className="chartBoxHeading">
          Most Starred
        </Heading>
        <Box mt={10}>
          <Bar height="300" data={mstStarredData} options={mstStarredOptions} />
        </Box>
      </Box>
      <Box
        bg="whitesmoke"
        maxW="500px"
        p="2rem"
        rounded="0.25rem"
        boxShadow={
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
        }
      >
        <Heading fontSize="1.75rem" className="chartBoxHeading">
          Stars per Language
        </Heading>
        <Box mt={10}>
          <Doughnut data={starsPLgData} />
        </Box>
      </Box>
    </Box>
  );
}

export default Charts;
