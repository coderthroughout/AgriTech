import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';

const BuyerFeatures = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const supabase = createClient(
        process.env.REACT_APP_SUPABASE_URL,
        process.env.REACT_APP_SUPABASE_ANON_KEY
      );

      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name: productName,
            description,
            price: parseFloat(price),
          },
        ]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Product added successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      
      // Clear form
      setProductName('');
      setDescription('');
      setPrice('');
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error adding product: ' + error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <Box p={8}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Add New Product</Heading>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                min="0"
                step="0.01"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Add Product
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default BuyerFeatures;

