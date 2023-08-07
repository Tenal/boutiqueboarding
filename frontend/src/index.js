import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { CookiesProvider } from 'react-cookie'

import { ThemeProvider } from '@mui/material/styles'
import theme from './styling/mui/theme'
import './styling/css/App.scss'

import Home from './views/Home/Home'
import Faqs from './views/Faqs/Faqs'

function App() {
    return (
        <CookiesProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<Home />} />
                        <Route path="/faqs" element={<Faqs />} />
                        <Route path="/reviews" element={<Home />} />
                    </Routes>
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
