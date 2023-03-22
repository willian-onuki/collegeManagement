import styled from 'styled-components';

export const Label = styled.label`
  margin-bottom: 4px;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px 20px;
  border: 1px ${({theme}) => theme.colors.border} solid;
  border-radius: 6px;
`;

export const Select = styled.select`
  margin-bottom: 10px;
  padding: 10px 20px;
`;

export const Option = styled.option``;
