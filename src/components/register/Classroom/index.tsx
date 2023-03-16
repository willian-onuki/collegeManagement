import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../FormInput';
import { FormData } from '../../../dtos/FormDataDTO';

import {
  Button,
  Container,
  Form,
  RadioButton,
  RadioButtonLabel,
  RadioGroup,
  TeacherOptions,
  WrapperInput,
  WrapperRadioButton,
} from './styles';

// Nome
// Capacidade de mesas
// Bloqueada
// Lista de 5 professores para serem escolhidos mais de 1
// colégio(relacionamento com os colégios criados)
// Grade de aulas: Imagem salva no banco em Base64
// Protocolo: upload de Arquivo em docx.

export function Classroom() {
  const { control, handleSubmit } = useForm();

  const [isBloqued, setIsBloqued] = useState('no');

  const teachers = [
    'Professor 1',
    'Professor 2',
    'Professor 3',
    'Professor 4',
    'Professor 5',
  ];
  const handleForm = (data: FormData) => {
    console.log('HANDLE FORM DATA');
    console.log(data, isBloqued);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleForm)}>
        <WrapperInput>
          <FormInput
            name='name'
            control={control}
            label='Nome'
          />
          <FormInput
            name='tableCapacity'
            control={control}
            label='Capacidade de mesas'
          />
          <RadioButtonLabel>Bloqueado:</RadioButtonLabel>
          <RadioGroup>
            <WrapperRadioButton>
              <RadioButton
                value='yes'
                checked={isBloqued === 'yes'}
                onChange={(e) => {
                  setIsBloqued(e.target.value);
                }}
              />
              <RadioButtonLabel>Sim</RadioButtonLabel>
            </WrapperRadioButton>
            <WrapperRadioButton>
              <RadioButton
                value='no'
                checked={isBloqued === 'no'}
                onChange={(e) => {
                  setIsBloqued(e.target.value);
                }}
              />
              <RadioButtonLabel>Não</RadioButtonLabel>
            </WrapperRadioButton>
          </RadioGroup>

          <FormInput
            name='teacher'
            control={control}
            label='Professor'
            haveOptions
            optionsValue={teachers}
          />
          <Button type='submit'>Cadastrar</Button>
        </WrapperInput>
      </Form>
    </Container>
  );
}
