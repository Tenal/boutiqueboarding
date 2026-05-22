import React, { useRef, useState, useEffect } from 'react'
import { Container, Box, Typography, Grid, useMediaQuery } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import LocationIcon from '@mui/icons-material/FmdGoodOutlined'
import PolicyIcon from '@mui/icons-material/PolicyOutlined'
import ChatIcon from '@mui/icons-material/ChatOutlined'
import { motion, AnimatePresence } from 'framer-motion'

import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'
import InfoCard from '../../components/InfoCard/InfoCard'
import SingleAccordion from '../../components/SingleAccordion/SingleAccordion'
import FaqStickyNav from '../../components/FaqStickyNav/FaqStickyNav'
import PageTransition from '../../components/PageTransition/PageTransition'
import { useScrollReveal, scrollRevealVariants } from '../../utils/useScrollReveal'
import hook, { IFaq } from './useFaqs'

function FaqSection({
    section,
    heading,
    faqs,
}: {
    section: string
    heading: string
    faqs: IFaq[]
}) {
    const { ref, isInView } = useScrollReveal({ threshold: 0.1 })

    return (
        <Box ref={ref} mt={8} mb={9} id={`section-${section}`}>
            <Box className="faqSectionHeading" mb={3}>
                <Typography variant="h3" className="faqSectionTitle">
                    {heading}
                </Typography>
            </Box>
            {faqs.map((faq: IFaq, index: number) => (
                <motion.div
                    key={faq.question}
                    variants={scrollRevealVariants.fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                    <SingleAccordion
                        title={faq.question}
                        body={faq.answer}
                    />
                </motion.div>
            ))}
        </Box>
    )
}

function Faqs() {
    const {
        handleScrollToFaqSection,
        faqsGroupedBySection,
        sectionHeadings,
        sections,
    } = hook.useFaqs()

    const isNarrow = useMediaQuery('(max-width:750px)')
    const cardSectionRef = useRef<HTMLDivElement>(null)
    const [showStickyNav, setShowStickyNav] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (!cardSectionRef.current) return
            setShowStickyNav(cardSectionRef.current.getBoundingClientRect().bottom < 56)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const iconMap: Record<string, JSX.Element> = {
        PetsIcon: <PetsIcon className="infoIcon" />,
        LocationIcon: <LocationIcon className="infoIcon" />,
        PolicyIcon: <PolicyIcon className="infoIcon" />,
        ChatIcon: <ChatIcon className="infoIcon" />,
    }

    return (
        <PageTransition>
            <Box className="faqsPage">
            <TopNav />
            <Header title="FAQs" />
            <AnimatePresence>
                {showStickyNav && (
                    <FaqStickyNav
                        key="sticky-nav"
                        sections={sections}
                        onNavigate={handleScrollToFaqSection}
                    />
                )}
            </AnimatePresence>
            <Container maxWidth="xl">
                <Box my={8}>
                    <Box pb={6} mt={2} className="faqCardSection">
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="stretch"
                            spacing={{ xs: 2, sm: 4, md: 6, lg: 8 }}
                            ref={cardSectionRef}
                        >
                            {sections.map((section) => (
                                <InfoCard
                                    key={section.id}
                                    icon={iconMap[section.iconName]}
                                    title={section.title}
                                    description={section.description}
                                    onClick={() => handleScrollToFaqSection(section.id)}
                                    grid={{ xs: 6, sm: isNarrow ? 6 : 3, md: 3 }}
                                />
                            ))}
                        </Grid>
                    </Box>
                    {Object.entries(faqsGroupedBySection).map(([section, faqs]) => (
                        <FaqSection
                            key={section}
                            section={section}
                            heading={sectionHeadings[parseInt(section, 10)]}
                            faqs={faqs}
                        />
                    ))}
                </Box>
            </Container>
            <BottomNav />
            </Box>
        </PageTransition>
    )
}

export default Faqs
