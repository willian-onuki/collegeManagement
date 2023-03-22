import styled from 'styled-components';

export const Container = styled.div`
  border: 1px red solid;
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Image = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.shape};
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const Text = styled.p``;
