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

    it('should handle image error correctly', () => {
        const { result } = renderHook(() => hook.useReviewBox(4, 'testDog'))

        expect(result.current.isLoading).toBe(true)

        act(() => {
            result.current.handleImageError()
        })

        expect(result.current.isLoading).toBe(false)
    })

    it('should preload image when dog changes', () => {
        const mockImage = {
            onload: null,
            onerror: null,
            src: '',
        }
        global.Image = jest.fn(() => mockImage) as any

        const { rerender } = renderHook(
            ({ dog }) => hook.useReviewBox(4, dog),
            { initialProps: { dog: 'dog1' } }
        )

        expect(mockImage.src).toBe('/resources/reviewPhotos/dog1.jpg')

        rerender({ dog: 'dog2' })
        expect(mockImage.src).toBe('/resources/reviewPhotos/dog2.jpg')
    })

    it('should calculate star counts correctly for whole numbers', () => {
        const { result } = renderHook(() => hook.useReviewBox(4, 'testDog'))

        expect(result.current.fullStarsCount).toBe(4)
        expect(result.current.hasHalfStar).toBe(false)
        expect(result.current.emptyStarsCount).toBe(1)
    })

    it('should calculate star counts correctly for decimal numbers', () => {
        const { result } = renderHook(() => hook.useReviewBox(3.7, 'testDog'))

        expect(result.current.fullStarsCount).toBe(3)
        expect(result.current.hasHalfStar).toBe(true)
        expect(result.current.emptyStarsCount).toBe(1)
    })

    it('should handle 5 stars', () => {
        const { result } = renderHook(() => hook.useReviewBox(5, 'testDog'))

        expect(result.current.fullStarsCount).toBe(5)
        expect(result.current.hasHalfStar).toBe(false)
        expect(result.current.emptyStarsCount).toBe(0)
    })

    it('should handle 0 stars', () => {
        const { result } = renderHook(() => hook.useReviewBox(0, 'testDog'))

        expect(result.current.fullStarsCount).toBe(0)
        expect(result.current.hasHalfStar).toBe(false)
        expect(result.current.emptyStarsCount).toBe(5)
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
