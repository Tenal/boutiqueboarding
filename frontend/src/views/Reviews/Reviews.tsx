import React from 'react'
import {
    Container,
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    Autocomplete,
} from '@mui/material'
import { ValidationError } from '@formspree/react'

import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'
import ReviewBox from '../../components/ReviewBox/ReviewBox'
import currentReviews from './currentReviews.json'

import hook from './useReviews'

function Reviews() {
    const {
        dog,
        name,
        review,
        rating,
        showSuccessMessage,
        state,
        onFormSubmit,
        handleDogChange,
        handleNameChange,
        handleReviewChange,
        handleRatingChange,
    } = hook.useReviews()

    const getReviews = () =>
        currentReviews.map((rev) => (
            <ReviewBox
                key={`${rev.name}_${rev.dog}`}
                dog={rev.dog}
                stars={rev.stars}
                name={rev.name}
                review={rev.review}
            />
        ))

    const renderSuccessMessage = () => (
        <Box className="reviewFormMessage">
            <Typography variant="body1" className="semiBold">
                We received your review!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                Thank you so much for taking the time to write one, we are
                extremely appreciative!
            </Typography>
        </Box>
    )

    const renderErrorMessage = () => (
        <Box className="reviewFormMessage">
            <Typography
                variant="body2"
                color="error"
                style={{ marginTop: '1rem' }}
            >
                We are sorry, there was an issue submitting your review. If the
                problem persists, you are welcome to email your review to us at{' '}
                <a href="mailto:boutiqueboardco@gmail.com" className="links">
                    boutiqueboardco@gmail.com
                </a>
            </Typography>
        </Box>
    )

    const reviewForm = () => {
        if (showSuccessMessage) {
            return renderSuccessMessage()
        }

        if (state.errors) {
            return renderErrorMessage()
        }

        return (
            <form
                onSubmit={onFormSubmit}
                style={{ maxWidth: '525px' }}
                data-testid="review-form"
            >
                <Typography variant="h2" sx={{ mb: 2 }}>
                    Did you board with us? Leave us a Review!
                </Typography>

                <TextField
                    label="Dog's Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={dog}
                    onChange={handleDogChange}
                    size="small"
                />
                <ValidationError
                    prefix="Dog"
                    field="dog"
                    errors={state.errors}
                />

                <TextField
                    label="Your Name(s)"
                    variant="outlined"
                    fullWidth
                    required
                    value={name}
                    onChange={handleNameChange}
                    size="small"
                />
                <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                />

                <TextField
                    label="Review"
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={7}
                    value={review}
                    onChange={handleReviewChange}
                    size="small"
                />
                <ValidationError
                    prefix="Review"
                    field="review"
                    errors={state.errors}
                />

                <Autocomplete
                    options={[5, 4, 3, 2, 1]}
                    getOptionLabel={(option) => option.toString()}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Rating out of 5"
                            variant="outlined"
                            required
                            size="small"
                        />
                    )}
                    value={rating}
                    onChange={handleRatingChange}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    disabled={state.submitting}
                >
                    Submit
                </Button>
            </form>
        )
    }

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
                    <Box
                        mt={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {reviewForm()}
                    </Box>
                </Box>
            </Container>
            <BottomNav />
        </>
    )
}

export default Reviews
