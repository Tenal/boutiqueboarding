import React from 'react'
import {
    Container,
    Box,
    Grid,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link } from 'react-router-dom'

import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'
import tenal from '../../resources/tenal.jpg'

function Home() {
    const renderAboutSection = () => {
        return (
            <Box className="aboutSection" py={5}>
                <Container maxWidth="xl">
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={12} md={6}>
                            <Typography variant="h1">
                                Welcome to the Boutique Pack
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ mb: 3 }}>
                                We offer boutique dog boarding that understands
                                the unique needs of your furry family member.
                                With a passion for rescue and a wealth of animal
                                care experience, we prioritize individualized
                                attention, breed-specific fulfillment, and a
                                secure environment.
                            </Typography>
                            <Link to="/about" className="links">
                                <Button variant="outlined" color="secondary">
                                    Learn about us
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        )
    }

    // TODO make below reusable function or component (also used in FAQ)
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

    // TODO make below reusable function or component (also used in FAQ)
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

    const renderBoardingSection = () => {
        const info = [
            {
                title: 'Price',
                body: 'Our boarding is done in 24-hour time periods. Our current rate is $75 per 24 hours.',
            },
            {
                title: 'Location',
                body: "We're located in Vaughan, Ontario. We live in a two-story corner townhouse with a fully-fenced backyard.",
            },
            {
                title: 'Capacity',
                body: 'We have a limit of two dogs in our care at any given time. Typically this includes one boarding dog and one foster dog, though we try to keep it to one dog total at least half of the time.',
            },
            {
                title: 'Booking',
                body: 'Send your desired boarding dates to boutiqueboardingco@gmail.com and we will confirm availability within 24 hours. Please note that we only book a maximum of two months in advance. If your desired dates fall beyond this timeframe, we are unable to accommodate your booking at this time.',
            },
        ]

        return (
            <Container maxWidth="xl">
                <Box pt={5} className="boardingSection">
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={12} md={6}>
                            <img
                                src={tenal}
                                alt="Tenal sitting in a park with a dog"
                                loading="lazy"
                                className="tenalImage"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h1" sx={{ mb: 3 }}>
                                Board With Us
                            </Typography>
                            {info.map((faq) =>
                                singleAccordion(faq.title, faq.body)
                            )}
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ mt: 4 }}
                                href="mailto:boutiqueboardingco@gmail.com"
                            >
                                Book Now
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        )
    }

    return (
        <>
            <TopNav />
            <Header title="home" />

            {renderAboutSection()}
            {renderBoardingSection()}

            <BottomNav />
        </>
    )
}

export default Home
