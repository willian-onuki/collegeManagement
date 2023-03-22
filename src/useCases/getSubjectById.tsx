import { AxiosError } from 'axios';
import { SubjectDTO } from '../dtos/SubjectDTO';
import { api } from '../services/api';

interface GetSubjectByIdProps {
  onSuccess: (value: SubjectDTO) => void;
  onError: (value: string) => void;
  params: string;
}

interface Response {
  data: SubjectDTO;
}

export async function GetSubjectById({
  onSuccess,
  onError,
  params,
}: GetSubjectByIdProps) {
  try {
    const { data } = await api.get<Response>(`${params}`);

    onSuccess(data.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      onError(error.message);
    }
  }
}
