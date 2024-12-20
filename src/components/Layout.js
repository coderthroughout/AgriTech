import React from 'react';
import { Box, Container } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box
      className="page-transition"
      py={{ base: 4, md: 8 }}
      px={{ base: 4, md: 0 }}
    >
      <Container
        maxW="container.xl"
        bg="rgba(255, 255, 255, 0.9)"
        borderRadius="xl"
        boxShadow="xl"
        p={{ base: 4, md: 8 }}
        className="glass-effect"
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 