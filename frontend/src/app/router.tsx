import { createBrowserRouter, Navigate } from 'react-router-dom'
import EditorPage from '@/pages/EditorPage'
import InicioPage from '@/pages/InicioPage'
import MisDiseñosPage from '@/pages/MisDiseñosPage'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/inicio" replace /> },
  { path: '/editor', element: <EditorPage /> },
  { path: '/inicio', element: <InicioPage /> },
  { path: '/misdiseños', element: <MisDiseñosPage /> },
])