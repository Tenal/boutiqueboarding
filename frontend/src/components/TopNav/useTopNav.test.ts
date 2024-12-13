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

    it('should handle Enter or Space key press correctly', () => {
        ;(useMediaQuery as jest.Mock).mockReturnValue(true)

        const { result } = renderHook(() => hook.useTopNav())

        const enterKeyEvent = {
            key: 'Enter',
        } as React.KeyboardEvent<HTMLDivElement>
        const spaceKeyEvent = {
            key: ' ',
        } as React.KeyboardEvent<HTMLDivElement>

        act(() => {
            result.current.handleMenuKeyDown(enterKeyEvent)
        })
        expect(result.current.menuOpen).toBe(true)

        act(() => {
            result.current.handleMenuKeyDown(spaceKeyEvent)
        })
        expect(result.current.menuOpen).toBe(false)
    })
})
