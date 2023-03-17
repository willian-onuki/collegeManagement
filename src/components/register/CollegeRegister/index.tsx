import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from '../../../dtos/FormDataDTO';
import { FormInput } from '../../FormInput';

import { Select, Spinner, Stack, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useCidades } from '../../../hooks/useCidades';
import { useEstado } from '../../../hooks/useEstados';
import {
  Button,
  Container,
  Form,
  ImagePicker,
  Option,
  SelectedImage,
  WrapperInput,
} from './styles';

export function CollegeRegister() {
  const { estados } = useEstado();

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    state: Yup.string().required('O estado é obrigatório'),
    city: Yup.string().required('O cidade é obrigatório'),
    street: Yup.string().required('A rua é obrigatório'),
    neighborhood: Yup.string().required('O bairro é obrigatório'),
    number: Yup.number().required('O número é obrigatório'),
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [selectedState, setSelectedState] = useState('');
  const { cidades, loadingCidades } = useCidades({ uf: selectedState });
  const [selectedCity, setSelectedCity] = useState('');

  const [selectedImage, setSelectedImage] = useState<ArrayBuffer | string>('');

  const handleForm = (data: FormData) => {
    console.log('HANDLE FORM DATA');
    console.log(data);
    const dataRequest = {
      ...data,
      image: selectedImage,
    };
    console.log(
      '🚀 ~ file: index.tsx:55 ~ handleForm ~ dataRequest:',
      dataRequest
    );
  };

  const handleImage = (file: FileList | null) => {
    const hasFile = file?.length ? file[0] : null;
    getBase64(hasFile);
  };

  const getBase64 = (file: File | null) => {
    const reader = new FileReader();
    const blob = new Blob([file as BlobPart], { type: 'image/jpeg' });
    reader.readAsDataURL(blob);
    reader.onload = (e) => {
      const result = e.target?.result;
      setSelectedImage(result!);
    };
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleForm)}>
        <WrapperInput>
          <FormInput
            name='name'
            control={control}
            label='Nome'
            error={errors.name?.message}
          />
          <Stack mb='10px'>
            <Text>Estado</Text>
            <Select
              {...register('state')}
              placeholder='Selecione um estado'
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {estados.map((estado, idx) => (
                <Option
                  key={idx}
                  value={estado.sigla}
                >
                  {estado.nome}
                </Option>
              ))}
            </Select>
            {errors && <Text color='red'>{errors.state?.message}</Text>}
          </Stack>

          {loadingCidades ? (
            <Spinner />
          ) : (
            <Stack mb='10px'>
              <Text>Cidade</Text>
              <Select
                {...register('city')}
                placeholder='Selecione uma cidade'
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cidades.map(({ nome }, idx) => (
                  <Option
                    key={idx}
                    value={nome}
                  >
                    {nome}
                  </Option>
                ))}
              </Select>
              {errors && <Text color='red'>{errors.city?.message}</Text>}
            </Stack>
          )}
          <FormInput
            name='street'
            control={control}
            label='Rua'
            error={errors.street?.message}
          />
          <FormInput
            name='neighborhood'
            control={control}
            label='Bairro'
            error={errors.neighborhood?.message}
          />
          <FormInput
            name='number'
            type='number'
            control={control}
            label='Número'
            error={errors.number?.message}
          />

          {selectedImage && <SelectedImage src={String(selectedImage!)} />}
          <ImagePicker
            type='file'
            onChange={(e) => handleImage(e.target.files)}
          />
          {errors && <Text color='red'>{errors.image?.message}</Text>}
          <Button type='submit'>Cadastrar</Button>
        </WrapperInput>
      </Form>
    </Container>
  );
}
