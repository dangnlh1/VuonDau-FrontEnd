import { Stack } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Moodle() {
  const navigate = useNavigate()
  var url = 'http://moodle-vuondau.amazingtech.vn/auth/oidc/'
  window.location.href = window.location.href = url
  navigate('/hoc-sinh/tong-quan')
  return null
}
