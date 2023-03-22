import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Collapse,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useTheme } from 'styled-components';
import { FiCameraOff } from 'react-icons/fi';
import { CollegeDTO } from '../../../dtos/CollegeDTO';

interface CollegeCardProps {
  college: CollegeDTO;
}

export function CollegeCard({ college }: CollegeCardProps) {
  const { isOpen, onToggle } = useDisclosure();
  const theme = useTheme();

  return (
    <Card
      maxW='sm'
      alignSelf='flex-start'
    >
      <CardBody>
        {college.image ? (
          <Image
            w='100%'
            h='200px'
            objectFit='scale-down'
            src={String(college.image)}
          />
        ) : (
          <Flex
            alignItems='center'
            justifyContent='center'
            py='80px'
            h='200px'
            bg='gray.100'
          >
            <FiCameraOff size={50} />
          </Flex>
        )}
        <Stack
          mt='6'
          spacing='3'
        >
          <Heading size='md'>{college.name}</Heading>
          <Collapse
            in={isOpen}
            animateOpacity
          >
            <Box
              p='40px'
              color='white'
              mt='4'
              bg={theme.colors.secondary_blue}
              rounded='md'
              shadow='md'
            >
              <Text>Estado {college.state}</Text>
              <Text>Cidade {college.city}</Text>
              <Text>Rua {college.street}</Text>
              <Text>Número {college.number}</Text>
              <Text>Bairro {college.neighborhood}</Text>
            </Box>
          </Collapse>
          <Button
            bg={theme.colors.secondary_blue}
            color='white'
            onClick={onToggle}
          >
            {isOpen ? 'Mostrar menos' : 'Mostrar mais'}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}
