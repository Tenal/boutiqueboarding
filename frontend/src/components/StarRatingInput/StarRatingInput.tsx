import React from 'react'
import { Box, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import useStarRatingInput from './useStarRatingInput'

interface IStarRatingInputProps {
    value: number | null
    onChange: (value: number) => void
}

function StarRatingInput({ value, onChange }: IStarRatingInputProps) {
    const { hovered, setHovered } = useStarRatingInput()

    const active = hovered ?? value

    return (
        <Box className="starRatingInput">
            <Typography variant="body2" className="starRatingLabel">
                Rating
            </Typography>
            <Box className="starRatingRow">
                {[1, 2, 3, 4, 5].map((star) =>
                    (active ?? 0) >= star ? (
                        <StarIcon
                            key={star}
                            className="starRatingIcon starFilled"
                            onMouseEnter={() => setHovered(star)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => onChange(star)}
                        />
                    ) : (
                        <StarBorderIcon
                            key={star}
                            className="starRatingIcon starEmpty"
                            onMouseEnter={() => setHovered(star)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => onChange(star)}
                        />
                    )
                )}
            </Box>
            {/* Hidden input so the form can validate required */}
            <input
                type="hidden"
                name="rating"
                value={value ?? ''}
                required
            />
        </Box>
    )
}

export default StarRatingInput
