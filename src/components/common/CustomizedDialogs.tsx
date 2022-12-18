import CloseIcon from '@mui/icons-material/Close'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { styled, SxProps, Theme } from '@mui/material/styles'
import { maxWidth } from '@mui/system'
import * as React from 'react'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}
export interface CustomizedDialogsProps {
  sx?: SxProps<Theme>
  children?: React.ReactNode
  actions?: React.ReactNode
  title?: React.ReactNode

  dividers?: boolean
  onClose: () => void
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default function CustomizedDialogs({
  actions,
  children,
  title,
  dividers,
  sx,

  onClose,
  ...props
}: CustomizedDialogsProps & DialogProps) {
  return (
    <BootstrapDialog
      sx={sx}
      onClose={() => onClose?.()}
      aria-labelledby="customized-dialog-title"
      {...props}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
        {title}
      </BootstrapDialogTitle>

      <DialogContent dividers={dividers}>{children}</DialogContent>

      {actions && <DialogActions>{actions}</DialogActions>}
    </BootstrapDialog>
  )
}
