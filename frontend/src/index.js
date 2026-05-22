import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { CookiesProvider } from 'react-cookie'
import { AnimatePresence } from 'framer-motion'

import { ThemeProvider } from '@mui/material/styles'
import theme from './styling/mui/theme'
import './styling/css/App.scss'

import Home from './views/Home/Home'
import About from './views/About/About'
import Faqs from './views/Faqs/Faqs'
import Reviews from './views/Reviews/Reviews'

function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/reviews" element={<Reviews />} />
            </Routes>
        </AnimatePresence>
    )
}

function App() {
    return (
        <CookiesProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <AnimatedRoutes />
                </BrowserRouter>
            </ThemeProvider>
        </CookiesProvider>
    )
}

const root = createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>
)
