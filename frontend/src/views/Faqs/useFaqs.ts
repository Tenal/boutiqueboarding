import { useMemo, useCallback } from 'react'
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
    iconName: string
    description?: string
}

const useFaqs = () => {
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
                iconName: 'PetsIcon',
            },
            {
                id: 2,
                title: 'Booking Details & Location',
                iconName: 'LocationIcon',
            },
            {
                id: 3,
                title: 'Policies & Preparation',
                iconName: 'PolicyIcon',
            },
            {
                id: 4,
                title: 'Communication & Updates',
                iconName: 'ChatIcon',
            },
        ],
        []
    )

    return {
        handleScrollToFaqSection,
        faqsGroupedBySection,
        sectionHeadings,
        sections,
    }
}

const hook = {
    useFaqs,
}

export default hook
