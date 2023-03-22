import { TeacherOptions } from '../hooks/useTeacher';

export interface ClassRoomDTO {
  id: number;
  name: string;
  table_capacity: number;
  locked: boolean;
  teachers: string[];
  class_grade?: string;
  protocol?: string;
  college_id: number;
  subject_id: number;
  image?: string;
}
