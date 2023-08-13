import React from 'react'
import { Box, Typography, Container } from '@mui/material'

interface IHeaderProps {
    title: string
}

// TODO make home header photo slide in & change every 5 seconds

function Header({ title }: IHeaderProps) {
    const isHome = title === 'home'
    const homeTitle =
        'Unleash your peace of mind with our trusted and experienced in-home dog boarding'

    return (
        <Box
            py={10}
            className={`header ${title
                .replace(/\s+/g, '')
                .toLowerCase()}Image ${isHome ? 'headerHome' : ''}`}
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
