import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About'

// Mock child components
jest.mock('../../components/TopNav/TopNav', () => () => (
    <div data-testid="TopNav">TopNav Mock</div>
))
jest.mock(
    '../../components/Header/Header',
    () =>
        ({ title }: { title: string }) => (
            <div data-testid="Header">{title}</div>
        )
)
jest.mock('../../components/BottomNav/BottomNav', () => () => (
    <div data-testid="BottomNav">BottomNav Mock</div>
))
jest.mock(
    '../../components/SingleAccordion/SingleAccordion',
    () =>
        ({ title, body }: { title: string; body: React.ReactNode }) => (
            <div data-testid="SingleAccordion">
                <h2>{title}</h2>
                <div>{body}</div>
            </div>
        )
)

// Mock aboutInfo.json
jest.mock('./aboutInfo.json', () => [
    {
        title: 'Our Mission',
        body: 'To provide the best care for your pets.',
    },
    {
        title: 'What we have',
        body: ['Experienced staff', 'Modern facilities', '24/7 support'],
    },
])

describe('About Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        )
    })

    it('should render TopNav, Header, and BottomNav components', () => {
        expect(screen.getByTestId('TopNav')).toBeInTheDocument()
        expect(screen.getByTestId('Header')).toHaveTextContent('About Us')
        expect(screen.getByTestId('BottomNav')).toBeInTheDocument()
    })

    it('should render the main image with correct alt text', () => {
        const mainImage = screen.getByAltText(
            'Tenal sitting in a park with a dog'
        ) as HTMLImageElement
        expect(mainImage).toBeInTheDocument()
        expect(mainImage.src).toContain('/resources/tenalAndRyan.jpg')
    })

    it('should render the main title "Tenal & Ryan"', () => {
        expect(screen.getByText('Tenal & Ryan')).toBeInTheDocument()
    })

    it('should render SingleAccordion components based on aboutInfo.json', () => {
        const accordions = screen.getAllByTestId('SingleAccordion')
        expect(accordions.length).toBe(2)

        // Check first accordion
        expect(accordions[0]).toHaveTextContent('Our Mission')
        expect(accordions[0]).toHaveTextContent(
            'To provide the best care for your pets.'
        )

        // Check second accordion
        expect(accordions[1]).toHaveTextContent('What we have')
    })

    it('should render list items and insurance logos in "What we have" accordion', () => {
        // Find the 'What we have' accordion
        const whatWeHaveAccordion = screen
            .getByText('What we have')
            .closest('[data-testid="SingleAccordion"]')
        expect(whatWeHaveAccordion).toBeInTheDocument()

        // Check for list items
        expect(
            within(whatWeHaveAccordion as HTMLElement).getByText(
                'Experienced staff'
            )
        ).toBeInTheDocument()
        expect(
            within(whatWeHaveAccordion as HTMLElement).getByText(
                'Modern facilities'
            )
        ).toBeInTheDocument()
        expect(
            within(whatWeHaveAccordion as HTMLElement).getByText('24/7 support')
        ).toBeInTheDocument()

        // Check for insurance logos
        const profurLogo = screen.getByAltText(
            'Profur logo'
        ) as HTMLImageElement
        const dogsafeLogo = screen.getByAltText(
            'DogSafe logo'
        ) as HTMLImageElement
        expect(profurLogo).toBeInTheDocument()
        expect(profurLogo.src).toContain('/resources/profur.jpg')
        expect(dogsafeLogo).toBeInTheDocument()
        expect(dogsafeLogo.src).toContain('/resources/dogsafe.jpg')
    })
})
