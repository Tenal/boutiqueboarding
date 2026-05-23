import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface IUseScrollRevealOptions {
    threshold?: number
    once?: boolean
}

export const scrollRevealVariants = {
    fadeUp: {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    fadeLeft: {
        hidden: { opacity: 0, x: -24 },
        visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1 },
    },
}

export function useScrollReveal({
    threshold = 0.15,
    once = true,
}: IUseScrollRevealOptions = {}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: threshold, once })

    return { ref, isInView }
}
