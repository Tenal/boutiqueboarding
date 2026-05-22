import React from 'react'
import {
    Container,
    Box,
    Grid,
    TextField,
    Button,
    Typography,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { ValidationError } from '@formspree/react'
import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'
import ReviewBox from '../../components/ReviewBox/ReviewBox'
import StarRatingInput from '../../components/StarRatingInput/StarRatingInput'
import PageTransition from '../../components/PageTransition/PageTransition'
import currentReviews from './currentReviews.json'
import hook from './useReviews'

function SocialProofBar() {
    return (
        <Box className="socialProofBar" py={5}>
            <Container maxWidth="xl">
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={3}
                    flexWrap="wrap"
                >
                        <Box textAlign="center">
                            <Box className="socialProofValue">
                                <Typography
                                    variant="h1"
                                    className="socialProofCount"
                                >
                                    2
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                className="socialProofLabel"
                            >
                                Dog capacity
                            </Typography>
                        </Box>
                        <Box className="socialProofDivider" />
                        <Box textAlign="center">
                            <Box className="socialProofValue socialProofStars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                        key={star}
                                        className="socialProofStar"
                                    />
                                ))}
                            </Box>
                            <Typography
                                variant="body2"
                                className="socialProofLabel"
                            >
                                Average rating
                            </Typography>
                        </Box>
                        <Box className="socialProofDivider" />
                        <Box textAlign="center">
                            <Box className="socialProofValue">
                                <Typography
                                    variant="h1"
                                    className="socialProofCount"
                                >
                                    13+
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                className="socialProofLabel"
                            >
                                Years experience
                            </Typography>
                        </Box>
                    </Box>
            </Container>
        </Box>
    )
}

function ReviewForm() {
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

    if (showSuccessMessage) {
        return (
            <Box className="reviewFormSection" py={8}>
                <Container maxWidth="xl">
                    <Box className="reviewFormMessage" textAlign="center">
                        <Typography
                            variant="h2"
                            className="reviewFormSuccessTitle"
                            sx={{ mb: 2 }}
                        >
                            Thank you! 🐾
                        </Typography>
                        <Typography
                            variant="body1"
                            className="reviewFormSuccessText"
                        >
                            We received your review and are extremely
                            appreciative!
                        </Typography>
                    </Box>
                </Container>
            </Box>
        )
    }

    if (state.errors && Object.keys(state.errors).length > 0) {
        return (
            <Box className="reviewFormSection" py={8}>
                <Container maxWidth="xl">
                    <Box className="reviewFormMessage" textAlign="center">
                        <Typography variant="body2" color="error">
                            Sorry, there was an issue submitting your review.
                            Please email us at{' '}
                            <a
                                href="mailto:boutiqueboardingco@gmail.com"
                                className="reviewFormErrorLink"
                            >
                                boutiqueboardingco@gmail.com
                            </a>
                        </Typography>
                    </Box>
                </Container>
            </Box>
        )
    }

    return (
        <Box className="reviewFormSection" py={8}>
            <Container maxWidth="xl">
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={7}>
                        <Box className="reviewFormInner">
                                <Typography
                                    variant="overline"
                                    className="reviewFormOverline"
                                >
                                    Share your experience
                                </Typography>
                                <Typography
                                    variant="h2"
                                    className="reviewFormTitle"
                                >
                                    Did you board with us?
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className="reviewFormSubtext"
                                    sx={{ mb: 3 }}
                                >
                                    We&apos;d love to hear how your pup&apos;s
                                    stay went.
                                </Typography>

                                <form
                                    onSubmit={onFormSubmit}
                                    data-testid="review-form"
                                >
                                    <TextField
                                        label="Dog's Name"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        value={dog}
                                        onChange={handleDogChange}
                                        size="small"
                                        sx={{ mb: 0.5 }}
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
                                        sx={{ mb: 0.5 }}
                                    />
                                    <ValidationError
                                        prefix="Name"
                                        field="name"
                                        errors={state.errors}
                                    />

                                    <TextField
                                        label="Your Review"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        multiline
                                        rows={6}
                                        value={review}
                                        onChange={handleReviewChange}
                                        size="small"
                                        sx={{ mb: 1 }}
                                    />
                                    <ValidationError
                                        prefix="Review"
                                        field="review"
                                        errors={state.errors}
                                    />

                                    <StarRatingInput
                                        value={rating}
                                        onChange={(val) =>
                                            handleRatingChange(null as any, val)
                                        }
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        sx={{ mt: 2.5 }}
                                        disabled={state.submitting}
                                        fullWidth
                                    >
                                        Submit Review
                                    </Button>
                                </form>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            md={5}
                            className="featuredReviewCol"
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                        >
                            <Box className="featuredReview">
                                <Typography
                                    variant="overline"
                                    className="featuredReviewOverline"
                                >
                                    What our clients say
                                </Typography>
                                <Box className="featuredReviewStarRow" my={1.5}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <StarIcon
                                            key={star}
                                            className="featuredReviewStar"
                                        />
                                    ))}
                                </Box>
                                <Typography className="featuredReviewText">
                                    &ldquo;From the moment we first met Tenal we
                                    knew our little Lou would be in the safest
                                    pair of hands... Tenal went above and beyond
                                    &mdash; taking the time to understand Louis,
                                    his needs, and how to keep him busy and
                                    engaged... Her check-ins were amazing, and we
                                    could tell from afar just how much he was
                                    enjoying his time...&rdquo;
                                </Typography>
                                <Typography className="featuredReviewAttribution">
                                    &mdash; Samantha &amp; Ben, Louis&apos;
                                    family
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
            </Container>
        </Box>
    )
}

function Reviews() {
    return (
        <PageTransition>
            <TopNav />
            <Header title="Reviews" />
            <SocialProofBar />
            <Container maxWidth="xl">
                <Box my={8} className="reviewGrid">
                    {currentReviews.map((rev) => (
                        <ReviewBox
                            key={`${rev.name}_${rev.dog}`}
                            dog={rev.dog}
                            stars={rev.stars}
                            name={rev.name}
                            review={rev.review}
                        />
                    ))}
                </Box>
            </Container>
            <ReviewForm />
            <BottomNav />
        </PageTransition>
    )
}

export default Reviews
