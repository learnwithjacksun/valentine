import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CardsProvider } from '@/Provider/'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CardsProvider>
        <App />
      </CardsProvider>
    </BrowserRouter>
  </StrictMode>,
)
