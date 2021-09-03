import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  Image,
  Link,
  Button,
} from "@chakra-ui/react";
import { MdDateRange } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { useHistory } from "react-router-dom";

function UserInfo({ rateLimit, userData }) {
  let history = useHistory();
  return (
    <Box bg="#1A1E22" w="100%">
      {rateLimit && (
        <Flex
          justifyContent="flex-start"
          flexDirection="column"
          p={5}
          position="absolute"
        >
          <Text fontFamily="Raleway" fontSize="20px" color="#6A737D">
            {rateLimit.remaining} / {rateLimit.limit}
          </Text>
          <Text fontFamily="Raleway" fontSize="10px" color="#586069" pt={1}>
            REQUESTS LEFT
          </Text>
        </Flex>
      )}
      <Flex right="0" flexDirection="column" p={5} mt={1} position="absolute">
        <Button
          onClick={() => {
            history.push("/");
          }}
        >
          Log Out
        </Button>
      </Flex>

      {userData ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          p="3rem 5rem 9rem"
        >
          {userData.avatar_url && (
            <Image
              borderRadius="full"
              boxSize="150px"
              border="8px"
              color="#0070F3"
              src={userData.avatar_url}
              alt={userData.name}
            />
          )}

          <Heading
            fontFamily="Raleway"
            letterSpacing="2px"
            pt={8}
            fontSize={["30px", "30px", "40px", "40px"]}
            color="white"
          >
            {userData.name}
          </Heading>

          <Text
            fontFamily="Source Code Pro"
            p={2}
            fontSize="24px"
            color="#0070F3"
            _hover={{
              textDecoration: "underline",
            }}
          >
            {" "}
            <Link href={userData.html_url} isExternal>
              @{userData.login}
            </Link>
          </Text>

          <Flex p={2}>
            {userData.location && (
              <Flex p={1} mr={4} align="center">
                <Icon as={GoLocation} fontSize="16px" color="#c8e1ff" mr={2} />
                <Text fontSize="16px" color="#c8e1ff">
                  {userData.location}
                </Text>
              </Flex>
            )}
            <Flex p={1} ml={4} align="center">
              <Icon as={MdDateRange} fontSize="16px" color="#c8e1ff" mr={2} />
              <Text fontFamily="Raleway" fontSize="16px" color="#c8e1ff">
                Joined{" "}
                {new Date(userData.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Box bg="rgb(36, 41, 46)" align="center" p={4} rounded="6px" m={4}>
              <Text fontSize="1.5rem" color="rgb(246, 248, 250)">
                {userData.public_repos.toLocaleString()}
              </Text>
              <Text
                fontSize="0.75rem"
                letterSpacing="1px"
                mt="0.75rem"
                color="rgba(200, 225, 255, 0.7)"
              >
                REPOSITORIES
              </Text>
            </Box>
            <Box bg="rgb(36, 41, 46)" align="center" p={4} rounded="6px" m={4}>
              <Text fontSize="1.5rem" color="rgb(246, 248, 250)">
                {userData.followers.toLocaleString()}
              </Text>
              <Text
                fontSize="0.75rem"
                letterSpacing="1px"
                mt="0.75rem"
                color="rgba(200, 225, 255, 0.7)"
              >
                FOLLOWERS
              </Text>
            </Box>
            <Box bg="rgb(36, 41, 46)" align="center" p={4} rounded="6px" m={4}>
              <Text fontSize="1.5rem" color="rgb(246, 248, 250)">
                {userData.following.toLocaleString()}
              </Text>
              <Text
                fontSize="0.75rem"
                letterSpacing="1px"
                mt="0.75rem"
                color="rgba(200, 225, 255, 0.7)"
              >
                FOLLOWING
              </Text>
            </Box>
          </Flex>
        </Flex>
      ) : (
        <>
          <Heading
            pt="10%"
            align="center"
            fontFamily="Raleway"
            fontSize={["20px", "20px", "40px", "40px"]}
            color="#f6f8fa"
          >
            NO DATA FOUND
          </Heading>
          <Text
            py={5}
            fontSize="16px"
            color="#f6f8fa"
            align="center"
            fontFamily="Raleway"
          >
            Oh no! Something went wrong. Try again later!
          </Text>
        </>
      )}
    </Box>
  );
}

export default UserInfo;
