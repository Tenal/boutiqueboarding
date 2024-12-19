import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ReviewBox from './ReviewBox'
import hook from './useReviewBox'

// Mock components
jest.mock('./useReviewBox')
jest.mock('../../resources/dog-profile.svg', () => ({
    ReactComponent: () => <svg data-testid="dog-profile-svg" />,
}))

// Mock hook return values
const defaultMockHook = {
    isLoading: false,
    handleImageLoad: jest.fn(),
    fullStarsCount: 0,
    hasHalfStar: false,
    emptyStarsCount: 5,
}
let mockHook = defaultMockHook

// Mock props
const mockProps = {
    dog: 'testDog',
    stars: 3.5,
    name: 'John Doe',
    review: 'This is a <strong>test</strong> review.',
}

describe('ReviewBox', () => {
    let hookSpy: jest.SpyInstance<any, any>

    beforeEach(() => {
        jest.clearAllMocks()
        hookSpy = jest.spyOn(hook, 'useReviewBox')
        hookSpy.mockImplementation(() => mockHook)
    })

    afterEach(() => {
        hookSpy.mockRestore()
    })

    describe('Rendering', () => {
        test('renders loading state correctly', () => {
            mockHook = {
                ...defaultMockHook,
                isLoading: true,
            }

            render(<ReviewBox {...mockProps} />)

            // Check SVG Placeholder is visible
            const svgLoader = screen.getByTestId('dog-profile-svg')
            expect(svgLoader).toBeInTheDocument()
            const svgContainer = svgLoader.parentElement
            expect(svgContainer).toHaveClass('show')

            // Check Image is hidden
            const reviewImage = screen.getByAltText(
                `${mockProps.dog} headshot on a plain background`
            )
            expect(reviewImage).toBeInTheDocument()
            const imgContainer = reviewImage.parentElement
            expect(imgContainer).toHaveClass('hide')
        })

        test('renders loaded state correctly', () => {
            mockHook = {
                ...defaultMockHook,
                isLoading: false,
            }

            render(<ReviewBox {...mockProps} />)

            // Check SVG Placeholder is hidden
            const svgLoader = screen.getByTestId('dog-profile-svg')
            expect(svgLoader).toBeInTheDocument()
            const svgContainer = svgLoader.parentElement
            expect(svgContainer).toHaveClass('hide')

            // Check Image is visible
            const reviewImage = screen.getByAltText(
                `${mockProps.dog} headshot on a plain background`
            )
            expect(reviewImage).toBeInTheDocument()
            const imgContainer = reviewImage.parentElement
            expect(imgContainer).toHaveClass('show')
            expect(reviewImage).toHaveAttribute(
                'src',
                `/resources/reviewPhotos/${mockProps.dog}.jpg`
            )
            expect(reviewImage).toHaveAttribute('loading', 'lazy')
        })

        test('renders the correct number of star icons', () => {
            mockHook = {
                ...defaultMockHook,
                fullStarsCount: 3,
                hasHalfStar: true,
                emptyStarsCount: 1,
            }

            render(<ReviewBox {...mockProps} />)

            const fullStars = screen.getAllByTestId('full-star-icon')
            expect(fullStars.length).toBe(3)

            const halfStars = screen.getAllByTestId('half-star-icon')
            expect(halfStars.length).toBe(1)

            const emptyStars = screen.getAllByTestId('empty-star-icon')
            expect(emptyStars.length).toBe(1)
        })

        test('renders review text and name correctly', () => {
            render(<ReviewBox {...mockProps} />)

            const reviewParagraph = screen.getByText(/This is a/i)
            expect(reviewParagraph).toBeInTheDocument()
            expect(reviewParagraph).toContainHTML(
                '<strong>test</strong> review.'
            )

            const reviewName = screen.getByText('John Doe')
            expect(reviewName).toBeInTheDocument()
        })
    })

    describe('Interactions', () => {
        test('calls handleImageLoad when the image is loaded', () => {
            mockHook = {
                ...defaultMockHook,
                isLoading: false,
            }

            render(<ReviewBox {...mockProps} />)

            const reviewImage = screen.getByAltText(
                `${mockProps.dog} headshot on a plain background`
            )
            fireEvent.load(reviewImage)

            expect(mockHook.handleImageLoad).toHaveBeenCalled()
        })
    })

    describe('Edge Cases', () => {
        test('renders all empty stars when no stars are given', () => {
            mockHook = {
                ...defaultMockHook,
                fullStarsCount: 0,
                hasHalfStar: false,
                emptyStarsCount: 5,
            }

            render(<ReviewBox {...mockProps} />)

            const fullStars = screen.queryAllByTestId('full-star-icon')
            expect(fullStars.length).toBe(0)

            const halfStars = screen.queryAllByTestId('half-star-icon')
            expect(halfStars.length).toBe(0)

            const emptyStars = screen.getAllByTestId('empty-star-icon')
            expect(emptyStars.length).toBe(5)
        })

        test('renders correctly with half star only', () => {
            mockHook = {
                ...defaultMockHook,
                fullStarsCount: 0,
                hasHalfStar: true,
                emptyStarsCount: 4,
            }

            render(<ReviewBox {...mockProps} />)

            const fullStars = screen.queryAllByTestId('full-star-icon')
            expect(fullStars.length).toBe(0)

            const halfStars = screen.getAllByTestId('half-star-icon')
            expect(halfStars.length).toBe(1)

            const emptyStars = screen.getAllByTestId('empty-star-icon')
            expect(emptyStars.length).toBe(4)
        })
    })
})
