import React from 'react'
import {
    Container,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'
import currentFaqs from './currentFaqs.json'

function Faqs() {
    const addLinksToDescription = (text: string): string => {
        const replacedWithIgLink = text.replace(
            /boutiqueboarding(?![a-zA-Z0-9])/g,
            '<a href="https://instagram.com/boutiqueboarding?igshid=MmIzYWVlNDQ5Yg==" class="links">boutiqueboarding</a>'
        )

        const replacedWithEmailLink = replacedWithIgLink.replace(
            /boutiqueboardingco@gmail\.com/g,
            '<a href="mailto:boutiqueboardingco@gmail.com" class="links">boutiqueboardingco@gmail.com</a>'
        )

        return replacedWithEmailLink
    }

    const singleAccordion = (title: string, body: string) => {
        return (
            <Accordion key={title}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        className="noMargins"
                        dangerouslySetInnerHTML={{
                            __html: addLinksToDescription(body),
                        }}
                    ></Typography>
                </AccordionDetails>
            </Accordion>
        )
    }

    const renderFaqAccordions = () => {
        return currentFaqs.map((faq) =>
            singleAccordion(faq.question, faq.answer)
        )
    }

    return (
        <>
            <TopNav />
            <Header title="FAQs" />
            <Container maxWidth="xl">
                <Box my={10}>{renderFaqAccordions()}</Box>
            </Container>
            <BottomNav />
        </>
    )
}

export default Faqs
