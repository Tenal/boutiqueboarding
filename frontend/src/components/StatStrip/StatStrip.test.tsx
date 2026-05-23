import React from 'react'
import { render, screen } from '@testing-library/react'
import StatStrip from './StatStrip'

describe('StatStrip', () => {
    const items = [
        {
            icon: <span data-testid="icon-1">icon</span>,
            label: 'Bonded & Insured',
            sublabel: 'ProFur certified coverage',
        },
        {
            icon: <span data-testid="icon-2">icon</span>,
            label: 'Pet First Aid Certified',
            sublabel: 'DogSafe certification',
        },
    ]

    it('should render all item labels and sublabels', () => {
        render(<StatStrip items={items} />)

        expect(screen.getByText('Bonded & Insured')).toBeInTheDocument()
        expect(screen.getByText('ProFur certified coverage')).toBeInTheDocument()
        expect(screen.getByText('Pet First Aid Certified')).toBeInTheDocument()
        expect(screen.getByText('DogSafe certification')).toBeInTheDocument()
    })

    it('should render the icon for each item', () => {
        render(<StatStrip items={items} />)

        expect(screen.getByTestId('icon-1')).toBeInTheDocument()
        expect(screen.getByTestId('icon-2')).toBeInTheDocument()
    })

    it('should render nothing when items list is empty', () => {
        const { container } = render(<StatStrip items={[]} />)

        expect(container.querySelectorAll('.statItem')).toHaveLength(0)
    })
})
