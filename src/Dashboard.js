import React, { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  Heading
} from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCentres: 0,
    averagePrice: 0,
    totalCapacity: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient(
        process.env.REACT_APP_SUPABASE_URL,
        process.env.REACT_APP_SUPABASE_ANON_KEY
      );

      // Fetch products stats
      const { data: products } = await supabase
        .from('products')
        .select('price');

      // Fetch centres stats
      const { data: centres } = await supabase
        .from('collection_centres')
        .select('capacity');

      const totalProducts = products?.length || 0;
      const totalCentres = centres?.length || 0;
      const averagePrice = products?.reduce((acc, curr) => acc + curr.price, 0) / totalProducts || 0;
      const totalCapacity = centres?.reduce((acc, curr) => acc + curr.capacity, 0) || 0;

      setStats({
        totalProducts,
        totalCentres,
        averagePrice,
        totalCapacity
      });
    };

    fetchStats();
  }, []);

  return (
    <Box p={8}>
      <Heading mb={6}>Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Total Products</StatLabel>
              <StatNumber>{stats.totalProducts}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Collection Centres</StatLabel>
              <StatNumber>{stats.totalCentres}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                15%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Average Price</StatLabel>
              <StatNumber>₹{stats.averagePrice.toFixed(2)}</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Total Capacity</StatLabel>
              <StatNumber>{stats.totalCapacity} tons</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                10%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;

