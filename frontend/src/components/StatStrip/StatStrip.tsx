import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useScrollReveal, scrollRevealVariants } from '../../utils/useScrollReveal'

interface IStatItem {
    icon: React.ReactNode
    label: string
    sublabel: string
}

interface IStatStripProps {
    items: IStatItem[]
}

function StatItem({ icon, label, sublabel }: IStatItem) {
    return (
        <Box className="statItem">
            <Box className="statIconCircle">{icon}</Box>
            <Typography variant="h5" className="statLabel">
                {label}
            </Typography>
            <Typography variant="body2" className="statSublabel">
                {sublabel}
            </Typography>
        </Box>
    )
}

function StatStrip({ items }: IStatStripProps) {
    const { ref, isInView } = useScrollReveal({ threshold: 0.1 })

    return (
        <Box className="statStrip" py={6}>
            <Container maxWidth="xl">
                <motion.div
                    ref={ref}
                    variants={scrollRevealVariants.fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    transition={{ duration: 0.5 }}
                >
                    <Grid container spacing={3} justifyContent="center">
                        {items.map((item, index) => (
                            <Grid item xs={6} md={3} key={item.label}>
                                <motion.div
                                    variants={scrollRevealVariants.fadeUp}
                                    initial="hidden"
                                    animate={isInView ? 'visible' : 'hidden'}
                                    transition={{ duration: 0.45, delay: index * 0.1 }}
                                >
                                    <StatItem {...item} />
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    )
}

export default StatStrip
