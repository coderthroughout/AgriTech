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
import { Link as RouterLink } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add your password reset logic here
      console.log('Password reset requested for:', email);
      
      toast({
        title: 'Reset link sent',
        description: 'Please check your email for password reset instructions.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="container.sm">
      <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white" mt={8}>
        <VStack spacing={6}>
          <Heading size="lg">Reset Password</Heading>
          <Text color="gray.600" textAlign="center">
            Enter your email address and we'll send you instructions to reset your password.
          </Text>
          
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                width="full"
                isLoading={isSubmitting}
                loadingText="Sending..."
              >
                Send Reset Link
              </Button>
            </VStack>
          </form>

          <Text>
            Remember your password?{' '}
            <Link as={RouterLink} to="/login" color="brand.500">
              Back to Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default ForgotPassword; 