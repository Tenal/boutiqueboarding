import React from 'react'
import { Paper, Grid, Typography } from '@mui/material'
import hook, { IUseInfoCardProps } from './useInfoCard'

interface IGridValues {
    xs?: number
    sm?: number
    md?: number
    lg?: number
}

interface IInfoCardProps extends IUseInfoCardProps {
    icon: JSX.Element
    title: string
    description?: string
    grid?: IGridValues
}

function InfoCard({ icon, title, description, onClick, grid }: IInfoCardProps) {
    const { handleClick, clickable } = hook.useInfoCard({ onClick })

    return (
        <Grid
            item
            xs={grid?.xs ?? 6}
            sm={grid?.sm ?? 3}
            md={grid?.md ?? 3}
            lg={grid?.lg ?? 3}
            container
            justifyContent="center"
            alignItems="stretch"
        >
            <Paper
                className={`infoCard ${clickable ? 'clickable' : ''}`}
                onClick={handleClick}
                data-testid="info-card"
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
