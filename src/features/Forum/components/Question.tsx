import { Avatar, Button, Divider, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'

interface QuestionProps {
  content: string
  upVote: number
  downVote: number
  avatar: string
  name: string
}

const defaultAvatar =
  'https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/512/external-user-interface-kiranshastry-lineal-color-kiranshastry.png'

export default function Question(props: QuestionProps) {
  const { avatar, content, downVote, name, upVote } = props

  const [isUpVote, setIsUpVote] = useState(false)
  const [isDownVote, setIsDownVote] = useState(false)
  const [userUpVote, setUserUpVote] = useState(upVote)
  const [userDownVote, setUserDownVote] = useState(downVote)
  const [isReply, setReply] = useState(false)

  function handleClickUpVote() {
    if (isUpVote) {
      setUserUpVote(userUpVote - 1)
    } else {
      setUserUpVote(userUpVote + 1)
    }

    setIsUpVote(!isUpVote)
  }

  function handleClickDownVote() {
    if (isDownVote) {
      setUserDownVote(userDownVote - 1)
    } else {
      setUserDownVote(userDownVote + 1)
    }

    setIsDownVote(!isDownVote)
  }

  function handleReply() {
    setReply(!isReply)
  }

  return (
    <Stack paddingTop={2}>
      <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar src={defaultAvatar} />
        <Stack sx={{ paddingLeft: 2 }}>
          <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>{name}</Typography>
          <Typography sx={{ fontSize: 12 }}>3 phút trước.</Typography>
        </Stack>
      </Stack>
      <Stack sx={{ marginTop: 2, padding: 2, borderRadius: 2, background: '#fff' }}>
        <Stack>
          <Stack sx={{ marginY: 2 }}>
            <Typography>{content}</Typography>
          </Stack>
          <Divider />
          <Stack direction={'row'} sx={{ width: '100%', paddingTop: 2 }}>
            <Stack direction={'row'} flexGrow={1}>
              <Button
                color={isUpVote ? 'success' : undefined}
                onClick={handleClickUpVote}
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  boxShadow: 3,
                  borderRadius: 5,
                }}
                variant={isUpVote ? 'contained' : 'outlined'}
              >
                <ThumbUpAltIcon fontSize="small" color={!isUpVote ? 'success' : 'inherit'} />
                <Typography variant="body1" color="inherit">
                  {userUpVote}
                </Typography>
              </Button>
              <Button
                color={isDownVote ? 'error' : undefined}
                onClick={handleClickDownVote}
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  boxShadow: 3,
                  borderRadius: 5,
                  marginLeft: 1,
                }}
                variant={isDownVote ? 'contained' : 'outlined'}
              >
                <ThumbDownIcon fontSize="small" color={!isDownVote ? 'error' : 'inherit'} />
                <Typography variant="body1">{userDownVote}</Typography>
              </Button>
            </Stack>
            <Button
              onClick={handleReply}
              variant={!isReply ? 'contained' : 'outlined'}
              color="primary"
              sx={{ position: 'relative', right: 0 }}
            >
              Reply
            </Button>
          </Stack>
          {isReply && (
            <Stack paddingTop={2}>
              <TextField id="standard-basic" label="Standard" variant="standard" />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
