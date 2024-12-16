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
        <Box mb={2} mr={4}>
            <InternalLink to="/" variant="h5">
                Boutique Boarding
            </InternalLink>
            <InternalLink to="/about">About</InternalLink>
            <InternalLink to="/faqs">FAQs</InternalLink>
            <InternalLink to="/reviews">Reviews</InternalLink>
            <Box mt={1} mb={2}>
                <a
                    href="https://instagram.com/boutiqueboarding?igshid=MmIzYWVlNDQ5Yg=="
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <InstagramIcon className="footerLinks" />
                </a>
            </Box>
        </Box>
    )

    const renderForm = () => {
        if (showSuccessMessage) {
            return (
                <Box mb={2} className="footerForm">
                    <Typography variant="h5">Contact Us</Typography>
                    <Typography variant="body1">Email received!</Typography>
                    <Typography variant="body1">
                        We will respond within 24 hours.
                    </Typography>
                </Box>
            )
        }

        return (
            <Box mb={2} className="footerForm">
                <Typography variant="h5">Contact Us</Typography>
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
                        sx={{ mt: 1 }}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        )
    }

    return (
        <Box py={3} className="footer" mt={5}>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between">
                    {renderLinks()}
                    {renderForm()}
                </Grid>
                <Divider>
                    <Typography variant="body2" className="copyright">
                        ©{currentYear} Boutique Boarding. All rights reserved.
                    </Typography>
                </Divider>
            </Container>
        </Box>
    )
}

export default BottomNav
