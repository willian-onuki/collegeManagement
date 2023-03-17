import React from 'react';
import { SideBar } from '../SideBar';

import { Container, WrapperPage, WrapperSideBar } from './styles';

interface Props {
  children: React.ReactNode;
}

export function GenericPage({children}: Props) {
  return(
    <Container>
      <WrapperSideBar>
        <SideBar/>
      </WrapperSideBar>
      <WrapperPage>{children}</WrapperPage>
    </Container>
  )
}
