import React from 'react'
import { render, screen } from '@testing-library/react'
import CompactReview from './CompactReview'

describe('CompactReview', () => {
    const defaultProps = {
        review: 'A great experience!',
        name: 'Jane Smith',
        dog: 'loki',
        stars: 5,
    }

    it('should render the review text', () => {
        render(<CompactReview {...defaultProps} />)

        expect(screen.getByText(/A great experience!/)).toBeInTheDocument()
    })

    it('should render the attribution with name and possessive dog name', () => {
        render(<CompactReview {...defaultProps} />)

        expect(
            screen.getByText(/Jane Smith, Loki's family/)
        ).toBeInTheDocument()
    })

    it('should capitalize the dog name', () => {
        render(<CompactReview {...defaultProps} dog="dakota" />)

        expect(screen.getByText(/Dakota's family/)).toBeInTheDocument()
    })

    it("should use apostrophe-only possessive for dog names ending in 's'", () => {
        render(<CompactReview {...defaultProps} dog="iris" />)

        expect(screen.getByText(/Iris' family/)).toBeInTheDocument()
    })

    it('should strip HTML tags from the review text', () => {
        render(
            <CompactReview
                {...defaultProps}
                review="<p>Great <strong>boarding</strong> experience!</p>"
            />
        )

        expect(
            screen.getByText(/Great boarding experience!/)
        ).toBeInTheDocument()
    })

    it('should truncate review text at 160 characters and append ellipsis', () => {
        const longReview = 'A'.repeat(200)
        render(<CompactReview {...defaultProps} review={longReview} />)

        expect(screen.getByText(/A{160}…/)).toBeInTheDocument()
    })

    it('should not truncate review text at or under 160 characters', () => {
        const shortReview = 'B'.repeat(160)
        render(<CompactReview {...defaultProps} review={shortReview} />)

        expect(screen.getByText(/B{160}/)).toBeInTheDocument()
        expect(screen.queryByText(/…/)).not.toBeInTheDocument()
    })

    it('should render the correct number of star icons', () => {
        const { container } = render(
            <CompactReview {...defaultProps} stars={3} />
        )

        const stars = container.querySelectorAll('.MuiSvgIcon-root')
        expect(stars).toHaveLength(3)
    })
})
