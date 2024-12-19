import { renderHook, act } from '@testing-library/react'
import hook from './useHeader'

describe('useHeader', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('should initialize with default values', () => {
        const { result } = renderHook(() => hook.useHeader({ title: 'home' }))

        expect(result.current.isHome).toBe(true)
        expect(result.current.homeTitle).toBe(
            'Unleash your peace of mind with our trusted and experienced in-home dog boarding'
        )
        expect(result.current.currentImageClass).toBe('homeImage')
        expect(result.current.isLargeImageLoaded).toBe(false)
    })

    it('should handle faqs header correctly', () => {
        const { result } = renderHook(() => hook.useHeader({ title: 'faqs' }))

        expect(result.current.isHome).toBe(false)
        expect(result.current.homeTitle).toBe(
            'Unleash your peace of mind with our trusted and experienced in-home dog boarding'
        )
        expect(result.current.currentImageClass).toBe('faqsImage')
        expect(result.current.isLargeImageLoaded).toBe(false)
    })

    it('should handle about us header correctly', () => {
        const { result } = renderHook(() =>
            hook.useHeader({ title: 'about us' })
        )

        expect(result.current.isHome).toBe(false)
        expect(result.current.homeTitle).toBe(
            'Unleash your peace of mind with our trusted and experienced in-home dog boarding'
        )
        expect(result.current.currentImageClass).toBe('aboutusImage')
        expect(result.current.isLargeImageLoaded).toBe(false)
    })

    it('should handle reviews header correctly', () => {
        const { result } = renderHook(() =>
            hook.useHeader({ title: 'reviews' })
        )

        expect(result.current.isHome).toBe(false)
        expect(result.current.homeTitle).toBe(
            'Unleash your peace of mind with our trusted and experienced in-home dog boarding'
        )
        expect(result.current.currentImageClass).toBe('reviewsImage')
        expect(result.current.isLargeImageLoaded).toBe(false)
    })

    it('should normalize title for class mapping', () => {
        const { result } = renderHook(() =>
            hook.useHeader({ title: 'About Us' })
        )
        expect(result.current.currentImageClass).toBe('aboutusImage')
    })

    it('should handle uppercase titles correctly', () => {
        const { result } = renderHook(() => hook.useHeader({ title: 'FAQS' }))
        expect(result.current.currentImageClass).toBe('faqsImage')
    })

    it('should handle titles with spaces correctly', () => {
        const { result } = renderHook(() =>
            hook.useHeader({ title: 'about us' })
        )
        expect(result.current.currentImageClass).toBe('aboutusImage')
    })

    it('should handle unknown titles gracefully', () => {
        const { result } = renderHook(() =>
            hook.useHeader({ title: 'nonexistent' })
        )
        expect(result.current.isHome).toBe(false)
        expect(result.current.currentImageClass).toBe('homeImage')
    })

    it('should handle empty title', () => {
        const { result } = renderHook(() => hook.useHeader({ title: '' }))
        expect(result.current.isHome).toBe(false)
        expect(result.current.currentImageClass).toBe('homeImage')
    })

    it('should cleanup image load listener on unmount', () => {
        const { unmount } = renderHook(() => hook.useHeader({ title: 'home' }))
        unmount()

        act((): void => {
            const img = new Image()
            const loadEvent = new Event('load')
            img.dispatchEvent(loadEvent)
            return undefined
        })
    })
})
