import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { ClassroomCard } from '../../components/card/ClassroomCard';
import { GenericPage } from '../../components/GenericPage';
import { ClassroomRegister } from '../../components/register/ClassroomRegister';
import { CollegeRegister } from '../../components/register/CollegeRegister';
import { SubjectProvider } from '../../context/Subject';
import { ClassRoomDTO } from '../../dtos/ClassRoomDTO';
import { api } from '../../services/api';
import { getClassroom } from '../../useCases/getClassroom';

export interface ClassroomUpdateProps {
  index: number;
  classroom: ClassRoomDTO;
}

export function Classrooms() {
  const [allClassroom, setAllClassroom] = useState<ClassRoomDTO[]>([]);
  const [indexTab, setIndexTab] = useState(0);
  const [classroomToUpdate, setClassroomToUpdate] = useState<ClassRoomDTO>(
    {} as ClassRoomDTO
  );
  const [classroomDeleted, setClassroomDeleted] = useState(false);
  const handleClassroomUpdate = useCallback(
    ({ index, classroom }: ClassroomUpdateProps) => {
      setIndexTab(index);
      setClassroomToUpdate(classroom);
    },
    []
  );

  const getData = useCallback(() => {
    getClassroom({
      onSuccess: (data) => setAllClassroom(data),
      onError: () => {},
      params: 'classroom',
    });
  }, []);

  useEffect(() => {
    getData();
  }, [indexTab, classroomDeleted]);

  return (
    <GenericPage>
      <Tabs
        isFitted
        variant='line'
        index={indexTab}
        onChange={(index) => {
          setIndexTab(index);
          setClassroomToUpdate({} as ClassRoomDTO);
        }}
      >
        <TabList mb='1em'>
          <Tab>Salas</Tab>
          <Tab>{classroomToUpdate.id ? 'Editar' : 'Cadastrar'}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid
              columns={[1, 1, 2, 2, 3, 4]}
              spacing='40px'
            >
              {allClassroom &&
                allClassroom.map((classroom, index) => (
                  <ClassroomCard
                    key={index}
                    classroom={classroom}
                    handleUpdate={handleClassroomUpdate}
                    getData={getData}
                  />
                ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SubjectProvider>
              <ClassroomRegister
                classroomUpdate={classroomToUpdate}
                index={indexTab}
                setIndex={setIndexTab}
              />
            </SubjectProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </GenericPage>
  );
}
