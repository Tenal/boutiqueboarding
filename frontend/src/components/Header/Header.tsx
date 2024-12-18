import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import hook, { IUseHeaderProps } from './useHeader'

function Header({ title }: IUseHeaderProps) {
    const { isHome, homeTitle, currentImageClass, isLargeImageLoaded } =
        hook.useHeader({ title })

    return (
        <Box
            py={10}
            className={`header ${title
                .replace(/\s+/g, '')
                .toLowerCase()}Image ${
                isHome ? 'headerHome' : ''
            } ${currentImageClass} ${
                isLargeImageLoaded ? 'largeLoaded' : 'smallLoaded'
            }`}
        >
            <Container maxWidth="xl">
                <Typography variant="h1">
                    {isHome ? homeTitle : title}
                </Typography>
            </Container>
        </Box>
    )
}

export default Header
