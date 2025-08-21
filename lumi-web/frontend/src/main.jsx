import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TaskPage from './pages/TaskPage.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskPage />
  </StrictMode>,
)
