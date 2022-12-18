import CustomizedDialogs from '@/components/common/CustomizedDialogs'
import { SearchField } from '@/components/FormFields/SearchField'
import { useClassesByTeacher } from '@/hooks/classByTeacher'
import { useClasses } from '@/hooks/classes'
import { useCourse } from '@/hooks/course'
import { useSubjectByTeacher } from '@/hooks/subjectByTeacher'
import { useGetCourseBySubjectId } from '@/hooks/useGetCourseBySubjectId'
import { AddEditClassFormPayload } from '@/models/class'
import { Action } from '@/models/common'
import { CreateNewCourseFormPayload } from '@/models/course'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AddEditClassForm } from '../components/AddEditClassForm'
import { ClassList } from '../components/ClassList'
import { CreateNewCourseForm } from '../components/CreateNewCourseForm'

const pageTitle = 'Quản lý lớp học'
const actionList: Action[] = [
  {
    label: 'Tạo lớp mới',
    value: 'create-new-class',
    icon: <AddIcon />,
    variant: 'contained',
  },
]

export interface ClassManagementProps {}

export default function Classes() {
  const [showAddEditClassForm, setShowAddEditClassForm] = useState(false)
  const [showCreateNewCourse, setShowCreateNewCourse] = useState(false)
  // const [selectedClass, setSelectedClass] = useState<AddEditClassFormPayload>() // needed for edit class
  const [subjectId, setSubjectId] = useState<number | undefined>(undefined)
  const [courseId, setCourseId] = useState<number | undefined>(undefined)

  const [params, setParams] = useState({
    page: 0,
    size: 10,
  })

  const navigate = useNavigate()

  const { createClassByTeacherRequest } = useClasses(params)
  const { createNewCourse } = useCourse(params)

  const { subjectByTeacherList } = useSubjectByTeacher()
  const { data: courseList, refetch } = useGetCourseBySubjectId(subjectId as number)
  const {
    classByTeacherList,
    pagination,
    isLoading,
    refetch: refetchClassByTeacherList,
  } = useClassesByTeacher(params)

  useEffect(() => {
    refetch()
  }, [subjectId])

  function handleRowClick(value: any) {
    navigate(`/giao-vien/quan-ly-lop/${value.id}`)
  }

  function handleActionClick(value: string) {
    if (value === 'create-new-class') {
      setShowAddEditClassForm(true)
    }
  }

  function handleCloseAddEditForm() {
    setShowAddEditClassForm(false)
  }

  function handleCloseCreateCourseForm() {
    setShowCreateNewCourse(false)
  }

  function handleCreateNewCourse() {
    setShowCreateNewCourse(true)
  }

  async function handleCreateNewCourseSubmit(formValues: CreateNewCourseFormPayload) {
    try {
      await createNewCourse.mutateAsync(formValues).then((response) => {
        if (response) {
          const newCourseId = response.id
          setCourseId(parseInt(newCourseId))
          refetch()
          toast.success('Tạo khóa học thành công')
          handleCloseCreateCourseForm()
          return
        }

        toast.error('Tạo khóa học không thành công')
      })
    } catch (error) {
      console.log('error: ', error)
      toast.error(`${error} hoặc mã code đã bị trùng!` as string)
    }
  }

  async function handleAddEditClassSubmit(formValues: AddEditClassFormPayload) {
    try {
      await createClassByTeacherRequest.mutateAsync(formValues).then((response) => {
        if (response) {
          toast.success('Tạo lớp học thành công')
          handleCloseAddEditForm()
          refetchClassByTeacherList()
          setSubjectId(undefined)
          setCourseId(undefined)
          return
        }

        toast.error('Tạo lớp học không thành công')
      })
    } catch (error) {
      console.log('error: ', error)
      toast.error(`${error} hoặc mã code đã bị trùng!` as string)
    }
  }

  function handlePageChange(newPage: number) {
    setParams((params) => ({
      ...params,
      page: newPage,
    }))
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700}>
        {pageTitle}
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <SearchField />
        </Box>

        <Stack direction="row" spacing={1}>
          {actionList.map((item, idx) => (
            <Button
              variant={item.variant}
              key={idx}
              startIcon={item.icon}
              onClick={() => handleActionClick?.(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Stack>

      <Stack>
        <ClassList
          classList={classByTeacherList}
          pagination={pagination}
          isLoading={isLoading}
          onRowClick={handleRowClick}
          onPageChange={handlePageChange}
        />
      </Stack>

      <CustomizedDialogs
        maxWidth="sm"
        fullWidth
        open={showAddEditClassForm}
        title="Tạo lớp mới"
        dividers
        onClose={handleCloseAddEditForm}
      >
        <AddEditClassForm
          subjectList={subjectByTeacherList || []}
          onSubjectChange={(value: number) => setSubjectId(value)}
          courseList={courseList}
          subjectId={subjectId}
          courseId={courseId as number}
          onCancelClick={handleCloseAddEditForm}
          onCreateNewCourse={handleCreateNewCourse}
          onSubmit={handleAddEditClassSubmit}
        />
      </CustomizedDialogs>

      {subjectId && (
        <CustomizedDialogs
          maxWidth="sm"
          fullWidth
          open={showCreateNewCourse}
          title="Tạo khóa học mới"
          dividers
          onClose={handleCloseCreateCourseForm}
        >
          <CreateNewCourseForm
            onCancelClick={handleCloseCreateCourseForm}
            subjectId={subjectId as number}
            onSubmit={handleCreateNewCourseSubmit}
          />
        </CustomizedDialogs>
      )}
    </Stack>
  )
}
