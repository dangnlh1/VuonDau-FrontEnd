import { useCourse } from '@/hooks/course'
import { useSubjectByTeacher } from '@/hooks/subjectByTeacher'
import { useGetCourseBySubjectId } from '@/hooks/useGetCourseBySubjectId'
import { CreateNewCourseFormPayload } from '@/models/course'
import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CreateNewCourseForm } from '../components/CreateNewCourseForm'

const pageTitle = 'Tạo khóa học Mới'
export interface CreateCourseProps {}

export function CreateCourse() {
  const [params, setParams] = useState({
    page: 0,
    size: 12,
  })
  const [subjectId, setSubjectId] = useState<number>()
  const { subjectByTeacherList } = useSubjectByTeacher()
  const { createNewCourse } = useCourse(params)
  const { data: courseList, refetch } = useGetCourseBySubjectId(subjectId as number)

  async function handleCreateNewCourseSubmit(formValues: CreateNewCourseFormPayload) {
    try {
      await createNewCourse.mutateAsync(formValues).then((response) => {
        if (response) {
          const newCourseId = response.id

          toast.success('Tạo khóa học thành công')

          return
        }

        toast.error('Tạo khóa học không thành công')
      })
    } catch (error) {
      console.log('error: ', error)
      toast.error(`${error} hoặc mã code đã bị trùng!` as string)
    }
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700}>
        {pageTitle}
      </Typography>

      <CreateNewCourseForm
        subjectId={subjectId}
        subjectList={subjectByTeacherList || []}
        courseList={courseList || []}
        onSubjectChange={(value) => setSubjectId(value)}
        onSubmit={handleCreateNewCourseSubmit}
      />
    </Stack>
  )
}
