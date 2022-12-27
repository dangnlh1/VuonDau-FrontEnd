import { Avatar, Button, Divider, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import VoteButton from '@/features/Forum/components/button/VoteButton'

interface CommentProps {
  content: string
  upVote: number
  downVote: number
  avatar: string
  name: string
}

const defaultAvatar =
  'https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/512/external-user-interface-kiranshastry-lineal-color-kiranshastry.png'

export default function Comment(props: CommentProps) {
  const { avatar, content, downVote, name, upVote } = props

  const [isReply, setReply] = useState(false)
  const [isClickTextInput, setClickTextInput] = useState(false)
  const [isDirty, setDirty] = useState(false)

  function handleReply() {
    setReply(!isReply)
  }

  function handleClickTextInput() {
    setClickTextInput(true)
  }
  function handleCancelClickTextInput() {
    setClickTextInput(false)
  }

  function handleChangeTextField(event: any) {
    const value: string = event.target.value
    if (value.length !== 0) {
      setDirty(true)
    } else {
      setDirty(false)
    }
  }

  function handleComment() {
    //TODO: add comment function
  }

  function handleUpVote(isSelected: boolean, quantity: number) {
    //TODO: add upVote function
  }

  function handleDownVote(isSelected: boolean, quantity: number) {
    //TODO: add downVote function
  }

  return (
    <Stack paddingBottom={1}>
      <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}></Stack>
      <Stack sx={{ marginTop: 2, padding: 2, borderRadius: 2, background: '#fff' }}>
        <Stack>
          <Stack direction={'row'} sx={{ paddingY: 2 }}>
            <Stack>
              <Avatar src={defaultAvatar} />
            </Stack>
            <Stack sx={{ paddingLeft: 1 }}>
              <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>{name}</Typography>
                <Typography sx={{ fontSize: 12, paddingLeft: 1 }}>3 phút trước.</Typography>
              </Stack>
              <Typography>{content}</Typography>
            </Stack>
          </Stack>
          <Stack direction={'row'} sx={{ width: '100%' }}>
            <VoteButton defaultValue={upVote} variant="up" onSelected={handleUpVote} />
            <VoteButton defaultValue={downVote} variant="down" onSelected={handleDownVote} />
            <Button
              onClick={handleReply}
              variant={!isReply ? 'contained' : 'outlined'}
              color="primary"
              sx={{ position: 'relative', right: 0, marginBottom: 1 }}
            >
              Phản hồi
            </Button>
          </Stack>
          {isReply && (
            <Stack paddingTop={2}>
              <Stack>
                <TextField
                  onFocus={handleClickTextInput}
                  onChange={handleChangeTextField}
                  id="standard-basic"
                  label="Thêm bình luận"
                  variant="standard"
                />
              </Stack>
              {isClickTextInput && (
                <Stack
                  direction={'row'}
                  sx={{ marginTop: 1, justifyContent: 'flex-end', width: '100%' }}
                >
                  <Button onClick={handleCancelClickTextInput} variant="text">
                    Hủy bỏ
                  </Button>
                  <Button
                    disabled={!isDirty}
                    onClick={handleComment}
                    variant={isDirty ? 'contained' : 'text'}
                    sx={{ marginLeft: 2 }}
                  >
                    Bình luận
                  </Button>
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
