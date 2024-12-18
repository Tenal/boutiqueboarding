import React, { useMemo } from 'react'
import { Grid, Typography, Box } from '@mui/material'
import StarFullIcon from '@mui/icons-material/Star'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarEmptyIcon from '@mui/icons-material/StarBorder'
import { ReactComponent as DogProfileSvg } from '../../resources/dog-profile.svg'
import hook from './useReviewBox'

interface IReviewBoxProps {
    dog: string
    stars: number
    name: string
    review: string
}

const createStarIcons = (
    fullStarsCount: number,
    hasHalfStar: boolean,
    emptyStarsCount: number
): React.ReactNode[] => {
    const starElements: React.ReactNode[] = []

    for (let i = 0; i < fullStarsCount; i++) {
        starElements.push(
            <StarFullIcon
                key={`full-${i}`}
                className="reviewStars"
                data-testid="full-star-icon"
            />
        )
    }

    if (hasHalfStar) {
        starElements.push(
            <StarHalfIcon
                key="half"
                className="reviewStars"
                data-testid="half-star-icon"
            />
        )
    }

    for (let i = 0; i < emptyStarsCount; i++) {
        starElements.push(
            <StarEmptyIcon
                key={`empty-${i}`}
                className="reviewStars"
                data-testid="empty-star-icon"
            />
        )
    }

    return starElements
}

export default function ReviewBox({
    dog,
    stars,
    name,
    review,
}: IReviewBoxProps) {
    const {
        isLoading,
        handleImageLoad,
        handleImageError,
        fullStarsCount,
        hasHalfStar,
        emptyStarsCount,
    } = hook.useReviewBox(stars, dog)

    const starIcons = useMemo(
        () => createStarIcons(fullStarsCount, hasHalfStar, emptyStarsCount),
        [fullStarsCount, hasHalfStar, emptyStarsCount]
    )

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
                <Box className={`svgContainer ${isLoading ? 'show' : 'hide'}`}>
                    <DogProfileSvg className="dogSvg" />
                </Box>
                <Box className={`imgContainer ${isLoading ? 'hide' : 'show'}`}>
                    <img
                        src={`/resources/reviewPhotos/${dog}.jpg`}
                        alt={`${dog} headshot on a plain background`}
                        className="reviewImage"
                        loading="lazy"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                </Box>
            </Box>
            <Box className="textContainer" py={2} px={3}>
                <img
                    src="/resources/reviewPhotos/quoteLeft.png"
                    alt="left quotation mark"
                    loading="lazy"
                    className="quoteLeft"
                />
                <Typography
                    className="reviewParagraph"
                    dangerouslySetInnerHTML={{ __html: review }}
                    sx={{ mt: 7 }}
                />
                <Typography variant="body2" className="reviewName">
                    {name}
                </Typography>
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="center"
                    className="starGrid"
                    sx={{ mt: 1, mb: 0.5 }}
                >
                    {starIcons}
                </Grid>
                <img
                    src="/resources/reviewPhotos/quoteRight.png"
                    alt="right quotation mark"
                    loading="lazy"
                    className="quoteRight"
                />
            </Box>
        </Grid>
    )
}
