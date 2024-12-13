import React from 'react'
import { Paper, Grid, Typography } from '@mui/material'
import hook, { IUseInfoCardProps } from './useInfoCard'

interface IInfoCardProps extends IUseInfoCardProps {
    icon: JSX.Element
    title: string
    description?: string
}

function InfoCard({ icon, title, description, onClick }: IInfoCardProps) {
    const { handleClick, clickable } = hook.useInfoCard({ onClick })

    return (
        <Grid
            item
            xs={6}
            sm={3}
            container
            justifyContent="center"
            alignItems="stretch"
        >
            <Paper
                className={`infoCard ${
                    clickable ? 'clickable' : 'nonClickable'
                }`}
                onClick={handleClick}
                data-testid="InfoCardPaper" // Added for testing purposes
            >
                <div className="iconCircleOutline">{icon}</div>
                <Typography variant="h4" className="titleText">
                    {title}
                </Typography>
                {description && (
                    <Typography variant="body2" className="descText">
                        {description}
                    </Typography>
                )}
            </Paper>
        </Grid>
    )
}

export default InfoCard
