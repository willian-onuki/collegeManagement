import styled from 'styled-components';


export const Title = styled.h1`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary_dark};
  font-weight: bold;
`;

export const Card = styled.div`
  border: 1px ${({ theme }) => theme.colors.primary_dark} solid;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Text = styled.p`
  font-size: 20px;
  color: white;
`;
