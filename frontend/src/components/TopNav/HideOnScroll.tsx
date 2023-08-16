import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';

import TopNav from './TopNav';

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function HideAppBar(props: Props) {
    return (
    <>
        <CssBaseline />
        <HideOnScroll {...props}>
            <TopNav />
        </HideOnScroll>
        <Toolbar />
        <Container>
            {/* view goes here */}
        </Container>
    </>
    );
}