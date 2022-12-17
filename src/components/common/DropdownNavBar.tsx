import { NavPayload, NavPayLoadItem } from '@/models/navMenu'
import React, { useState } from 'react'

import Popper from '@mui/material/Popper'
import Grow from '@mui/material/Grow'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

interface Props {
  item: NavPayload
}

export default function DropdownNavBar({ item }: Props) {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const { label, items } = item

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }
  return (
    <>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        color="inherit"
        sx={{ textTransform: 'none' }}
        onClick={handleToggle}
      >
        {label}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {items?.map((subItem: NavPayLoadItem, index: number) => (
                    <NavLink
                      to={subItem.link}
                      key={index}
                      className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                      <MenuItem onClick={handleClose}>{subItem.label}</MenuItem>
                    </NavLink>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
