import { renderHook, act } from '@testing-library/react'
import { useMediaQuery } from '@mui/material'
import hook from './useTopNav'

jest.mock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: jest.fn(),
}))

describe('useTopNav', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should initialize with default values', () => {
        ;(useMediaQuery as jest.Mock).mockReturnValue(false)
        const { result } = renderHook(() => hook.useTopNav())

        expect(result.current.menuOpen).toBe(false)
        expect(result.current.isSmallScreen).toBe(false)
        expect(result.current.pages).toEqual(['About', 'FAQs', 'Reviews'])
    })

    it('should toggle menu open state', () => {
        ;(useMediaQuery as jest.Mock).mockReturnValue(true)
        const { result } = renderHook(() => hook.useTopNav())

        act(() => {
            result.current.handleMenuToggle()
        })
        expect(result.current.menuOpen).toBe(true)

        act(() => {
            result.current.handleMenuToggle()
        })
        expect(result.current.menuOpen).toBe(false)
    })

    it('should close menu', () => {
        ;(useMediaQuery as jest.Mock).mockReturnValue(true)
        const { result } = renderHook(() => hook.useTopNav())

        act(() => {
            result.current.handleMenuToggle()
        })
        expect(result.current.menuOpen).toBe(true)

        act(() => {
            result.current.handleCloseMenu()
        })
        expect(result.current.menuOpen).toBe(false)
    })

    it('should handle Enter key press', () => {
        const { result } = renderHook(() => hook.useTopNav())
        const mockEvent = {
            key: 'Enter',
        } as React.KeyboardEvent<HTMLDivElement>

        act(() => {
            result.current.handleMenuKeyDown(mockEvent)
        })
        expect(result.current.menuOpen).toBe(true)
    })

    it('should handle Space key press', () => {
        const { result } = renderHook(() => hook.useTopNav())
        const mockEvent = {
            key: ' ',
        } as React.KeyboardEvent<HTMLDivElement>

        act(() => {
            result.current.handleMenuKeyDown(mockEvent)
        })
        expect(result.current.menuOpen).toBe(true)
    })

    it('should not toggle menu for other key presses', () => {
        const { result } = renderHook(() => hook.useTopNav())
        const mockEvent = {
            key: 'A',
        } as React.KeyboardEvent<HTMLDivElement>

        act(() => {
            result.current.handleMenuKeyDown(mockEvent)
        })
        expect(result.current.menuOpen).toBe(false)
    })

    it('should auto-close menu when screen size changes to large', () => {
        let isSmall = true
        ;(useMediaQuery as jest.Mock).mockImplementation(() => isSmall)

        const { result, rerender } = renderHook(() => hook.useTopNav())

        // Open menu on small screen
        act(() => {
            result.current.handleMenuToggle()
        })
        expect(result.current.menuOpen).toBe(true)

        // Change to large screen
        isSmall = false
        ;(useMediaQuery as jest.Mock).mockImplementation(() => isSmall)
        rerender()

        expect(result.current.menuOpen).toBe(false)
    })

    it('should not auto-close menu when staying on small screen', () => {
        ;(useMediaQuery as jest.Mock).mockReturnValue(true)

        const { result, rerender } = renderHook(() => hook.useTopNav())

        // Open menu
        act(() => {
            result.current.handleMenuToggle()
        })
        expect(result.current.menuOpen).toBe(true)

        // Rerender without size change
        rerender()
        expect(result.current.menuOpen).toBe(true)
    })

    it('should properly call useMediaQuery with theme breakpoint', () => {
        renderHook(() => hook.useTopNav())

        expect(useMediaQuery).toHaveBeenCalledWith(
            '@media (max-width:899.95px)'
        )
    })
})
