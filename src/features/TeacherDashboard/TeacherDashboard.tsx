import { Box, Button, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { menuList } from '../Teacher'
import DeleteIcon from '@mui/icons-material/Delete'
import HelpIcon from '@mui/icons-material/Help'

const subNavList = [
  { label: 'Thùng rát', path: '/giao-vien/thung-rat', icon: <DeleteIcon /> },
  { label: 'Hướng dẩn', path: '/giao-vien/huong-dan', icon: <HelpIcon /> },
]

export default function TeacherDashboard() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" flexWrap="wrap">
        {menuList
          .filter((item, idx) => idx > 0)
          .map((item, idx) => (
            <Box key={idx} sx={{ width: { xs: '100%', sm: 1 / 2, lg: 1 / 4 } }}>
              <Box sx={{ p: 2 }}>
                <NavLink to={item.path}>
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    boxShadow={3}
                    sx={{
                      p: 4,
                      borderRadius: 2,
                      cursor: 'pointer',

                      '&:hover': {
                        boxShadow: (theme) => theme.shadows[10],
                      },
                    }}
                  >
                    <Box sx={{ color: 'primary.main', '.MuiSvgIcon-root': { fontSize: 72 } }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h5" textAlign="center">
                      {item.label}
                    </Typography>
                  </Stack>
                </NavLink>
              </Box>
            </Box>
          ))}
      </Stack>

      <Stack direction="row" flexWrap="wrap">
        {subNavList.map((item, idx) => (
          <Box key={idx} sx={{ width: { xs: '100%', sm: 1 / 2, md: 1 / 3 } }}>
            <Box sx={{ p: 2 }}>
              <NavLink to={item.path}>
                <Stack
                  direction="row"
                  alignItems="center"
                  boxShadow={3}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    cursor: 'pointer',

                    '&:hover': {
                      boxShadow: (theme) => theme.shadows[10],
                    },
                  }}
                >
                  <Box sx={{ mr: 2, color: 'primary.light', '.MuiSvgIcon-root': { fontSize: 72 } }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h5" textAlign="center">
                    {item.label}
                  </Typography>
                </Stack>
              </NavLink>
            </Box>
          </Box>
        ))}
      </Stack>
    </Stack>
  )
}
