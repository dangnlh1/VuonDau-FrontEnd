import { classApi } from '@/api/classApi'
import { ClassPayload } from '@/models/class'
import { IndeterminateCheckBox } from '@mui/icons-material'
import { Box, Pagination, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
export default function ClassroomPages() {
  const [classList, setClassList] = useState<ClassPayload[]>()
  async function getClass() {
    try {
      const filterParams = {
        page: 0,
        size: 10,
        sort: [],
      }
      const response = await classApi.getAll(filterParams)
      setClassList(response.items)
    } catch (error: any) {
      toast.error(error.message + '')
    }
  }

  useEffect(() => {
    getClass()
  }, [])

  return (
    <Stack spacing={2} justifyContent="space-between" height={'100%'}>
      <Stack direction={'row'} flexWrap="wrap" height={'100%'}>
        {classList?.map((item, index) => (
          <Box key={index} sx={{ width: { xs: '100%', sm: 1 / 2, lg: 1 / 5 } }}>
            <Box sx={{ p: 2 }}>
              <NavLink to={`/hoc-sinh/lop-hoc/${item.id}`}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  boxShadow={3}
                  height={150}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    cursor: 'pointer',

                    '&:hover': {
                      boxShadow: (theme) => theme.shadows[10],
                    },
                  }}
                >
                  <Stack direction={'row'} flexGrow={'1'} width={'100%'}>
                    <Typography variant="body1" textAlign={'left'}>
                      {item.name}
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} width="100%" justifyContent="space-between">
                    <Typography variant="body2" fontSize={12}>
                      Sĩ số: 20
                    </Typography>
                    <Typography variant="body2" fontSize={12} textAlign="right">
                      Năm học 2022 - 2023
                    </Typography>
                  </Stack>
                </Stack>
              </NavLink>
            </Box>
          </Box>
        ))}
      </Stack>
      <Stack alignItems={'center'}>
        <Pagination count={10} color="primary" />
      </Stack>
    </Stack>
  )
}
