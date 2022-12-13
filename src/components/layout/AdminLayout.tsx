import { Box } from '@mui/material'
import { ReactNode, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import { AdminSidebar, Menu } from './AdminSideBar'

export interface AdminLayoutProps {
  children?: ReactNode
  menuList?: Menu[]
}

export function AdminLayout({ children, menuList }: AdminLayoutProps) {
  const divRef = useRef<HTMLDivElement>()
  const location = useLocation()

  useEffect(() => {
    divRef.current?.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [location])

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: { xs: 'auto 1fr auto', md: 'auto 1fr' },
        gridTemplateColumns: { xs: '100%', md: '240px 1fr' },
        gridTemplateAreas: {
          xs: `" header" "main" "sidebar"`,
          md: `"header header" "sidebar main"`,
        },
        height: '100vh',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Box gridArea="header" sx={{ borderBottom: `1.5px solid #e0e0e0` }}>
        <AdminHeader />
      </Box>

      <Box
        boxShadow={1}
        sx={{
          gridArea: 'sidebar',
          borderRight: { xs: 0, md: `1.5px solid #e0e0e0` },
          borderTop: { xs: `1.5px solid #e0e0e0`, md: 0 },
        }}
      >
        <AdminSidebar menuList={menuList} />
      </Box>

      <Box
        ref={divRef}
        sx={{
          gridArea: 'main',
          px: 2,
          py: { xs: 1, sm: 2 },
          backgroundColor: 'paper',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
