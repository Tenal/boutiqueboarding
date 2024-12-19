import React from 'react'
import { Container, Box, Grid, Button, Typography } from '@mui/material'
import InsuredIcon from '@mui/icons-material/GppGoodOutlined'
import FirstAidIcon from '@mui/icons-material/MedicalServicesOutlined'
import UpdateIcon from '@mui/icons-material/SecurityUpdateGoodOutlined'
import PetIcon from '@mui/icons-material/PetsOutlined'
import { Link } from 'react-router-dom'

import homeInfo from './homeInfo.json'
import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'
import InfoCard from '../../components/InfoCard/InfoCard'
import SingleAccordion from '../../components/SingleAccordion/SingleAccordion'

const cardData = [
    {
        icon: <InsuredIcon className="infoIcon" />,
        title: 'Bonded & Insured',
        description: 'ProFur coverage ensures protection and peace of mind',
    },
    {
        icon: <FirstAidIcon className="infoIcon" />,
        title: 'Pet First Aid Certified',
        description:
            'Our DogSafe certification assures pet first aid knowledge',
    },
    {
        icon: <UpdateIcon className="infoIcon" />,
        title: 'Daily PUPdates',
        description:
            'Stay connected with multiple daily updates posted about your pup',
    },
    {
        icon: <PetIcon className="infoIcon" />,
        title: '10+ yrs of Experience',
        description:
            'We have extensive dog care experience from training to rescue',
    },
]

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
                            <Button variant="contained" color="secondary">
                                Learn about us
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )

    const renderCardSection = () => (
        <Container maxWidth="xl">
            <Box mt={7} className="cardSection">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={{ xs: 2, sm: 4, md: 6 }}
                >
                    {cardData.map((card) => (
                        <InfoCard
                            key={card.title}
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                        />
                    ))}
                </Grid>
            </Box>
        </Container>
    )

    const renderBoardingSection = () => (
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
                            src="../../resources/tenal.jpg"
                            alt="Tenal sitting in a park with a dog"
                            loading="lazy"
                            className="tenalImage"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h1" sx={{ mb: 3 }}>
                            Board With Us
                        </Typography>
                        {homeInfo.map((faq) => (
                            <SingleAccordion
                                key={faq.title}
                                title={faq.title}
                                body={faq.body}
                            />
                        ))}
                        <Button
                            variant="contained"
                            color="primary"
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
