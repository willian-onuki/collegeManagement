import { Box, Button, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { FormInput } from '../../components/FormInput';

import { Container, Content, Form } from './styles';
import * as Yup from 'yup';
import { FormData } from '../../dtos/FormDataDTO';
import { api } from '../../services/api';
export function SignUp() {
  const theme = useTheme();

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Precisa ser um email válido')
      .required('O email é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas estão diferentes')
      .required('É preciso inserir a senha novamente nesse campo'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleForm = async (data: FormData) => {
    const params = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      await api.post('/user/signup', params);
    } catch (error) {
    }
  };

  return (
    <Container>
      <Content>
        <Text
          fontSize={30}
          fontWeight='bold'
          color={theme.colors.primary_dark}
          textAlign='center'
        >
          Sign Up
        </Text>

        <Form onSubmit={handleSubmit(handleForm)}>
          <Text
            fontSize={16}
            fontWeight='bold'
            color={theme.colors.primary_dark}
          >
            Nome
          </Text>
          <FormInput
            control={control}
            name='name'
            placeholder='Insira o seu nome'
            error={errors.name?.message}
          />

          <Text
            fontSize={16}
            fontWeight='bold'
            color={theme.colors.primary_dark}
          >
            Email
          </Text>
          <FormInput
            control={control}
            name='email'
            placeholder='Insira o seu email'
            error={errors.email?.message}
          />

          <Text
            fontSize={16}
            fontWeight='bold'
            color={theme.colors.primary_dark}
          >
            Senha
          </Text>
          <FormInput
            control={control}
            name='password'
            type='password'
            placeholder='Insira a seu senha'
            error={errors.password?.message}
          />
          <Text
            fontSize={16}
            fontWeight='bold'
            color={theme.colors.primary_dark}
          >
            Confirmar senha
          </Text>
          <FormInput
            control={control}
            name='passwordConfirmation'
            type='password'
            placeholder='Digite novamente a seu senha'
            error={errors.passwordConfirmation?.message}
          />
          <Button
            my={35}
            bg={theme.colors.secondary_blue}
            color='white'
            type='submit'
          >
            Entrar
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
