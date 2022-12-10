import { NavPayload, RegisterPayload } from '@/models/navMenu'
import { Search, SearchIconWrapper, StyledInputBase } from '@/styles/Search'
import SearchIcon from '@mui/icons-material/Search'
import { alpha, AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

export interface HeaderProps {
  firstNavList?: NavPayload[]
  registerList?: RegisterPayload[]
  lastNavList?: NavPayload[]
  onRegisterClick?: (value: string) => void
}

export function Header({ firstNavList, registerList, lastNavList, onRegisterClick }: HeaderProps) {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{
        '.sign-up': {
          height: 38.5,
          bgcolor: (theme) => theme.palette.common.black,
          color: (theme) => theme.palette.common.white,

          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.common.black, 0.7),
          },
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

        {Array.isArray(firstNavList) &&
          firstNavList.length > 0 &&
          firstNavList.map((item, idx) => (
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

        {Array.isArray(lastNavList) &&
          lastNavList.length > 0 &&
          lastNavList.map((item, idx) => (
            <NavLink to={item.link} key={idx}>
              <Button color="inherit" sx={{ textTransform: 'none' }}>
                {item.label}
              </Button>
            </NavLink>
          ))}

        {Array.isArray(registerList) &&
          registerList.length > 0 &&
          registerList.map((item, idx) => (
            <Button
              key={idx}
              className={idx === 1 ? 'sign-up' : ''}
              color="inherit"
              variant="outlined"
              sx={{
                ml: 1,
                textTransform: 'none',
              }}
              onClick={() => onRegisterClick?.(item.value)}
            >
              {item.label}
            </Button>
          ))}
      </Toolbar>
    </AppBar>
  )
}
