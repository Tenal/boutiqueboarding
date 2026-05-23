import React from 'react'
import { render, screen } from '@testing-library/react'
import BoardingDetailCard from './BoardingDetailCard'

describe('BoardingDetailCard', () => {
    const defaultProps = {
        icon: <span data-testid="test-icon">icon</span>,
        label: 'Nightly Rate',
        value: '$95 / night',
    }

    it('should render the icon, label, and value', () => {
        render(<BoardingDetailCard {...defaultProps} />)

        expect(screen.getByTestId('test-icon')).toBeInTheDocument()
        expect(screen.getByText('Nightly Rate')).toBeInTheDocument()
        expect(screen.getByText('$95 / night')).toBeInTheDocument()
    })

    it('should render subtext when provided', () => {
        render(
            <BoardingDetailCard
                {...defaultProps}
                subtext="Holiday rate applies on select dates"
            />
        )

        expect(
            screen.getByText('Holiday rate applies on select dates')
        ).toBeInTheDocument()
    })

    it('should not render subtext when not provided', () => {
        render(<BoardingDetailCard {...defaultProps} />)

        expect(
            screen.queryByText('Holiday rate applies on select dates')
        ).not.toBeInTheDocument()
    })
})
