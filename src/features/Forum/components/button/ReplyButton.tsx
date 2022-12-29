import { Button } from '@mui/material'

interface ReplyButtonProps {
  label: string
  onClick: () => void
  isClicked?: boolean
}

export default function ReplyButton({ isClicked, label, onClick }: ReplyButtonProps) {
  const variant = isClicked ? 'outlined' : 'text'

  return (
    <Button
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginRight: 1,
      }}
      size={'small'}
      variant={variant}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
