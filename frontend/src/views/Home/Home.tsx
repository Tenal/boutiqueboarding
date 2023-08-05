import { Box } from '@mui/material'
import React from 'react'
import TopNav from '../../components/TopNav/TopNav'

function Home() {

    return (
    <>
        <TopNav />
        <Box my={400}>
            Hello
        </Box>
    </>
    )
}

export default Home