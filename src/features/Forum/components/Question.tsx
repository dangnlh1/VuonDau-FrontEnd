import { Avatar, Button, Divider, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import VoteButton from '@/features/Forum/components/button/VoteButton'
import Comment from '@/features/Forum/components/Comment'

interface QuestionProps {
  content: string
  upVote: number
  downVote: number
  avatar: string
  name: string
  comments: {
    content: string
    upvoteNumber: number
    downvoteNumber: number
  }[]
}

const defaultAvatar =
  'https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/512/external-user-interface-kiranshastry-lineal-color-kiranshastry.png'

export default function Question(props: QuestionProps) {
  const { avatar, content, downVote, name, upVote, comments } = props

  const theme = useTheme()

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
    <Stack>
      <Stack paddingTop={2} sx={{ background: '#fff', paddingY: 2, paddingX: 2 }}>
        <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar src={defaultAvatar} />
          <Stack sx={{ paddingLeft: 2 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>{name}</Typography>
            <Typography sx={{ fontSize: 12 }}>3 phút trước.</Typography>
          </Stack>
        </Stack>
        <Stack>
          <Stack sx={{}}>
            <Typography variant="h5">{content}</Typography>
          </Stack>
          <Stack sx={{ flexDirection: 'row' }}>
            <VoteButton defaultValue={upVote} onSelected={handleUpVote} variant="up" />
            <VoteButton defaultValue={downVote} onSelected={handleDownVote} variant="down" />
            <Button
              onClick={handleReply}
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginRight: 1,
                marginBottom: 1,
              }}
              variant="contained"
            >
              Trả Lời
            </Button>
          </Stack>

          {isReply && (
            <Stack paddingTop={2}>
              <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextField
                  sx={{ flexGrow: 1 }}
                  onFocus={handleClickTextInput}
                  onChange={handleChangeTextField}
                  id="standard-basic"
                  label="Thêm bình luận"
                  variant="standard"
                />
              </Stack>

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
            </Stack>
          )}
        </Stack>
      </Stack>
      <Stack sx={{ background: '#fff', marginTop: 2 }}>
        {comments &&
          comments.map((item, index) => (
            <Comment
              avatar=""
              content={item.content}
              downVote={item.downvoteNumber}
              upVote={item.upvoteNumber}
              name="Student"
            />
          ))}
      </Stack>
    </Stack>
  )
}
