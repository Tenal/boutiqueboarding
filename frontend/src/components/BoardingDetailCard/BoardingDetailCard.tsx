import React from 'react'
import { Box, Typography } from '@mui/material'

interface IBoardingDetailCardProps {
    icon: React.ReactNode
    label: string
    value: string
    subtext?: string
}

function BoardingDetailCard({ icon, label, value, subtext }: IBoardingDetailCardProps) {
    return (
        <Box className="boardingDetailCard">
            <Box className="boardingDetailIcon">{icon}</Box>
            <Typography variant="overline" className="boardingDetailLabel">
                {label}
            </Typography>
            <Typography variant="h3" className="boardingDetailValue">
                {value}
            </Typography>
            {subtext && (
                <Typography variant="body2" className="boardingDetailSubtext">
                    {subtext}
                </Typography>
            )}
        </Box>
    )
}

export default BoardingDetailCard
