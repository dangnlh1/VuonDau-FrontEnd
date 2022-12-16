import { NavLink } from 'react-router-dom'
import React from 'react'
import { NavPayload, RegisterPayload } from '@/models/navMenu'

import { Search, SearchIconWrapper, StyledInputBase } from '@/styles/Search'

import { FullLogo, Logo } from '../common/Logo'

import { alpha, AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import DropdownNavBar from '@/components/common/DropdownNavBar'

export interface HeaderProps {
  firstNavList?: NavPayload[]
  registerList?: RegisterPayload[]
  lastNavList?: NavPayload[]
  onRegisterClick?: (value: string) => void
  onToggleDrawer?: () => void
}

export function Header({
  firstNavList,
  registerList,
  lastNavList,
  onRegisterClick,
  onToggleDrawer,
}: HeaderProps) {
  return (
    <AppBar
      position="fixed"
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

        '.active button': {
          bgcolor: (theme) => alpha(theme.palette.common.black, 0.1),
        },
      }}
    >
      <Toolbar>
        <Box flexGrow={1} sx={{ display: { lg: 'none' } }}>
          <IconButton edge="start" size="large" color="inherit" onClick={() => onToggleDrawer?.()}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: { xs: 'none', lg: 'flex' }, mr: 2 }}>
          <FullLogo />
        </Box>

        <Box sx={{ display: { lg: 'none' }, flexGrow: 1 }}>
          <Logo />
        </Box>

        <Stack direction="row" sx={{ display: { xs: 'none', lg: 'flex' } }}>
          {Array.isArray(firstNavList) &&
            firstNavList.length > 0 &&
            firstNavList.map((item, idx) => (
              <NavLink to={item.link} key={idx}>
                <Button color="inherit" sx={{ textTransform: 'none' }}>
                  {item.label}
                </Button>
              </NavLink>
            ))}
        </Stack>

        <Box flexGrow={1} sx={{ display: { xs: 'none', lg: 'flex' }, mx: 2 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Box>

        <IconButton color="inherit" sx={{ display: { lg: 'none' } }}>
          <SearchIcon />
        </IconButton>

        <Stack direction="row" sx={{ display: { xs: 'none', lg: 'flex' } }}>
          {Array.isArray(lastNavList) &&
            lastNavList.length > 0 &&
            lastNavList.map((item, idx) => <DropdownNavBar item={item} key={idx} />)}
        </Stack>

        <IconButton color="inherit" sx={{ mr: { xs: -1, lg: 0 } }}>
          <ShoppingCartOutlinedIcon />
        </IconButton>

        <Stack direction="row" sx={{ display: { xs: 'none', lg: 'flex' } }}>
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
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
