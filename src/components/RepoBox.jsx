import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Text, Icon, Link } from "@chakra-ui/react";
import { BiBookBookmark, BiGitRepoForked } from "react-icons/bi";
import FlipMove from "react-flip-move";
import { FaStar } from "react-icons/fa";
import { Select } from "antd";
import langColors from "../utils/langColors";

function Repo({ repoData }) {
  const [topRepos, setTopRepos] = useState([]);
  const [sortType, setSortType] = useState("stars");
  const { Option } = Select;

  const getTopRepos = React.useCallback(
    (type) => {
      const LIMIT = 8;
      const map = {
        stars: "stargazers_count",
        forks: "forks_count",
        size: "size",
      };
      const sortProperty = map[type];
      const sorted = repoData
        .filter((repo) => !repo.fork)
        .sort((a, b) => b[sortProperty] - a[sortProperty])
        .slice(0, LIMIT);

      setTopRepos(sorted);
    },
    [repoData]
  );

  useEffect(() => {
    if (repoData.length) {
      getTopRepos();
    }
  }, [getTopRepos, repoData]);

  useEffect(() => getTopRepos(sortType), [sortType, getTopRepos]);

  const changeRepoSort = (sortType) => {
    setSortType(sortType);
  };

  function handleChange(value) {
    changeRepoSort(value);
  }
  return (
    <Box m="0 auto" maxW="90%">
      <Flex alignItems="center" justifyContent="flex-start">
        {" "}
        <Heading fontSize="1.75rem" className="chartBoxHeading">
          Top Repos
        </Heading>
        <Text mx="1rem">By</Text>
        <Select
          defaultValue="Stars"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value="stars">Stars</Option>
          <Option value="forks">Forks</Option>
          <Option value="size">Size</Option>
        </Select>
      </Flex>

      <Box my="2rem">
        {topRepos.length > 0 ? (
          <FlipMove className="repo-box" typeName="ul">
            {topRepos.map((repo) => (
              <li key={repo.id}>
                <Link
                  _hover={{
                    textDecoration: "none",
                  }}
                  href={repo.html_url}
                  isExternal
                >
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    bg="#f9f9f9"
                    rounded="md"
                    h="100%"
                    p={5}
                    w="full"
                    boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                  >
                    <Box>
                      <Text
                        fontFamily="Source Code Pro"
                        fontSize="20px"
                        color="#000"
                        fontWeight="600"
                      >
                        <Icon color="#6a737d" as={BiBookBookmark} /> {repo.name}
                      </Text>
                      <Text
                        fontFamily="Raleway"
                        mt={3}
                        color={"rgb(80, 99, 100)"}
                      >
                        {repo.description}
                      </Text>
                    </Box>
                    <Flex justifyContent="space-between" mt={6}>
                      <ul className="box-ul">
                        <li>
                          <div
                            className="language"
                            style={{
                              backgroundColor: langColors[repo.language],
                            }}
                          />
                          {repo.language}
                        </li>
                        <li>
                          {" "}
                          <Icon mr="0.3rem" as={FaStar} />{" "}
                          {repo.stargazers_count.toLocaleString()}
                        </li>
                        <li>
                          {" "}
                          <Icon mr="0.3rem" as={BiGitRepoForked} />{" "}
                          {repo.forks.toLocaleString()}
                        </li>
                      </ul>
                      <Text fontSize="13px" color="#6a737d">
                        {repo.size.toLocaleString()} KB
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
              </li>
            ))}
          </FlipMove>
        ) : (
          <p>No available repositories!</p>
        )}
      </Box>
    </Box>
  );
}

export default Repo;
