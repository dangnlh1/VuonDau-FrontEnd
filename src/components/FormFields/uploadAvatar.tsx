import { Avatar, Box, InputLabel, Stack, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'

export interface UploadCardImageProps {
  name?: string
  label?: string
  width?: number | string
  height?: number | string
  variant?: 'square' | 'rounded' | 'circular'
  onChange?: (file: File) => void
}

export function UploadAvatar({
  name,
  label,
  variant = 'circular',
  width = 72,
  height = 72,
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

      <Box component="label" htmlFor={key} sx={{ cursor: 'pointer' }}>
        <Avatar
          variant={variant}
          sx={{ width, height }}
          aria-label="photo upload"
          alt="avatar"
          src={imageUrl}
        />
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
