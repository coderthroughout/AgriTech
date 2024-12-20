import React from 'react';
import { ChakraProvider, Box, Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Dashboard from './Dashboard';
import BuyerFeatures from './BuyerFeatures';
import CollectionCentre from './CollectionCentre';
import ChatSystem from './ChatSystem';
import Navigation from './Navigation';
import Register from './Register';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box
          minH="100vh"
          bg="gray.50"
          bgGradient="linear(to-b, green.50, white)"
          backgroundImage="url('https://www.transparenttextures.com/patterns/agricultural.png')"
          backgroundAttachment="fixed"
          backgroundSize="cover"
          backgroundBlendMode="overlay"
        >
          <Navigation />
          <Container 
            maxW="container.xl" 
            py={8}
            px={{ base: 4, md: 8 }}
          >
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/buyer" element={<BuyerFeatures />} />
              <Route path="/collection" element={<CollectionCentre />} />
              <Route path="/chat" element={<ChatSystem />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;

