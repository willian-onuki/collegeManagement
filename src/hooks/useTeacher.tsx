import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface TeacherProps {
  id: number;
  subject_id: number;
  name: string;
}

interface Response {
  data: TeacherProps[];
}

export interface TeacherOptions {
  value: string;
  label: string;
}

export function useTeachers(
  idSubject: number,
) {

  const [teachers, setTeachers] = useState<TeacherOptions[]>([]);

  useEffect(() => {
    const getData = async () => {
      setTeachers([]);
      try {
        if (idSubject !== 0) {
          const { data } = await api.get<Response>(`/teacher/${idSubject}`);
          data.data.map(({ name }) => {
            setTeachers((oldState) => [
              ...oldState,
              {
                value: name,
                label: name,
              },
            ]);
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [idSubject]);

  return { teachers };
}
