import { TeacherOptions } from "../hooks/useTeacher"

export const convertToOptions = (data: string[]) => {
  const optionsFormatted: TeacherOptions[] = []
    data?.map((value) => {
      optionsFormatted.push({
        label: value,
        value
      })
    })

  return optionsFormatted;
}
