import { HStack, Text } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { SubjectDTO } from "../dtos/SubjectDTO";
import { api } from "../services/api";
import { getSubjectIcon } from "../utils/getSubjectIcon";


interface Response {
  data: SubjectDTO[];
}

export interface SubjectOptions {
  value: number;
  label: React.ReactNode;
}

interface Props {
  children: React.ReactNode;
}

interface SubjectContextProps {
  subjectOptions: SubjectOptions[];
}

const SubjectContext = createContext({} as SubjectContextProps)

export const SubjectProvider = ({children}: Props) => {
  const [subjectOptions, setSubjectOptions] = useState<SubjectOptions[]>([]);
  useEffect(() => {
    const getData = async () => {
      const {data} = await api.get<Response>('/subject')
      data.data.map(({ id, name }) => setSubjectOptions(oldState => [
        ...oldState,
        {
          value: id,
          label: (
            <HStack>
              {getSubjectIcon(name) } <Text>{name}</Text>
            </HStack>
          )
        }
      ]))
    }
    getData();
  }, [])

  return (
    <SubjectContext.Provider value={{
      subjectOptions
    }}>
      {children}
    </SubjectContext.Provider>
  );
}

export const useSubject = () => {
  const context = useContext(SubjectContext);
  return context;
}
