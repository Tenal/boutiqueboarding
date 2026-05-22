import React from 'react'
import { Box, Typography, Container, Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import hook, { IUseHeaderProps } from './useHeader'

function Header({ title }: IUseHeaderProps) {
    const { isHome, currentImageClass, isLargeImageLoaded } = hook.useHeader({
        title,
    })

    if (isHome) {
        return (
            <Box
                className={`header headerHome ${currentImageClass} ${
                    isLargeImageLoaded ? 'largeLoaded' : 'smallLoaded'
                }`}
            >
                <Container maxWidth="xl">
                    <Box className="heroContent">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.4 }}
                        >
                            <Typography variant="h1" className="heroHeadline">
                                A home away from home
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Typography
                                variant="body1"
                                className="heroSubheadline"
                            >
                                Unleash your peace of mind with our trusted and
                                experienced in-home dog boarding
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.8 }}
                        >
                            <Box className="heroCtas">
                                <Button
                                    component="a"
                                    href="mailto:boutiqueboardingco@gmail.com"
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                >
                                    Email to Book
                                </Button>
                                <Button
                                    component={Link}
                                    to="/about"
                                    variant="outlined"
                                    size="large"
                                    className="heroOutlinedBtn"
                                >
                                    Learn About Us
                                </Button>
                            </Box>
                        </motion.div>
                    </Box>
                </Container>
                <motion.div
                    className="heroChevron"
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.8,
                        ease: 'easeInOut',
                    }}
                >
                    <KeyboardArrowDownIcon className="heroChevronIcon" />
                </motion.div>
            </Box>
        )
    }

    return (
        <Box
            py={10}
            className={`header ${title
                .replace(/\s+/g, '')
                .toLowerCase()}Image ${currentImageClass} ${
                isLargeImageLoaded ? 'largeLoaded' : 'smallLoaded'
            }`}
        >
            <Container maxWidth="xl">
                <Typography variant="h1" className="innerPageTitle">
                    {title}
                </Typography>
            </Container>
        </Box>
    )
}

export default Header
