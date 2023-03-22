import { Button, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { FormInput } from '../../components/FormInput';
import { FormData } from '../../dtos/FormDataDTO';

import * as Yup from 'yup';
import { useAuth } from '../../context/Auth';
import { Container, Content, Form } from './styles';


export function SignIn() {
  const theme = useTheme();
  const { signIn } = useAuth();
  const schema = Yup.object().shape({
    email: Yup.string().required('Insira o seu email'),
    password: Yup.string().required('Insira a sua senha'),
  });
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const handleForm = (data: FormData) => {
    signIn({ email: data.email, password: data.password })
  }

  return (
    <Container>
      <Content>
        <Text
          fontSize={30}
          fontWeight='bold'
          color={theme.colors.shape}
          textAlign='center'
        >
          Sign In
        </Text>

        <Form onSubmit={handleSubmit(handleForm)}>
          <Text
            fontSize={16}
            fontWeight='bold'
            color={theme.colors.shape}
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
            color={theme.colors.shape}
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
          <Button
            mt={35}
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
