import { ForumList } from '@/features/Forum/components/ForumList'
import useForums from '@/hooks/forums'
import { ForumPayload } from '@/models/forum'
import { Pagination, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const pageTitle = 'Diễn đàn lớp'
const forumType = 'CLASS'
const NO_FORUM_LABEL = 'Không có diễn đàn nào để hiển thị.'

export default function ForumClasses() {
  const [forumId, setForumId] = useState<number | undefined>(undefined)

  const [params, setParams] = useState({
    page: 0,
    size: 12,
    forumType,
  })

  const navigate = useNavigate()

  const { forumList, pagination } = useForums(params)

  console.log(forumList)

  function handleForumClick(value: ForumPayload) {
    navigate(`/hoc-sinh/dien-dan/lop-hoc/${value.classId}`)
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
