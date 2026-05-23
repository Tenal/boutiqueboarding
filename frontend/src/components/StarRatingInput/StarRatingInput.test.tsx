import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import StarRatingInput from './StarRatingInput'

describe('StarRatingInput', () => {
    const defaultProps = {
        value: null,
        onChange: jest.fn(),
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should render the rating label', () => {
        render(<StarRatingInput {...defaultProps} />)

        expect(screen.getByText('Rating')).toBeInTheDocument()
    })

    it('should render 5 stars', () => {
        const { container } = render(<StarRatingInput {...defaultProps} />)

        const stars = container.querySelectorAll('.starRatingIcon')
        expect(stars).toHaveLength(5)
    })

    it('should render filled stars based on value', () => {
        const { container } = render(
            <StarRatingInput {...defaultProps} value={3} />
        )

        expect(container.querySelectorAll('.starFilled')).toHaveLength(3)
        expect(container.querySelectorAll('.starEmpty')).toHaveLength(2)
    })

    it('should render all empty stars when value is null', () => {
        const { container } = render(<StarRatingInput {...defaultProps} />)

        expect(container.querySelectorAll('.starFilled')).toHaveLength(0)
        expect(container.querySelectorAll('.starEmpty')).toHaveLength(5)
    })

    it('should call onChange with the correct star value when clicked', () => {
        const onChange = jest.fn()
        const { container } = render(
            <StarRatingInput value={null} onChange={onChange} />
        )

        const stars = container.querySelectorAll('.starRatingIcon')
        fireEvent.click(stars[2]) // 3rd star = value 3

        expect(onChange).toHaveBeenCalledWith(3)
    })

    it('should show hovered stars on mouse enter', () => {
        const { container } = render(
            <StarRatingInput {...defaultProps} value={1} />
        )

        const stars = container.querySelectorAll('.starRatingIcon')
        fireEvent.mouseEnter(stars[4]) // hover over 5th star

        expect(container.querySelectorAll('.starFilled')).toHaveLength(5)
    })

    it('should revert to value on mouse leave', () => {
        const { container } = render(
            <StarRatingInput {...defaultProps} value={2} />
        )

        fireEvent.mouseEnter(container.querySelectorAll('.starRatingIcon')[4])
        // Re-query after re-render — nodes are replaced when hover state changes
        fireEvent.mouseLeave(container.querySelectorAll('.starRatingIcon')[4])

        expect(container.querySelectorAll('.starFilled')).toHaveLength(2)
    })

    it('should set the hidden input value to the current rating', () => {
        const { container } = render(
            <StarRatingInput {...defaultProps} value={4} />
        )

        const hiddenInput = container.querySelector('input[name="rating"]')
        expect(hiddenInput).toHaveValue('4')
    })

    it('should set the hidden input value to empty string when value is null', () => {
        const { container } = render(<StarRatingInput {...defaultProps} />)

        const hiddenInput = container.querySelector('input[name="rating"]')
        expect(hiddenInput).toHaveValue('')
    })
})
