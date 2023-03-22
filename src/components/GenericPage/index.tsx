import React from 'react';
import { DataProps, useAuth } from '../../context/Auth';
import { api } from '../../services/api';
import { SideBar } from '../SideBar';

import { Container, WrapperPage, WrapperSideBar } from './styles';

interface Props {
  children: React.ReactNode;
}

export function GenericPage({ children }: Props) {
  return (
    <Container>
      <WrapperSideBar>
        <SideBar />
      </WrapperSideBar>
      <WrapperPage>{children}</WrapperPage>
    </Container>
  );
}
