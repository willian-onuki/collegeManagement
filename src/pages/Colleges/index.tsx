import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Grid,
  SimpleGrid,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { CollegeCard } from '../../components/card/CollegeCard';
import { GenericNotification } from '../../components/GenericNotification';
import { GenericPage } from '../../components/GenericPage';
import { CollegeRegister } from '../../components/register/CollegeRegister';
import { useAlert } from '../../context/Alert';
import { CollegeDTO } from '../../dtos/CollegeDTO';
import { getCollege } from '../../useCases/getCollege';
import { Container } from './styles';

export function Colleges() {
  const { showAlert } = useAlert();
  const [allCollege, setAllCollege] = useState<CollegeDTO[]>([]);
  const [indexTab, setIndexTab] = useState(0);
  useEffect(() => {
    getCollege({
      onSuccess: (data) => setAllCollege(data),
      onError: () => {
        showAlert({
          type: 'error',
          title: 'Erro ao carregar colégios',
        });
      },
      params: 'college',
    });
  }, [indexTab]);

  return (
    <GenericPage>
      <Container>
        <Tabs
          isFitted
          variant='line'
          index={indexTab}
          onChange={(index) => {
            setIndexTab(index);
          }}
        >
          <TabList mb='1em'>
            <Tab>Colégios</Tab>
            <Tab>Cadastrar</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid
                columns={[1, 1, 2, 2, 3, 4]}
                spacing='40px'
              >
                {allCollege &&
                  allCollege.map((college, index) => (
                    <CollegeCard
                      college={college}
                      key={index}
                    />
                  ))}
              </SimpleGrid>
              {allCollege.length === 0 && (
                <GenericNotification text='Não possui colégio cadastrado' />
              )}
            </TabPanel>
            <TabPanel>
              <CollegeRegister setIndexTab={setIndexTab} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </GenericPage>
  );
}
