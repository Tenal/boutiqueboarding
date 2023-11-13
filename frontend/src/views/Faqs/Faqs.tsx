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
import SectionHeaders from './SectionHeaders'

interface IFaq {
    section: number
    question: string
    answer: string
}

interface IGroupedFaqs {
    [key: number]: IFaq[]
}

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

    const singleAccordion = (title: string, body: string) => (
        <Accordion key={title} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                    variant="body1"
                    sx={{ fontWeight: 500 }}
                    className="noMargins"
                >
                    {title}
                </Typography>
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

    const groupFaqsBySection = (faqs: IFaq[]): IGroupedFaqs =>
        faqs.reduce((groupedFaqs: IGroupedFaqs, faq: IFaq) => {
            const { section } = faq
            if (!groupedFaqs[section]) {
                groupedFaqs[section] = []
            }
            groupedFaqs[section].push(faq)
            return groupedFaqs
        }, {})

    const sectionHeadings: { [key: number]: string } = {
        1: 'Care & Daily Activities',
        2: 'Booking Details & Location',
        3: 'Policies & Preparation',
        4: 'Communication & Updates',
    }

    const renderFaqAccordions = (): JSX.Element => {
        const faqsGroupedBySection: IGroupedFaqs =
            groupFaqsBySection(currentFaqs)
        return (
            <>
                {Object.entries(faqsGroupedBySection).map(([section, faqs]) => (
                    <Box key={section} mt={6} mb={9} id={`section-${section}`}>
                        <Typography variant="h3" sx={{ mt: 2, mb: 1 }}>
                            {sectionHeadings[parseInt(section)]}
                        </Typography>
                        {faqs.map((faq: IFaq) =>
                            singleAccordion(faq.question, faq.answer)
                        )}
                    </Box>
                ))}
            </>
        )
    }

    return (
        <>
            <TopNav />
            <Header title="FAQs" />
            <Container maxWidth="xl">
                <Box my={10}>
                    <SectionHeaders />
                    {renderFaqAccordions()}
                </Box>
            </Container>
            <BottomNav />
        </>
    )
}

export default Faqs
