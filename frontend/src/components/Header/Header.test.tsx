import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
    it('should render the home title when title is "home"', () => {
        render(<Header title="home" />)

        expect(
            screen.getByText(
                'Unleash your peace of mind with our trusted and experienced in-home dog boarding'
            )
        ).toBeInTheDocument()
    })

    it('should render the provided title when title is not "home"', () => {
        const title = 'About Us'
        render(<Header title={title} />)

        expect(screen.getByText(title)).toBeInTheDocument()
    })

    it('should apply the correct class names based on the title', () => {
        const title = 'About Us'
        render(<Header title={title} />)

        const boxElement = screen.getByRole('heading', { level: 1 })
            .parentElement?.parentElement
        expect(boxElement).toHaveClass('header aboutusImage')
    })

    it('should apply the "headerHome" class when title is "home"', () => {
        render(<Header title="home" />)

        const boxElement = screen.getByRole('heading', { level: 1 })
            .parentElement?.parentElement
        expect(boxElement).toHaveClass('headerHome')
    })
})
