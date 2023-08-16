import React from 'react'
import { Container, Box, Grid } from '@mui/material'

import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'
import ReviewBox from '../../components/ReviewBox/ReviewBox'
import currentReviews from './currentReviews.json'

function Reviews() {
    const getReviews = () =>
        currentReviews.map((review) => (
            <ReviewBox
                key={`${review.name}_${review.dog}`}
                dog={review.dog}
                stars={review.stars}
                name={review.name}
                review={review.review}
            />
        ))

    return (
        <>
            <TopNav />
            <Header title="Reviews" />
            <Container maxWidth="xl">
                <Box my={10}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        spacing={10}
                        wrap="wrap"
                    >
                        {getReviews()}
                    </Grid>
                </Box>
            </Container>
            <BottomNav />
        </>
    )
}

export default Reviews
