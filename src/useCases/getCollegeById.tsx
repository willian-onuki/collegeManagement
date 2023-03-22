import { AxiosError } from 'axios';
import { CollegeDTO } from '../dtos/CollegeDTO';
import { api } from '../services/api';

interface GetCollegeByIdProps {
  onSuccess: (value: CollegeDTO) => void;
  onError: (value: string) => void;
  params: string;
}

interface Response {
  data: CollegeDTO;
}

export async function GetCollegeById({
  onSuccess,
  onError,
  params,
}: GetCollegeByIdProps) {
  try {
    const { data } = await api.get<Response>(`${params}`);

    onSuccess(data.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      onError(error.message);
    }
  }
}
