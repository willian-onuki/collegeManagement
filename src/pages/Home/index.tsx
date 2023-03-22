import { Box, Card, Center, Container, Flex, HStack, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { GenericPage } from '../../components/GenericPage';
import { useAuth } from '../../context/Auth';
import { Text, Title } from './styles';

import { Pie } from 'react-chartjs-2';

import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJs.register(ArcElement, Tooltip, Legend);

export function Home() {
  const { data } = useAuth();
  const theme = useTheme();
  const [gretting, setGretting] = useState('');

  const chartDataTableCapacity = {
    labels: ['capacidade', 'meta'],
    datasets: [
      {
        data: [47, 100],
        backgroundColor: [
          theme.colors.secondary_blue,
          theme.colors.primary_light,
        ],
      },
    ],
  };

  const chartDataClassroom = {
    labels: ['salas', 'meta'],
    datasets: [
      {
        data: [13, 100],
        backgroundColor: [
          theme.colors.secondary_blue,
          theme.colors.primary_light,
        ],
      },
    ],
  };

  useEffect(() => {
    const currentHours = new Date().getHours();
    if (currentHours < 12) {
      setGretting('Bom dia');
    } else if (currentHours < 18) {
      setGretting('Boa tarde');
    } else {
      setGretting('Boa noite');
    }
  });

  return (
    <GenericPage>
        <Title style={{marginLeft: 20, marginTop: 20}}>{`${gretting}, ${data.name}`}</Title>

        <HStack
          mt={35}
          ml='30%'
        >
          <Title>sala de aula com mais espaço</Title>
        </HStack>
        <Center mt='16px'>
          <Flex
            width='600px'
            borderRadius={10}
            border='none'
            padding={10}
            justifyContent='space-between'
            bg={theme.colors.primary_dark}
          >
            <Box>
              <Image
                height='250px'
                width='250px'
                src='https://www.colegio15denovembro.com.br/wp-content/uploads/2018/06/colegio-01.jpg'
              />
            </Box>
            <Box
              ml={10}
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
            >
              <HStack>
                <Text>Colégio colégio</Text>
              </HStack>
              <HStack>
                <Text>sala de aula</Text>
              </HStack>
              <HStack width='200px'>
                <Pie
                  options={{}}
                  data={chartDataTableCapacity}
                />
              </HStack>
            </Box>
          </Flex>
        </Center>
        <HStack
          mt={35}
          ml='30%'
        >
          <Title>Colégio com mais salas</Title>
        </HStack>
        <Center mt='16px'>
          <Flex
            width='600px'
            borderRadius={10}
            border='none'
            padding={10}
            justifyContent='space-between'
            bg={theme.colors.primary_dark}
          >
            <Box
              mr={10}
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
            >
              <HStack>
                <Text>Colégio colégio</Text>
              </HStack>
              <HStack width='200px'>
                <Pie
                  options={{}}
                  data={chartDataClassroom}
                />
              </HStack>
            </Box>
            <Box>
              <Image
                height='250px'
                width='250px'
                src='https://www.colegio15denovembro.com.br/wp-content/uploads/2018/06/colegio-01.jpg'
              />
            </Box>
          </Flex>
        </Center>
    </GenericPage>
  );
}
