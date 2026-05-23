import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'

interface ISection {
    id: number
}

const useFaqStickyNav = (sections: ISection[]) => {
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

    return { activeSection, isMobile }
}

export default useFaqStickyNav
