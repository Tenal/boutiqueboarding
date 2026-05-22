import React from 'react'
import { Container, Box, Grid, Button, Typography } from '@mui/material'
import InsuredIcon from '@mui/icons-material/GppGoodOutlined'
import FirstAidIcon from '@mui/icons-material/MedicalServicesOutlined'
import UpdateIcon from '@mui/icons-material/CameraAltOutlined'
import PetIcon from '@mui/icons-material/PetsOutlined'
import AttachMoneyIcon from '@mui/icons-material/AttachMoneyOutlined'
import LocationOnIcon from '@mui/icons-material/LocationOnOutlined'
import GroupsIcon from '@mui/icons-material/GroupsOutlined'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonthOutlined'
import StarIcon from '@mui/icons-material/Star'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import currentReviews from '../Reviews/currentReviews.json'
import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'
import StatStrip from '../../components/StatStrip/StatStrip'
import BoardingDetailCard from '../../components/BoardingDetailCard/BoardingDetailCard'
import CompactReview from '../../components/CompactReview/CompactReview'
import InstagramFeed from '../../components/InstagramFeed/InstagramFeed'
import PageTransition from '../../components/PageTransition/PageTransition'
import {
    useScrollReveal,
    scrollRevealVariants,
} from '../../utils/useScrollReveal'
const tenalImg = '/resources/tenal.jpg'

const statItems = [
    {
        icon: <InsuredIcon />,
        label: 'Bonded & Insured',
        sublabel: 'ProFur certified coverage',
    },
    {
        icon: <FirstAidIcon />,
        label: 'Pet First Aid Certified',
        sublabel: 'DogSafe certification',
    },
    {
        icon: <UpdateIcon />,
        label: 'Daily PUPdates',
        sublabel: 'Multiple updates each day',
    },
    {
        icon: <PetIcon />,
        label: '13+ Years Experience',
        sublabel: 'Training, rescue & special needs',
    },
]

const boardingDetails = [
    {
        icon: <AttachMoneyIcon />,
        label: 'Nightly Rate',
        value: '$95 / night',
        subtext: 'Holiday rate applies on select dates',
    },
    {
        icon: <LocationOnIcon />,
        label: 'Location',
        value: 'Vaughan, Ontario',
        subtext: 'House with a fully-fenced backyard',
    },
    {
        icon: <GroupsIcon />,
        label: 'Capacity',
        value: 'Max 2 dogs',
        subtext: 'Typically one boarding & one foster dog',
    },
    {
        icon: <CalendarMonthIcon />,
        label: 'Booking',
        value: 'Email to confirm',
        subtext: 'We only book up to 2 months in advance',
    },
]

const featuredDogs = ['loki', 'dakota', 'louis']
const featuredReviews = featuredDogs
    .map((dog) => currentReviews.find((r) => r.dog === dog))
    .filter((r): r is (typeof currentReviews)[number] => r !== undefined)

function AboutPreview() {
    return (
        <Box className="aboutPreviewSection" py={8}>
            <Container maxWidth="xl">
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box className="aboutPreviewImageWrapper">
                            <img
                                src={tenalImg}
                                alt="Tenal sitting in a park with a dog"
                                loading="lazy"
                                className="aboutPreviewImage"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="overline"
                            className="sectionOverline"
                        >
                            Who we are
                        </Typography>
                        <Typography
                            variant="h2"
                            className="sectionTitle"
                            sx={{ mb: 2 }}
                        >
                            A boutique experience for your pup
                        </Typography>
                        <Typography
                            variant="body1"
                            className="aboutPreviewText"
                            sx={{ mb: 3 }}
                        >
                            We offer boutique in-home boarding with a
                            genuine passion for rescue and a wealth of
                            animal care experience. From training to
                            fostering dogs with behavioural challenges, we
                            prioritize individualized attention and
                            breed-specific fulfilment.
                        </Typography>
                        <Link to="/about" className="plainLink">
                            <Button variant="outlined" color="primary" className="aboutPreviewBtn">
                                Meet Tenal & Ryan →
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

function BoardingDetails() {
    const { ref, isInView } = useScrollReveal({ threshold: 0.1 })

    return (
        <Box className="boardingDetailsSection" py={8}>
            <Container maxWidth="xl">
                <div ref={ref}>
                    <Box textAlign="center" mb={5}>
                        <Typography
                            variant="overline"
                            className="sectionOverline"
                        >
                            Board With Us
                        </Typography>
                        <Typography variant="h2" className="sectionTitle">
                            Everything you need to know
                        </Typography>
                    </Box>
                    <Grid container spacing={3}>
                        {boardingDetails.map((detail, index) => (
                            <Grid item xs={12} sm={6} md={3} key={detail.label}>
                                <motion.div
                                    variants={scrollRevealVariants.fadeUp}
                                    initial="hidden"
                                    animate={isInView ? 'visible' : 'hidden'}
                                    transition={{
                                        duration: 0.45,
                                        delay: index * 0.08,
                                    }}
                                    style={{ height: '100%' }}
                                >
                                    <BoardingDetailCard {...detail} />
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                    <Box textAlign="center" mt={5}>
                        <Button
                            component="a"
                            href="mailto:boutiqueboardingco@gmail.com"
                            variant="contained"
                            color="secondary"
                            sx={{ px: 5 }}
                        >
                            Email to Book Your Spot
                        </Button>
                        <Typography
                            variant="caption"
                            className="bookEmailCaption"
                            sx={{ mt: 1 }}
                        >
                            boutiqueboardingco@gmail.com
                        </Typography>
                    </Box>
                </div>
            </Container>
        </Box>
    )
}

function FeaturedReviews() {
    const { ref, isInView } = useScrollReveal({ threshold: 0.1 })

    return (
        <Box className="featuredReviewsSection" py={8}>
            <Container maxWidth="xl">
                <div ref={ref}>
                    <Box textAlign="center" mb={1}>
                        <Box className="featuredReviewStars" mb={1}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                    key={star}
                                    className="featuredReviewStar"
                                />
                            ))}
                        </Box>
                        <Typography
                            variant="overline"
                            className="sectionOverline"
                        >
                            Client Reviews
                        </Typography>
                        <Typography variant="h2" className="sectionTitle">
                            What our clients say
                        </Typography>
                    </Box>

                    <Grid container spacing={3} mt={2}>
                        {featuredReviews.map((review, index) => (
                            <Grid item xs={12} md={4} key={review.dog}>
                                <motion.div
                                    variants={scrollRevealVariants.fadeUp}
                                    initial="hidden"
                                    animate={isInView ? 'visible' : 'hidden'}
                                    transition={{
                                        duration: 0.45,
                                        delay: index * 0.1,
                                    }}
                                    style={{ height: '100%' }}
                                >
                                    <CompactReview
                                        review={review.review}
                                        name={review.name}
                                        dog={review.dog}
                                        stars={review.stars}
                                    />
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>

                    <Box textAlign="center" mt={4}>
                        <Link to="/reviews" className="plainLink">
                            <Button variant="outlined" color="primary" className="seeAllReviewsBtn">
                                See all reviews →
                            </Button>
                        </Link>
                    </Box>
                </div>
            </Container>
        </Box>
    )
}

function Home() {
    return (
        <PageTransition>
            <TopNav />
            <Header title="home" />
            <StatStrip items={statItems} />
            <AboutPreview />
            <BoardingDetails />
            <FeaturedReviews />
            <InstagramFeed />
            <BottomNav />
        </PageTransition>
    )
}

export default Home
