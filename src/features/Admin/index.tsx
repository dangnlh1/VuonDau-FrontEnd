import { AdminLayout } from '@/components/layout/AdminLayout'
import { LinearProgress } from '@mui/material'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

export default function Admin() {
  return (
    <AdminLayout>
      <Suspense fallback={<LinearProgress />}>
        <Routes></Routes>
      </Suspense>
    </AdminLayout>
  )
}
