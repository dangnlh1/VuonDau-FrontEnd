import { Avatar, Box, InputLabel, Stack, Typography } from '@mui/material'
import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { Control, useController } from 'react-hook-form'

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
      <InputLabel sx={{ fontWeight: 'bold', fontSize: 13 }}>{label}</InputLabel>

      <Box component="label" htmlFor={key} sx={{ cursor: 'pointer' }}>
        <Box
          boxShadow={3}
          sx={{ p: 1, maxWidth: 100, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}
        >
          <Typography variant="body1" textAlign="center">
            Upload
          </Typography>
        </Box>
      </Box>

      <Avatar
        variant="rounded"
        sx={{ width, height }}
        aria-label="photo upload"
        alt="avatar"
        src={imageUrl}
      />

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
