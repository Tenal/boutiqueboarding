import React from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { addHyperlinks } from '../../utils/generalHelper'

interface ISingleAccordionProps {
    title: string
    body: React.ReactNode | string
}

function SingleAccordion({ title, body }: ISingleAccordionProps) {
    const accBody =
        typeof body === 'string' ? (
            <Typography
                className="noMargins"
                dangerouslySetInnerHTML={{ __html: addHyperlinks(body) }}
            />
        ) : (
            <Typography className="noMargins">{body}</Typography>
        )

    return (
        <Accordion
            disableGutters
            sx={{
                mb: 1.5,
                border: '1px solid var(--color-sand)',
                borderRadius: '8px !important',
                boxShadow: 'none',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                '&:before': { display: 'none' },
                '&.Mui-expanded:last-of-type': { mb: 1.5 },
                '&:hover': {
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                    borderColor: 'var(--color-primary)',
                },
            }}
            data-testid="accordion"
        >
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon sx={{ color: 'var(--color-primary)' }} />
                }
                sx={{ borderRadius: '8px' }}
                data-testid="accordion-summary"
            >
                <Typography
                    variant="body1"
                    className="noMargins semiBold"
                    sx={{ color: 'var(--color-ink)' }}
                >
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    borderRadius: '0 0 8px 8px',
                    pt: '14px',
                }}
            >
                {accBody}
            </AccordionDetails>
        </Accordion>
    )
}

export default SingleAccordion
