import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { NavPayload } from '@/models/navMenu'
import { NavLink } from 'react-router-dom'
import { Box } from '@mui/material'

export interface DropdownNavBarProps {
  nav?: NavPayload
}

export default function DropdownNavBar({ nav }: DropdownNavBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box color="inherit">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
        sx={{ textTransform: 'none' }}
      >
        {nav?.label}
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ mt: 1 }}
      >
        {nav?.items?.map((item, idx) => (
          <NavLink to={item.link} key={idx}>
            <MenuItem onClick={handleClose}>{item.label}</MenuItem>
          </NavLink>
        ))}
      </Menu>
    </Box>
  )
}
