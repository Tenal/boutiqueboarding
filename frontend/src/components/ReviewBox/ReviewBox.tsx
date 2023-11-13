import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import StarFullIcon from '@mui/icons-material/Star'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarEmptyIcon from '@mui/icons-material/StarBorder'

interface IReviewBoxProps {
    dog: string
    stars: number
    name: string
    review: string
}

function ReviewBox({ dog, stars, name, review }: IReviewBoxProps) {
    const getStars = (value: number): React.ReactNode => {
        const stars: React.ReactNode[] = []
        const fullStars = Math.floor(value)
        const halfStar = value - fullStars >= 0.5

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <StarFullIcon key={`full-${i}`} className="reviewStars" />
            )
        }

        if (halfStar) {
            stars.push(<StarHalfIcon key="half" className="reviewStars" />)
        }

        const emptyStars = 5 - stars.length

        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <StarEmptyIcon key={`empty-${i}`} className="reviewStars" />
            )
        }

        return (
            <Grid
                item
                container
                direction="row"
                justifyContent="center"
                sx={{ mt: 1, mb: 0.5 }}
            >
                {stars}
            </Grid>
        )
    }

    return (
        <Grid
            item
            xs={12}
            md={6}
            container
            direction="column"
            alignItems="center"
            className="review"
        >
            <Box className="imageContainer">
                <img
                    src={require(`../../resources/reviewPhotos/${dog}.jpg`)}
                    alt="dog headshot on plain background"
                    className="reviewImage"
                />
            </Box>
            <Box className="textContainer" py={2} px={3}>
                <img
                    src={require('../../resources/quoteLeft.png')}
                    alt="left quotation mark"
                    loading="lazy"
                    className="quoteLeft"
                />
                <Typography
                    className="reviewParagraph"
                    dangerouslySetInnerHTML={{
                        __html: review,
                    }}
                    sx={{ mt: 7 }}
                ></Typography>
                <Typography variant="body2" className="reviewName">
                    {name}
                </Typography>
                {getStars(stars)}
                <img
                    src={require('../../resources/quoteRight.png')}
                    alt="right quotation mark"
                    loading="lazy"
                    className="quoteRight"
                />
            </Box>
        </Grid>
    )
}

export default ReviewBox
