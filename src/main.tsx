import React from 'react'
import ReactDOM from 'react-dom/client'
import { Home } from './pages/Home.tsx'
import './assets/styles/index.scss'
import { Header } from './components/Header/Header.tsx'
import { Footer } from './components/Footer/Footer.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header />
    <Home />
    <Footer />
  </React.StrictMode>,
)
