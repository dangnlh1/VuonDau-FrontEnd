import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'

export interface ListWidthCollapseProps {
  children?: React.ReactNode
  title?: string
  onItemClick?: () => void
}

export function ListWidthCollapse({ title, children, onItemClick }: ListWidthCollapseProps) {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    onItemClick?.()
    setOpen(!open)
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={title} />
        {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </List>
  )
}
