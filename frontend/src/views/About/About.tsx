import React from 'react'
import {
    Container,
    Box,
    Grid,
    Typography,
    ImageList,
    ImageListItem,
} from '@mui/material'
// TODO import images from './images.json' --- update image import to use JSON

import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import Tabs from './Tabs'
import BottomNav from '../../components/BottomNav/BottomNav'

function About() {
    const renderTabs = () => (
        <Tabs
            tabOneTitle="who we are"
            tabTwoTitle="what we offer"
            tabThreeTitle="what we have"
            tabOneDesc="Hi, I'm Tenal! With extensive animal care
                            experience, including working as a dog trainer and
                            serving in various capacities within shelters,
                            grooming facilities, vet clinics, and dog daycares,
                            I've gained valuable expertise in caring for
                            dogs of all sizes and temperaments. Rescue work has
                            also been a consistent driving force in my life; I
                            have spent nearly a decade fostering and
                            volunteering with rescues, much of that with my
                            partner, Ryan."
            tabTwoDesc="We offer boutique, in-home boarding for anyone
                            looking for a &ldquo;home away from home&rdquo;
                            alternative to kennels. To ensure each dog receives
                            the attention they deserve, we typically only board
                            one dog at a time, as we often have a foster dog in
                            our home. This allows us to prioritize
                            individualized attention and focus on meeting every
                            dog's mental and physical needs to ensure a
                            balanced, fulfilled, and enriching environment. With
                            the flexibility of being full-time work-from-home
                            professionals, we can offer your furry family member
                            companionship and structured care all day."
            tabThreeDesc={renderList()}
        />
    )

    const renderInsuranceLogos = () => (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ maxWidth: '240px', mt: 1 }}
        >
            <img
                src={require('../../resources/profur.jpg')}
                alt="profur logo"
                loading="lazy"
                style={{ maxWidth: '105px' }}
            />
            <img
                src={require('../../resources/dogsafe.jpg')}
                alt="dogsafe logo"
                loading="lazy"
                style={{ maxWidth: '105px' }}
            />
        </Grid>
    )

    const renderImageList = () => {
        const images = [
            'phoenix1',
            'balta2',
            'flaca2',
            'odie1',
            'aurelio2',
            'balta1',
            'phoenix2',
            'odie2',
            'flaca1',
        ]
        return (
            <>
                <ImageList
                    sx={{ width: 240, height: 240, mt: 0, mb: 1 }}
                    cols={3}
                >
                    {images.map((img) => (
                        <ImageListItem key={img}>
                            <img
                                src={require(`../../resources/fosterIG/${img}.jpg`)}
                                srcSet={require(`../../resources/fosterIG/${img}.jpg`)}
                                alt="dog"
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                <Typography
                    variant="body2"
                    display="block"
                    style={{ fontSize: '11px' }}
                >
                    Follow our foster journey:{' '}
                    <a
                        className="links"
                        href="https://instagram.com/furry_foster_fam?igshid=OGQ5ZDc2ODk2ZA=="
                    >
                        @furry_foster_fam
                    </a>
                </Typography>
                {renderInsuranceLogos()}
            </>
        )
    }

    const renderListItem = (text: string) => (
        <li key={text}>
            <Grid
                container
                direction="row"
                wrap="nowrap"
                alignItems="center"
                sx={{ marginTop: '5px' }}
            >
                ✓
                <Box ml={1}>
                    <Typography className="noMargins">{text}</Typography>
                </Box>
            </Grid>
        </li>
    )

    const renderList = () => (
        <Grid container>
            <Grid item xs={12} md={6}>
                <ul className="noMargins noPadding">
                    {renderListItem('Bonded & Insured')}
                    {renderListItem('Canine First Aid/CPR')}
                    {renderListItem(
                        'Oral & Injected Medication Administration'
                    )}
                </ul>
            </Grid>
            <Grid item xs={12} md={6}>
                <ul className="noMargins noPadding">
                    {renderListItem('Puppy → Senior Dog Experience')}
                    {renderListItem('Working Breed Experience')}
                    {renderListItem('Special Needs Dog Experience')}
                </ul>
            </Grid>
        </Grid>
    )

    return (
        <>
            <TopNav />
            <Header title="About Us" />
            <Container maxWidth="xl">
                <Box my={10}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}
                        wrap="nowrap"
                    >
                        {renderTabs()}
                        <Grid
                            item
                            xs={12}
                            md={4}
                            container
                            direction="column"
                            alignContent="center"
                            alignItems="center"
                            sx={{
                                ml: { md: 6, lg: 2 },
                                display: {
                                    xs: 'none',
                                    sm: 'flex',
                                },
                            }}
                        >
                            {renderImageList()}
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        alignContent="center"
                        alignItems="center"
                        sx={{
                            mt: 4,
                            display: { xs: 'flex', sm: 'none' },
                        }}
                    >
                        {renderImageList()}
                    </Grid>
                </Box>
            </Container>
            <BottomNav />
        </>
    )
}

export default About
