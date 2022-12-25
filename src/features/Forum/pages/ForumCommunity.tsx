import { ForumList } from '@/features/Forum/components/ForumList'
import { ForumPayload } from '@/models/forum'
import { Pagination, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const pageTitle = 'Diễn đàn cộng dồng'

//TODO: Delete when api updated
const mockForumList: ForumPayload[] = [
  {
    classCode: 'Class Code',
    className: 'Class Name',
    code: 'Code',
    id: 0,
    name: 'Name',
    subjectCode: 'Subject Code',
    subjectName: 'Subject',
    type: '',
  },
]

//TODO: Delete when api updated
const mockPagination = {
  page: 1,
  size: 1,
  totalPages: 1,
  total: 1,
}

export default function ForumCommunity() {
  const [forumId, setForumId] = useState<number | undefined>(undefined)

  const [params, setParams] = useState({
    page: 0,
    size: 12,
  })

  const navigate = useNavigate()

  // const { forumList, pagination } = useForum(params) TODO: change when api updated
  const forumList = mockForumList
  const pagination = mockPagination

  function handleForumClick(value: ForumPayload) {
    navigate(`/hoc-sinh/dien-dan/cong-dong/${value.id}`)
  }

  function handlePageChange(e: any, newPage: number) {
    setParams((params) => ({
      ...params,
      page: newPage - 1,
    }))
  }
  return (
    <Stack>
      <Typography variant="h5" fontWeight={700}>
        {pageTitle}
      </Typography>

      {Array.isArray(forumList) && forumList.length > 0 && (
        <Stack>
          <Typography variant="body1" fontStyle="italic">
            Tổng số: {forumList?.length}/ {pagination.total} lớp
          </Typography>
          <ForumList forumList={forumList} onCardClick={handleForumClick} />
        </Stack>
      )}

      {forumList && (
        <Stack alignItems="center" sx={{ py: 2 }}>
          <Pagination
            variant="outlined"
            shape="rounded"
            page={params?.page + 1}
            count={pagination?.totalPages}
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </Stack>
  )
}
