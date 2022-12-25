import { Avatar, Box, InputLabel, Stack, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'

export interface UploadCardImageProps {
  name?: string
  label?: string
  width?: number | string
  height?: number | string

  onChange?: (file: File) => void
}

export function UploadCardImage({
  name,
  label,
  width = '100%',
  height = 'auto',
  onChange,
}: UploadCardImageProps) {
  const [imageUrl, setImageUrl] = useState('')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const file = e.target?.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setImageUrl(imageUrl)
    onChange?.(file)
  }

  const key = `photo-field-${name}`

  return (
    <Stack spacing={2}>
      <InputLabel sx={{ fontWeight: 900, fontSize: 14 }}>{label}</InputLabel>

      <Box
        boxShadow={3}
        component="label"
        htmlFor={key}
        sx={{ cursor: 'pointer', borderRadius: 4, overflow: 'hidden' }}
      >
        <Avatar
          variant="rounded"
          sx={{ width, height }}
          aria-label="photo upload"
          alt="avatar"
          src={imageUrl}
        >
          <Stack
            boxShadow={3}
            alignItems="center"
            direction="row"
            spacing={1}
            sx={{
              p: 1,
              border: `1px solid`,
              borderRadius: '4px',
              bgcolor: 'primary.main',
              borderColor: 'primary.main',
            }}
          >
            <InsertPhotoIcon /> <Typography variant="h6">Upload</Typography>
          </Stack>
        </Avatar>
      </Box>

      <Box>
        <Box
          hidden
          component="input"
          accept="image/*"
          id={key}
          type="file"
          onChange={handleFileChange}
        />
      </Box>
    </Stack>
  )
}
