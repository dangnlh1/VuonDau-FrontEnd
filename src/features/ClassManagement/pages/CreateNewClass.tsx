import CustomizedDialogs from '@/components/common/CustomizedDialogs'
import { a11yProps, TabPanel } from '@/components/common/TabPanel'
import { useClasses } from '@/hooks/classes'
import { useCourse } from '@/hooks/course'
import { useDayOfWeek } from '@/hooks/dayOfWeek'
import { useSlot } from '@/hooks/slot'
import { useSubjectByTeacher } from '@/hooks/subjectByTeacher'
import { useTimeTable } from '@/hooks/timeTable'
import { useGetCourseBySubjectId } from '@/hooks/useGetCourseBySubjectId'
import { AddEditClassFormPayload, ClassStatus } from '@/models/class'
import { CreateCoursePayload, CreateNewCoursePayload } from '@/models/course'
import { CreateTimeTablePayload, CreateTimeTableRequest } from '@/models/timetables'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AddEditClassForm } from '../components/AddEditClassForm'
import { CreateCourseForm } from '../components/CreateCourseForm'
import { CreateNewCourseForm } from '../components/CreateNewCourse'
import { CreateTimeTableData, CreateTimeTableForm } from '../components/CreateTimeTableForm'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

const steps = ['Tạo lớp học', 'Tạo khóa học', 'Tạo thời khóa biểu']

const pageTitle = 'Tạo lớp Mới'

const status: ClassStatus = 'RECRUITING'

export function CreateNewClass() {
  const [tab, setTab] = React.useState(0)
  const [classId, setClassId] = React.useState('')
  const [params, setParams] = React.useState({
    page: 0,
    size: 12,
    status,
  })

  const [showNewCreateCourseForm, setShowNewCreateCourseForm] = React.useState(false)
  const [subjectId, setSubjectId] = React.useState<number>()
  const [courseId, setCourseId] = React.useState<number>()

  const navigate = useNavigate()
  const { createClassByTeacherRequest } = useClasses(params)

  const { subjectByTeacherList } = useSubjectByTeacher()
  const { createNewCourse } = useCourse(params)
  const { data: courseList, refetch } = useGetCourseBySubjectId(subjectId as number)
  const { createClassSubjectByTeacherRequest } = useClasses(params)

  const { dayList } = useDayOfWeek()
  const { slotList } = useSlot()
  const { createTimeTable } = useTimeTable()

  React.useEffect(() => {
    refetch()
  }, [subjectId, courseId])

  // handle create class
  async function handleCreateClass(formValues: AddEditClassFormPayload) {
    const data: AddEditClassFormPayload = {
      ...formValues,
      startDate: new Date(formValues.startDate).toISOString(),
      endDate: new Date(formValues.endDate).toISOString(),
    }

    await createClassByTeacherRequest
      .mutateAsync(data)
      .then((classId) => {
        if (classId) {
          toast.success('Tạo lớp học thành công')
          setClassId(classId)
          setTab(1)
          return
        }

        toast.error('Tạo lớp học không thành công')
      })
      .catch((error) => {
        console.log('error: ', error)
        toast.error(`${error}`)
      })
  }

  // handle  create new course
  async function handleCreateNewCourseSubmit(formValues: CreateNewCoursePayload) {
    await createNewCourse
      .mutateAsync(formValues)
      .then((response) => {
        if (response) {
          const newCourseId = response.id
          setCourseId(newCourseId)
          setShowNewCreateCourseForm(false)
          toast.success('Tạo khóa học mới thành công')

          return
        }

        toast.error('Tạo khóa học mới không thành công')
      })
      .then((response) => console.log('response: ', response))
      .catch((error) => {
        console.log(error)
        toast.error(`${error}`)
      })
  }

  function handleCloseCreateCourseForm() {
    setShowNewCreateCourseForm(false)
  }

  // handle create course
  async function handleCreateCourse(formValues: CreateCoursePayload) {
    await createClassSubjectByTeacherRequest
      .mutateAsync({ id: parseInt(classId as string), data: formValues })
      .then((classId) => {
        if (classId) {
          setTab(2)
          toast.success('Tạo khóa học thành công')
          return
        }

        toast.error('Tạo khóa học thất bại!')
      })
      .catch((error) => {
        console.log(error)
        toast.error(`${error}`)
      })
  }

  //create time table
  async function handleCreateTimeTable(formValue: CreateTimeTableData) {
    const data: CreateTimeTableRequest = {
      classId: parseInt(classId),
      formData: {
        archetypeName: formValue.archetypeName,
        slotDow: formValue.slotDow,
      } as CreateTimeTablePayload,
      numberSlot: formValue.numberSlot as number,
    }
    await createTimeTable
      .mutateAsync(data)
      .then((response) => {
        if (response) {
          toast.success('Tạo thời khóa biểu thành công!')
          navigate('/giao-vien/quan-ly-lop')
          setTab(0)
          return
        }
        toast.error('Tạo thời khóa biểu thất bại!')
      })
      .catch((error) => {
        console.log(error)
        toast.error(`${error}`)
      })
  }

  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackOutlinedIcon fontSize="small" />
        <Typography variant="body1" fontStyle="italic">
          Quay lại
        </Typography>
      </Stack>

      <Typography variant="h5" fontWeight={700}>
        {pageTitle}
      </Typography>

      <Stack sx={{ borderBottom: 1, borderColor: 'divider' }} spacing={3}>
        <Box sx={{ width: '100%', mx: -1 }}>
          <Stepper activeStep={tab}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {tab === 0 && <AddEditClassForm onSubmit={handleCreateClass} />}

        {tab === 1 && (
          <CreateCourseForm
            courseId={courseId}
            subjectId={subjectId}
            subjectList={subjectByTeacherList || []}
            courseList={courseList || []}
            onSubjectChange={(value) => setSubjectId(value)}
            onSubmit={handleCreateCourse}
            onCreateNewCourse={() => setShowNewCreateCourseForm(true)}
          />
        )}

        {tab === 2 && (
          <CreateTimeTableForm
            slotList={slotList}
            dayList={dayList}
            onSubmit={handleCreateTimeTable}
          />
        )}
      </Stack>

      <CustomizedDialogs
        open={showNewCreateCourseForm}
        onClose={handleCloseCreateCourseForm}
        maxWidth="md"
        title="Tạo khóa học mới"
        fullWidth
      >
        <CreateNewCourseForm
          subjectId={subjectId as number}
          onClose={handleCloseCreateCourseForm}
          onSubmit={handleCreateNewCourseSubmit}
        />
      </CustomizedDialogs>
    </Stack>
  )
}
