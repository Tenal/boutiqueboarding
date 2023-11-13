import React from 'react'
import {
    Container,
    Box,
    Grid,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// TODO import images from './images.json' --- update image import to use JSON

import TopNav from '../../components/TopNav/TopNav'
import Header from '../../components/Header/Header'
import BottomNav from '../../components/BottomNav/BottomNav'

function About() {
    // const renderImageList = () => {
    //     const images = [
    //         'phoenix1',
    //         'balta2',
    //         'flaca2',
    //         'odie1',
    //         'aurelio2',
    //         'balta1',
    //         'phoenix2',
    //         'odie2',
    //         'flaca1',
    //     ]
    //     return (
    //         <>
    //             <ImageList
    //                 sx={{ width: 240, height: 240, mt: 0, mb: 1 }}
    //                 cols={3}
    //             >
    //                 {images.map((img) => (
    //                     <ImageListItem key={img}>
    //                         <img
    //                             src={require(`../../resources/fosterIG/${img}.jpg`)}
    //                             srcSet={require(`../../resources/fosterIG/${img}.jpg`)}
    //                             alt="dog"
    //                             loading="lazy"
    //                         />
    //                     </ImageListItem>
    //                 ))}
    //             </ImageList>
    //             <Typography
    //                 variant="body2"
    //                 display="block"
    //                 style={{ fontSize: '11px' }}
    //             >
    //                 Follow our foster journey:{' '}
    //                 <a
    //                     className="links"
    //                     href="https://instagram.com/furry_foster_fam?igshid=OGQ5ZDc2ODk2ZA=="
    //                 >
    //                     @furry_foster_fam
    //                 </a>
    //             </Typography>
    //             {renderInsuranceLogos()}
    //         </>
    //     )
    // }

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
            <Grid item xs={12}>
                <ul className="noMargins noPadding">
                    {renderListItem('Bonded & Insured')}
                    {renderListItem('Canine First Aid/CPR')}
                    {renderListItem(
                        'Oral & Injected Medication Administration'
                    )}
                    {renderListItem('Puppy → Senior Dog Experience')}
                    {renderListItem('Working Breed Experience')}
                    {renderListItem('Special Needs Dog Experience')}
                </ul>
            </Grid>
            <Grid item xs={12}>
                {renderInsuranceLogos()}
            </Grid>
        </Grid>
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

    const renderAboutSection = () => {
        const info = [
            {
                title: 'Who we are',
                body: "Hi, I'm Tenal! With extensive animal care experience, including working as a dog trainer and serving in various capacities within shelters, grooming facilities, vet clinics, and dog daycares, I've gained valuable expertise in caring for dogs of all sizes and temperaments. Rescue work has also been a consistent driving force in my life; I have spent nearly a decade fostering and volunteering with rescues, much of that with my partner, Ryan.",
            },
            {
                title: 'What we offer',
                body: 'We offer boutique, in-home boarding for anyone looking for a "home away from home" alternative to kennels. To ensure each dog receives the attention they deserve, we typically only board one dog at a time, as we often have a foster dog in our home. This allows us to prioritize individualized attention and focus on meeting every dog\'s mental and physical needs to ensure a balanced, fulfilled, and enriching environment. With the flexibility of being full-time work-from-home professionals, we can offer your furry family member companionship and structured care all day.',
            },
            {
                title: 'What we have',
                body: renderList(),
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
                                src={require('../../resources/tenalAndRyan.jpg')}
                                alt="Tenal sitting in a park with a dog"
                                loading="lazy"
                                className="tenalImage"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h1" sx={{ mb: 3 }}>
                                Tenal & Ryan
                            </Typography>
                            {info.map((faq) =>
                                singleAccordion(faq.title, faq.body)
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        )
    }

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
