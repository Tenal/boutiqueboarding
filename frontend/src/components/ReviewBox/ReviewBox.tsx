import React, { useMemo } from 'react'
import { Typography, Box } from '@mui/material'
import StarFullIcon from '@mui/icons-material/Star'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarEmptyIcon from '@mui/icons-material/StarBorder'
import { motion } from 'framer-motion'
import { ReactComponent as DogProfileSvg } from '../../resources/dog-profile.svg'
import { useScrollReveal, scrollRevealVariants } from '../../utils/useScrollReveal'
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

    for (let i = 0; i < fullStarsCount; i += 1) {
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

    for (let i = 0; i < emptyStarsCount; i += 1) {
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

export default function ReviewBox({ dog, stars, name, review }: IReviewBoxProps) {
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

    const { ref, isInView } = useScrollReveal({ threshold: 0.1 })

    return (
        <motion.div
            ref={ref}
            variants={scrollRevealVariants.fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.45 }}
        >
            <Box className="reviewCard" px={3} pt={3} pb={4}>
                <Box className="reviewAvatar">
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
                <Box className="reviewStarRow">
                    {starIcons}
                </Box>
                <Box className="reviewTextArea">
                    <img
                        src="/resources/reviewPhotos/quoteLeft.png"
                        alt="left quotation mark"
                        loading="lazy"
                        className="quoteLeft"
                    />
                    <Typography
                        className="reviewParagraph"
                        dangerouslySetInnerHTML={{ __html: review }}
                    />
                    <img
                        src="/resources/reviewPhotos/quoteRight.png"
                        alt="right quotation mark"
                        loading="lazy"
                        className="quoteRight"
                    />
                </Box>
                <Typography variant="caption" className="reviewAttribution">
                    &mdash; {name}
                </Typography>
            </Box>
        </motion.div>
    )
}
