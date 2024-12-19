import { renderHook, act } from '@testing-library/react'
import hook from './useBottomNav'
import { useForm } from '@formspree/react'

jest.mock('@formspree/react', () => ({
    useForm: jest.fn(),
}))

describe('useBottomNav', () => {
    const mockUseForm = useForm as jest.MockedFunction<typeof useForm>

    beforeEach(() => {
        jest.clearAllMocks()
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('should initialize with default values', () => {
        mockUseForm.mockReturnValue([
            { succeeded: false, errors: null, submitting: false, result: null },
            jest.fn(),
            jest.fn(),
        ])

        const { result } = renderHook(() => hook.useBottomNav())

        expect(result.current.email).toBeNull()
        expect(result.current.message).toBeNull()
        expect(result.current.showSuccessMessage).toBe(false)
        expect(result.current.errors).toBeNull()
        expect(result.current.submitting).toBe(false)
        expect(result.current.currentYear).toBe(new Date().getFullYear())
    })

    it('should handle form submission success', async () => {
        mockUseForm.mockReturnValue([
            { succeeded: true, errors: null, submitting: false, result: null },
            jest.fn(),
            jest.fn(),
        ])

        const { result } = renderHook(() => hook.useBottomNav())

        act(() => {
            result.current.setEmail('test@example.com')
            result.current.setMessage('Test message')
        })

        expect(result.current.showSuccessMessage).toBe(true)

        await act(async () => {
            jest.advanceTimersByTime(3000)
        })

        expect(result.current.email).toBeNull()
        expect(result.current.message).toBeNull()
        expect(result.current.showSuccessMessage).toBe(false)
    })
})
