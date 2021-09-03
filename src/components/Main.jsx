import React from "react";
import { Flex, Text, Link } from "@chakra-ui/react";
import UserInfo from "./UserInfo";
import Chart from "./Chart";
import RepoBox from "./RepoBox";

function Main({ rateLimit, userData, repoData, langData }) {
  return (
    <>
      <UserInfo rateLimit={rateLimit} userData={userData} />
      {langData && repoData && (
        <>
          <Chart repoData={repoData} langData={langData} />
          <RepoBox repoData={repoData} />
        </>
      )}
      <Flex p={10} justifyContent="center">
        <Text
          className="chartBoxHeading"
          letterSpacing="0.2rem"
          color="#000"
          fontFamily="Raleway"
          fontSize="16px"
        >
          Build with ❤ by{" "}
          <Link
            color="gray"
            href="https://github.com/lakshh07"
            _hover={{
              color: "#000",
            }}
          >
            Lakshay
          </Link>{" "}
        </Text>
      </Flex>
    </>
  );
}

export default Main;
