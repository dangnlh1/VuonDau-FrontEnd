import { DialogPayload } from '@/models/option'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

interface SimpleDialogProps {
  title: string
  open: boolean
  roleList: DialogPayload[]

  onClose: () => void
  onNavigate: (link: string) => void
}

export default function ChooseRoleDialog({
  title,
  roleList,
  open,
  onClose,
  onNavigate,
}: SimpleDialogProps) {
  const handleClose = () => {
    onClose()
  }

  const handleChooseRole = (link: string) => {
    onNavigate(link)
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack>
        <DialogTitle>{title}</DialogTitle>
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
      </Stack>
      <DialogContent>
        <Stack width={'100%'} direction={'row'}>
          {roleList?.map((item: DialogPayload, index: number) => (
            <Button
              sx={{ borderRadius: 5, borderWidth: 1, borderColor: '#333333' }}
              onClick={() => handleChooseRole(item.link)}
              key={index}
            >
              <Stack>
                <Box
                  component="img"
                  sx={{ width: 100, height: 100 }}
                  alt={item.label}
                  src={item.icon}
                />
                <Typography color={'#000'} variant="button">
                  {item.label}
                </Typography>
              </Stack>
            </Button>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
