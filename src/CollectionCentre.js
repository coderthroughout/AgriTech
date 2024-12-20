import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  Select,
  Text
} from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';

const CollectionCentre = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [type, setType] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const supabase = createClient(
        process.env.REACT_APP_SUPABASE_URL,
        process.env.REACT_APP_SUPABASE_ANON_KEY
      );

      const { data, error } = await supabase
        .from('collection_centres')
        .insert([
          {
            name,
            location,
            capacity: parseInt(capacity),
            type
          },
        ]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Collection centre added successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      
      // Clear form
      setName('');
      setLocation('');
      setCapacity('');
      setType('');
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error adding collection centre: ' + error.message,
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
        <Heading size="lg">Add Collection Centre</Heading>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Centre Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter centre name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Capacity (in tons)</FormLabel>
              <Input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Enter capacity"
                min="0"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Centre Type</FormLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Select centre type"
              >
                <option value="warehouse">Warehouse</option>
                <option value="processing">Processing Center</option>
                <option value="distribution">Distribution Center</option>
              </Select>
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
              Add Collection Centre
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default CollectionCentre;

