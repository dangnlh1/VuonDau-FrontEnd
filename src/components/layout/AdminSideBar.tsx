import { Box, Stack } from '@mui/material'
import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

export interface Menu {
  label: string
  path: string
  icon: ReactNode
  isProtected?: boolean
  hasPermission?: () => boolean
}

export interface AdminSideBarProps {
  menuList?: Menu[]
  lastMenuList?: Menu[]
}

export function AdminSidebar({ menuList, lastMenuList }: AdminSideBarProps) {
  return (
    <Stack
      justifyContent="space-between"
      sx={{
        flexDirection: { xs: 'row', md: 'column' },
        height: { md: '100%' },

        p: { xs: 1, md: 2 },

        '.active > div': {
          color: 'primary.main',
          backgroundColor: 'grey.300',
        },
      }}
    >
      {Array.isArray(menuList) &&
        menuList.length > 0 &&
        menuList.map((menu, idx) => (
          <NavLink
            key={idx}
            to={menu.path}
            className={({ isActive }) => (isActive ? 'active' : '')}
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: { xs: 'column', md: 'row' },

                mb: 0.5,
                p: 1,
                borderRadius: '4px',

                color: 'grey.500',
                backgroundColor: 'white',

                '&:hover': {
                  backgroundColor: 'grey.50',
                },
              }}
            >
              {menu.icon}

              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  marginLeft: { md: 1.5 },
                  fontSize: { xs: 9, sm: 'inherit' },
                  mt: { xs: 0.5, md: 0 },
                }}
              >
                {menu.label}
              </Box>
            </Box>
          </NavLink>
        ))}

      <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: { xs: 0, md: 1 } }} />

      {Array.isArray(lastMenuList) &&
        lastMenuList.length > 0 &&
        lastMenuList.map((menu, idx) => (
          <NavLink
            key={idx}
            to={menu.path}
            className={({ isActive }) => (isActive ? 'active' : '')}
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: { xs: 'column', md: 'row' },

                mb: 0.5,
                p: 1,
                borderRadius: '4px',

                color: 'grey.500',
                backgroundColor: 'white',

                '&:hover': {
                  backgroundColor: 'grey.50',
                },
              }}
            >
              {menu.icon}

              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  marginLeft: { md: 1.5 },
                  fontSize: { xs: 9, sm: 'inherit' },
                  mt: { xs: 0.5, md: 0 },
                }}
              >
                {menu.label}
              </Box>
            </Box>
          </NavLink>
        ))}
    </Stack>
  )
}
