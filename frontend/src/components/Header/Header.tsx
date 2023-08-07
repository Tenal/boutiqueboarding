import React from 'react'
import { Box, Typography, Container } from '@mui/material'

interface IHeaderProps {
    title: string
}

function Header({ title }: IHeaderProps) {
    return (
        <Box py={10} className={`header ${title.toLowerCase()}Image`} mb={5}>
            <Container maxWidth="xl">
                <Typography variant="h1">{title}</Typography>
            </Container>
        </Box>
    )
}

export default Header
