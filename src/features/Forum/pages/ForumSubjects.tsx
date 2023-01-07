import { ForumList } from '@/features/Forum/components/ForumList'
import useForums from '@/hooks/forums'
import { ForumPayload } from '@/models/forum'
import { Pagination, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const pageTitle = 'Diễn đàn môn học'
const forumType = 'SUBJECT'
const NO_FORUM_LABEL = 'Không có diễn đàn nào để hiển thị.'

export default function ForumSubjects() {
  const [params, setParams] = useState({
    page: 0,
    size: 12,
    forumType,
  })

  const { forumList, pagination } = useForums(params)

  const navigate = useNavigate()

  function handleForumClick(value: ForumPayload) {
    navigate(`/hoc-sinh/dien-dan/mon-hoc/${value.subjectId}`)
  }

  function handlePageChange(e: any, newPage: number) {
    setParams((params) => ({
      ...params,
      page: newPage - 1,
    }))
  }

  console.log(forumList)

  return (
    <Stack>
      <Typography variant="h5" fontWeight={700}>
        {pageTitle}
      </Typography>

      {Array.isArray(forumList) && forumList.length > 0 ? (
        <Stack>
          <Typography variant="body1" fontStyle="italic">
            Tổng số: {forumList?.length}/ {pagination.total} lớp
          </Typography>
          <ForumList forumList={forumList} onCardClick={handleForumClick} />
        </Stack>
      ) : (
        <Stack>
          <Typography variant="body1">{NO_FORUM_LABEL}</Typography>
        </Stack>
      )}

      {forumList && forumList.length > 0 && (
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
