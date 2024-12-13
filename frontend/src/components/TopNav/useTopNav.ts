import { useState, useCallback, useEffect } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'

const useTopNav = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

    const pages = ['About', 'FAQs', 'Reviews']

    const handleMenuToggle = useCallback(() => {
        setMenuOpen((prev) => !prev)
    }, [])

    const handleCloseMenu = useCallback(() => {
        setMenuOpen(false)
    }, [])

    const autoCloseMenuAtLargeWidths = useCallback(() => {
        if (!isSmallScreen && menuOpen) {
            setMenuOpen(false)
        }
    }, [isSmallScreen, menuOpen])

    const handleMenuKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handleMenuToggle()
            }
        },
        [handleMenuToggle]
    )

    useEffect(() => {
        autoCloseMenuAtLargeWidths()
    }, [autoCloseMenuAtLargeWidths])

    return {
        menuOpen,
        isSmallScreen,
        pages,
        theme,
        handleMenuToggle,
        handleCloseMenu,
        handleMenuKeyDown,
    }
}

const hook = {
    useTopNav,
}

export default hook
