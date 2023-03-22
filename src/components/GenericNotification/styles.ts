import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30vh;
  /* border: 1px red solid; */
`;

export const Content = styled.div`
  width: 300px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.shape};
  border-radius: 10px;
`;
