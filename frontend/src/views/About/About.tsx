import React from 'react'
import { Container, Box, Grid, Typography } from '@mui/material'
import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'
import aboutInfo from './aboutInfo.json'
import SingleAccordion from '../../components/SingleAccordion/SingleAccordion' // Updated import path

function About() {
    const renderListItem = (text: string) => (
        <li key={`list-item-${text}`} className="listItem ">
            <Grid
                container
                direction="row"
                alignItems="center"
                wrap="nowrap"
                sx={{ mt: '5px' }}
            >
                <Typography variant="body1" className="noMargins">
                    ✓
                </Typography>
                <Box ml={1}>
                    <Typography variant="body1" className="noMargins">
                        {text}
                    </Typography>
                </Box>
            </Grid>
        </li>
    )

    const renderList = (items: string[]) => (
        <ul className="noMargins noPadding">
            {items.map((item) => renderListItem(item))}
        </ul>
    )

    const renderInsuranceLogos = () => (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ maxWidth: '240px', mt: 2 }}
        >
            <img
                src="/resources/profur.jpg"
                alt="Profur logo"
                loading="lazy"
                className="logoWidth"
            />
            <img
                src="/resources/dogsafe.jpg"
                alt="DogSafe logo"
                loading="lazy"
                className="logoWidth"
            />
        </Grid>
    )

    const renderAboutSection = () => (
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
                            src="/resources/tenalAndRyan.jpg"
                            alt="Tenal sitting in a park with a dog"
                            loading="lazy"
                            className="tenalImage"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h1" gutterBottom>
                            Tenal & Ryan
                        </Typography>
                        {aboutInfo.map((item) => (
                            <SingleAccordion
                                key={item.title}
                                title={item.title}
                                body={
                                    item.title === 'What we have' ? (
                                        <>
                                            {renderList(item.body as string[])}
                                            {renderInsuranceLogos()}
                                        </>
                                    ) : (
                                        item.body
                                    )
                                }
                            />
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )

    return (
        <>
            <TopNav />
            <Header title="About Us" />
            {renderAboutSection()}
            <BottomNav />
        </>
    )
}

export default About
