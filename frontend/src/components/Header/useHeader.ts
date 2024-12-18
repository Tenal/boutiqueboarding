import { useEffect, useState } from 'react'
import homeImg from '../../resources/home.webp'
import aboutusImg from '../../resources/aboutus.webp'
import faqsImg from '../../resources/faqs.webp'
import reviewsImg from '../../resources/reviews.webp'

export interface IHeaderProps {
    title: string
}

// TODO - refactor to optimize images
// TODO - variables for scss

const useHeader = ({ title }: IHeaderProps) => {
    const isHome = title === 'home'
    const homeTitle =
        'Unleash your peace of mind with our trusted and experienced in-home dog boarding'

    const titleToClassMap: Record<string, string> = {
        home: 'homeImage',
        aboutus: 'aboutusImage',
        faqs: 'faqsImage',
        reviews: 'reviewsImage',
    }

    const currentImageClass =
        titleToClassMap[title.replace(/\s+/g, '').toLowerCase()] || 'homeImage'

    const [isLargeImageLoaded, setIsLargeImageLoaded] = useState(false)

    // Map classes to imported images
    const classToImageMap: Record<string, string> = {
        homeImage: homeImg,
        aboutusImage: aboutusImg,
        faqsImage: faqsImg,
        reviewsImage: reviewsImg,
    }

    useEffect(() => {
        const img = new Image()
        img.src = classToImageMap[currentImageClass]
        img.onload = () => setIsLargeImageLoaded(true)
    }, [currentImageClass, classToImageMap])

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
