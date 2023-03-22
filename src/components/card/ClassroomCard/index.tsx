import {
  Box,
  Button,
  Card,
  CardBody,
  Collapse,
  Heading,
  HStack,
  Stack,
  useDisclosure,
  Image,
  UnorderedList,
  ListItem,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiCameraOff } from 'react-icons/fi';
import { MdTableRestaurant } from 'react-icons/md';
import { TbLockOpen, TbLock } from 'react-icons/tb';
import { useTheme } from 'styled-components';
import { Container, Content, Text } from './styles';
import { FcBiomass, FcBiotech, FcGlobe, FcLibrary } from 'react-icons/fc';
import { BsTrash3 } from 'react-icons/bs';
import { api } from '../../../services/api';
import { ClassRoomDTO } from '../../../dtos/ClassRoomDTO';
import { GetSubjectById } from '../../../useCases/getSubjectById';
import { SubjectDTO } from '../../../dtos/SubjectDTO';
import { GetCollegeById } from '../../../useCases/getCollegeById';
import { CollegeDTO } from '../../../dtos/CollegeDTO';
import { ClassroomRegister } from '../../register/ClassroomRegister';
import { ClassroomUpdateProps } from '../../../pages/Classrooms';
import { getSubjectIcon } from '../../../utils/getSubjectIcon';
import { Buffer } from 'buffer';
import { CollegeCard } from '../CollegeCard';
import { useAlert } from '../../../context/Alert';
import { useNavigate } from 'react-router-dom';

interface Props {
  classroom: ClassRoomDTO;
  handleUpdate: (data: ClassroomUpdateProps) => void;
  getData: () => void;
}

export function ClassroomCard({ classroom, handleUpdate, getData }: Props) {
  const [isLocked, setIsLocked] = useState(classroom.locked);
  const [subject, setSubject] = useState<SubjectDTO>({} as SubjectDTO);
  const [college, setCollege] = useState<CollegeDTO>({} as CollegeDTO);
  const [image, setImage] = useState<ArrayBuffer | string>('');
  const { showAlert } = useAlert();
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef(null);
  const theme = useTheme();

  const handleUpdateLockState = async () => {
    try {
      await api.post(`/classroom/lock-classroom/${classroom.id}`, {
        ...classroom,
        locked: !isLocked,
      });
    } catch (err) {
      showAlert({
        type: 'error',
        title: isLocked
          ? 'Não foi possível desbloquear'
          : 'Não foi possível bloquear',
      });
    }
  };

  const handleDeleteClassroom = async () => {
    try {
      await api.delete(`/classroom/delete-classroom/${classroom.id}`);
      setIsLocked(!isLocked);
      showAlert({
        type: 'success',
        title: 'Sala excluído',
      });
      getData();
    } catch (error) {
      showAlert({
        type: 'error',
        title: 'Erro ao excluie',
      });
    }
  };

  useEffect(() => {
    GetSubjectById({
      onSuccess: (data) => setSubject(data),
      onError: () => {},
      params: `subject/${classroom.subject_id}`,
    });
    GetCollegeById({
      onSuccess: (data) => setCollege(data),
      onError: () => {},
      params: `college/${classroom.college_id}`,
    });
  }, []);

  return (
    <>
      <Card
        maxW='sm'
        alignSelf='flex-start'
      >
        <Box
          background='transparent'
          p={0}
          style={{
            position: 'absolute',
            right: -12,
            top: -12,
          }}
          onClick={handleUpdateLockState}
        >
          {isLocked ? (
            <TbLock
              size={40}
              color='red'
            />
          ) : (
            <TbLockOpen
              size={40}
              color='green'
            />
          )}
        </Box>
        <CardBody>
          {classroom.image ? (
            <Image
              w='100%'
              h='200px'
              objectFit='scale-down'
              src={String(classroom.image!)}
            />
          ) : (
            <Flex
              alignItems='center'
              justifyContent='center'
              py='80px'
              h='200px'
              bg='gray.100'
            >
              <FiCameraOff size={50} />
            </Flex>
          )}
          <Stack
            mt='6'
            spacing='3'
          >
            <Heading
              size='md'
              display='flex'
              justifyContent='space-between'
            >
              {classroom.name}
              <HStack>
                <MdTableRestaurant size={20} />
                <Text>{classroom.table_capacity}</Text>
              </HStack>
            </Heading>
            <Collapse
              in={isOpen}
              animateOpacity
            >
              <Box
                p='40px'
                color='white'
                mt='4'
                bg={theme.colors.secondary_blue}
                rounded='md'
                shadow='md'
              >
                <Text>{college.name}</Text>
                <HStack>
                  {getSubjectIcon(subject.name)}
                  <Text>Matéria: {subject.name}</Text>
                </HStack>
                <Text>Professor:</Text>
                <UnorderedList>
                  {classroom.teachers.map((teacher) => (
                    <ListItem>{teacher}</ListItem>
                  ))}
                </UnorderedList>
              </Box>
            </Collapse>
            {isOpen && (
              <Flex justifyContent='space-between'>
                <Button
                  variant='outline'
                  colorScheme='red'
                  flex={1}
                  mr='10px'
                  onClick={onOpenAlert}
                >
                  <BsTrash3
                    size={22}
                    color='red'
                  />
                </Button>
                <Button
                  flex={1}
                  variant='outline'
                  colorScheme={theme.colors.secondary_blue}
                  color={theme.colors.secondary_blue}
                  onClick={() => handleUpdate({ index: 1, classroom })}
                >
                  editar
                </Button>
              </Flex>
            )}
            <Button
              bg={theme.colors.secondary_blue}
              color='white'
              onClick={onToggle}
            >
              {isOpen ? 'Mostrar menos' : 'Mostrar mais'}
            </Button>
          </Stack>
        </CardBody>
      </Card>

      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize='lg'
              fontWeight='bold'
            >
              Excluir {classroom.name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Deseja realmente excluir essa sala?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onCloseAlert}
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  handleDeleteClassroom();
                  onCloseAlert();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
