import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WrapperInput = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ImagePicker = styled.input.attrs({
  type: 'file'
})`
  margin-bottom: 16px;
`;

export const SelectedImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 6px;
  margin-bottom: 10px;
`;

export const Option = styled.option``;


export const Button = styled.button`
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.secondary_blue};
  color: ${({ theme }) => theme.colors.background};
`;
