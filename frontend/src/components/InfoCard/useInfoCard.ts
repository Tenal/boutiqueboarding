import { useCallback } from 'react'

export interface IUseInfoCardProps {
    onClick?: () => void
}

const useInfoCard = ({ onClick }: IUseInfoCardProps) => {
    const clickable = !!onClick

    const handleClick = useCallback(() => {
        if (onClick) {
            onClick()
        }
    }, [onClick])

    return {
        handleClick,
        clickable,
    }
}

const hook = {
    useInfoCard,
}

export default hook
