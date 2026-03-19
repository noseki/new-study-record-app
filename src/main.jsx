import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { StudyRecord } from './StudyRecord.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudyRecord/>
  </StrictMode>,
)
