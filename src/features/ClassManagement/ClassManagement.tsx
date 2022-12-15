import { Route, Routes } from 'react-router-dom'
import ClassList from './pages/ClassList'

export default function ClassManagement() {
  return (
    <Routes>
      <Route index element={<ClassList />} />
    </Routes>
  )
}
