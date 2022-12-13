import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import Main from '@/features/Main'
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Admin from './features/Admin'
import Teacher from './features/Teacher'

export default function App() {
  let theme = createTheme({
    palette: {
      primary: {
        main: '#9c27b0',
        light: '#d05ce3',
        dark: '#6a0080',
        contrastText: '#fff',
      },
    },
  })
  theme = responsiveFontSizes(theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="giao-vien/*" element={<Teacher />} />
      </Routes>
    </ThemeProvider>
  )
}
