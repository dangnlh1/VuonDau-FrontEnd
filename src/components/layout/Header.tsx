import ChooseRoleDialog from '@/components/common/Dialog'
import { InfoPayload } from '@/models/info'
import { NavPayload, RegisterPayload } from '@/models/navMenu'
import { DialogPayload } from '@/models/option'
import { Search, StyledInputBase } from '@/styles/Search'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { AppBar, Box, Button, Container, IconButton, Stack, Toolbar } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FullLogo, MobileLogo } from '../common/Logo'

export interface HeaderProps {
  openChooseRoleDialog: boolean
  firstNavList?: NavPayload[]
  registerList?: RegisterPayload[]
  user?: InfoPayload
  settingList?: string[]
  roleList?: DialogPayload[]

  onLogin?: () => void
  onToggleDrawer?: () => void
  onSettingMenuClick?: (setting: string) => void
  onCloseDialog?: () => void
  onNavigate: (link: string) => void
  onRegisterClick?: (value: string) => void
}

export function Header({
  firstNavList,
  registerList,
  user,
  openChooseRoleDialog,
  roleList,
  settingList,

  onToggleDrawer,
  onSettingMenuClick,
  onRegisterClick,
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
      position="sticky"
      color="inherit"
      sx={{
        '.active': {
          borderBottomColor: 'white',
        },
      }}
    >
      <Container>
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Box sx={{ display: { lg: 'none' }, mr: 2 }}>
            <IconButton
              edge="start"
              size="large"
              color="inherit"
              onClick={() => onToggleDrawer?.()}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box flexGrow={1} sx={{ mr: 2 }}>
            <Link to="/trang-chu">
              <FullLogo />
            </Link>
          </Box>

          <Box flexGrow={1}>
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, mx: 2 }} component="form">
              <Search sx={{ maxWidth: 300, borderRadius: '4px 0 0 4px' }}>
                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              </Search>

              <Button
                color="primary"
                variant="contained"
                startIcon={<SearchIcon fontSize="large" />}
                sx={{
                  minWidth: 0,
                  borderRadius: '0 4px 4px 0',
                  boxShadow: 0,

                  '& span': {
                    m: 0,
                  },
                }}
              />
            </Box>
          </Box>

          <IconButton color="inherit" sx={{ display: { lg: 'none' } }}>
            <SearchIcon />
          </IconButton>

          <IconButton color="inherit" sx={{ mr: { xs: user ? 0 : -1, lg: 0 } }}>
            <ShoppingCartOutlinedIcon />
          </IconButton>

          {!user && (
            <Stack direction="row" sx={{ display: { xs: 'none', lg: 'flex' } }}>
              {Array.isArray(registerList) &&
                registerList.length > 0 &&
                registerList.map((item, idx) => (
                  <Button
                    color="primary"
                    variant={item.variant}
                    key={idx}
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
      </Container>

      <Box sx={{ bgcolor: 'primary.main', color: 'white' }}>
        <Container>
          <Stack
            direction="row"
            sx={{
              display: { xs: 'none', lg: 'flex' },
              '& a': {
                borderBottom: '2px solid',
                borderBottomColor: 'transparent',
              },
            }}
            spacing={3}
          >
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
        </Container>
      </Box>
    </AppBar>
  )
}
