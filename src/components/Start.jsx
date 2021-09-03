import React, { useState } from "react";
import { useHistory } from "react-router";
import { Box, Flex, Heading, Input, Icon, useToast } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Title } from "../utils/changeTitle";

function Start({ getLangData, getRepoData, getUserData, userData }) {
  const toast = useToast();
  const [username, setUsername] = useState("");
  let history = useHistory();
  const setUserName = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Box
      w="100%"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      bgImage={"linear-gradient(rgb(26, 30, 34) 0%, rgb(36, 41, 46) 100%)"}
      bg={"rgb(26, 30, 34)"}
    >
      {" "}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let path = `/user/${username}`;
          history.push(path);
          Title({
            title: `OctaProfile | ${username}`,
            metaDescription: ``,
          });

          toast({
            title: "Wait a Moment !",
            description: "We are fetching your account info.",
            status: "info",
            position: "top-right",
            duration: 4000,
          });
          getLangData(username);
          getUserData(username);
          getRepoData(username);
        }}
      >
        <Flex
          justifyContent="center"
          align="center"
          flexDirection="column"
          p={4}
          pt="10%"
        >
          <Icon m="1rem" color="#0070f3" boxSize="4rem" as={FaGithub} />
          <Heading
            m="1rem"
            fontFamily="Raleway"
            fontSize={["20px", "20px", "40px", "40px"]}
            color="#f6f8fa"
          >
            Find Your OctaProfile
          </Heading>
          <Input
            m="1rem"
            w={["70%", "50%", "60%", "40%"]}
            variant="filled"
            size="lg"
            bg="#26303C"
            color="#79b8ff"
            fontWeight="500px"
            letterSpacing="4px"
            textAlign="center"
            fontFamily="Source Code Pro"
            _hover={{ bg: "#26303C" }}
            _focus={{ bg: "#26303C" }}
            isRequired
            value={username}
            onChange={setUserName}
          />
        </Flex>
      </form>
    </Box>
  );
}

export default Start;
