import React from 'react'
import { AppBar, Box, Toolbar, Grid, Typography, Button } from '@mui/material'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../../resources/logo.png'
import hook from './useTopNav'

function TopNav() {
    const {
        menuOpen,
        isSmallScreen,
        pages,
        theme,
        handleMenuToggle,
        handleCloseMenu,
        handleMenuKeyDown,
    } = hook.useTopNav()

    const bookNowButton = (
        <Button
            component="a"
            href="mailto:boutiqueboardingco@gmail.com"
            variant="contained"
            color="secondary"
            size="small"
            className="bookNowBtn"
        >
            Book Now
        </Button>
    )

    const smallScreenToggle = (
        <div
            className="menuToggle"
            onClick={handleMenuToggle}
            role="button"
            aria-label="menu"
            tabIndex={0}
            onKeyDown={handleMenuKeyDown}
        >
            <span className={`bar ${menuOpen ? 'x' : ''}`} />
            <span className={`bar ${menuOpen ? 'x' : ''}`} />
            <span className={`bar ${menuOpen ? 'x' : ''}`} />
        </div>
    )

    return (
        <>
            <AppBar
                position="fixed"
                className="appBar"
            >
                <Toolbar className="topNav">
                    <Link to="/">
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            wrap="nowrap"
                        >
                            <Box className="logoBox">
                                <img
                                    src={logo}
                                    alt="cartoon dog smiling inside a cozy house"
                                    className="logoImage"
                                />
                            </Box>
                            <Typography
                                variant="h6"
                                noWrap
                                className="logoText"
                            >
                                Boutique Boarding
                            </Typography>
                        </Grid>
                    </Link>
                    <Box className="navSpacer" />

                    {!isSmallScreen && (
                        <Box className="navLinks">
                            {pages.map((page) => (
                                <NavLink
                                    key={page}
                                    to={`/${page.toLowerCase()}`}
                                    className={({ isActive }) =>
                                        `navLink${isActive ? ' navLinkActive' : ''}`
                                    }
                                >
                                    <Typography>{page}</Typography>
                                </NavLink>
                            ))}
                            {bookNowButton}
                        </Box>
                    )}

                    {isSmallScreen && smallScreenToggle}
                </Toolbar>
            </AppBar>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="navMenu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{ top: theme.mixins.toolbar.minHeight }}
                    >
                        {pages.map((page) => (
                            <NavLink
                                key={page}
                                to={`/${page.toLowerCase()}`}
                                onClick={handleCloseMenu}
                                className={({ isActive }) =>
                                    `menuNavLink${isActive ? ' menuNavLinkActive' : ''}`
                                }
                            >
                                <Typography className="menuLinks">
                                    {page}
                                </Typography>
                            </NavLink>
                        ))}
                        <Button
                            component="a"
                            href="mailto:boutiqueboardingco@gmail.com"
                            variant="contained"
                            color="secondary"
                            onClick={handleCloseMenu}
                            className="bookNowBtnMobile"
                        >
                            Book Now
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="navBackdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleCloseMenu}
                        data-testid="menu-backdrop"
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default TopNav
