import { renderHook, act } from '@testing-library/react'
import { useMediaQuery } from '@mui/material'
import useFaqStickyNav from './useFaqStickyNav'

jest.mock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: jest.fn(),
}))

describe('useFaqStickyNav', () => {
    const observeMock = jest.fn()
    const disconnectMock = jest.fn()
    let capturedCallback: (entries: { isIntersecting: boolean }[]) => void

    beforeEach(() => {
        jest.clearAllMocks()
        ;(useMediaQuery as jest.Mock).mockReturnValue(false)
        ;(global as any).IntersectionObserver = jest
            .fn()
            .mockImplementation((callback) => {
                capturedCallback = callback
                return { observe: observeMock, disconnect: disconnectMock }
            })
    })

    it('should initialize with null activeSection', () => {
        const { result } = renderHook(() => useFaqStickyNav([]))

        expect(result.current.activeSection).toBeNull()
    })

    it('should return isMobile from useMediaQuery', () => {
        ;(useMediaQuery as jest.Mock).mockReturnValue(true)

        const { result } = renderHook(() => useFaqStickyNav([]))

        expect(result.current.isMobile).toBe(true)
    })

    it('should observe each section element that exists in the DOM', () => {
        document.body.innerHTML = `
            <div id="section-1"></div>
            <div id="section-2"></div>
        `

        renderHook(() => useFaqStickyNav([{ id: 1 }, { id: 2 }]))

        expect(observeMock).toHaveBeenCalledTimes(2)
    })

    it('should not observe sections whose DOM element is missing', () => {
        document.body.innerHTML = '<div id="section-1"></div>'

        renderHook(() => useFaqStickyNav([{ id: 1 }, { id: 99 }]))

        expect(observeMock).toHaveBeenCalledTimes(1)
    })

    it('should set activeSection when a section intersects', () => {
        document.body.innerHTML = '<div id="section-1"></div>'

        const { result } = renderHook(() => useFaqStickyNav([{ id: 1 }]))

        act(() => {
            capturedCallback([{ isIntersecting: true }])
        })

        expect(result.current.activeSection).toBe(1)
    })

    it('should not update activeSection when entry is not intersecting', () => {
        document.body.innerHTML = '<div id="section-1"></div>'

        const { result } = renderHook(() => useFaqStickyNav([{ id: 1 }]))

        act(() => {
            capturedCallback([{ isIntersecting: false }])
        })

        expect(result.current.activeSection).toBeNull()
    })

    it('should disconnect all observers on unmount', () => {
        document.body.innerHTML = `
            <div id="section-1"></div>
            <div id="section-2"></div>
        `

        const { unmount } = renderHook(() =>
            useFaqStickyNav([{ id: 1 }, { id: 2 }])
        )

        unmount()

        expect(disconnectMock).toHaveBeenCalledTimes(2)
    })
})
