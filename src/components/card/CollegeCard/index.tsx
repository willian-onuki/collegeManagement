import {
  Box,
  Button,
  Card,
  CardBody,
  Collapse,
  Heading, HStack,
  Image,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useTheme } from 'styled-components';

export function CollegeCard() {
  const { isOpen, onToggle } = useDisclosure();
  const theme = useTheme();

  return (
    <Card maxW='sm' alignSelf='flex-start'>
      <CardBody>
        <Image
          w='100%'
          h='auto'
          objectFit='scale-down'
          src='https://cdn.britannica.com/03/130603-050-37F7F535/Alliman-Administration-Center-Hesston-College-Mennonite-college.jpg'
        />
        <Stack
          mt='6'
          spacing='3'
        >
          <Heading size='md'>Nome Escola</Heading>
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
              <Text>Estado E</Text>
              <Text>Cidade Cidade</Text>
              <HStack>
                <Text>Rua rua</Text>
                <Text>Número 00</Text>
              </HStack>
              <Text>Bairro Bairro</Text>
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
