import ChooseRoleDialog from '@/components/common/Dialog'
import { InfoPayload } from '@/models/info'
import { LoginPayload, NavPayload, RegisterPayload } from '@/models/navMenu'
import { DialogPayload } from '@/models/option'
import { Search, SearchIconWrapper, StyledInputBase } from '@/styles/Search'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { alpha, AppBar, Box, Button, IconButton, Stack, Toolbar } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FullLogo, Logo } from '../common/Logo'

export interface HeaderProps {
  openChooseRoleDialog: boolean
  firstNavList?: NavPayload[]
  registerList?: RegisterPayload[]
  loginList?: LoginPayload[]
  user?: InfoPayload
  settingList?: string[]
  roleList?: DialogPayload[]

  onRegisterClick?: (value: string) => void
  onToggleDrawer?: () => void
  onSettingMenuClick?: (setting: string) => void
  onClickOpenDialog?: () => void
  onCloseDialog?: () => void
  onNavigate: (link: string) => void
}

export function Header({
  firstNavList,
  registerList,
  loginList,
  user,
  openChooseRoleDialog,
  roleList,
  settingList,
  onRegisterClick,
  onToggleDrawer,
  onSettingMenuClick,
  onClickOpenDialog,
  onCloseDialog,
  onNavigate,
}: HeaderProps) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const title = 'Bạn hiện tại là:'
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  function handleMenuSettingMenuClick(setting: string) {
    setAnchorElUser(null)
    onSettingMenuClick?.(setting)
  }

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
        <Box sx={{ display: { lg: 'none' }, mr: 2 }}>
          <IconButton edge="start" size="large" color="inherit" onClick={() => onToggleDrawer?.()}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: { xs: 'none', lg: 'flex' }, mr: 2 }}>
          <Link to="/trang-chu">
            <FullLogo />
          </Link>
        </Box>

        <Box sx={{ display: { lg: 'none' }, flexGrow: 1 }}>
          <Link to="/trang-chu">
            <Logo />
          </Link>
        </Box>

        <Stack direction="row" sx={{ display: { xs: 'none', lg: 'flex' } }} spacing={0.5}>
          {Array.isArray(firstNavList) &&
            firstNavList.length > 0 &&
            firstNavList.map((item, idx) => (
              <NavLink to={item.link as string} key={idx}>
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

        <IconButton color="inherit" sx={{ mr: { xs: user ? 0 : -1, lg: 0 } }}>
          <ShoppingCartOutlinedIcon />
        </IconButton>

        {!user && (
          <Stack direction="row" sx={{ display: { xs: 'none', lg: 'flex' } }}>
            {Array.isArray(loginList) &&
              loginList.length > 0 &&
              loginList.map((item, idx) => (
                <Button
                  key={idx}
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
            {Array.isArray(registerList) &&
              registerList.length > 0 &&
              registerList.map((item, idx) => (
                <Button
                  key={idx}
                  className={'sign-up'}
                  color="inherit"
                  variant="outlined"
                  sx={{
                    ml: 1,
                    textTransform: 'none',
                  }}
                  onClick={onClickOpenDialog}
                >
                  {item.label}
                </Button>
              ))}
          </Stack>
        )}
        {roleList && onCloseDialog && (
          <ChooseRoleDialog
            title={title}
            roleList={roleList}
            open={openChooseRoleDialog}
            onClose={onCloseDialog}
            onNavigate={onNavigate}
          />
        )}
        {user && (
          <Box sx={{ flexGrow: 0, ml: 1 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.firstName} src={user.avatar}>
                  {user.firstName?.split('')[0]}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Array.isArray(settingList) &&
                settingList.length > 0 &&
                settingList.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleMenuSettingMenuClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
