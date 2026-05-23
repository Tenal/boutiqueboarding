import React from 'react'
import {
    Box,
    Typography,
    Container,
    Divider,
    Grid,
    TextField,
    Button,
} from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Link } from 'react-router-dom'
import { ValidationError } from '@formspree/react'
import hook from './useBottomNav'

interface InternalLinkProps {
    to: string
    variant?: 'h5' | 'body1'
    children: React.ReactNode
}

function InternalLink({ to, variant = 'body1', children }: InternalLinkProps) {
    return (
        <Link to={to}>
            <Typography variant={variant} className="footerLinks">
                {children}
            </Typography>
        </Link>
    )
}

function BottomNav() {
    const {
        email,
        setEmail,
        message,
        setMessage,
        showSuccessMessage,
        errors,
        submitting,
        handleSubmit,
        currentYear,
    } = hook.useBottomNav()

    const renderLinks = () => (
        <Box mb={2}>
            <Link to="/" className="footerBrandLink">
                <Typography variant="h5" className="footerBrand">
                    Boutique Boarding
                </Typography>
            </Link>
            <InternalLink to="/about">About</InternalLink>
            <InternalLink to="/faqs">FAQs</InternalLink>
            <InternalLink to="/reviews">Reviews</InternalLink>
        </Box>
    )

    const renderContactInfo = () => (
        <Box mb={2}>
            <Typography variant="h5" className="footerSectionHeading">
                Get in Touch
            </Typography>
            <Box display="flex" alignItems="center" gap={0.75} mb={1}>
                <EmailOutlinedIcon className="footerContactIcon" />
                <Typography
                    component="a"
                    href="mailto:boutiqueboardingco@gmail.com"
                    className="footerContactItem"
                >
                    boutiqueboardingco@gmail.com
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.75} mb={1}>
                <InstagramIcon className="footerContactIcon" />
                <Typography
                    component="a"
                    href="https://instagram.com/boutiqueboarding?igshid=MmIzYWVlNDQ5Yg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footerContactItem"
                >
                    @boutiqueboarding
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.75}>
                <LocationOnOutlinedIcon className="footerContactIcon" />
                <Typography variant="body2" className="footerLocation">
                    Vaughan, Ontario
                </Typography>
            </Box>
        </Box>
    )

    const renderForm = () => {
        if (showSuccessMessage) {
            return (
                <Box mb={2} className="footerForm">
                    <Typography variant="h5" className="footerSectionHeading">
                        Contact Us
                    </Typography>
                    <Typography variant="body1" className="footerSuccessText">
                        Email received!
                    </Typography>
                    <Typography variant="body1" className="footerSuccessText">
                        We will respond within 24 hours.
                    </Typography>
                </Box>
            )
        }

        return (
            <Box mb={2} className="footerForm">
                <Typography variant="h5" className="footerSectionHeading">
                    Contact Us
                </Typography>
                <form onSubmit={handleSubmit} data-testid="contact-form">
                    <TextField
                        label="Email"
                        value={email ?? ''}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        variant="outlined"
                        color="primary"
                        className="footerInput"
                        required
                        size="small"
                        id="email"
                        name="email"
                    />
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={errors}
                    />
                    <TextField
                        label="Message"
                        value={message ?? ''}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        variant="outlined"
                        color="primary"
                        className="footerInput"
                        multiline
                        maxRows={5}
                        required
                        size="small"
                        id="message"
                        name="message"
                    />
                    <ValidationError
                        prefix="Message"
                        field="message"
                        errors={errors}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={submitting}
                        className="footerSubmitBtn"
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        )
    }

    return (
        <Box py={5} className="footer">
            <Container maxWidth="xl">
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        order={{ xs: 1, sm: 1, md: 1 }}
                    >
                        {renderLinks()}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        order={{ xs: 2, sm: 3, md: 2 }}
                    >
                        {renderContactInfo()}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        order={{ xs: 3, sm: 2, md: 3 }}
                    className="footerFormColumn"
                    >
                        {renderForm()}
                    </Grid>
                </Grid>
                <Divider className="footerDivider">
                    <Typography variant="body2" className="copyright">
                        {`© ${currentYear} Boutique Boarding. All rights reserved.`}
                    </Typography>
                </Divider>
            </Container>
        </Box>
    )
}

export default BottomNav
