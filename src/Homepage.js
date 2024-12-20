import React from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  Button,
  Image,
  Flex,
} from '@chakra-ui/react';
import { FaLeaf, FaHandshake, FaTruck, FaChartLine } from 'react-icons/fa';
import Layout from './components/Layout';

const Feature = ({ icon, title, text }) => {
  return (
    <VStack
      bg="white"
      p={8}
      borderRadius="lg"
      boxShadow="md"
      className="hover-transform glass-effect"
      spacing={4}
      align="start"
    >
      <Icon as={icon} w={10} h={10} color="brand.500" />
      <Heading size="md">{title}</Heading>
      <Text color="gray.600">{text}</Text>
    </VStack>
  );
};

const Homepage = () => {
  return (
    <Layout>
      <Box>
        {/* Hero Section */}
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          gap={8}
          mb={16}
        >
          <Box flex={1}>
            <Heading
              size="2xl"
              mb={6}
              bgGradient="linear(to-r, brand.500, brand.700)"
              bgClip="text"
            >
              Revolutionizing Agricultural Commerce
            </Heading>
            <Text fontSize="xl" color="gray.600" mb={8}>
              Connect directly with farmers, streamline your supply chain, and grow your business with our innovative platform.
            </Text>
            <Button size="lg" colorScheme="brand">
              Get Started
            </Button>
          </Box>
          <Box flex={1}>
            <Image
              src="/hero-image.jpg"
              alt="Agriculture"
              borderRadius="2xl"
              shadow="2xl"
              fallbackSrc="https://via.placeholder.com/600x400"
            />
          </Box>
        </Flex>

        {/* Features Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mb={16}>
          <Feature
            icon={FaLeaf}
            title="Sustainable Farming"
            text="Support eco-friendly farming practices and contribute to environmental conservation."
          />
          <Feature
            icon={FaHandshake}
            title="Direct Trading"
            text="Connect directly with farmers and eliminate unnecessary intermediaries."
          />
          <Feature
            icon={FaTruck}
            title="Efficient Logistics"
            text="Streamlined delivery system ensuring fresh produce reaches its destination."
          />
          <Feature
            icon={FaChartLine}
            title="Market Insights"
            text="Access real-time market data and make informed decisions."
          />
        </SimpleGrid>
      </Box>
    </Layout>
  );
};

export default Homepage;
