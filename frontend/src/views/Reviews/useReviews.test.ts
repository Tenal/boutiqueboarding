import { renderHook, act } from '@testing-library/react'
import hook from './useReviews'
import { useForm } from '@formspree/react'

jest.mock('@formspree/react', () => ({
    useForm: jest.fn(),
}))

describe('useReviews', () => {
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
            {
                //@ts-ignore
                errors: [] as { field: string; message: string }[],
                succeeded: false,
            },
            jest.fn(),
        ])

        const { result } = renderHook(() => hook.useReviews())

        expect(result.current.dog).toBe('')
        expect(result.current.name).toBe('')
        expect(result.current.review).toBe('')
        expect(result.current.rating).toBeNull()
        expect(result.current.showSuccessMessage).toBe(false)
        expect(result.current.state).toEqual({ succeeded: false, errors: [] })
        expect(result.current.onFormSubmit).toBeInstanceOf(Function)
        expect(result.current.handleDogChange).toBeInstanceOf(Function)
        expect(result.current.handleNameChange).toBeInstanceOf(Function)
        expect(result.current.handleReviewChange).toBeInstanceOf(Function)
        expect(result.current.handleRatingChange).toBeInstanceOf(Function)
    })

    it('should handle form submission success', () => {
        const handleSubmitMock = jest.fn()
        mockUseForm.mockReturnValue([
            {
                succeeded: true,
                //@ts-ignore
                errors: [] as { field: string; message: string }[],
                submitting: false,
                result: null,
            },
            handleSubmitMock,
        ])

        const { result } = renderHook(() => hook.useReviews())

        act(() => {
            result.current.handleDogChange({
                target: { value: 'Buddy' },
            } as React.ChangeEvent<HTMLInputElement>)
            result.current.handleNameChange({
                target: { value: 'Alice' },
            } as React.ChangeEvent<HTMLInputElement>)
            result.current.handleReviewChange({
                target: { value: 'Great service!' },
            } as React.ChangeEvent<HTMLInputElement>)
            //@ts-ignore
            result.current.handleRatingChange(null, 5)
        })

        act(() => {
            result.current.onFormSubmit({
                preventDefault: jest.fn(),
            } as unknown as React.FormEvent)
        })

        expect(handleSubmitMock).toHaveBeenCalledWith({
            dog: 'Buddy',
            name: 'Alice',
            review: 'Great service!',
            rating: 5,
        })

        act(() => {
            jest.runAllTimers()
        })

        expect(result.current.dog).toBe('')
        expect(result.current.name).toBe('')
        expect(result.current.review).toBe('')
        expect(result.current.rating).toBeNull()
        expect(result.current.showSuccessMessage).toBe(false)
    })

    it('should handle form submission with errors', () => {
        const handleSubmitMock = jest.fn()
        mockUseForm.mockReturnValue([
            {
                succeeded: false,
                //@ts-ignore
                errors: [{ field: 'review', message: 'Submission failed' }] as {
                    field: string
                    message: string
                }[],
                submitting: false,
                result: null,
            },
            handleSubmitMock,
        ])

        const { result } = renderHook(() => hook.useReviews())

        act(() => {
            result.current.handleDogChange({
                target: { value: 'Buddy' },
            } as React.ChangeEvent<HTMLInputElement>)
            result.current.handleNameChange({
                target: { value: 'Alice' },
            } as React.ChangeEvent<HTMLInputElement>)
            result.current.handleReviewChange({
                target: { value: 'Great service!' },
            } as React.ChangeEvent<HTMLInputElement>)
            //@ts-ignore
            result.current.handleRatingChange(null, 5)
        })

        act(() => {
            result.current.onFormSubmit({
                preventDefault: jest.fn(),
            } as unknown as React.FormEvent)
        })

        expect(handleSubmitMock).toHaveBeenCalledWith({
            dog: 'Buddy',
            name: 'Alice',
            review: 'Great service!',
            rating: 5,
        })

        expect(result.current.showSuccessMessage).toBe(false)
        expect(result.current.dog).toBe('Buddy')
        expect(result.current.name).toBe('Alice')
        expect(result.current.review).toBe('Great service!')
        expect(result.current.rating).toBe(5)
    })
})
