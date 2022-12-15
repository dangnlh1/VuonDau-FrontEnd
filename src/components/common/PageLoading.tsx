import { Box, CircularProgress, CircularProgressProps, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

export function PageLoading() {
  const [showLoading, setShowLoading] = useState(true)
  const [progress, setProgress] = useState(10)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10))
    }, 150)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      setShowLoading(false)
    }
  }, [progress])

  if (showLoading) {
    return (
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={9999}
        width="100%"
        height="100vh"
        sx={{ bgcolor: 'white' }}
      >
        <CircularProgressWithLabel value={progress} />
      </Stack>
    )
  }

  return <div />
}
