import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

describe('Header', () => {
    it('should render the home title when title is "home"', () => {
        render(
            <MemoryRouter>
                <Header title="home" />
            </MemoryRouter>
        )

        expect(
            screen.getByText(
                'Unleash your peace of mind with our trusted and experienced in-home dog boarding'
            )
        ).toBeInTheDocument()
    })

    it('should render the provided title when title is not "home"', () => {
        const title = 'About Us'
        render(
            <MemoryRouter>
                <Header title={title} />
            </MemoryRouter>
        )

        expect(screen.getByText(title)).toBeInTheDocument()
    })

    it('should apply the correct class names based on the title', () => {
        const title = 'About Us'
        render(
            <MemoryRouter>
                <Header title={title} />
            </MemoryRouter>
        )

        const boxElement = screen.getByRole('heading', { level: 1 })
            .parentElement?.parentElement
        expect(boxElement).toHaveClass('header aboutusImage')
    })

    it('should apply the "headerHome" class when title is "home"', () => {
        render(
            <MemoryRouter>
                <Header title="home" />
            </MemoryRouter>
        )

        const boxElement = screen
            .getByRole('heading', { level: 1 })
            .closest('.header')
        expect(boxElement).toHaveClass('headerHome')
    })
})
