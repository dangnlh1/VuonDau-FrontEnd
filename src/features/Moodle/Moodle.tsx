import { Stack } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Iframe from 'react-iframe'
export default function Moodle() {
  const navigate = useNavigate()
  var url = 'http://moodle-vuondau.amazingtech.vn/my/'
  window.location.replace(url)
  navigate('/tong-quan')
  return null
}
