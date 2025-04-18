import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Error from './Components/Error'

createRoot(document.getElementById('errorRoot')).render(
  <StrictMode>
    <Error />
  </StrictMode>,
)
