// useReviewBox.test.tsx
import { renderHook, act } from '@testing-library/react'
import hook from './useReviewBox'

describe('useReviewBox', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should initialize with default values', () => {
        const stars = 3.5
        const dog = 'testDog'
        const { result } = renderHook(() => hook.useReviewBox(stars, dog))

        expect(result.current.isLoading).toBe(true)
        expect(result.current.fullStarsCount).toBe(3)
        expect(result.current.hasHalfStar).toBe(true)
        expect(result.current.emptyStarsCount).toBe(1)
    })

    it('should handle image load correctly', () => {
        const stars = 4
        const dog = 'testDog'
        const { result } = renderHook(() => hook.useReviewBox(stars, dog))

        expect(result.current.isLoading).toBe(true)

        act(() => {
            result.current.handleImageLoad()
        })

        expect(result.current.isLoading).toBe(false)
    })

    it('should calculate star counts correctly for various star ratings', () => {
        const testCases = [
            { stars: 5, full: 5, half: false, empty: 0 },
            { stars: 4.5, full: 4, half: true, empty: 0 },
            { stars: 4, full: 4, half: false, empty: 1 },
            { stars: 3.5, full: 3, half: true, empty: 1 },
            { stars: 3, full: 3, half: false, empty: 2 },
            { stars: 2.5, full: 2, half: true, empty: 2 },
            { stars: 2, full: 2, half: false, empty: 3 },
            { stars: 1.5, full: 1, half: true, empty: 3 },
            { stars: 1, full: 1, half: false, empty: 4 },
            { stars: 0.5, full: 0, half: true, empty: 4 },
            { stars: 0, full: 0, half: false, empty: 5 },
        ]

        testCases.forEach(({ stars, full, half, empty }) => {
            const dog = 'testDog'
            const { result } = renderHook(() => hook.useReviewBox(stars, dog))
            expect(result.current.fullStarsCount).toBe(full)
            expect(result.current.hasHalfStar).toBe(half)
            expect(result.current.emptyStarsCount).toBe(empty)
        })
    })

    it('should reset isLoading when dog prop changes', () => {
        const initialDog = 'testDog'
        const newDog = 'anotherDog'
        const { result, rerender } = renderHook(
            ({ stars, dog }) => hook.useReviewBox(stars, dog),
            {
                initialProps: { stars: 4, dog: initialDog },
            }
        )

        expect(result.current.isLoading).toBe(true)

        act(() => {
            result.current.handleImageLoad()
        })

        expect(result.current.isLoading).toBe(false)

        // Change dog prop
        rerender({ stars: 4, dog: newDog })

        expect(result.current.isLoading).toBe(true)
    })
})
