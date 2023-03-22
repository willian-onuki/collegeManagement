import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
`;

export const RadioGroupLabel = styled.label`
`;

export const WrapperRadioButton = styled.div`
 display: flex;
 align-items: center;
 margin-right: 20px;
`;

export const RadioButtonLabel = styled.label`
  margin-left: 4px;
`;

export const RadioButton = styled.input.attrs({
  type: 'radio'
})``

export const TeacherOptions = styled.select``;

export const Option = styled.div`
  border: 1px red solid;
`;

export const ImagePicker = styled.input.attrs({
  type: 'file',
})`
  margin-bottom: 16px;
`;

export const Protocol = styled.iframe`
  margin-bottom: 16px;
  width: 100%;
  height: 300px;
  border:1px red solid ;
`;

export const SelectedImage = styled.img`
  width: 350px;
  height: 200px;
  border-radius: 6px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.secondary_blue};
  color: #fff;
`;
