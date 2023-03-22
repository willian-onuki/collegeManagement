import styled from 'styled-components';

export const Container = styled.div`
  background: ${({theme}) => theme.colors.primary_dark};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 480px;
  height: 350px;
  background: rgba(255, 255, 255, 0.39);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export const Title = styled.h1`
  font-size: 26px;
  color: '#fff';
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0 24px;
  margin-top: 30px;
`;
