import { Stack } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Moodle() {
  const navigate = useNavigate()
  useEffect(() => {
    var url = 'http://moodle-vuondau.amazingtech.vn/auth/oidc/'
    window.open(url)
  }, [])

  return null
}
