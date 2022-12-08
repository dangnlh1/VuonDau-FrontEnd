import { Search, SearchIconWrapper, StyledInputBase } from '@/styles/Search'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'

export interface HeaderProps {}

type Variant = 'outlined' | 'contained' | 'text'

interface NavPayload {
  label: string
  link: string
}

interface RegisterPayload extends NavPayload {
  variant: Variant
}

const firstNavList: NavPayload[] = [
  {
    label: 'Trang chủ',
    link: 'home',
  },
  {
    label: 'Khóa học',
    link: 'home',
  },
  {
    label: 'Giới thiệu',
    link: 'home',
  },
]

const registerList: RegisterPayload[] = [
  {
    label: 'Giảng dạy trên Vườn Dâu',
    link: '/teaching-register',
    variant: 'text',
  },
  {
    label: 'Đăng nhập',
    link: '/login',
    variant: 'outlined',
  },
  {
    label: 'Đăng ký',
    link: '/sign-up',
    variant: 'outlined',
  },
]

export function Header(props: HeaderProps) {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{
        '.sign-up button': {
          height: 38.5,
          bgcolor: (theme) => theme.palette.common.black,
          color: (theme) => theme.palette.common.white,
        },
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/home"
          sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.2rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          VƯỜN DÂU
        </Typography>

        {firstNavList.map((item, idx) => (
          <NavLink to={item.link} key={idx}>
            <Button color="inherit" sx={{ textTransform: 'none' }}>
              {item.label}
            </Button>
          </NavLink>
        ))}

        <Box flexGrow={1} sx={{ mx: 2 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Box>

        {registerList.map((item, idx) => (
          <NavLink to={item.link} key={idx} className={item.link === '/sign-up' ? 'sign-up' : ''}>
            <Button
              color="inherit"
              variant={item.variant}
              sx={{
                ml: 1,
                textTransform: 'none',
              }}
            >
              {item.label}
            </Button>
          </NavLink>
        ))}
      </Toolbar>
    </AppBar>
  )
}
