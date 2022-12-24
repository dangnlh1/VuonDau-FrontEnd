import { Stack } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Moodle() {
  const navigate = useNavigate()
  useEffect(() => {
    var url = 'http://moodle-vuondau.amazingtech.vn/auth/oidc/'
    navigate('/hoc-sinh/tong-quan')
    window.location.href = window.location.href = url
  }, [])

  return null
}
