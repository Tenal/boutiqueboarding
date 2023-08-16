import React, { useState, useEffect, useRef } from 'react'
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { Link } from 'react-router-dom'
// @ts-ignore
import logo from '../../resources/logo.png'

function TopNav() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const iconButtonRef = useRef<HTMLButtonElement | null>(null)

    const pages = ['About', 'FAQs', 'Reviews']
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

    const handleToggleTooltip = () => {
        setTooltipOpen(true)
        setTimeout(() => {
            setTooltipOpen(false)
        }, 600)
    }

    const handleDocumentClick = (event: MouseEvent) => {
        if (
            iconButtonRef.current &&
            iconButtonRef.current.contains(event.target as Node)
        ) {
            return
        }
        setTooltipOpen(false)
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick)

        return () => {
            document.removeEventListener('click', handleDocumentClick)
        }
    }, [])

    return (
        <AppBar position="static" style={{ position: 'relative', zIndex: 10 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters className="topNav">
                    {/* left | med screens: logo pic & text */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <img
                            src={logo}
                            alt="cartoon dog smiling inside a cozy house"
                            className="logoImage"
                        />
                    </Box>
                    <Link to="/">
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                            className="logoText"
                        >
                            Boutique Boarding
                        </Typography>
                    </Link>

                    {/* left | small screens: ham menu + menu items */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Link
                                        key={page}
                                        to={`/${page.toLowerCase()}`}
                                        onClick={handleCloseNavMenu}
                                        style={{
                                            display: 'block',
                                            textDecoration: 'none',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography>{page}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* center | small screens: logo pic & text */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                        <img
                            src={logo}
                            alt="cartoon dog smiling inside a cozy house"
                            className="logoImage"
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                        }}
                        className="logoText"
                    >
                        <Link to="/"> Boutique Boarding </Link>
                    </Typography>

                    {/* right | med screens: menu items */}
                    <Box
                        mr={2}
                        sx={{
                            flexGrow: 1,
                            justifyContent: 'flex-end',
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <Button key={page}>
                                <Link
                                    to={`/${page.toLowerCase()}`}
                                    onClick={handleCloseNavMenu}
                                    className="navLinks"
                                >
                                    <Typography>{page}</Typography>
                                </Link>
                            </Button>
                        ))}
                    </Box>

                    {/* right | all screens: profile pic + options */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip
                            title="Feature coming soon!"
                            arrow
                            open={tooltipOpen}
                            onClose={() => setTooltipOpen(false)}
                        >
                            <IconButton
                                // onClick={handleOpenUserMenu}
                                onMouseEnter={() => setTooltipOpen(true)}
                                onClick={handleToggleTooltip}
                                className="account"
                                ref={iconButtonRef}
                            >
                                <PersonOutlineOutlinedIcon />
                                {/* <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                /> -- for when user is logged in*/}
                            </IconButton>
                        </Tooltip>
                        {/* <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu> */}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default TopNav
