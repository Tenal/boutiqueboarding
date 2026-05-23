import { useMemo, useCallback, useRef, useState, useEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import currentFaqs from './currentFaqs.json'
import { scrollToSection } from '../../utils/generalHelper'

export interface IFaq {
    section: number
    question: string
    answer: string
}

interface IGroupedFaqs {
    [key: number]: IFaq[]
}

interface ISection {
    id: number
    title: string
    navLabel: string
    iconName: string
    description?: string
}

const useFaqs = () => {
    const isNarrow = useMediaQuery('(max-width:750px)')
    const cardSectionRef = useRef<HTMLDivElement>(null)
    const [showStickyNav, setShowStickyNav] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (!cardSectionRef.current) return
            setShowStickyNav(cardSectionRef.current.getBoundingClientRect().bottom < 56)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleScrollToFaqSection = useCallback((sectionId: number) => {
        scrollToSection(sectionId)
    }, [])

    const groupFaqsBySection = (faqs: IFaq[]): IGroupedFaqs =>
        faqs.reduce((grouped: IGroupedFaqs, faq: IFaq) => {
            const { section } = faq
            if (!grouped[section]) {
                grouped[section] = []
            }
            grouped[section].push(faq)
            return grouped
        }, {})

    const faqsGroupedBySection: IGroupedFaqs = useMemo(
        () => groupFaqsBySection(currentFaqs),
        []
    )

    const sectionHeadings: Record<number, string> = useMemo(
        () => ({
            1: 'Care & Daily Activities',
            2: 'Booking Details & Location',
            3: 'Policies & Preparation',
            4: 'Communication & Updates',
        }),
        []
    )

    const sections: ISection[] = useMemo(
        () => [
            {
                id: 1,
                title: 'Care & Daily Activities',
                navLabel: 'Care',
                iconName: 'PetsIcon',
                description: 'Daily schedule, walks, crating & enrichment',
            },
            {
                id: 2,
                title: 'Booking Details & Location',
                navLabel: 'Booking',
                iconName: 'LocationIcon',
                description: 'Pricing, booking process & where we are',
            },
            {
                id: 3,
                title: 'Policies & Preparation',
                navLabel: 'Policies',
                iconName: 'PolicyIcon',
                description: 'Drop-off, pick-up, what to bring & requirements',
            },
            {
                id: 4,
                title: 'Communication & Updates',
                navLabel: 'Updates',
                iconName: 'ChatIcon',
                description: 'Daily updates, Instagram & staying in touch',
            },
        ],
        []
    )

    return {
        handleScrollToFaqSection,
        faqsGroupedBySection,
        sectionHeadings,
        sections,
        isNarrow,
        cardSectionRef,
        showStickyNav,
    }
}

const hook = {
    useFaqs,
}

export default hook
