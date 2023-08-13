import React from 'react'
import {
    Container,
    Box,
    Grid,
    Typography,
    ImageList,
    ImageListItem,
} from '@mui/material'
import img1 from '../../resources/fosterIG/phoenix1.jpg'
import img2 from '../../resources/fosterIG/balta2.jpg'
import img3 from '../../resources/fosterIG/flaca2.jpg'
import img4 from '../../resources/fosterIG/odie1.jpg'
import img5 from '../../resources/fosterIG/aurelio2.jpg'
import img6 from '../../resources/fosterIG/balta1.jpg'
import img7 from '../../resources/fosterIG/phoenix2.jpg'
import img8 from '../../resources/fosterIG/odie2.jpg'
import img9 from '../../resources/fosterIG/flaca1.jpg'
// import images from './images.json' --- TODO: update image import to use JSON
import dogsafe from '../../resources/dogsafe.jpg'
import profur from '../../resources/profur.jpg'

import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'

function About() {
    const renderParagraphs = () => {
        return (
            <Grid
                item
                xs={12}
                lg={8}
                container
                direction="column"
                alignContent="flex-end"
            >
                <Typography sx={{ mb: 3 }}>
                    Hi, I’m Tenal! With extensive animal care experience,
                    including working as a dog trainer and serving in various
                    capacities within shelters, grooming facilities, vet
                    clinics, and dog daycares, I've gained valuable expertise in
                    caring for dogs of all sizes and temperaments. Rescue work
                    has also been a consistent driving force in my life; I have
                    spent nearly a decade fostering and volunteering with
                    rescues, much of that with my partner, Ryan.
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    We offer boutique, in-home boarding for anyone looking for a
                    "home away from home" alternative to kennels. To ensure each
                    dog receives the attention they deserve, we typically only
                    board one dog at a time, as we often have a foster dog in
                    our home. This allows us to prioritize individualized
                    attention and focus on meeting every dog's mental and
                    physical needs to ensure a balanced, fulfilled, and
                    enriching environment. With the flexibility of being
                    full-time work-from-home professionals, we can offer your
                    furry family member companionship and structured care all
                    day.
                </Typography>
            </Grid>
        )
    }

    const renderImageList = () => {
        const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9]
        return (
            <>
                <ImageList
                    sx={{ width: 300, height: 300 }}
                    cols={3}
                    // rowHeight={60}
                >
                    {images.map((item) => (
                        <ImageListItem key={item}>
                            <img
                                src={item as any}
                                srcSet={item as any}
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
            </>
        )
    }

    const renderListItem = (text: string) => {
        return (
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
    }

    const renderList = () => {
        return (
            <Grid
                item
                xs={12}
                md={6}
                container
                direction="column"
                sx={{
                    alignItems: { xs: 'center', md: 'flex-start' },
                    marginBottom: { xs: '15px', md: 'none' },
                }}
                wrap="nowrap"
            >
                <Box>
                    <ul>
                        {renderListItem('Bonded & Insured')}
                        {renderListItem('Canine First Aid/CPR')}
                        {renderListItem(
                            'Oral & Injected Medication Administration'
                        )}
                        {renderListItem('Puppy → Senior Dog Experience')}
                        {renderListItem('Working Breed Experience')}
                        {renderListItem('Special Needs Dog Experience')}
                    </ul>
                </Box>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ maxWidth: '350px' }}
                >
                    <img
                        src={profur as any}
                        alt="profur logo"
                        loading="lazy"
                        style={{ maxWidth: '150px', paddingLeft: 40 }}
                    />
                    <img
                        src={dogsafe as any}
                        alt="dogsafe logo"
                        loading="lazy"
                        style={{ maxWidth: '150px' }}
                    />
                </Grid>
            </Grid>
        )
    }

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
                        alignItems="center"
                        wrap="nowrap"
                    >
                        {renderParagraphs()}
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
                                    lg: 'flex',
                                },
                            }}
                        >
                            {renderImageList()}
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" wrap="nowrap">
                        {renderList()}
                        <Grid
                            item
                            xs={12}
                            md={4}
                            container
                            direction="column"
                            alignContent="center"
                            alignItems="center"
                            justifyContent="flex-start"
                            sx={{
                                ml: 3,
                                mr: 4,
                                display: {
                                    xs: 'none',
                                    sm: 'none',
                                    md: 'flex',
                                    lg: 'none',
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
                            display: { sm: 'flex', md: 'none' },
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
