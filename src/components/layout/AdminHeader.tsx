import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { FullLogo, Logo } from '../common/Logo'

export interface AdminHeader {
  settingList?: string[]
  onSettingMenuClick?: (setting: string) => void
}

function AdminHeader({ settingList, onSettingMenuClick }: AdminHeader) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget)
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null)
  }

  function handleSettingMenuClick(setting: string) {
    setAnchorElUser(null)
    onSettingMenuClick?.(setting)
  }

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, mr: 2 }}>
          <Link to="/giao-vien">
            <FullLogo />
          </Link>
        </Box>

        <Box sx={{ display: { lg: 'none' } }}>
          <Link to="/giao-vien">
            <Logo />
          </Link>
        </Box>

        <Box flexGrow={1} />

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={() => handleSettingMenuClick(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default AdminHeader
