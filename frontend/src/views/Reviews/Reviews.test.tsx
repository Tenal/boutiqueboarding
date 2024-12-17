import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Reviews from './Reviews'
import hook from './useReviews'

// Mock components
jest.mock('../../components/TopNav/TopNav', () => () => <div>TopNav</div>)
jest.mock('../../components/Header/Header', () => () => <div>Header</div>)
jest.mock('../../components/BottomNav/BottomNav', () => () => (
    <div>BottomNav</div>
))
jest.mock('../../components/ReviewBox/ReviewBox', () => () => (
    <div data-testid="review-box">ReviewBox</div>
))
jest.mock('./useReviews')
jest.mock('./currentReviews.json', () => [
    {
        dog: 'Test Dog',
        stars: 5,
        name: 'Test Name',
        review: 'Test Review',
    },
])

// Mock hook return values
const defaultMockHook = {
    dog: '',
    name: '',
    review: '',
    rating: null,
    showSuccessMessage: false,
    state: { errors: null, submitting: false },
    onFormSubmit: jest.fn(),
    handleDogChange: jest.fn(),
    handleNameChange: jest.fn(),
    handleReviewChange: jest.fn(),
    handleRatingChange: jest.fn(),
}
let mockHook = { ...defaultMockHook }

describe('Reviews', () => {
    let hookSpy: jest.SpyInstance<any, any>

    beforeEach(() => {
        jest.clearAllMocks()
        jest.useFakeTimers()
        mockHook = { ...defaultMockHook }
        hookSpy = jest.spyOn(hook, 'useReviews')
        hookSpy.mockImplementation(() => mockHook)
    })

    afterEach(() => {
        jest.useRealTimers()
        hookSpy.mockRestore()
    })

    it('should render ReviewBoxes and form', () => {
        render(
            <MemoryRouter>
                <Reviews />
            </MemoryRouter>
        )

        const reviewBoxes = screen.getAllByTestId('review-box')
        expect(reviewBoxes.length).toBe(1)

        expect(screen.getByLabelText(/dog's name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/your name\(s\)/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/review/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/rating out of 5/i)).toBeInTheDocument()
    })

    it('should show success message after form submission', () => {
        mockHook = { ...defaultMockHook, showSuccessMessage: true }

        render(
            <MemoryRouter>
                <Reviews />
            </MemoryRouter>
        )

        expect(screen.getByText('We received your review!')).toBeInTheDocument()
        expect(
            screen.getByText(
                'Thank you so much for taking the time to write one, we are extremely appreciative!'
            )
        ).toBeInTheDocument()
    })

    it('should show error message when there are submission errors', () => {
        mockHook = {
            ...defaultMockHook,
            state: {
                succeeded: false,
                // @ts-ignore
                errors: [{ field: 'dog', message: 'bob' }] as {
                    field: string
                    message: string
                }[],
            },
        }

        render(
            <MemoryRouter>
                <Reviews />
            </MemoryRouter>
        )

        expect(
            screen.getByText(
                /We are sorry, there was an issue submitting your review./i
            )
        ).toBeInTheDocument()
    })

    it('should call onFormSubmit on form submission', () => {
        render(
            <MemoryRouter>
                <Reviews />
            </MemoryRouter>
        )

        const form = screen.getByTestId('review-form')
        form.onsubmit = jest.fn()

        fireEvent.submit(form)

        expect(mockHook.onFormSubmit).toHaveBeenCalled()
    })
})
