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
        padding: 0,
        fontSize: '10px',
      }}
      variant={variant}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
