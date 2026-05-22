import React from 'react'
import { Container, Box, Grid, Typography, Chip } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { motion } from 'framer-motion'
import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'
import PageTransition from '../../components/PageTransition/PageTransition'
import {
    useScrollReveal,
    scrollRevealVariants,
} from '../../utils/useScrollReveal'

const credentials = [
    'Bonded & Insured',
    'Canine First Aid / CPR',
    'Oral & Injected Medication Administration',
    'Puppy → Senior Dog Experience',
    'Working Breed Experience',
    'Special Needs Dog Experience',
    'Behavioural Dog Experience',
    'Fully-fenced backyard',
]

function WhoWeAre() {
    return (
        <Box className="aboutSection" py={7}>
            <Container maxWidth="xl">
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                        <Typography
                            variant="overline"
                            className="aboutOverline"
                        >
                            Who we are
                        </Typography>
                        <Typography
                            variant="h2"
                            className="aboutSectionTitle"
                            sx={{ mb: 2 }}
                        >
                            Meet Tenal &amp; Ryan
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'var(--color-slate)',
                                lineHeight: 1.85,
                                mb: 2,
                            }}
                        >
                            Hi, I&apos;m Tenal! With extensive animal care
                            experience, including working as a dog trainer
                            and serving in various capacities within
                            shelters, grooming facilities, vet clinics, and
                            dog daycares, I&apos;ve gained valuable
                            expertise in caring for dogs of all sizes and
                            temperaments.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'var(--color-slate)',
                                lineHeight: 1.85,
                            }}
                        >
                            Rescue work has also been a consistent driving
                            force in my life; I have spent over a decade
                            fostering and volunteering with rescues, much of
                            that with my partner, Ryan. In fact, we recently
                            adopted our first rescue dog - Seth, a 2 year
                            old, 23lb potcake from the Bahamas. He is very
                            dog social, but reads social cues well and
                            respects the space of more dog-selective dogs
                            who prefer minimal interaction.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                        <Box className="aboutImageWrapper">
                            <img
                                src="/resources/tenalAndRyan.jpg"
                                alt="Tenal and Ryan with a dog"
                                loading="lazy"
                                className="aboutImage"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

function OperationsAndQualifications() {
    const { ref, isInView } = useScrollReveal({ threshold: 0.1 })

    return (
        <Box className="opsAndQualSection" py={7}>
            <Container maxWidth="xl">
                <div ref={ref}>
                    <Grid container spacing={8} alignItems="flex-start">
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="overline"
                                className="aboutOverline"
                            >
                                How we operate
                            </Typography>
                            <Typography
                                variant="h2"
                                className="aboutSectionTitle"
                                sx={{ mb: 3 }}
                            >
                                A genuine home away from home
                            </Typography>
                            <Box className="howWeOperateCard">
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'var(--color-slate)',
                                        lineHeight: 1.85,
                                        mb: 2,
                                    }}
                                >
                                    We offer boutique, in-home boarding for
                                    anyone looking for a &ldquo;home away from
                                    home&rdquo; alternative to kennels. To
                                    ensure each dog receives the attention they
                                    deserve, we typically only board one dog at
                                    a time, as we often have a foster dog in our
                                    home.
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'var(--color-slate)',
                                        lineHeight: 1.85,
                                    }}
                                >
                                    This allows us to prioritize individualized
                                    attention and focus on meeting every
                                    dog&apos;s mental and physical needs to
                                    ensure a balanced, fulfilled, and enriching
                                    environment. With the flexibility of being
                                    full-time work-from-home professionals, we
                                    can offer your furry family member
                                    structured care all day. Each of our home
                                    offices contains a crate to ensure every dog
                                    has a quiet place to decompress and sleep at
                                    night. We are based in a quiet neighbourhood
                                    in Vaughan, Ontario, with plenty of parks
                                    nearby that we frequent with the dogs.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="overline"
                                className="aboutOverline"
                            >
                                What we have
                            </Typography>
                            <Typography
                                variant="h2"
                                className="aboutSectionTitle"
                                sx={{ mb: 3 }}
                            >
                                Our qualifications
                            </Typography>
                            <Box className="credentialChips">
                                {credentials.map((cred, index) => (
                                    <motion.div
                                        key={cred}
                                        variants={scrollRevealVariants.fadeUp}
                                        initial="hidden"
                                        animate={
                                            isInView ? 'visible' : 'hidden'
                                        }
                                        transition={{
                                            duration: 0.35,
                                            delay: index * 0.07,
                                        }}
                                        style={{ display: 'inline-block' }}
                                    >
                                        <Chip
                                            icon={
                                                <CheckCircleOutlineIcon
                                                    sx={{
                                                        color: 'var(--color-primary) !important',
                                                        fontSize: 18,
                                                    }}
                                                />
                                            }
                                            label={cred}
                                            variant="outlined"
                                            color="primary"
                                            sx={{
                                                fontSize: '14px',
                                                height: '38px',
                                                px: 0.5,
                                                color: 'var(--color-ink)',
                                                borderColor:
                                                    'var(--color-primary)',
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </Box>
                            <Box mt={4}>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: 'var(--color-warm-stone)',
                                        display: 'block',
                                        mb: 2,
                                        letterSpacing: '0.12rem',
                                    }}
                                >
                                    Certified by
                                </Typography>
                                <Box
                                    display="flex"
                                    gap={4}
                                    alignItems="center"
                                    flexWrap="wrap"
                                >
                                    <img
                                        src="/resources/profur.jpg"
                                        alt="ProFur Insurance logo"
                                        loading="lazy"
                                        className="certLogo"
                                    />
                                    <img
                                        src="/resources/dogsafe.jpg"
                                        alt="DogSafe First Aid logo"
                                        loading="lazy"
                                        className="certLogo"
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </Box>
    )
}

function About() {
    return (
        <PageTransition>
            <TopNav />
            <Header title="About Us" />
            <WhoWeAre />
            <OperationsAndQualifications />
            <BottomNav />
        </PageTransition>
    )
}

export default About
