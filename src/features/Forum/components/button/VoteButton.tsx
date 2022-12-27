import { Button, Divider, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbDownAlt from '@mui/icons-material/ThumbDownAlt'
import ThumbDownAltOutlined from '@mui/icons-material/ThumbDownAltOutlined'

interface VoteButtonProps {
  variant: 'up' | 'down'
  defaultValue: number
  onSelected: (isSelected: boolean, quantity: number) => void
}

export default function VoteButton({ defaultValue, variant, onSelected }: VoteButtonProps) {
  const [isVoted, setVoted] = useState<boolean>(false)
  const [quantity, setQuantity] = useState<number>(defaultValue)

  const color = variant === 'up' ? 'success' : 'error'
  const label = variant === 'up' ? 'Upvote' : 'Downvote'

  const Icon = () =>
    variant === 'up' ? (
      <ThumbUpAltIcon fontSize="small" color={!isVoted ? 'success' : 'inherit'}>
        Outlined
      </ThumbUpAltIcon>
    ) : (
      <ThumbDownAlt fontSize="small" color={!isVoted ? 'error' : 'inherit'} />
    )

  function handleClickDownVote() {
    onSelected(!isVoted, quantity)
    if (isVoted) {
      setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1)
    }
    setVoted(!isVoted)
  }

  return (
    <Button
      color={isVoted ? color : undefined}
      onClick={handleClickDownVote}
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginRight: 1,
        marginBottom: 1,
      }}
      variant={'text'}
    >
      <Icon />

      <Stack sx={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 1 }}>
        <Typography variant="body1" color="inherit">
          {quantity}
        </Typography>
      </Stack>
    </Button>
  )
}
