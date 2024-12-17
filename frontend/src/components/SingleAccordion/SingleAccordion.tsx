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
        <Accordion sx={{ mb: 1 }} data-testid="accordion">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                data-testid="accordion-summary"
            >
                <Typography variant="body1" className="noMargins semiBold">
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>{accBody}</AccordionDetails>
        </Accordion>
    )
}

export default SingleAccordion
