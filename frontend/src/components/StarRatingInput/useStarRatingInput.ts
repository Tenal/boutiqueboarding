import { useState } from 'react'

const useStarRatingInput = () => {
    const [hovered, setHovered] = useState<number | null>(null)

    return { hovered, setHovered }
}

export default useStarRatingInput
