import React from 'react'
import { Box, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

interface ICompactReviewProps {
    review: string
    name: string
    dog: string
    stars: number
}

function CompactReview({ review, name, dog, stars }: ICompactReviewProps) {
    const truncated = review.replace(/<[^>]*>/g, '').slice(0, 160).trim()
    const rawText = review.replace(/<[^>]*>/g, '')
    const excerpt = truncated.length < rawText.length ? `${truncated}…` : truncated
    const dogName = dog.charAt(0).toUpperCase() + dog.slice(1)
    const possessive = dogName.endsWith('s') ? `${dogName}'` : `${dogName}'s`

    return (
        <Box className="compactReview">
            <Box className="compactStars">
                {Array.from({ length: stars }, (_, i) => i + 1).map((star) => (
                    <StarIcon key={star} className="compactStar" />
                ))}
            </Box>
            <Typography variant="body2" className="compactReviewText">
                &ldquo;{excerpt}&rdquo;
            </Typography>
            <Typography variant="caption" className="compactReviewAttribution">
                &mdash; {name}, {possessive} family
            </Typography>
        </Box>
    )
}

export default CompactReview
