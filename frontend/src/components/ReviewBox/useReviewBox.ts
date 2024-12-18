import { useState, useCallback, useEffect } from 'react'

export const useReviewBox = (stars: number, dog: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const fullStarsCount = Math.floor(stars)
    const hasHalfStar = stars - fullStarsCount >= 0.5
    const emptyStarsCount = 5 - (fullStarsCount + (hasHalfStar ? 1 : 0))

    const handleImageLoad = useCallback((): void => {
        setIsLoading(false)
    }, [dog])

    const handleImageError = useCallback((): void => {
        setIsLoading(false)
    }, [dog])

    const preloadImage = useCallback(() => {
        const img = new Image()
        img.src = `/resources/reviewPhotos/${dog}.jpg`
        img.onload = handleImageLoad
        img.onerror = handleImageError

        // remove event listeners to avoid memory leaks
        return () => {
            img.onload = null
            img.onerror = null
        }
    }, [dog, handleImageLoad, handleImageError])

    useEffect(() => {
        setIsLoading(true)
        preloadImage()
    }, [preloadImage])

    return {
        isLoading,
        handleImageLoad,
        handleImageError,
        fullStarsCount,
        hasHalfStar,
        emptyStarsCount,
    }
}

const hook = {
    useReviewBox,
}

export default hook
