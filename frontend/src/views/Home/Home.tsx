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
            <Box className="aboutSection" pt={4} pb={5}>
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
                                safe environment.
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
            <Box py={5} className="boardingSection">
                <Container maxWidth="xl">
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
                </Container>
            </Box>
        )
    }

    const renderCardSection = () => {}

    const renderInstagramSection = () => {
        const dogs = [
            'fin1',
            'archer1',
            'louis2',
            'henn1',
            'rilly1',
            'koda1',
            'henny1',
            'fin2',
            'koda2',
            'archer2',
            'otis2',
            'louis1',
        ]
        const dogsSmall = [
            'fin1',
            'archer1',
            'louis2',
            'henn1',
            'rilly1',
            'koda1',
            'otis2',
            'henny1',
        ]

        return (
            <Box pt={5} pb={6} className="followSection">
                <Container maxWidth="xl">
                    <Typography variant="h1" sx={{ mb: 3 }}>
                        Follow Us
                    </Typography>
                    <Grid container spacing={3}>
                        {dogs.map((dog) => (
                            <Grid
                                item
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                sm={2}
                            >
                                <img
                                    src={require(`../../resources/boardingIG/${dog}.jpg`)}
                                    srcSet={require(`../../resources/boardingIG/${dog}.jpg`)}
                                    alt="dog"
                                    loading="lazy"
                                    className="boardingImage"
                                    onClick={() =>
                                        (window.location.href =
                                            'https://www.instagram.com/boutiqueboarding/?igshid=MmIzYWVlNDQ5Yg%3D%3D')
                                    }
                                />
                            </Grid>
                        ))}
                        {dogsSmall.map((dog) => (
                            <Grid
                                item
                                sx={{ display: { xs: 'flex', sm: 'none' } }}
                                xs={3}
                            >
                                <img
                                    src={require(`../../resources/boardingIG/${dog}.jpg`)}
                                    srcSet={require(`../../resources/boardingIG/${dog}.jpg`)}
                                    alt="dog"
                                    loading="lazy"
                                    className="boardingImage"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        )
    }

    return (
        <>
            <TopNav />
            <Header title="home" />
            {renderAboutSection()}
            {renderBoardingSection()}
            {renderInstagramSection()}
            <BottomNav />
        </>
    )
}

export default Home
