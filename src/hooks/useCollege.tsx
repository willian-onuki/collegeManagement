import { useEffect, useState } from 'react';
import { CollegeDTO } from '../dtos/CollegeDTO';
import { api } from '../services/api';

interface Response {
  data: CollegeDTO[];
}

export interface CollegeOptions {
  value: number;
  label: string;
}

export function useCollege() {
  const [collegeOptions, setCollegeOptions] = useState<CollegeOptions[]>([]);

  useEffect(() => {
    setCollegeOptions([]);
    const getData = async () => {
      const { data } = await api.get<Response>('/college');
      data.data.map(({ id, name }) =>
        setCollegeOptions((oldState) => [
          ...oldState,
          {
            value: id,
            label: name,
          },
        ])
      );
    };
    getData();
  }, []);

  return {collegeOptions}
}
