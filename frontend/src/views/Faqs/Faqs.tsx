import React from 'react'
import { Container, Box, Typography, Grid } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import LocationIcon from '@mui/icons-material/FmdGoodOutlined'
import PolicyIcon from '@mui/icons-material/PolicyOutlined'
import ChatIcon from '@mui/icons-material/ChatOutlined'

import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'
import InfoCard from '../../components/InfoCard/InfoCard'
import SingleAccordion from '../../components/SingleAccordion/SingleAccordion'
import hook, { IFaq } from './useFaqs'

function Faqs() {
    const {
        handleScrollToFaqSection,
        faqsGroupedBySection,
        sectionHeadings,
        sections,
    } = hook.useFaqs()

    const iconMap: Record<string, JSX.Element> = {
        PetsIcon: <PetsIcon className="infoIcon" />,
        LocationIcon: <LocationIcon className="infoIcon" />,
        PolicyIcon: <PolicyIcon className="infoIcon" />,
        ChatIcon: <ChatIcon className="infoIcon" />,
    }

    const renderInfoCards = (): JSX.Element => (
        <Box pb={3} mt={2} className="faqCardSection">
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
                spacing={{ xs: 2, sm: 4, md: 6, lg: 8 }}
            >
                {sections.map((section) => (
                    <InfoCard
                        key={section.id}
                        icon={iconMap[section.iconName]}
                        title={section.title}
                        onClick={() => handleScrollToFaqSection(section.id)}
                    />
                ))}
            </Grid>
        </Box>
    )

    const renderFaqAccordions = (): JSX.Element => (
        <>
            {Object.entries(faqsGroupedBySection).map(([section, faqs]) => (
                <Box key={section} mt={6} mb={9} id={`section-${section}`}>
                    <Typography variant="h3" sx={{ mb: '7px' }}>
                        {sectionHeadings[parseInt(section, 10)]}
                    </Typography>
                    {faqs.map((faq: IFaq) => (
                        <SingleAccordion
                            key={faq.question}
                            title={faq.question}
                            body={faq.answer}
                        />
                    ))}
                </Box>
            ))}
        </>
    )

    return (
        <>
            <TopNav />
            <Header title="FAQs" />
            <Container maxWidth="xl">
                <Box my={10}>
                    {renderInfoCards()}
                    {renderFaqAccordions()}
                </Box>
            </Container>
            <BottomNav />
        </>
    )
}

export default Faqs
