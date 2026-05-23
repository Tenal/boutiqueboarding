import React from 'react'
import { Box, Button } from '@mui/material'
import { motion } from 'framer-motion'
import useFaqStickyNav from './useFaqStickyNav'

interface IFaqStickyNavProps {
    sections: { id: number; title: string; navLabel: string }[]
    onNavigate: (id: number) => void
}

function FaqStickyNav({ sections, onNavigate }: IFaqStickyNavProps) {
    const { activeSection, isMobile } = useFaqStickyNav(sections)

    return (
        <motion.div
            className="faqStickyNav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
        >
            <Box className="faqStickyNavInner">
                {sections.map((section) => (
                    <Button
                        key={section.id}
                        onClick={() => onNavigate(section.id)}
                        className={`faqNavPill${activeSection === section.id ? ' faqNavPillActive' : ''}`}
                        size="small"
                        disableRipple
                    >
                        {isMobile ? section.navLabel : section.title}
                    </Button>
                ))}
            </Box>
        </motion.div>
    )
}

export default FaqStickyNav
