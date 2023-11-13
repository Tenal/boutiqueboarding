import React from 'react'
import { Paper, Grid, Typography, Box } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import LocationIcon from '@mui/icons-material/FmdGoodOutlined'
import PolicyIcon from '@mui/icons-material/PolicyOutlined'
import ChatIcon from '@mui/icons-material/ChatOutlined'

type IIcons = {
    [key in number]: JSX.Element
}

function SectionHeaders() {
    const icons: IIcons = {
        1: <PetsIcon className="infoIcon" sx={{ pb: '0.5px' }} />,
        2: <LocationIcon className="infoIcon" />,
        3: <PolicyIcon className="infoIcon" />,
        4: <ChatIcon className="infoIcon" />,
    }

    const sectionHeadings: { [key: number]: string } = {
        1: 'Care & Daily Activities',
        2: 'Booking Details & Location',
        3: 'Policies & Preparation',
        4: 'Communication & Updates',
    }

    const scrollToSection = (section: string) => {
        const sectionElement = document.getElementById(`section-${section}`)
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <Box pb={3} mt={2} className="faqCardSection">
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
                spacing={{ xs: 4, lg: 8 }}
            >
                {Object.entries(sectionHeadings).map(([section, heading]) => (
                    <Grid
                        item
                        key={section}
                        xs={6}
                        sm={3}
                        container
                        justifyContent="center"
                        alignItems="stretch"
                    >
                        <Paper
                            className="faqInfoCard"
                            sx={{ p: { xs: 1, md: 3 } }}
                            onClick={() => scrollToSection(section)}
                        >
                            <div className="iconCircleOutline">
                                {icons[parseInt(section)]}
                            </div>
                            <Typography
                                variant="h4"
                                sx={{ mt: 4 }}
                                className="titleText"
                            >
                                {heading}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default SectionHeaders
