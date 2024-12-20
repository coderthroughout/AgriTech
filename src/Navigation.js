import React from 'react';
import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <Box bg="teal.500" px={4} py={3}>
      <Flex justify="space-between" align="center">
        <Flex gap={6}>
          <ChakraLink as={RouterLink} to="/" color="white">
            Home
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/dashboard" color="white">
            Dashboard
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/buyer" color="white">
            Buyer Features
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/collection" color="white">
            Collection Centre
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/chat" color="white">
            Chat
          </ChakraLink>
        </Flex>
        <Flex gap={4}>
          <ChakraLink as={RouterLink} to="/register" color="white">
            Create Account
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/login" color="white">
            Login
          </ChakraLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation;