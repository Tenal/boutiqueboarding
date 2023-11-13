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
    Paper,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import InsuredIcon from '@mui/icons-material/GppGoodOutlined'
import FirstAidIcon from '@mui/icons-material/MedicalServicesOutlined'
import UpdateIcon from '@mui/icons-material/SecurityUpdateGoodOutlined'
import PetIcon from '@mui/icons-material/PetsOutlined'
import { Link } from 'react-router-dom'

import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'

function Home() {
    const renderIntroSection = () => (
        <Box className="introSection" pt={4} pb={5}>
            <Container maxWidth="xl">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={6}
                >
                    <Grid item xs={12} md={6}>
                        <Typography variant="h1">
                            Welcome to the Boutique Pack
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ mb: 3 }}>
                            We offer boutique dog boarding that understands the
                            unique needs of your furry family member. With a
                            passion for rescue and a wealth of animal care
                            experience, we prioritize individualized attention,
                            breed-specific fulfillment, and a safe environment.
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
    const singleAccordion = (title: string, body: any) => {
        const accBody =
            body !== 'string' ? (
                <Typography className="noMargins">{body}</Typography>
            ) : (
                <Typography
                    className="noMargins"
                    dangerouslySetInnerHTML={{
                        __html: addLinksToDescription(body),
                    }}
                ></Typography>
            )
        return (
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
                <AccordionDetails>{accBody}</AccordionDetails>
            </Accordion>
        )
    }

    const renderBoardingSection = () => {
        const info = [
            {
                title: 'Price',
                body: 'Our boarding rate is $75/night per dog.',
            },
            {
                title: 'Location',
                body: "We're located in Vaughan, Ontario. We live in a two-story corner lot townhouse with a fully-fenced backyard.",
            },
            {
                title: 'Capacity',
                body: 'We have a limit of two dogs in our care. Typically this includes one boarding dog and one foster dog, though we try to keep it to one dog total at least half of the time.',
            },
            {
                title: 'Booking',
                body: 'Send your desired boarding dates to boutiqueboardingco@gmail.com and we will confirm availability within 24 hours. Please note that we only book a maximum of two months in advance. If your desired dates fall beyond this timeframe, we are unable to accommodate your booking at this time.',
            },
        ]

        return (
            <Box pt={7} pb={2} className="boardingSection">
                <Container maxWidth="xl">
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={6}
                    >
                        <Grid item xs={12} md={6}>
                            <img
                                src={require('../../resources/tenal.jpg')}
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

    const renderCard = (icon: any, title: string, desc: string) => (
        <Grid
            item
            xs={12}
            sm={6}
            md={3}
            container
            justifyContent="center"
            alignItems="stretch"
        >
            <Paper className="infoCard" sx={{ p: { xs: 1, md: 3 } }}>
                <div className="iconCircleOutline">{icon}</div>
                <Typography variant="h4" sx={{ mt: 4 }} className="titleText">
                    {title}
                </Typography>
                <Typography variant="body2" className="descText">
                    {desc}
                </Typography>
            </Paper>
        </Grid>
    )

    const renderCardSection = () => (
        <Container maxWidth="xl">
            <Box mt={7} className="cardSection">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={6}
                >
                    {renderCard(
                        <InsuredIcon className="infoIcon" />,
                        'Bonded & Insured',
                        'ProFur coverage ensures protection and peace of mind '
                    )}
                    {renderCard(
                        <FirstAidIcon
                            className="infoIcon"
                            sx={{ mb: '5px' }}
                        />,
                        'Pet First Aid Certified',
                        'Our DogSafe certification assures pet first aid knowledge'
                    )}
                    {renderCard(
                        <UpdateIcon className="infoIcon" />,
                        'Daily PUPdates',
                        'Stay connected with multiple daily updates posted about your pup'
                    )}
                    {renderCard(
                        <PetIcon className="infoIcon" sx={{ mb: '5px' }} />,
                        '10+ yrs of Experience',
                        'We have extensive dog care experience from training to rescue'
                    )}
                </Grid>
            </Box>
        </Container>
    )

    return (
        <>
            <TopNav />
            <Header title="home" />
            {renderIntroSection()}
            {renderCardSection()}
            {renderBoardingSection()}
            <BottomNav />
        </>
    )
}

export default Home
