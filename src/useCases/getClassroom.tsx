import { AxiosError } from 'axios';
import { TeacherOptions } from '../components/register/ClassroomRegister/styles';
import { ClassRoomDTO } from '../dtos/ClassRoomDTO';
import { CollegeDTO } from '../dtos/CollegeDTO';
import { api } from '../services/api';

interface GetClassroomProps {
  onSuccess: (value: ClassRoomDTO[]) => void;
  onError: (value: string) => void;
  params: string;
}

interface Response {
  data: ClassRoomDTO[];
}

export async function getClassroom({
  onSuccess,
  onError,
  params,
}: GetClassroomProps) {
  try {
    const { data } = await api.get<Response>(`${params}`);
    onSuccess(data.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      onError(error.message);
    }
  }
}
