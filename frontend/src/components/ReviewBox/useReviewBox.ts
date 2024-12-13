import { useState, useCallback, useEffect } from 'react'

export const useReviewBox = (stars: number, dog: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const handleImageLoad = useCallback((): void => {
        setIsLoading(false)
    }, [])

    useEffect(() => {
        setIsLoading(true)
    }, [dog])

    const fullStarsCount = Math.floor(stars)
    const hasHalfStar = stars - fullStarsCount >= 0.5
    const emptyStarsCount = 5 - (fullStarsCount + (hasHalfStar ? 1 : 0))

    return {
        isLoading,
        handleImageLoad,
        fullStarsCount,
        hasHalfStar,
        emptyStarsCount,
    }
}

const hook = {
    useReviewBox,
}

export default hook
