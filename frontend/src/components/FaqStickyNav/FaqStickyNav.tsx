import React, { useEffect, useState } from 'react'
import { Box, Button, useMediaQuery } from '@mui/material'
import { motion } from 'framer-motion'

interface IFaqStickyNavProps {
    sections: { id: number; title: string; navLabel: string }[]
    onNavigate: (id: number) => void
}

function FaqStickyNav({ sections, onNavigate }: IFaqStickyNavProps) {
    const [activeSection, setActiveSection] = useState<number | null>(null)
    const isMobile = useMediaQuery('(max-width:850px)')

    useEffect(() => {
        const observers: IntersectionObserver[] = []

        sections.forEach(({ id }) => {
            const el = document.getElementById(`section-${id}`)
            if (!el) return

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id)
                    }
                },
                { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
            )
            observer.observe(el)
            observers.push(observer)
        })

        return () => observers.forEach((o) => o.disconnect())
    }, [sections])

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
