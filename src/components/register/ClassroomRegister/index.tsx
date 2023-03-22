import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormInput } from '../../FormInput';
import { FormData } from '../../../dtos/FormDataDTO';
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import {
  Button,
  Container,
  Form,
  ImagePicker,
  Option,
  Protocol,
  RadioButton,
  RadioButtonLabel,
  RadioGroup,
  SelectedImage,
  WrapperInput,
  WrapperRadioButton,
} from './styles';
import { getSubjectIcon } from '../../../utils/getSubjectIcon';
import { string } from 'yup';
import { List, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { api } from '../../../services/api';
import { useSubject } from '../../../context/Subject';
import { TeacherOptions, useTeachers } from '../../../hooks/useTeacher';
import { CollegeOptions, useCollege } from '../../../hooks/useCollege';
import { ClassRoomDTO } from '../../../dtos/ClassRoomDTO';
import { convertToOptions } from '../../../utils/convertToOptions';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { useAlert } from '../../../context/Alert';
interface Props {
  classroomUpdate: ClassRoomDTO;
  index: number;
  setIndex: (value: number) => void;
}

export function ClassroomRegister({ classroomUpdate, index, setIndex }: Props) {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    tableCapacity: Yup.number()
      .typeError('Somente números')
      .required('A capacidade é obrigatória'),
    subject: Yup.mixed()
      .required('Selecione uma matéris')
      .label('Selecione uma matéria'),
    college: Yup.mixed()
      .required('Selecione um colégio')
      .label('Selecione um colégio'),
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { showAlert } = useAlert();
  const [isLocked, setIsLocked] = useState('no');
  const [selectedImage, setSelectedImage] = useState<ArrayBuffer | string>('');
  const [selectedClassroomImage, setSelectedClassroomImage] = useState<
    ArrayBuffer | string
  >('');

  const [selectedProtocolImage, setSelectedProtocolImage] = useState<
    ArrayBuffer | string
  >('');
  const { subjectOptions } = useSubject();
  const [selectedSubject, setSelectedSubject] = useState(0);
  const { teachers } = useTeachers(selectedSubject);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherOptions[]>([]);

  const [selectedCollege, setSelectedCollege] = useState<CollegeOptions | null>(
    {} as CollegeOptions
  );
  const { collegeOptions } = useCollege();
  const handleForm = async (data: FormData) => {
    console.log('HANDLE FORM DATA');
    console.log(data);
    try {
      if (!classroomUpdate.id) {
        await api.post('/classroom', {
          name: data.name,
          tableCapacity: data.tableCapacity,
          locked: isLocked === 'yes' ? true : false,
          subject: selectedSubject,
          teachers: selectedTeacher,
          college: selectedCollege,
          class_grade: selectedImage || null,
          protocol: selectedProtocolImage || null,
        });
        reset();
      } else {
        await api.put(`/classroom/${classroomUpdate.id}`, {
          name: data.name,
          tableCapacity: data.tableCapacity,
          locked: isLocked === 'yes' ? true : false,
          subject: selectedSubject,
          teachers:
            selectedTeacher.length !== 0
              ? selectedTeacher
              : classroomUpdate.teachers,
          college: selectedCollege || classroomUpdate.college_id,
          class_grade: selectedImage || null,
          protocol: selectedProtocolImage || null,
          image: selectedClassroomImage || null,
        });
      }
      reset();
    } catch (error) {
      alert(error);
    } finally {
      showAlert({
        type: 'success',
        title: classroomUpdate.id
          ? 'Sala de aula Atualizado'
          : 'Sala de aula Cadastrado',
      });
      setIndex(0);
    }
  };

  const handleImage = (file: FileList | null, type: string) => {
    const hasFile = file?.length ? file[0] : null;
    if (type === 'class_grade') {
      getBase64(hasFile, setSelectedImage);
    } else if (type === 'protocol') {
      getBase64(hasFile, setSelectedProtocolImage);
    } else {
      getBase64(hasFile, setSelectedClassroomImage);
    }
  };

  const getBase64 = (
    file: File | null,
    setImage: (value: ArrayBuffer | string) => void
  ) => {
    const reader = new FileReader();
    const blob = new Blob([file as BlobPart], { type: 'image/jpeg' });
    reader.readAsDataURL(blob);
    reader.onload = (e) => {
      const result = e.target?.result;
      setImage(result!);
    };
  };

  useEffect(() => {
    if (classroomUpdate) {
      setSelectedSubject(classroomUpdate.subject_id);
      setValue('name', classroomUpdate.name);
      setValue('tableCapacity', String(classroomUpdate.table_capacity));
      setValue('subject', String(classroomUpdate.subject_id));
      setValue('college', String(classroomUpdate.college_id));
      setSelectedClassroomImage(classroomUpdate.image || '');
      setSelectedImage(classroomUpdate.class_grade || '');
      setSelectedProtocolImage(classroomUpdate.protocol || '');

      const teachers = convertToOptions(classroomUpdate.teachers);
      if (teachers) {
        setSelectedTeacher(teachers);
      }
    }
  }, [index]);

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
          <FormInput
            type='number'
            name='tableCapacity'
            control={control}
            label='Capacidade de mesas'
            error={errors.tableCapacity?.message}
          />
          <RadioButtonLabel>Bloqueado:</RadioButtonLabel>
          <RadioGroup>
            <WrapperRadioButton>
              <RadioButton
                value='yes'
                checked={isLocked === 'yes'}
                onChange={(e) => {
                  setIsLocked(e.target.value);
                }}
              />
              <RadioButtonLabel>Sim</RadioButtonLabel>
            </WrapperRadioButton>
            <WrapperRadioButton>
              <RadioButton
                value='no'
                checked={isLocked === 'no'}
                onChange={(e) => {
                  setIsLocked(e.target.value);
                }}
              />
              <RadioButtonLabel>Não</RadioButtonLabel>
            </WrapperRadioButton>
          </RadioGroup>

          <Stack my='10px'>
            <Controller
              name='subject'
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text>Matéria</Text>
                  <Select
                    placeholder='Selecione uma matéria'
                    value={subjectOptions.find(
                      (content) => String(content.value) === value
                    )}
                    options={subjectOptions}
                    onChange={(e) => {
                      setSelectedSubject(e?.value!);
                      onChange(e);
                    }}
                  />
                  {errors && <Text color='red'>{errors.subject?.message}</Text>}
                </>
              )}
            />
          </Stack>

          <Stack my='10px'>
            <Controller
              name='teachers'
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text>Professor</Text>
                  <Select
                    isMulti
                    value={
                      selectedTeacher ||
                      teachers.find((item) => {
                        item.value === value;
                      })
                    }
                    closeMenuOnSelect={false}
                    options={teachers}
                    onChange={(e) => {
                      setSelectedTeacher(e ? e.map((item) => item!) : []);
                      onChange(e ? e.map((item) => item) : []);
                    }}
                  />
                  {errors && (
                    <Text color='red'>{errors.teachers?.message}</Text>
                  )}
                </>
              )}
            />
          </Stack>

          <Stack my='10px'>
            <Controller
              name='college'
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text>Colégio</Text>
                  <Select
                    value={collegeOptions.find(
                      (college) => String(college.value) === value
                    )}
                    options={collegeOptions}
                    onChange={(e) => {
                      setSelectedCollege(e);
                      onChange(e);
                    }}
                  />
                  {errors && <Text color='red'>{errors.college?.message}</Text>}
                </>
              )}
            />
          </Stack>

          {selectedClassroomImage && (
            <SelectedImage src={String(selectedClassroomImage!)} />
          )}
          <Text>Foto da sala de aula</Text>
          <ImagePicker
            type='file'
            onChange={(e) => handleImage(e.target.files, 'classroom')}
          />

          {selectedImage && <SelectedImage src={String(selectedImage!)} />}
          <Text>Grade de aulas</Text>
          <ImagePicker
            type='file'
            onChange={(e) => handleImage(e.target.files, 'class_grade')}
          />
          {selectedProtocolImage && (
            <Protocol src={String(selectedProtocolImage!)}></Protocol>
          )}
          <Text>Protocolo</Text>
          <ImagePicker
            type='file'
            accept='.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            onChange={(e) => handleImage(e.target.files, 'protocol')}
          />
          <Button type='submit'>
            {classroomUpdate.id ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </WrapperInput>
      </Form>
    </Container>
  );
}
