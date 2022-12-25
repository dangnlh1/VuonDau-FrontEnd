import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import Main from '@/features/Main'
import { Route, Routes } from 'react-router-dom'
import Teacher from './features/TeacherPageManagements'
import Students from './features/Student'
import { StompSessionProvider } from 'react-stomp-hooks'
import { env } from 'process'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { connect } from '@/utils/websocket'
import PaymentInProgress from '@/features/PaymentInProgress'
export default function App() {
  useEffect(() => {
    connect()
  }, [])

  return (
    <Routes>
      <Route path="/*" element={<Main />} />
      <Route path="giao-vien/*" element={<Teacher />} />
      <Route path="hoc-sinh/*" element={<Students />} />
      <Route path="processing" element={<PaymentInProgress />} />
    </Routes>
  )
}
