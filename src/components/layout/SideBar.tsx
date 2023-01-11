import { NavPayload, RegisterPayload } from '@/models/navMenu'
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { FullLogo } from '../common/Logo'

export interface SideBarProps {
  navList?: NavPayload[]
  registerList?: RegisterPayload[]
  open?: boolean
  onClose?: () => void
  onRegisterClick?: (value: string) => void
}

export function SideBar({ navList, open, onClose, registerList, onRegisterClick }: SideBarProps) {
  return (
    <Drawer
      open={open}
      onClose={() => onClose?.()}
      sx={{
        '.MuiPaper-root': { width: '70%' },
        '& a': {
          width: '100%',
        },

        '& span': {
          textAlign: 'center',
        },
      }}
    >
      <List
        sx={{
          '.active': {
            '.MuiButtonBase-root': {
              bgcolor: 'primary.main',
              color: 'white',
            },
          },
        }}
      >
        <Stack alignItems="center" width="100%" sx={{ my: 3 }}>
          <FullLogo />
        </Stack>

        <Divider />

        {Array.isArray(navList) &&
          navList.length > 0 &&
          navList.map((item, idx) => (
            <ListItem key={idx} onClick={() => onClose?.()}>
              <NavLink
                to={item.link as string}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <ListItemButton>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}

        <Divider />

        {Array.isArray(registerList) &&
          registerList.length > 0 &&
          registerList.map((item, idx) => (
            <ListItem key={idx}>
              <Button
                fullWidth
                variant={idx === 0 ? 'contained' : 'outlined'}
                onClick={() => {
                  onRegisterClick?.(item.value)
                  onClose?.()
                }}
              >
                <ListItemText primary={item.label} />
              </Button>
            </ListItem>
          ))}
      </List>
    </Drawer>
  )
}
