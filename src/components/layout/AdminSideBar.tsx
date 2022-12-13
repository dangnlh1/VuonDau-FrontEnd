import { Box } from '@mui/material'
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
}

export function AdminSidebar({ menuList }: AdminSideBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',

        flexDirection: { xs: 'row', md: 'column' },

        p: { xs: 1, md: 2 },

        '.active > div': {
          color: 'primary.main',
          backgroundColor: 'grey.100',
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
                borderRadius: '8px',

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
    </Box>
  )
}
