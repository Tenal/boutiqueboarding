import { useCallback, useEffect, useState } from 'react'
import homeImg from '../../resources/home.webp'
import aboutusImg from '../../resources/aboutus.webp'
import faqsImg from '../../resources/faqs.webp'
import reviewsImg from '../../resources/reviews.webp'

export interface IUseHeaderProps {
    title: string
}

// TODO - refactor to optimize images

const useHeader = ({ title }: IUseHeaderProps) => {
    const [isLargeImageLoaded, setIsLargeImageLoaded] = useState(false)
    const isHome = title === 'home'
    const homeTitle =
        'Unleash your peace of mind with our trusted and experienced in-home dog boarding'

    // title --> class --> image mapping
    const titleToClassMap: Record<string, string> = {
        home: 'homeImage',
        aboutus: 'aboutusImage',
        faqs: 'faqsImage',
        reviews: 'reviewsImage',
    }
    const currentImageClass =
        titleToClassMap[title.replace(/\s+/g, '').toLowerCase()] || 'homeImage'
    const classToImageMap: Record<string, string> = {
        homeImage: homeImg,
        aboutusImage: aboutusImg,
        faqsImage: faqsImg,
        reviewsImage: reviewsImg,
    }

    const loadAndMapImages = useCallback(() => {
        const img = new Image()
        img.src = classToImageMap[currentImageClass]
        img.onload = () => setIsLargeImageLoaded(true)
    }, [currentImageClass, classToImageMap])

    useEffect(() => {
        loadAndMapImages()
    }, [loadAndMapImages])

    return {
        isHome,
        homeTitle,
        currentImageClass,
        isLargeImageLoaded,
    }
}

const hook = {
    useHeader,
}

export default hook
