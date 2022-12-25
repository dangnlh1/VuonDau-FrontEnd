import Question from '@/features/Forum/components/Question'
import { Avatar, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

//TODO: Delete when have api
const mockQuestion = {
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, animi quidem dolorum ratione mollitia laudantium, eveniet inventore omnis recusandae, perspiciatis minima quam aperiam debitis suscipit corrupti. Perferendis a sit doloribus.',
  student: {
    id: 0,
    avatar: '',
    name: 'Student Name',
  },
  upvoteNumber: 2,
  downvoteNumber: 2,
  comments: [
    {
      content: 'Comment content',
      upvoteNumber: 2,
      downvoteNumber: 2,
    },
    {
      content: 'Comment content',
      upvoteNumber: 2,
      downvoteNumber: 2,
    },
  ],
}

export default function ForumQuestion() {
  const question = mockQuestion
  const { questionId } = useParams()
  return (
    <Stack>
      <Question
        avatar=""
        content={question.content}
        downVote={question.downvoteNumber}
        upVote={question.upvoteNumber}
        name="Student"
      />
      <Stack sx={{ marginLeft: 5 }}>
        <Question
          avatar=""
          content={question.content}
          downVote={question.downvoteNumber}
          upVote={question.upvoteNumber}
          name="Student"
        />
        <Question
          avatar=""
          content={question.content}
          downVote={question.downvoteNumber}
          upVote={question.upvoteNumber}
          name="Student"
        />
      </Stack>
    </Stack>
  )
}
