import React from 'react';

import { Container, Content } from './styles';

import { FcFile } from 'react-icons/fc';
import { Button, Center, Text } from '@chakra-ui/react';

interface Props {
  text: string;
  buttonText?: string;
  onClick?: () => void;
}

export function GenericNotification({ text, onClick, buttonText }: Props) {
  return (
    <Container>
      <Content>
        <FcFile size={80} />
        <Text
          mt='26px'
          fontSize='22px'
        >
          {text}
        </Text>
        {/* <Button onClick={onClick}>{buttonText}</Button> */}
      </Content>
    </Container>
  );
}
