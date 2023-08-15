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

function BottomNav() {
    const [email, setEmail] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const currentYear = new Date().getFullYear()

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
        return (
            <Box mb={2} className="footerForm">
                <Typography variant="h5">Contact Us</Typography>
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
                />
                <Button color="secondary">Submit</Button>
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
