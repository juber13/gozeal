import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Certificate from './Certificate.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <Routes>
       <Route path='/' element={<App />} />
       <Route path='/certificate' element={<Certificate />} />
      </Routes>
  </BrowserRouter>,
)
