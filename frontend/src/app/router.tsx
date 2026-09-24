import { createBrowserRouter } from 'react-router-dom'
import EditorPage from '@/pages/EditorPage'

export const router = createBrowserRouter([
  { path: '/', element: <EditorPage /> },
])