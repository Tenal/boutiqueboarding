import React, { useState } from 'react'
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
import { useForm, ValidationError } from '@formspree/react'

function BottomNav() {
    const [email, setEmail] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [state, handleSubmit] = useForm('xvojkykg')
    const currentYear = new Date().getFullYear()

    // TODO update form emailing mechanism, replace formspree
    // const handleSubmit = async (
    //     e: React.FormEvent<HTMLFormElement>
    // ): Promise<void> => {
    //     e.preventDefault()
    //     const formData = {
    //         email,
    //         message,
    //     }
    //     try {
    //         await axios.post('/send-email', formData)
    //         alert('Email sent successfully!')
    //     } catch (error) {
    //         console.error('Error sending email:', error)
    //     }
    // }

    const renderLinks = () => {
        return (
            <Box mb={2} mr={4}>
                <Link to="/">
                    <Typography variant="h5" className="footerLinks">
                        Boutique Boarding
                    </Typography>
                </Link>
                <Link to="/about">
                    <Typography variant="body1" className="footerLinks">
                        About
                    </Typography>
                </Link>
                <Link to="/faqs">
                    <Typography variant="body1" className="footerLinks">
                        FAQs
                    </Typography>
                </Link>
                <Link to="/reviews">
                    <Typography variant="body1" className="footerLinks">
                        Reviews
                    </Typography>
                </Link>
                <Box mt={3} mb={2}>
                    <Link to="https://instagram.com/boutiqueboarding?igshid=MmIzYWVlNDQ5Yg==">
                        <InstagramIcon className="footerLinks" />
                    </Link>
                </Box>
            </Box>
        )
    }

    const renderForm = () => {
        if (state.succeeded) {
            return (
                <Box mb={2} className="footerForm">
                    <Typography variant="h5">Contact Us</Typography>
                    <Typography variant="body1">
                        Email received! We'll respond within 24 hours.
                    </Typography>
                </Box>
            )
        }

        return (
            <Box mb={2} className="footerForm">
                <Typography variant="h5">Contact Us</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        value={email ?? ''}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        type="text"
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
                        errors={state.errors}
                    />
                    <TextField
                        label="Message"
                        value={message ?? ''}
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}
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
                        errors={state.errors}
                    />
                    <Button
                        color="secondary"
                        type="submit"
                        disabled={state.submitting}
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
