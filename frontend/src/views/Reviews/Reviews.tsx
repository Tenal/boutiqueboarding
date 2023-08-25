import React, { useState, useEffect } from 'react'
import {
    Container,
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    Autocomplete,
} from '@mui/material'
import { useForm, ValidationError } from '@formspree/react'

import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'
import ReviewBox from '../../components/ReviewBox/ReviewBox'
import currentReviews from './currentReviews.json'

function Reviews() {
    const [dog, setDog] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [review, setReview] = useState<string>('')
    const [rating, setRating] = useState<number | null>(null)
    const [submitted, setSubmitted] = useState(false)
    const [state, handleSubmit] = useForm('xvojkykg')

    const handleDogChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDog(event.target.value)
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReview(event.target.value)
    }

    const handleRatingChange = (
        _event: React.SyntheticEvent<Element, Event>,
        newValue: number | null
    ) => {
        setRating(newValue)
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (name && review && rating !== null) {
            handleSubmit({ name, review, rating })
        }
    }

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

    const reviewForm = () => {
        if (submitted) {
            return (
                <Box
                    sx={{
                        minHeight: '360px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        maxWidth: '525px',
                    }}
                >
                    <Typography variant="body1">
                        We've received your review! Thank you so much for taking
                        the time to write one, we're so appreciative!
                    </Typography>
                </Box>
            )
        }

        return (
            <form onSubmit={handleFormSubmit} style={{ maxWidth: '525px' }}>
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
                    rows={5}
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

                {state.errors && (
                    <Typography
                        variant="body2"
                        color="error"
                        style={{ marginTop: '1rem' }}
                    >
                        We're sorry, there was an issue submitting your review.
                        If the problem persists, you're welcome to email your
                        review to us at{' '}
                        <a
                            href="mailto:boutiqueboardco@gmail.com"
                            className="links"
                        >
                            boutiqueboardco@gmail.com
                        </a>
                    </Typography>
                )}
            </form>
        )
    }

    useEffect(() => {
        if (state.succeeded) {
            setSubmitted(true)
            setTimeout(() => {
                setDog('')
                setName('')
                setReview('')
                setRating(null)
                setSubmitted(false)
            }, 5000)
        }
    }, [state.succeeded])

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
