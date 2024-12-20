import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
  Container
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your login logic here
      console.log('Login attempt with:', { email, password });
      
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.sm">
      <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white" mt={8}>
        <VStack spacing={6}>
          <Heading size="lg">Welcome Back</Heading>
          <Text color="gray.600">Please sign in to continue</Text>
          
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </FormControl>

              <Link
                as={RouterLink}
                to="/forgot-password"
                color="brand.500"
                alignSelf="flex-end"
                fontSize="sm"
              >
                Forgot Password?
              </Link>

              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                width="full"
                mt={4}
              >
                Sign In
              </Button>
            </VStack>
          </form>

          <Text>
            Don't have an account?{' '}
            <Link as={RouterLink} to="/register" color="brand.500">
              Sign up
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;