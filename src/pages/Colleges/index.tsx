import { Tabs, TabList, Tab, TabPanels, TabPanel, Grid, SimpleGrid } from "@chakra-ui/react";
import { useTheme } from "styled-components";
import { CollegeCard } from "../../components/card/CollegeCard";
import { GenericPage } from "../../components/GenericPage";
import { CollegeRegister } from "../../components/register/CollegeRegister";
import { Container } from "./styles";

export function Colleges() {
  const theme = useTheme();

  return (
    <GenericPage>
      <Container>
        <Tabs
          isFitted
          variant='line'
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
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <CollegeRegister />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </GenericPage>
  );
}
