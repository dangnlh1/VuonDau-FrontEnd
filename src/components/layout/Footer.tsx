import CopyrightIcon from '@mui/icons-material/Copyright'
import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { FullLogo } from '../common/Logo'

const firstNavList = [
  {
    label: 'Trang chủ',
    link: 'home',
  },
  {
    label: 'Khóa học',
    link: 'home',
  },
  {
    label: 'Giảng dạy trên Vườn Dâu',
    link: '/teaching-register',
  },
]

const registerList = [
  {
    label: 'Đăng nhập',
    link: '/login',
  },
  {
    label: 'Đăng ký',
    link: '/sign-up',
  },
]

const serviceList = [
  {
    label: 'Hỗ trợ',
    link: '/support',
  },
  {
    label: 'Liên hệ',
    link: '/contact',
  },
  {
    label: 'Giới thiệu',
    link: 'home',
  },
  {
    label: 'Blog',
    link: '/blog',
  },
]

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'grey.300' }}>
      <Container>
        <Box>
          <Stack direction="row" flexWrap="wrap" alignItems="flex-start" sx={{ py: 10 }}>
            <Box sx={{ flexGrow: 1, width: 2 / 5, mb: 3 }}>
              <FullLogo />
            </Box>

            <Stack sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'auto' } }}>
              {Array.isArray(firstNavList) &&
                firstNavList.length > 0 &&
                firstNavList.map((item, idx) => (
                  <NavLink to={item.link} key={idx}>
                    <Typography
                      color="inherit"
                      variant="body2"
                      sx={{ mb: 1, textTransform: 'none' }}
                    >
                      {item.label}
                    </Typography>
                  </NavLink>
                ))}
            </Stack>

            <Stack sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'auto' } }}>
              {Array.isArray(serviceList) &&
                serviceList.length > 0 &&
                serviceList.map((item, idx) => (
                  <NavLink to={item.link} key={idx}>
                    <Typography
                      color="inherit"
                      variant="body2"
                      sx={{ mb: 1, textTransform: 'none' }}
                    >
                      {item.label}
                    </Typography>
                  </NavLink>
                ))}
            </Stack>

            <Stack>
              {Array.isArray(registerList) &&
                registerList.length > 0 &&
                registerList.map((item, idx) => (
                  <NavLink to={item.link} key={idx}>
                    <Typography
                      color="inherit"
                      variant="body2"
                      sx={{ mb: 1, textTransform: 'none' }}
                    >
                      {item.label}
                    </Typography>
                  </NavLink>
                ))}
            </Stack>
          </Stack>

          <Divider sx={{ bgcolor: 'grey.300' }} />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            width="100%"
            sx={{ py: 2 }}
            spacing={0.5}
          >
            <CopyrightIcon />
            <Typography variant="body2">{`${new Date().getFullYear()} Copyright. Aright services.`}</Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
