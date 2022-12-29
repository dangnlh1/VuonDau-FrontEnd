import { Button } from '@mui/material'

interface Props {
  label: string
  onClick: () => void
}

export default function CustomButton({ label, onClick }: Props) {
  return (
    <Button
      sx={{
        padding: 0,
        fontSize: '10px',
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
