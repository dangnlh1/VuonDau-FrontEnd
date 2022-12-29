import { Button, Divider, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbDownAlt from '@mui/icons-material/ThumbDownAlt'
import ThumbDownAltOutlined from '@mui/icons-material/ThumbDownAltOutlined'

interface VoteButtonProps {
  variant: 'up' | 'down'
  value: number
  status: number
  onSelected: () => void
}

export default function VoteButton({ value, variant, status, onSelected }: VoteButtonProps) {
  const color = variant === 'up' ? 'success' : 'error'
  const isVoted = status !== 0

  const Icon = () =>
    variant === 'up' ? (
      status === 1 ? (
        <ThumbUpAltIcon />
      ) : (
        <ThumbUpAltOutlined />
      )
    ) : status === -1 ? (
      <ThumbDownAlt />
    ) : (
      <ThumbDownAltOutlined />
    )

  function handleClick() {
    // if (status !== 0) {
    // } else {
    onSelected()
    // }
  }

  return (
    <Button
      color={isVoted ? color : 'inherit'}
      onClick={handleClick}
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginRight: 1,
      }}
      size={'small'}
      variant={'text'}
    >
      <Icon />

      <Stack sx={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 1 }}>
        <Typography variant="body1" color="inherit">
          {value}
        </Typography>
      </Stack>
    </Button>
  )
}
