import React from 'react'
import {
    AppBar,
    Box,
    Toolbar,
    Grid,
    Typography,
    Tooltip,
    Slide,
    Backdrop,
    IconButton,
} from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { Link } from 'react-router-dom'
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

    const accountIcon = (
        <Tooltip title="Feature coming soon!" arrow>
            <IconButton color="inherit" className="accountIcon">
                <PersonOutlineOutlinedIcon />
            </IconButton>
        </Tooltip>
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
            <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
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
                    <Box sx={{ flexGrow: 1 }} />

                    {!isSmallScreen && (
                        <Box className="navLinks">
                            {pages.map((page) => (
                                <Link
                                    key={page}
                                    to={`/${page.toLowerCase()}`}
                                    className="navLink"
                                >
                                    <Typography>{page}</Typography>
                                </Link>
                            ))}
                            {accountIcon}
                        </Box>
                    )}

                    {isSmallScreen && smallScreenToggle}
                </Toolbar>
            </AppBar>

            {/* Menu for small screens */}
            <Slide direction="down" in={menuOpen} mountOnEnter unmountOnExit>
                <Box
                    sx={{
                        top: theme.mixins.toolbar.minHeight,
                        height: { xs: '50vh', sm: '45vh' },
                        opacity: menuOpen ? 1 : 0,
                    }}
                    className="navMenu"
                >
                    {pages.map((page) => (
                        <Link key={page} to={`/${page.toLowerCase()}`}>
                            <Typography className="menuLinks">
                                {page}
                            </Typography>
                        </Link>
                    ))}
                    {accountIcon}
                </Box>
            </Slide>
            {menuOpen && (
                <Backdrop
                    open={menuOpen}
                    onClick={handleCloseMenu}
                    sx={{ zIndex: theme.zIndex.drawer - 1 }}
                    data-testid="menu-backdrop"
                />
            )}
        </>
    )
}

export default TopNav
